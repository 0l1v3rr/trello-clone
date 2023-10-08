import React from "react";
import { useFullscreen } from "@/context/fullscreen-context";
import { Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FullscreenButton = () => {
  const { fullscreenEnabled, toggleFullscreen } = useFullscreen();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={toggleFullscreen} variant="ghost" size="icon">
            {fullscreenEnabled ? <Minimize /> : <Maximize />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{fullscreenEnabled ? "Exit Fullscreen" : "Enter Fullscreen"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FullscreenButton;
