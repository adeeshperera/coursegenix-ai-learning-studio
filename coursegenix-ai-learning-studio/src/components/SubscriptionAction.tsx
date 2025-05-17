"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap, Info } from "lucide-react";
import axios from "axios";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { toast } from "sonner";

const SubscriptionAction = () => {
	const { data } = useSession();
	const [loading, setLoading] = React.useState(false);
	
	const handleSubscribe = async () => {
		setLoading(true);
		try {
			const response = await axios.get("/api/stripe");
			window.location.href = response.data.url;
		} catch {
			toast.error("Unable to access subscription page. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const usedCredits = 250 - (data?.user.credits || 0);
	const remainingCredits = data?.user.credits || 0;
	const usedPercentage = (usedCredits / 250) * 100;

	return (
		<div className="flex flex-col items-center w-full max-w-md p-6 mx-auto mt-4 rounded-lg border border-secondary-foreground/10 bg-secondary/50 backdrop-blur-sm">
			<div className="flex items-center justify-between w-full mb-2">
				<h3 className="text-lg font-semibold">Free Credits</h3>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Info className="w-4 h-4 text-muted-foreground" />
						</TooltipTrigger>
						<TooltipContent>
							<p>Credits are used to generate AI courses.<br />Each course costs 1 credit.</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
			
			<div className="w-full mb-3 text-sm text-muted-foreground flex justify-between">
				<span>{usedCredits} credits used</span>
				<span>{remainingCredits} remaining</span>
			</div>

			<Progress
				className="h-2 mb-4"
				value={usedPercentage}
			/>

			<Button
				disabled={loading}
				onClick={handleSubscribe}
				className="w-full font-medium text-white transition bg-gradient-to-tr from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 shadow-lg hover:shadow-xl"
			>
				{loading ? (
					"Processing..."
				) : (
					<>
						Upgrade to Pro
						<Zap className="w-4 h-4 ml-2 fill-white" />
					</>
				)}
			</Button>

			<ul className="mt-4 text-sm text-muted-foreground space-y-2">
				<li className="flex items-center">
					<Zap className="w-4 h-4 mr-2" />
					Unlimited course generation
				</li>
				<li className="flex items-center">
					<Zap className="w-4 h-4 mr-2" />
					Priority processing
				</li>
			</ul>
		</div>
	);
};

export default SubscriptionAction;
