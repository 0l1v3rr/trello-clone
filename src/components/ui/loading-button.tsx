import React from "react";
import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingIndicator?: React.ReactNode;
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    { children, disabled, loading = false, loadingIndicator, ...props },
    ref
  ) => {
    return (
      <Button ref={ref} disabled={disabled || loading} {...props}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {loading && loadingIndicator ? loadingIndicator : children}
      </Button>
    );
  }
);
LoadingButton.displayName = "LoadingButton";

export default LoadingButton;
