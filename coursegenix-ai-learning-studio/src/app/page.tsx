"use client";

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ProductShowcase } from "@/components/ProductShowcase";
import { ParallaxFeature } from "@/components/ParallaxFeature";
import Link from "next/link";
import { Users, Lightbulb, ThumbsUp, ChevronDown, ArrowRight, Sparkles, Book, PlayCircle, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import AmbientBlobs from '@/components/AmbientBlobs';

// Animation variants for consistent animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

// New animated background variants for more dynamic visuals
const pulseAnimation = {
  initial: { scale: 1, opacity: 0.2 },
  animate: { 
    scale: [1, 1.05, 1], 
    opacity: [0.2, 0.3, 0.2],
    transition: { 
      duration: 8, 
      repeat: Infinity,
      ease: "easeInOut" 
    }
  }
};

// New frosted glass effect styling
const frostedGlass = {
  background: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
};

export default function HomePage() {
  const stats = [
    { icon: Users, number: "10K+", label: "Active Learners", description: "Learners benefitting from AI-generated courses" }, 
    { icon: Book, number: "100+", label: "AI-Generated Courses", description: "Comprehensive courses created with our platform" }, 
    { icon: Star, number: "98%", label: "Satisfaction Rate", description: "Users reporting improved learning outcomes" }
  ];

  const testimonials = [
    {
      quote: "CourseGenix helped me master advanced JavaScript frameworks in half the time it would have taken through traditional courses. The personalized learning path adapted perfectly to my skill level.",
      name: "Alex K.",
      title: "Frontend Developer",
      avatar: "/avatars/alex.png" 
    },
    {
      quote: "While preparing for AWS certification, CourseGenix generated practice exercises that addressed my weak points. I passed my exam with a score much higher than I expected.",
      name: "Sarah J.",
      title: "Cloud Engineer",
      avatar: "/avatars/sarah.png" 
    },
    {
      quote: "As a self-taught programmer, I struggled with data structures. CourseGenix created visual explanations that finally made complex algorithms click for me. Game changer!",
      name: "Michael T.",
      title: "Software Engineering Student",
      avatar: "/avatars/michael.png" 
    }
  ];

  return (
    <main className="relative bg-background text-foreground overflow-hidden">
      {/* Using the new AmbientBlobs component instead of inline implementation */}
      <AmbientBlobs />
      
      {/* Hero Section - Enhanced for better visual hierarchy */}
      <section className="relative min-h-screen flex items-center justify-center py-20 md:py-24 overflow-hidden">
        {/* Background Elements - Enhanced with subtle animation */}
        <motion.div 
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
          <motion.div 
            className="absolute top-0 -right-40 w-96 h-96 bg-primary/30 rounded-full filter blur-3xl opacity-20"
            initial="initial"
            animate="animate"
            variants={pulseAnimation}
          />
          <motion.div 
            className="absolute bottom-40 -left-20 w-72 h-72 bg-secondary/30 rounded-full filter blur-3xl opacity-20"
            initial="initial"
            animate="animate"
            variants={pulseAnimation}
            transition={{ 
              delay: 1,
            }}
          />
        </motion.div>
        
        <div className="container px-4 mx-auto z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8 text-center lg:text-left"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium tracking-wider mb-6"
                style={frostedGlass}>
                  <Sparkles className="w-3.5 h-3.5 mr-2" />
                  INNOVATIVE AI EDUCATION
                </span>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-secondary leading-[1.05]"
              >
                CourseGenix <br className="hidden md:block" /> AI Studio
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
              >
                Revolutionize learning with AI-powered course design. Create engaging, effective, 
                and personalized educational experiences in minutes.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <Link href="/create">
                  <Button size="lg" className="rounded-full px-8 h-12 shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all group">
                    Get Started 
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:text-white transition-all" />
                    </motion.span>
                  </Button>
                </Link>
                <Link href="/gallery">
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all">
                    Browse Courses
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
              className="relative hidden lg:block"
            >
              {/* Enhanced platform interface mockup with improved UI/UX */}
              <div className="relative h-[540px] w-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-white/10 backdrop-blur-sm">
                {/* Enhanced glowing decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/30 rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/30 rounded-full filter blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2" />
                
                {/* Professional mockup of the platform interface with improved UI details */}
                <div className="absolute inset-4 rounded-2xl overflow-hidden border border-white/20 shadow-lg bg-gradient-to-br from-background/95 to-background/98">
                  {/* Modern macOS-style window controls with enhanced styling */}
                  <div className="h-12 bg-background/80 border-b border-white/10 flex items-center justify-between px-4 backdrop-blur-md">
                    <div className="flex items-center gap-6">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500" />
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20">
                        <div className="w-3 h-3 rounded-sm bg-primary/40" />
                        <motion.div 
                          initial={{ width: "100%" }}
                          animate={{ width: "80%" }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                          className="h-1.5 rounded-sm bg-primary/20"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center">
                        <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground/60" />
                      </div>
                      <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center">
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-5 h-[calc(100%-48px)]">
                    {/* Enhanced Sidebar with interactive elements and animations */}
                    <div className="col-span-1 bg-secondary/5 backdrop-blur-xl border-r border-border/10 p-4">
                      <div className="flex flex-col space-y-6">
                        <div className="flex items-center gap-3 px-2">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/80 to-primary shadow-lg shadow-primary/20 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <motion.div
                            initial={{ width: "60%" }}
                            animate={{ width: "40%" }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
                            className="h-3 bg-secondary/20 rounded"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="px-2">
                            <motion.div
                              initial={{ width: "75%" }}
                              animate={{ width: "55%" }}
                              transition={{ duration: 1.8, repeat: Infinity, repeatType: "mirror", delay: 0.2 }}
                              className="h-3 bg-secondary/20 rounded mb-3"
                            />
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary/80">
                                <motion.div
                                  initial={{ width: "20px" }}
                                  animate={{ width: "30px" }}
                                  transition={{ duration: 1.3, repeat: Infinity, repeatType: "mirror", delay: 0.5 }}
                                  className="h-2 bg-primary/30 rounded"
                                />
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-secondary/10">
                                <motion.div
                                  initial={{ width: "20px" }}
                                  animate={{ width: "25px" }}
                                  transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: 0.8 }}
                                  className="h-2 bg-secondary/30 rounded"
                                />
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 space-y-1">
                            <div className="px-2 py-1.5">
                              <motion.div
                                initial={{ width: "40%" }}
                                animate={{ width: "55%" }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: 1 }}
                                className="h-2 bg-secondary/30 rounded"
                              />
                            </div>
                            
                            <div className="relative">
                              <div className="absolute left-2 top-4 bottom-0 w-0.5 bg-primary/20"></div>
                              <div className="space-y-1 relative">
                                {[
                                  { active: true, complete: false },
                                  { active: false, complete: false },
                                  { active: false, complete: false }
                                ].map((lesson, i) => (
                                  <div 
                                    key={i} 
                                    className={`pl-6 pr-3 py-2 rounded-lg transition-all relative ${
                                      lesson.active 
                                        ? 'bg-primary/15 shadow-sm' 
                                        : 'hover:bg-secondary/10'
                                    }`}
                                  >
                                    <div className={`absolute left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 ${
                                      lesson.active 
                                        ? 'border-primary bg-primary/20' 
                                        : 'border-muted-foreground/30'
                                    }`}>
                                      {lesson.complete && (
                                        <svg className="w-2 h-2 text-muted-foreground/60" viewBox="0 0 24 24">
                                          <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                        </svg>
                                      )}
                                    </div>
                                    <motion.div
                                      initial={{ width: i === 0 ? "85%" : i === 1 ? "65%" : "75%" }}
                                      animate={{ width: i === 0 ? "75%" : i === 1 ? "55%" : "65%" }}
                                      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: i * 0.4 }}
                                      className={`h-2.5 ${lesson.active ? "bg-primary/30" : "bg-secondary/20"} rounded`}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Main Content Area with interactive elements */}
                    <div className="col-span-4 p-6 bg-gradient-to-br from-background/50 to-background/30">
                      <div className="flex flex-col gap-6">
                        {/* Enhanced Header with animations */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Book className="h-5 w-5 text-primary" />
                            </div>
                            <div className="space-y-1.5">
                              <motion.div
                                initial={{ width: "130px" }}
                                animate={{ width: "150px" }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                                className="h-3 bg-secondary/20 rounded"
                              />
                              <motion.div
                                initial={{ width: "80px" }}
                                animate={{ width: "100px" }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 0.2 }}
                                className="h-2.5 bg-secondary/20 rounded"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                              {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-secondary/20 flex items-center justify-center">
                                  <span className="text-xs font-medium">{String.fromCharCode(65 + i)}</span>
                                </div>
                              ))}
                            </div>
                            <div className="h-6 w-px bg-border/40"></div>
                            <div className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 flex items-center">
                              <motion.div
                                initial={{ width: "60px" }}
                                animate={{ width: "40px" }}
                                transition={{ duration: 1.7, repeat: Infinity, repeatType: "mirror", delay: 0.5 }}
                                className="h-2 bg-secondary/30 rounded"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Video Player with interactive play button and glowing effects */}
                        <div className="rounded-xl overflow-hidden border border-border/10 shadow-xl bg-black/90">
                          <div className="aspect-video relative flex items-center justify-center group">
                            {/* Video Thumbnail with gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"
                              animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                              }}
                              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            />
                            
                            {/* Enhanced play button with stronger animations */}
                            <button className="relative z-10 w-16 h-16 rounded-full bg-primary/90 hover:bg-primary shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center group">
                              <motion.div
                                animate={{ 
                                  scale: [1, 1.2, 1],
                                  opacity: [0.7, 0.4, 0.7]
                                }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="w-16 h-16 absolute rounded-full bg-primary/20"
                              />
                              <PlayCircle className="w-8 h-8 text-white ml-1" />
                            </button>

                            {/* Enhanced video controls */}
                            <div className="absolute bottom-0 inset-x-0 p-4 space-y-2">
                              {/* Progress Bar with animation */}
                              <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: "30%" }}
                                  animate={{ width: "65%" }}
                                  transition={{ duration: 8, repeat: Infinity, repeatType: "loop" }}
                                  className="h-full bg-primary rounded-full" 
                                />
                              </div>
                              
                              {/* Enhanced video controls with better contrast */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="text-sm text-white/90 font-medium px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-sm">
                                    12:34 / 24:18
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {["1x", "HD", "CC"].map((text, i) => (
                                      <div key={i} className="px-2 py-1 text-xs font-medium text-white/70 hover:text-white/90 transition-colors">
                                        {text}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {["pip", "fullscreen"].map((_, i) => (
                                    <button key={i} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors">
                                      <div className="w-4 h-4 rounded-sm bg-white/80" />
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Video Summary replaced with animated placeholder */}
                          <div className="p-5 border-t border-white/10 bg-secondary/5 backdrop-blur-sm">
                            <div className="font-medium mb-3 flex items-center gap-2">
                              <div className="w-1 h-4 rounded-full bg-primary"></div>
                              <motion.div 
                                initial={{ width: "100px" }}
                                animate={{ width: "120px" }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                                className="h-3 bg-secondary/30 rounded"
                              />
                            </div>
                            <div className="space-y-2">
                              <motion.div 
                                initial={{ width: "100%" }}
                                animate={{ width: "90%" }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: 0.2 }}
                                className="h-2 bg-secondary/20 rounded"
                              />
                              <motion.div 
                                initial={{ width: "100%" }}
                                animate={{ width: "95%" }}
                                transition={{ duration: 2.3, repeat: Infinity, repeatType: "mirror", delay: 0.4 }}
                                className="h-2 bg-secondary/20 rounded"
                              />
                              <motion.div 
                                initial={{ width: "80%" }}
                                animate={{ width: "70%" }}
                                transition={{ duration: 1.8, repeat: Infinity, repeatType: "mirror", delay: 0.6 }}
                                className="h-2 bg-secondary/20 rounded"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Interactive Quiz with animations */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-5 rounded-xl border border-border/10 shadow-lg bg-secondary/5 backdrop-blur-sm hover:bg-secondary/10 transition-colors group relative overflow-hidden">
                            {/* Animated background glow */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-30"
                              animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                              }}
                              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            />
                            
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <Sparkles className="w-4 h-4 text-primary" />
                              </div>
                              <motion.div 
                                initial={{ width: "100px" }}
                                animate={{ width: "120px" }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                                className="h-3 bg-secondary/20 rounded"
                              />
                            </div>
                            
                            <motion.div 
                              initial={{ width: "85%" }}
                              animate={{ width: "75%" }}
                              transition={{ duration: 2.5, repeat: Infinity, repeatType: "mirror", delay: 0.3 }}
                              className="h-2.5 bg-secondary/20 rounded mb-4"
                            />
                            
                            <div className="space-y-2">
                              {[
                                { selected: true },
                                { selected: false },
                                { selected: false },
                                { selected: false }
                              ].map((option, i) => (
                                <button
                                  key={i}
                                  className={`w-full flex items-center gap-3 p-3 rounded-lg border ${
                                    option.selected 
                                      ? 'border-primary/30 bg-primary/10' 
                                      : 'border-border/10 hover:border-primary/20 hover:bg-secondary/10'
                                  } transition-all duration-200`}
                                >
                                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                    option.selected 
                                      ? 'bg-primary' 
                                      : 'border-2 border-muted-foreground/30'
                                  }`}>
                                    {option.selected && (
                                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                      </svg>
                                    )}
                                  </div>
                                  <motion.div
                                    initial={{ width: i === 0 ? "120px" : i === 1 ? "140px" : i === 2 ? "100px" : "130px" }}
                                    animate={{ width: i === 0 ? "100px" : i === 1 ? "120px" : i === 2 ? "90px" : "110px" }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: i * 0.2 }}
                                    className={`h-2.5 ${option.selected ? "bg-primary/30" : "bg-secondary/20"} rounded`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          {/* Added second component for balance */}
                          <div className="p-5 rounded-xl border border-border/10 shadow-lg bg-secondary/5 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 rounded-lg bg-secondary/10">
                                <Star className="w-4 h-4 text-secondary" />
                              </div>
                              <motion.div 
                                initial={{ width: "80px" }}
                                animate={{ width: "100px" }}
                                transition={{ duration: 1.8, repeat: Infinity, repeatType: "mirror" }}
                                className="h-3 bg-secondary/20 rounded"
                              />
                            </div>
                            
                            {/* Interactive progress indicators */}
                            <div className="space-y-3 mb-3">
                              {[65, 40, 85].map((progress, i) => (
                                <div key={i} className="space-y-1">
                                  <div className="flex justify-between items-center">
                                    <motion.div
                                      initial={{ width: "60px" }}
                                      animate={{ width: "80px" }}
                                      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: i * 0.3 }}
                                      className="h-2 bg-secondary/20 rounded"
                                    />
                                    <span className="text-xs text-muted-foreground">{progress}%</span>
                                  </div>
                                  <div className="h-1.5 bg-secondary/10 rounded-full overflow-hidden">
                                    <motion.div 
                                      initial={{ width: `${progress-10}%` }}
                                      animate={{ width: `${progress}%` }}
                                      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", delay: i * 0.3 }}
                                      className={`h-full rounded-full ${
                                        i === 0 ? "bg-emerald-400" : i === 1 ? "bg-amber-400" : "bg-primary"
                                      }`}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* Interactive chart placeholder */}
                            <div className="mt-4 pt-3 border-t border-border/10">
                              <div className="flex items-end justify-between h-16 gap-1">
                                {[...Array(7)].map((_, i) => {
                                  const height = 20 + Math.random() * 50;
                                  return (
                                    <motion.div
                                      key={i}
                                      initial={{ height: 10 }}
                                      animate={{ height: height }}
                                      transition={{ 
                                        duration: 1.5 + Math.random(), 
                                        repeat: Infinity, 
                                        repeatType: "mirror", 
                                        delay: i * 0.2
                                      }}
                                      className={`w-full rounded-t ${
                                        i % 3 === 0 ? "bg-primary/40" : i % 2 === 0 ? "bg-secondary/40" : "bg-secondary/20"
                                      }`}
                                    />
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Navigation Controls */}
                        <div className="flex justify-between items-center pt-4 mt-4 border-t border-border/10">
                          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/10 transition-all opacity-50 cursor-not-allowed">
                            <ChevronLeft className="w-4 h-4" />
                            <motion.div 
                              initial={{ width: "80px" }}
                              animate={{ width: "100px" }}
                              transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                              className="h-2.5 bg-secondary/20 rounded"
                            />
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-primary hover:bg-primary/10 transition-all">
                            <motion.div 
                              initial={{ width: "100px" }}
                              animate={{ width: "120px" }}
                              transition={{ duration: 2.2, repeat: Infinity, repeatType: "mirror" }}
                              className="h-2.5 bg-primary/30 rounded"
                            />
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced animated cursor with dynamic glowing effect */}
                <motion.div
                  className="absolute w-6 h-6 bg-primary/60 rounded-full"
                  animate={{ 
                    x: [120, 400, 250, 300, 180, 350], 
                    y: [100, 240, 350, 180, 280, 150],
                    scale: [1, 1.2, 1, 1.1, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "loop", 
                    duration: 20,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-primary/30 rounded-full"
                    animate={{ scale: [1, 1.8, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </motion.div>
                
                {/* Added animated clicks to simulate user interaction */}
                {[
                  { x: 320, y: 220, delay: 4 },
                  { x: 380, y: 140, delay: 8 },
                  { x: 250, y: 300, delay: 12 },
                  { x: 150, y: 180, delay: 16 }
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-8 h-8 rounded-full bg-white/40"
                    initial={{ x: pos.x, y: pos.y, scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1, 0],
                      opacity: [0, 0.6, 0]
                    }}
                    transition={{ 
                      delay: pos.delay,
                      duration: 1, 
                      repeat: Infinity,
                      repeatDelay: 19
                    }}
                  />
                ))}
              </div>
              
              {/* Enhanced floating feature cards with better placement and styling */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-12 left-10 bg-background/90 backdrop-blur-md p-5 rounded-xl shadow-xl border border-primary/20 hover:border-primary/40 transition-colors"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
                style={{
                  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)"
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Smart Generation</h4>
                    <motion.div 
                      initial={{ width: "80px" }}
                      animate={{ width: "60px" }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                      className="h-1.5 bg-primary/20 rounded"
                    />
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, delay: 0.5, ease: "easeInOut" }}
                className="absolute top-1/3 -right-14 bg-background/90 backdrop-blur-md p-5 rounded-xl shadow-xl border border-primary/20 hover:border-primary/40 transition-colors"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
                style={{
                  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)"
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Learner Analytics</h4>
                    <motion.div 
                      initial={{ width: "70px" }}
                      animate={{ width: "90px" }}
                      transition={{ duration: 2.3, repeat: Infinity, repeatType: "mirror" }}
                      className="h-1.5 bg-primary/20 rounded"
                    />
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1, ease: "easeInOut" }}
                className="absolute -bottom-10 left-6 bg-background/90 backdrop-blur-md p-5 rounded-xl shadow-xl border border-secondary/20 hover:border-secondary/40 transition-colors"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
                style={{
                  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)"
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <PlayCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Interactive Media</h4>
                    <motion.div 
                      initial={{ width: "65px" }}
                      animate={{ width: "85px" }}
                      transition={{ duration: 1.8, repeat: Infinity, repeatType: "mirror" }}
                      className="h-1.5 bg-primary/20 rounded"
                    />
                  </div>
                </div>
              </motion.div>
              
              {/* New fourth card for better balance around the mockup */}
              <motion.div 
                animate={{ y: [0, 7, 0] }}
                transition={{ repeat: Infinity, duration: 3.2, delay: 1.5, ease: "easeInOut" }}
                className="absolute top-2/3 -left-12 bg-background/90 backdrop-blur-md p-5 rounded-xl shadow-xl border border-secondary/20 hover:border-secondary/40 transition-colors"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
                style={{
                  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1)"
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                    <Star className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Custom Quizzes</h4>
                    <motion.div 
                      initial={{ width: "75px" }}
                      animate={{ width: "55px" }}
                      transition={{ duration: 2.1, repeat: Infinity, repeatType: "mirror" }}
                      className="h-1.5 bg-primary/20 rounded"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator - Enhanced */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 md:mt-20 flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              onClick={() => {
                // Smooth scroll to the product showcase section
                document.querySelector('#product-showcase')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              <span className="text-sm text-muted-foreground mb-1 group-hover:text-primary transition-colors">Scroll to explore</span>
              <div className="w-5 h-8 border border-muted-foreground/50 group-hover:border-primary/50 rounded-full flex items-start justify-center p-1 transition-colors">
                <motion.div 
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" 
                />
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground group-hover:text-primary mt-1 transition-colors" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product Showcase with improved border */}
      <div id="product-showcase" className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none h-px w-full" />
        <ProductShowcase />
      </div>

      {/* Feature Parallax Section with improved background matching */}
      <section className="relative overflow-hidden">
        {/* Updated background styling with matching gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-primary/5 to-background" />
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-10" />
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] opacity-10" />
        
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium tracking-wider mb-6"
            style={frostedGlass}
          >
            <Lightbulb className="w-3.5 h-3.5 mr-2" />
            Advanced Capabilities
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mt-3 mb-4 text-foreground"
          >
            Transform Your Course Creation Process
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground/80 max-w-2xl mx-auto font-light"
          >
            Our platform combines cutting-edge AI technology with intuitive design to streamline your educational content development and deliver exceptional learning experiences.
          </motion.p>
        </div>
        <ParallaxFeature />
      </section>

      {/* Statistics Section - Enhanced with more professional styling and interactive elements */}
      <section className="py-24 relative overflow-hidden">
        {/* Updated background styling with subtle gradients */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-primary/5 to-background" />
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] opacity-20" />
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 mb-16"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium tracking-wider"
            style={frostedGlass}>
              <Star className="w-3.5 h-3.5 mr-2" /> 
              Quantifiable Results
            </span>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-primary/80">
              Trusted by Innovators Worldwide
            </h2>
            <p className="text-muted-foreground/80 max-w-2xl mx-auto font-light">
              Join thousands of educators and institutions who have transformed their teaching approach with CourseGenix AI technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                className="p-8 rounded-2xl shadow-lg border border-border/50 hover:border-primary/30 hover:shadow-primary/10 transition-all duration-300 group"
                style={frostedGlass}
              >
                <div className="flex flex-col items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-6 relative group-hover:bg-primary/20 transition-colors">
                    <div className="absolute inset-0 bg-primary/5 rounded-full animate-ping opacity-75" style={{ animationDuration: '3s', animationDelay: `${index * 0.5}s` }}></div>
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <motion.h3 
                    className="text-4xl md:text-5xl font-bold text-foreground mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.5 + index * 0.2, 
                      duration: 0.5, 
                      type: "spring" 
                    }}
                  >
                    <span className="text-primary">{stat.number}</span>
                  </motion.h3>
                  <p className="font-medium text-lg mb-2">{stat.label}</p>
                  <p className="text-muted-foreground text-center text-sm">{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Added decorative elements for more visual interest */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 right-8 w-24 h-24 border border-primary/10 rounded-full opacity-20"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-20 left-16 w-32 h-32 border border-secondary/10 rounded-full opacity-20"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced with professional design */}
      <section className="py-24 relative overflow-hidden">
        {/* Updated background styling with subtle gradients */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-secondary/5 via-background to-secondary/5" />
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] opacity-20" />
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] opacity-20" />
        
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center space-y-4 mb-16"
          >
            <motion.span variants={fadeInUp} className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium tracking-wider mb-6"
            style={frostedGlass}>
              <ThumbsUp className="w-3.5 h-3.5 mr-2" />
              Client Testimonials
            </motion.span>
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold text-foreground"
            >
              What Our Users Say
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-muted-foreground/80 max-w-2xl mx-auto font-light"
            >
              Discover how tech professionals and students are accelerating their skills with our AI-powered learning platform.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.2 } 
                }}
                style={frostedGlass}
                className="p-8 rounded-2xl border border-border/50 shadow-lg hover:border-secondary/30 transition-all duration-300 flex flex-col h-full"
              >
                <div className="mb-6 flex-grow">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + (index * 0.1) + (i * 0.1), duration: 0.3 }}
                        className="w-5 h-5 text-yellow-500 fill-current" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </motion.svg>
                    ))}
                  </div>
                  <div className="relative">
                    <svg className="absolute -top-2 -left-3 w-8 h-8 text-secondary/20 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-foreground mb-6 relative z-10 pl-2">{testimonial.quote}</p>
                  </div>
                </div>
                
                <div className="flex items-center pt-4 mt-auto border-t border-border/30">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-secondary/10 mr-4 border border-secondary/20">
                    {/* Generate a placeholder avatar with initials if no image is available */}
                    <div className="absolute inset-0 flex items-center justify-center text-secondary font-medium">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Floating decorative elements */}
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -left-16 top-1/3 w-32 h-32 border border-secondary/20 rounded-full hidden lg:block"
          />
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 0.3, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute -right-20 bottom-1/4 w-40 h-40 border border-secondary/20 rounded-full hidden lg:block"
          />
        </div>
      </section>

      {/* Call to Action - Enhanced with professional design */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 -z-10" />
        
        {/* Decorative elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -left-32 w-64 h-64 border border-primary/10 rounded-full opacity-30 hidden lg:block"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-48 -left-48 w-96 h-96 border border-primary/10 rounded-full opacity-20 hidden lg:block"
        />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -right-32 w-64 h-64 border border-secondary/10 rounded-full opacity-30 hidden lg:block"
        />
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              style={frostedGlass}
              className="p-8 md:p-12 rounded-2xl shadow-xl text-center space-y-8 relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full filter blur-3xl opacity-20" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/20 rounded-full filter blur-3xl opacity-20" />
              
              <motion.span 
                variants={fadeInUp} 
                className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium tracking-wider uppercase"
                style={frostedGlass}
              >
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                Start Your Journey
              </motion.span>
              
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-secondary"
              >
                Ready to Transform Your Course Creation?
              </motion.h2>
              
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-muted-foreground/80 max-w-2xl mx-auto font-light"
              >
                Join CourseGenix AI Studio today and unlock the future of education. Start building smarter, more engaging courses with the power of artificial intelligence.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp}
                className="pt-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/create">
                  <Button size="lg" className="rounded-full px-8 py-6 shadow-lg hover:shadow-primary/20 transition-all">
                    Create Your First Course <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Corporate Footer */}
      <footer className="relative py-12 border-t border-border/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-semibold">CourseGenix</div>
                <div className="text-xs text-muted-foreground">AI Learning Platform</div>
              </div>
            </div>
            
            <div className="flex items-center gap-6 mt-6 md:mt-0">
              <Link href="/gallery" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Gallery</Link>
              <Link href="/create" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Create</Link>
              <Link href="/settings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Settings</Link>
            </div>
          </div>
          
          <div className="h-px w-full bg-border/10 my-6"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <div>© {new Date().getFullYear()} CourseGenix. All rights reserved.</div>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <span>Developed by B.A.C. ADEESH PERERA</span>
              <a 
                href="https://github.com/adeeshperera/coursegenix-ai-learning-studio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                aria-label="GitHub repository"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                Open Source
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
