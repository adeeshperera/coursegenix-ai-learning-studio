"use client";

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CheckCircle2, HelpCircle, XCircle } from 'lucide-react';

export const InteractiveQuizzes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const quizItems = [
    { Icon: HelpCircle, color: "from-purple-500/20 to-purple-600/20", delay: 0 },
    { Icon: CheckCircle2, color: "from-green-500/20 to-green-600/20", delay: 30 },
    { Icon: XCircle, color: "from-red-500/20 to-red-600/20", delay: 60 }
  ];

  return (
    <AbsoluteFill className="bg-gradient-to-br from-background/50 to-secondary/10 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-[2rem]" 
          style={{
            transform: `scale(${spring({
              frame: frame % 90, // Increased from 60 to 90
              fps,
              config: { damping: 15 }
            })})`,
            opacity: interpolate(frame % 90, [0, 45, 90], [0.5, 0.8, 0.5]) // Adjusted timing
          }}
        />

        <div className="flex gap-6 items-center p-8 relative">
          {quizItems.map(({ Icon, color, delay }, index) => {
            const springValue = spring({
              frame: frame - delay,
              fps,
              config: { damping: 12 },
            });

            const pulseScale = spring({
              frame: (frame - delay) % 120, // Increased from 90 to 120
              fps,
              config: { damping: 8, mass: 0.5 },
            });

            return (
              <div
                key={index}
                style={{
                  opacity: interpolate(springValue, [0, 1], [0, 1]),
                  transform: `scale(${interpolate(springValue, [0, 1], [0.5, 1])})`,
                }}
                className="relative"
              >
                <div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center relative overflow-hidden`}
                >
                  <div 
                    className="absolute inset-0 bg-white/10"
                    style={{
                      transform: `scale(${pulseScale})`,
                    }}
                  />
                  <Icon className="w-8 h-8 text-primary relative z-10" />
                </div>
                
                {/* Connecting line between icons */}
                {index < quizItems.length - 1 && (
                  <div 
                    className="absolute top-1/2 -right-6 w-6 h-0.5 bg-primary/30"
                    style={{
                      opacity: interpolate(frame - (delay + 15), [0, 15], [0, 1]),
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};