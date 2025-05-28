"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Player } from "@remotion/player";
import { SmartCourseGeneration } from "@/remotion/compositions/SmartCourseGeneration";
import { VideoIntegration } from "@/remotion/compositions/VideoIntegration";
import { InteractiveQuizzes } from "@/remotion/compositions/InteractiveQuizzes";

export function ParallaxFeature() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

	const features = [
		{
			title: "Smart Course Generation",
			description: "Generate complete course outlines with AI assistance",
			Component: SmartCourseGeneration,
		},
		{
			title: "Video Integration",
			description: "Automatically summarize and integrate video content",
			Component: VideoIntegration,
		},
		{
			title: "Interactive Quizzes",
			description: "Test understanding with AI-generated quizzes",
			Component: InteractiveQuizzes,
		},
	];

	return (
		<div ref={containerRef} className="min-h-screen relative py-24">
			<div className="max-w-7xl mx-auto px-4">
				<motion.div
					className="sticky top-24 space-y-12"
					style={{
						opacity,
						scale,
					}}
				>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.2 }}
								className="flex flex-col gap-6"
							>
								<div className="aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 shadow-2xl border border-primary/10 flex items-center justify-center">
									<Player
										component={feature.Component}
										durationInFrames={150}
										fps={30}
										compositionWidth={400}
										compositionHeight={400}
										style={{
											width: "90%",
											height: "90%",
											borderRadius: "2rem",
										}}
										autoPlay
										loop
										acknowledgeRemotionLicense
									/>
								</div>
								<div className="space-y-2 text-center">
									<h3 className="text-xl font-semibold">{feature.title}</h3>
									<p className="text-muted-foreground">{feature.description}</p>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
}
