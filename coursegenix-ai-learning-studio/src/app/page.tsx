"use client";

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ProductShowcase } from "@/components/ProductShowcase";
import { ParallaxFeature } from "@/components/ParallaxFeature";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 max-w-4xl mx-auto px-4"
        >
          <h1 className="text-6xl font-bold tracking-tight">
            CourseGenix AI Studio
          </h1>
          <p className="text-xl text-muted-foreground">
            Transform your learning experience with AI-powered course creation
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/create">
              <Button size="lg" className="rounded-full px-8">Get Started</Button>
            </Link>
            <Link href="/gallery">
              <Button size="lg" variant="outline" className="rounded-full px-8">Browse Courses</Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-1.5 rounded-full bg-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* Product Showcase */}
      <ProductShowcase />

      {/* Feature Parallax Section */}
      <ParallaxFeature />

      {/* Statistics Section - Apple-style numbers showcase */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { number: "10+", label: "Active Learners" },
              { number: "50+", label: "AI-Generated Courses" },
              { number: "98%", label: "Satisfaction Rate" }
            ].map(stat => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <h3 className="text-5xl font-bold">{stat.number}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-secondary/20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold">
              Start Your Learning Journey Today
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of learners transforming their education with AI
            </p>
            <Link href="/create">
              <Button size="lg" className="rounded-full px-8 animate-pulse">
                Create Your First Course
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
