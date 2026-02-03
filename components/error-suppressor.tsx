"use client";

import { useEffect } from "react";

// Patch console.error immediately when module loads
if (typeof window !== "undefined") {
    const originalConsoleError = console.error;

    console.error = function (...args) {
        const errorString = args.join(" ");

        // Filter out Minified React error #299 and extension errors
        if (
            errorString.includes("Minified React error #299") ||
            errorString.includes("chrome-extension://") ||
            errorString.includes("https://reactjs.org/docs/error-decoder.html?invariant=299")
        ) {
            return;
        }

        originalConsoleError.apply(console, args);
    };
}

export function ErrorSuppressor() {
    useEffect(() => {
        // Also handle window-level errors just in case
        const handleGlobalError = (event: ErrorEvent) => {
            if (
                event.message?.includes("Minified React error #299") ||
                event.filename?.includes("chrome-extension://")
            ) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        };

        const handleRejection = (event: PromiseRejectionEvent) => {
            if (
                event.reason?.message?.includes("Minified React error #299") ||
                String(event.reason)?.includes("chrome-extension://")
            ) {
                event.preventDefault();
            }
        };

        window.addEventListener("error", handleGlobalError);
        window.addEventListener("unhandledrejection", handleRejection);

        return () => {
            window.removeEventListener("error", handleGlobalError);
            window.removeEventListener("unhandledrejection", handleRejection);
        };
    }, []);

    return null;
}
