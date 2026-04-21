"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/8bit/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center text-white">
      <h1 className="text-6xl mb-4">Oops!</h1>
      <h2 className="text-2xl mb-8">Something went wrong</h2>
      <p className="mb-8 max-w-md">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Button onClick={() => reset()} variant="default">
          Try again
        </Button>
        <Button asChild variant="outline" className="text-white border-white hover:bg-white hover:text-black">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}
