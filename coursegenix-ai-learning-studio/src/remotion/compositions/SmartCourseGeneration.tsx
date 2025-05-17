"use client";

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Brain, Lightbulb, Sparkles } from 'lucide-react';

export const SmartCourseGeneration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const icons = [
    { Icon: Brain, delay: 0, color: "from-blue-500/20 to-blue-600/20" },
    { Icon: Lightbulb, delay: 30, color: "from-yellow-500/20 to-yellow-600/20" },
    { Icon: Sparkles, delay: 60, color: "from-purple-500/20 to-purple-600/20" },
  ];

  return (
    <AbsoluteFill className="bg-gradient-to-br from-background/50 to-secondary/10 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[2rem]" 
          style={{
            transform: `scale(${spring({
              frame: frame % 90, // Increased from 60 to 90
              fps,
              config: { damping: 15, mass: 0.5 }
            })})`,
            opacity: interpolate(frame % 90, [0, 45, 90], [0.5, 0.8, 0.5]) // Adjusted timing
          }}
        />

        <div className="grid grid-cols-3 gap-8 p-8 relative">
          {icons.map(({ Icon, delay, color }, index) => {
            const springValue = spring({
              frame: frame - delay,
              fps,
              config: { damping: 12 },
            });

            return (
              <div
                key={index}
                style={{
                  opacity: interpolate(springValue, [0, 1], [0, 1]),
                  transform: `scale(${interpolate(springValue, [0, 1], [0.5, 1])})`,
                }}
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center relative overflow-hidden`}
              >
                <div 
                  className="absolute inset-0 bg-white/10"
                  style={{
                    transform: `scale(${spring({
                      frame: frame - (delay + 10),
                      fps,
                      config: { damping: 15 },
                    })})`,
                  }}
                />
                <Icon className="w-10 h-10 text-primary relative z-10" />
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};