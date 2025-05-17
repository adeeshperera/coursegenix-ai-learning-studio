"use client";
import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "./ui/form";
import { z } from "zod";
import { createChaptersSchema } from "@/validators/course";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Plus, Trash, Book, Layers, Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import SubscriptionAction from "./SubscriptionAction";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

type Props = { isPro: boolean };
type Input = z.infer<typeof createChaptersSchema>;

const CreateCourseForm = ({ isPro }: Props) => {
	const router = useRouter();
	const { mutate: createChapters, isPending } = useMutation({
		mutationFn: async ({ title, units }: Input) => {
			const response = await axios.post("/api/course/createChapters", {
				title,
				units,
			});
			return response.data;
		},
	});

	const form = useForm<Input>({
		resolver: zodResolver(createChaptersSchema),
		defaultValues: {
			title: "",
			units: [""],
		},
	});

	const [isAlertOpen, setIsAlertOpen] = React.useState(false);
	const [isIterationDialogOpen, setIsIterationDialogOpen] = React.useState(false);
	const [formData, setFormData] = React.useState<Input | null>(null);

	function onSubmit(data: Input) {
		setFormData(data);
		setIsIterationDialogOpen(true);
	}

	const handleConfirmSubmit = () => {
		if (!formData) return;

		createChapters(formData, {
			onSuccess: ({ course_id }) => {
				toast.success("Course created successfully");
				router.push(`/create/${course_id}`);
			},
			onError: (error) => {
				console.error(error);
				toast.error("Something went wrong");
			},
		});
		setIsIterationDialogOpen(false);
	};

	const units = form.watch("units");
	const canAddUnit = units.length < 10;
	const canRemoveUnit = units.length > 1;

	const handleRemoveUnit = () => {
		if (canRemoveUnit) {
			form.setValue("units", units.slice(0, -1));
		}
		setIsAlertOpen(false);
	};

	return (
		<div className="w-full">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
					<div className="space-y-4 rounded-lg border border-secondary-foreground/10 bg-gradient-to-b from-secondary/50 to-background/50 backdrop-blur-sm p-6">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => {
								return (
									<FormItem className="flex flex-col items-start w-full space-y-4">
										<div className="flex flex-col sm:flex-row sm:items-center w-full gap-1.5 sm:gap-4">
											<FormLabel className="flex items-center text-lg sm:text-xl font-semibold tracking-tight">
												<Book className="w-5 h-5 mr-2 text-blue-500" />
												Course Title
											</FormLabel>
											<div className="text-sm text-muted-foreground">
												What do you want to learn?
											</div>
										</div>

										<div className="w-full space-y-2">
											<FormControl>
												<Input
													placeholder="e.g. Advanced React Patterns, Machine Learning Fundamentals..."
													className="transition-all text-base focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 h-12"
													{...field}
													disabled={isPending}
												/>
											</FormControl>
											<FormDescription className="flex items-center text-sm">
												<div className="text-muted-foreground/80">
													Choose a clear, specific title that describes your learning goal
													<span className="mx-1.5 text-muted-foreground/60">·</span>
													<span className="text-xs tabular-nums">
														{field.value.length}/100
													</span>
												</div>
											</FormDescription>
											<FormMessage />
										</div>
									</FormItem>
								);
							}}
						/>
					</div>

					<div className="space-y-4 rounded-lg border border-secondary-foreground/10 bg-secondary/50 p-6">
						<div className="flex items-center justify-between border-b border-secondary-foreground/10 pb-4">
								<div className="flex items-center gap-2">
								<Layers className="w-5 h-5 text-blue-500" />
								<div>
									<h3 className="text-lg font-semibold">Course Units</h3>
									<p className="text-sm text-muted-foreground">Add specific topics you want to cover</p>
								</div>
							</div>
							<span className="text-sm font-medium bg-secondary-foreground/10 px-2 py-1 rounded">
								{units.length}/10 units
							</span>
						</div>

						<AnimatePresence mode="wait">
							{units.map((_, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, height: 0, y: -10 }}
									animate={{ opacity: 1, height: "auto", y: 0 }}
									exit={{ opacity: 0, height: 0, y: -10 }}
									transition={{
										opacity: { duration: 0.2 },
										height: { duration: 0.2 },
										y: { duration: 0.2 }
									}}
									className="relative"
								>
									<FormField
										key={index}
										control={form.control}
										name={`units.${index}`}
										render={({ field }) => (
											<FormItem className="flex flex-col items-start w-full space-y-3 sm:items-center sm:flex-row sm:space-y-0 sm:space-x-4 mb-4">
												<FormLabel className="flex-[1] text-lg font-medium">
													Unit {index + 1}
												</FormLabel>
												<div className="flex-[6] space-y-2 w-full">
													<FormControl>
														<Input
															placeholder="Enter a specific subtopic or skill to learn"
															className="transition-all focus-visible:ring-2 focus-visible:ring-offset-2"
															{...field}
															disabled={isPending}
														/>
													</FormControl>
													<FormMessage className="text-sm font-medium text-destructive" />
												</div>
											</FormItem>
										)}
									/>
								</motion.div>
							))}
						</AnimatePresence>

						<div className="flex items-center gap-4 mt-6 pt-4 border-t border-secondary-foreground/10">
							<Button
								type="button"
								variant="secondary"
								className="flex-1 font-medium transition-all hover:bg-secondary-foreground/10"
								onClick={() => {
									if (canAddUnit) {
										form.setValue("units", [...units, ""]);
									}
								}}
								disabled={!canAddUnit || isPending}
							>
								<Plus className="w-4 h-4 mr-2 text-green-500" />
								Add Unit
							</Button>

							<AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
								<AlertDialogTrigger asChild>
									<Button
										type="button"
										variant="secondary"
										className="flex-1 font-medium transition-all hover:bg-secondary-foreground/10"
										disabled={!canRemoveUnit || isPending}
									>
										<Trash className="w-4 h-4 mr-2 text-red-500" />
										Remove Unit
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											<div className="flex items-center gap-2">
												<AlertTriangle className="w-5 h-5 text-yellow-500" />
												Remove Unit
											</div>
										</AlertDialogTitle>
										<AlertDialogDescription>
											{units[units.length - 1].trim() 
												? "Are you sure you want to remove the last unit? This action cannot be undone."
												: "Remove empty unit?"
											}
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction onClick={handleRemoveUnit}>
											Remove
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</div>
					</div>

					<Button
						disabled={isPending}
						type="submit"
						size="lg"
						className="w-full transition-all bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-medium"
					>
						{isPending ? (
							<>
								<Loader2 className="w-5 h-5 mr-2 animate-spin" />
								Creating Course...
							</>
						) : (
							<>
								<Lightbulb className="w-5 h-5 mr-2" />
								Generate Course
							</>
						)}
					</Button>
				</form>
			</Form>

			<AlertDialog open={isIterationDialogOpen} onOpenChange={setIsIterationDialogOpen}>
				<AlertDialogContent className="max-w-md">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-2xl flex items-center gap-2">
							<CheckCircle2 className="w-6 h-6 text-green-500" />
							Ready to Generate Course?
						</AlertDialogTitle>
						<AlertDialogDescription className="space-y-3 pt-3 text-base">
							<p>
								Your course has <span className="font-medium">{units.length} unit{units.length === 1 ? '' : 's'}</span>.
								{units.length < 10 && " You can add up to 10 units total to make it more comprehensive."}
							</p>
							<p>Would you like to:</p>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="gap-2 sm:gap-0">
						<AlertDialogCancel className="mt-2 sm:mt-0">
							Add More Units
						</AlertDialogCancel>
						<AlertDialogAction 
							onClick={handleConfirmSubmit}
							className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-medium"
						>
							Generate Now
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			{!isPro && <SubscriptionAction />}
		</div>
	);
};

export default CreateCourseForm;
