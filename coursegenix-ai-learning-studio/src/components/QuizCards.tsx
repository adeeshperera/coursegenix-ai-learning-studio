"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ChevronRight, Check, AlertCircle } from "lucide-react";
import { Chapter, Question } from "@/generated/prisma/client";

type Props = {
	chapter: Chapter & {
		questions: Question[];
	};
	onComplete?: () => void;
};

const QuizCards = ({ chapter, onComplete }: Props) => {
	const [answers, setAnswers] = React.useState<Record<string, string>>({});
	const [questionState, setQuestionState] = React.useState<Record<string, boolean | null>>({});
	const [hasCompletedQuiz, setHasCompletedQuiz] = React.useState(false);
	const [isChecking, setIsChecking] = React.useState(false);

	const totalQuestions = chapter.questions.length;
	const answeredQuestions = Object.keys(answers).length;

	const checkAnswer = React.useCallback(() => {
		setIsChecking(true);
		const newQuestionState = { ...questionState };
		let allCorrect = true;

		chapter.questions.forEach((question) => {
			const user_answer = answers[question.id];
			if (!user_answer) {
				allCorrect = false;
				return;
			}
			if (user_answer === question.answer) {
				newQuestionState[question.id] = true;
			} else {
				newQuestionState[question.id] = false;
				allCorrect = false;
			}
		});

		setQuestionState(newQuestionState);
		setTimeout(() => setIsChecking(false), 500);

		if (allCorrect && !hasCompletedQuiz) {
			setHasCompletedQuiz(true);
			onComplete?.();
		}
	}, [answers, questionState, chapter.questions, hasCompletedQuiz, onComplete]);

	const resetQuiz = React.useCallback(() => {
		setAnswers({});
		setQuestionState({});
		setHasCompletedQuiz(false);
	}, []);

	const hasIncorrectAnswers = React.useMemo(() => {
		return Object.values(questionState).some((state) => state === false);
	}, [questionState]);

	const hasAllCorrectAnswers = React.useMemo(() => {
		const checkedAnswers = Object.values(questionState);
		return checkedAnswers.length > 0 && checkedAnswers.every((state) => state === true);
	}, [questionState]);

	if (chapter.questions.length === 0) {
		return (
			<div className="flex-[1] mt-8 mx-4 md:mx-8">
				<div className="flex items-center justify-between mb-8">
					<h2 className="text-2xl font-bold">Concept Check</h2>
				</div>
				<div className="p-6 rounded-lg border bg-muted/50 text-center">
					<p className="text-sm text-muted-foreground">
						No practice questions have been generated for this chapter yet. Please check back later.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex-[1] mt-8 mx-4 md:mx-8">
			<div className="flex items-center justify-between mb-8">
				<h2 className="text-2xl font-bold">Concept Check</h2>
				<div className="flex items-center gap-2 text-sm">
					<span className="px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
						{answeredQuestions}/{totalQuestions}
					</span>
				</div>
			</div>

			<div className="relative rounded-lg border bg-card/50 backdrop-blur-sm">
				<div 
					className="space-y-8 p-6 max-h-[calc(100vh-280px)] overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent hover:scrollbar-thumb-secondary/80 transition-colors"
					style={{
						scrollBehavior: 'smooth'
					}}
				>
					{chapter.questions.map((question) => {
						const options = JSON.parse(question.options) as string[];
						const isAnswered = answers[question.id];
						const isCorrect = questionState[question.id] === true;
						const isIncorrect = questionState[question.id] === false;
						const isAnswerChecked = isCorrect || isIncorrect;

						return (
							<div
								key={question.id}
								className={cn(
									"relative p-6 rounded-lg border transition-all duration-200",
									{
										"bg-green-500/5 border-green-500/50": isCorrect,
										"bg-red-500/5 border-red-500/50": isIncorrect,
										"bg-card border-border hover:border-border/80": !isAnswered,
									}
								)}
							>
								<h3 className="text-lg font-medium leading-tight mb-4">
									{question.question}
								</h3>

								<RadioGroup
									onValueChange={(value) => {
										if (isChecking || isAnswerChecked) return;
										setAnswers((prev) => ({
											...prev,
											[question.id]: value,
										}));
										setQuestionState((prev) => ({
											...prev,
											[question.id]: null,
										}));
									}}
									value={answers[question.id] || ""}
									name={`question-${question.id}`}
									className="space-y-2"
									disabled={isChecking}
								>
									{options.map((option, index) => {
										const optionId = `question-${question.id}-option-${index}`;
										const isSelected = answers[question.id] === option;
										
										return (
											<div
												key={optionId}
												className={cn(
													"group flex items-center gap-3 p-3 rounded-md transition-all duration-200",
													{
														"hover:bg-secondary/50": !isAnswered && !isChecking,
														"bg-green-500/10 text-green-500": isCorrect && isSelected,
														"bg-red-500/10 text-red-500": isIncorrect && isSelected,
														"opacity-50": (isCorrect || isIncorrect) && !isSelected,
														"cursor-not-allowed": isChecking || isAnswerChecked,
													}
												)}
											>
												<RadioGroupItem
													value={option}
													id={optionId}
													className={cn(
														"h-4 w-4 transition-colors",
														{
															"border-green-500 text-green-500": isCorrect && isSelected,
															"border-red-500 text-red-500": isIncorrect && isSelected,
														}
													)}
													disabled={isChecking || isAnswerChecked}
												/>
												<Label 
													htmlFor={optionId}
													className={cn(
														"flex-1 select-none text-base",
														isChecking || isAnswerChecked ? "cursor-not-allowed" : "cursor-pointer"
													)}
												>
													{option}
												</Label>
												{(isCorrect || isIncorrect) && isSelected && (
													<span className="ml-auto">
														{isCorrect ? (
															<Check className="w-4 h-4 text-green-500" />
														) : (
															<AlertCircle className="w-4 h-4 text-red-500" />
														)}
													</span>
												)}
											</div>
										);
									})}
								</RadioGroup>
							</div>
						);
					})}
				</div>
			</div>

			<div className="sticky bottom-0 pt-6 pb-8 bg-gradient-to-t from-background via-background to-background/0">
				{Object.keys(questionState).length > 0 && (
					<div className="mb-4">
						{hasAllCorrectAnswers ? (
							<div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
								<p className="text-sm text-green-500 mb-4">
									Excellent work! You&apos;ve mastered this concept.
								</p>
								<Button
									variant="outline"
									onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
									className="text-sm text-green-500 border-green-500/20 hover:bg-green-500/10"
								>
									Continue to Next Video
								</Button>
							</div>
						) : hasIncorrectAnswers ? (
							<div className="p-4 rounded-lg bg-muted/50 text-center">
								<p className="text-sm text-muted-foreground mb-4">
									Watch the video lesson again and try the quiz one more time to reinforce your understanding.
								</p>
								<Button
									variant="outline"
									onClick={resetQuiz}
									className="text-sm"
								>
									Retry Quiz
								</Button>
							</div>
						) : null}
					</div>
				)}

				<Button 
					onClick={checkAnswer}
					size="lg"
					className="w-full transition-all duration-200 hover:scale-[1.01]"
					disabled={answeredQuestions < totalQuestions || isChecking}
				>
					{answeredQuestions < totalQuestions ? (
						<span>{totalQuestions - answeredQuestions} questions remaining</span>
					) : (
						<>
							{isChecking ? "Checking..." : "Check Answers"}
							{!isChecking && <ChevronRight className="w-4 h-4 ml-2" />}
						</>
					)}
				</Button>
			</div>
		</div>
	);
};

export default QuizCards;
