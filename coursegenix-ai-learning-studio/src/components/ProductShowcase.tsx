"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Lightbulb } from "lucide-react";
import { Player } from "@remotion/player";
import { CourseDesignFlow } from "@/remotion/compositions/CourseDesignFlow";

export function ProductShowcase() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

	return (
		<motion.div
			ref={containerRef}
			className="h-screen flex items-center justify-center relative overflow-hidden"
			style={{
				opacity,
				scale,
			}}
		>
			<div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-3xl rounded-[2rem]" />

			<div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div className="space-y-6">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						className="text-4xl font-bold flex items-center gap-3"
					>
						<div>
							<Lightbulb className="w-8 h-8" />
						</div>
						AI-Powered Course Creation
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="text-xl text-muted-foreground"
					>
						Create comprehensive courses in minutes with our advanced AI
						technology. Get smart summaries, quizzes, and learning paths
						automatically generated for your content.
					</motion.p>
				</div>

				<motion.div
					initial={{ opacity: 0, x: 100 }}
					whileInView={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.4 }}
					className="relative aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 shadow-2xl border border-primary/10 flex items-center justify-center"
				>
					<Player
						component={CourseDesignFlow}
						durationInFrames={150}
						fps={30}
						compositionWidth={600}
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
				</motion.div>
			</div>
		</motion.div>
	);
}
