import { Loader2 } from "lucide-react";
import React from "react";

const LoadingComponent = () => {
  return (
    <div className="flex flex-col items-start max-w-3xl mx-auto my-16 px-4 sm:px-8">
      <div className="w-full p-6 rounded-lg border border-secondary-foreground/10 bg-secondary/50 backdrop-blur-sm">
        <div className="flex items-center justify-center h-[200px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
            <p className="text-sm text-muted-foreground">Preparing your course...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
