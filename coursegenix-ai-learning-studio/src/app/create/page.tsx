import { getAuthSession } from "@/lib/auth";
import React from "react";
import { redirect } from "next/navigation";
import { InfoIcon, Sparkles, List, BookOpen } from "lucide-react";
import CreateCourseForm from "@/components/CreateCourseForm";
import { checkSubscription } from "@/lib/subscription";

const CreatePage = async () => {
	const session = await getAuthSession();
	if (!session?.user) {
		return redirect("/gallery");
	}
	const isPro = await checkSubscription();
	return (
		<div className="flex flex-col items-start max-w-3xl px-8 mx-auto my-16 sm:px-0">
			<h1 className="self-center text-4xl font-bold text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
			CourseGenix AI Learning Studio
			</h1>
			
			<div className="w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="flex flex-col items-center p-4 rounded-lg bg-secondary/50 border border-secondary-foreground/10">
					<Sparkles className="w-8 h-8 mb-2 text-green-400" />
					<h3 className="font-medium mb-1">Smart Design</h3>
					<p className="text-sm text-center text-muted-foreground">AI-powered course structure optimization</p>
				</div>
				
				<div className="flex flex-col items-center p-4 rounded-lg bg-secondary/50 border border-secondary-foreground/10">
					<List className="w-8 h-8 mb-2 text-blue-400" />
					<h3 className="font-medium mb-1">Custom Units</h3>
					<p className="text-sm text-center text-muted-foreground">Organize content into focused learning units</p>
				</div>
				
				<div className="flex flex-col items-center p-4 rounded-lg bg-secondary/50 border border-secondary-foreground/10">
					<BookOpen className="w-8 h-8 mb-2 text-purple-400" />
					<h3 className="font-medium mb-1">Rich Content</h3>
					<p className="text-sm text-center text-muted-foreground">Auto-generated chapters and quizzes</p>
				</div>
			</div>

			<div className="flex w-full p-4 mt-8 bg-secondary/50 rounded-lg border border-secondary-foreground/10">
				<InfoIcon className="w-6 h-6 mr-3 text-blue-400 flex-shrink-0" />
				<div className="text-sm text-muted-foreground">
					<p className="font-medium text-foreground mb-1">Getting Started</p>
					Start by entering a course title - this can be any topic you want to learn about. Then, add specific units 
					to customize your learning journey. Our AI will generate a comprehensive course tailored to your needs.
				</div>
			</div>

			<div className="w-full mt-8">
				<CreateCourseForm isPro={isPro} />
			</div>
		</div>
	);
};

export default CreatePage;
