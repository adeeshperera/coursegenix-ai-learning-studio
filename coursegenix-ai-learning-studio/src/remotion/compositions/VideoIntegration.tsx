"use client";

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Video, Play, List, Youtube } from 'lucide-react';

export const VideoIntegration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const videoBoxSpring = spring({
    frame: frame % 150, // Increased from 120 to 150
    fps,
    config: { damping: 15, mass: 0.5 }
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-background/50 to-secondary/10 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-[2rem]" 
          style={{
            transform: `scale(${spring({
              frame: frame % 90, // Increased from 60 to 90
              fps,
              config: { damping: 15 }
            })})`,
            opacity: interpolate(frame % 90, [0, 45, 90], [0.5, 0.8, 0.5]) // Adjusted timing
          }}
        />

        <div className="relative">
          {/* Main video container */}
          <div 
            className="w-48 h-32 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center relative overflow-hidden"
            style={{
              transform: `scale(${videoBoxSpring})`,
            }}
          >
            <Youtube className="w-12 h-12 text-primary" 
              style={{
                transform: `scale(${spring({
                  frame: frame % 60,
                  fps,
                  config: { damping: 12 }
                })})`
              }}
            />
            
            {/* Floating icons around the video */}
            <div className="absolute -left-8 top-1/2 transform -translate-y-1/2"
              style={{
                opacity: interpolate(frame % 90, [0, 45, 90], [0, 1, 0]),
                transform: `translateX(${interpolate(frame % 90, [0, 45, 90], [-20, 0, -20])}px)`,
              }}
            >
              <Play className="w-8 h-8 text-primary/70" />
            </div>
            
            <div className="absolute -right-8 top-1/2 transform -translate-y-1/2"
              style={{
                opacity: interpolate(frame % 90, [0, 45, 90], [0, 1, 0]),
                transform: `translateX(${interpolate(frame % 90, [0, 45, 90], [20, 0, 20])}px)`,
              }}
            >
              <List className="w-8 h-8 text-primary/70" />
            </div>
            
            <div className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2"
              style={{
                opacity: interpolate(frame % 120, [0, 60, 120], [0, 1, 0]),
              }}
            >
              <Video className="w-8 h-8 text-primary/70" />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};