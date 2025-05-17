"use client";

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Book, Brain, Video, CheckCircle } from 'lucide-react';

export const CourseDesignFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    { icon: Book, text: "Input Course Topic", delay: 0 },
    { icon: Brain, text: "AI Processing", delay: 30 },
    { icon: Video, text: "Generate Content", delay: 60 },
    { icon: CheckCircle, text: "Course Ready", delay: 90 }
  ];

  return (
    <AbsoluteFill className="bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center rounded-3xl">
      <div className="flex gap-8 items-center p-8 relative">
        {/* Add a background transition effect */}
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl transition-all duration-1000" 
          style={{
            transform: `scale(${spring({
              frame,
              fps,
              config: { damping: 20 },
            })})`,
            opacity: interpolate(frame, [0, 30], [0, 0.5])
          }}
        />

        {steps.map((Step, index) => {
          const springValue = spring({
            frame: frame - Step.delay,
            fps,
            config: {
              damping: 12,
            },
          });

          const opacity = interpolate(
            springValue,
            [0, 1],
            [0, 1]
          );

          const scale = interpolate(
            springValue,
            [0, 1],
            [0.5, 1]
          );

          return (
            <div
              key={index}
              style={{
                opacity,
                transform: `scale(${scale})`,
              }}
              className="flex flex-col items-center gap-4 relative min-w-[120px] group"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shadow-lg backdrop-blur-sm border border-primary/20 relative overflow-hidden">
                {/* Add ripple effect */}
                <div 
                  className="absolute inset-0 bg-primary/10 rounded-full transition-transform"
                  style={{
                    transform: `scale(${spring({
                      frame: frame - (Step.delay + 10),
                      fps,
                      config: { damping: 15 },
                    })})`,
                  }}
                />
                <Step.icon className="w-8 h-8 text-primary relative z-10" />
              </div>
              <p className="text-sm font-medium text-primary text-center w-full">
                {Step.text}
              </p>
              {index < steps.length - 1 && (
                <div
                  style={{
                    opacity: spring({
                      frame: frame - (Step.delay + 15),
                      fps,
                      config: { damping: 12 },
                    }),
                  }}
                  className="absolute left-[calc(100%+0.5rem)] top-1/2 w-8 h-0.5 bg-primary/30"
                >
                  {/* Add animated dot */}
                  <div 
                    className="absolute -top-1 h-2 w-2 rounded-full bg-primary/50"
                    style={{
                      left: `${interpolate(
                        frame % 60,
                        [0, 30, 60],
                        [0, 100, 0]
                      )}%`,
                      transform: `scale(${spring({
                        frame: frame % 30,
                        fps,
                        config: { damping: 8 },
                      })})`
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};