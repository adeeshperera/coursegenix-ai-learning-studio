"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const AmbientBlobs: React.FC = () => {
  // Mouse position tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smoothed spring physics for mouse movements
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  // Refs for container dimensions
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Control animations
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();

  // Calculate parallax effect amounts based on mouse position relative to screen center
  const x1 = useTransform(smoothMouseX, [0, dimensions.width], [10, -10]);
  const y1 = useTransform(smoothMouseY, [0, dimensions.height], [10, -10]);
  
  const x2 = useTransform(smoothMouseX, [0, dimensions.width], [15, -15]);
  const y2 = useTransform(smoothMouseY, [0, dimensions.height], [15, -15]);
  
  const x3 = useTransform(smoothMouseX, [0, dimensions.width], [20, -20]);
  const y3 = useTransform(smoothMouseY, [0, dimensions.height], [20, -20]);
  
  const x4 = useTransform(smoothMouseX, [0, dimensions.width], [12, -12]);
  const y4 = useTransform(smoothMouseY, [0, dimensions.height], [12, -12]);

  // Scroll-based effects
  const [scrollY, setScrollY] = useState(0);
  
  // Handle mouse movement to update parallax effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      mouseX.set(clientX);
      mouseY.set(clientY);
      setMousePosition({ x: clientX, y: clientY });
    };

    // Update dimensions on resize for responsive behavior
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    // Handle scroll
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Initialize dimensions
    handleResize();

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mouseX, mouseY]);

  // Animate blobs on scroll
  useEffect(() => {
    if (!dimensions.height) return;
    
    // Calculate scroll progress for different effects
    const scrollProgress = scrollY / dimensions.height;
    
    // Subtle position shifts based on scroll
    controls1.start({
      y: scrollProgress * 10,
      scale: 1 + scrollProgress * 0.05,
      transition: { duration: 0.5 }
    });
    
    controls2.start({
      x: -scrollProgress * 15,
      transition: { duration: 0.5 }
    });
    
    controls3.start({
      y: -scrollProgress * 20,
      x: scrollProgress * 10,
      transition: { duration: 0.5 }
    });
    
    controls4.start({
      x: scrollProgress * 25,
      y: -scrollProgress * 5,
      transition: { duration: 0.5 }
    });
  }, [scrollY, dimensions.height, controls1, controls2, controls3, controls4]);

  // Add initial animation to grab attention, but more subtle
  useEffect(() => {
    // Initial attention-grabbing animation sequence
    const initialAnimation = async () => {
      // First, make blobs noticeable but not too distracting
      await Promise.all([
        controls1.start({
          scale: 1.15,
          transition: { duration: 0.8, ease: "easeOut" }
        }),
        controls2.start({
          scale: 1.12,
          transition: { duration: 0.9, ease: "easeOut", delay: 0.1 }
        }),
        controls3.start({
          scale: 1.14,
          transition: { duration: 0.85, ease: "easeOut", delay: 0.2 }
        }),
        controls4.start({
          scale: 1.1,
          transition: { duration: 0.95, ease: "easeOut", delay: 0.3 }
        })
      ]);

      // Then shrink back to start ongoing animations
      await Promise.all([
        controls1.start({
          scale: 0.95,
          transition: { duration: 1.2, ease: "easeInOut" }
        }),
        controls2.start({
          scale: 0.92,
          transition: { duration: 1.3, ease: "easeInOut" }
        }),
        controls3.start({
          scale: 0.94,
          transition: { duration: 1.25, ease: "easeInOut" }
        }),
        controls4.start({
          scale: 0.9,
          transition: { duration: 1.35, ease: "easeInOut" }
        })
      ]);
    };

    // Run the initial animation
    initialAnimation();
  }, [controls1, controls2, controls3, controls4]);

  // Automatically animate the blobs regardless of user interaction
  useEffect(() => {
    // Auto animation sequence for blob 1 - more movement
    const animateBlob1 = async () => {
      while (true) {
        await controls1.start({
          scale: [1, 1.15, 1.18, 1.15, 1],
          x: [0, 15, -10, 5, 0],
          y: [0, -15, 5, -8, 0],
          borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "70% 30% 45% 55% / 50% 60% 40% 50%", "40% 60% 70% 30% / 40% 50% 50% 60%", "55% 45% 30% 70% / 70% 30% 60% 40%", "60% 40% 30% 70% / 60% 30% 70% 40%"],
          transition: { duration: 3.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
        });
      }
    };
    
    // Auto animation for blob 2 - more movement
    const animateBlob2 = async () => {
      while (true) {
        await controls2.start({
          scale: [1, 1.12, 1, 0.92, 1],
          x: [0, -12, 18, -5, 0],
          y: [0, 8, 15, -10, 0],
          borderRadius: ["70% 30% 50% 50% / 40% 40% 60% 60%", "50% 50% 70% 30% / 30% 50% 70% 50%", "30% 70% 70% 30% / 50% 50% 50% 50%", "40% 60% 50% 50% / 60% 40% 40% 60%", "70% 30% 50% 50% / 40% 40% 60% 60%"],
          transition: { duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
        });
      }
    };
    
    // Auto animation for blob 3 - more movement
    const animateBlob3 = async () => {
      while (true) {
        await controls3.start({
          scale: [1, 0.9, 1.12, 1.08, 1],
          x: [0, 20, -15, 8, 0],
          y: [0, 12, -8, -15, 0],
          borderRadius: ["40% 60% 60% 40% / 60% 30% 70% 40%", "50% 50% 70% 30% / 40% 40% 60% 60%", "30% 70% 40% 60% / 50% 60% 40% 50%", "60% 40% 30% 70% / 40% 50% 50% 60%", "40% 60% 60% 40% / 60% 30% 70% 40%"],
          transition: { duration: 4.2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
        });
      }
    };
    
    // Auto animation for blob 4 - more movement
    const animateBlob4 = async () => {
      while (true) {
        await controls4.start({
          scale: [1, 1.14, 0.9, 1.1, 1],
          x: [0, -18, -10, 12, 0],
          y: [0, -10, 18, 10, 0],
          borderRadius: ["50% 50% 50% 50% / 50% 50% 50% 50%", "60% 40% 50% 60% / 40% 60% 40% 60%", "40% 60% 30% 70% / 60% 40% 60% 40%", "60% 40% 70% 30% / 40% 60% 40% 60%", "50% 50% 50% 50% / 50% 50% 50% 50%"],
          transition: { duration: 3.8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
        });
      }
    };
    
    // Slight delay before starting continuous animations to allow initial animation to complete
    const startAnimationsTimer = setTimeout(() => {
      animateBlob1();
      animateBlob2();
      animateBlob3();
      animateBlob4();
    }, 2500);
    
    return () => clearTimeout(startAnimationsTimer);
  }, [controls1, controls2, controls3, controls4]);

  return (
    <div 
      ref={containerRef} 
      className="ambient-gradient-blobs"
      aria-hidden="true"
    >
      <motion.div 
        className="ambient-blob ambient-blob-1" 
        animate={controls1}
        style={{ x: x1, y: y1 }}
      />
      <motion.div 
        className="ambient-blob ambient-blob-2" 
        animate={controls2}
        style={{ x: x2, y: y2 }}
      />
      <motion.div 
        className="ambient-blob ambient-blob-3" 
        animate={controls3}
        style={{ x: x3, y: y3 }}
      />
      <motion.div 
        className="ambient-blob ambient-blob-4" 
        animate={controls4}
        style={{ x: x4, y: y4 }}
      />
    </div>
  );
};

export default AmbientBlobs;