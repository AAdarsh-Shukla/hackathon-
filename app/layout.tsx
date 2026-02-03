import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";
import { cn } from "@/lib/utils";
import { ErrorSuppressor } from "@/components/error-suppressor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrowdReview - Discover Best Local Businesses",
  description: "Community driven reviews for local businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased")} suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var originalConsoleError = console.error;
                console.error = function() {
                  var args = Array.prototype.slice.call(arguments);
                  var errorString = args.join(' ');
                  if (
                    errorString.includes('Minified React error #299') ||
                    errorString.includes('chrome-extension://') ||
                    errorString.includes('https://reactjs.org/docs/error-decoder.html?invariant=299')
                  ) {
                    return;
                  }
                  originalConsoleError.apply(console, args);
                };
                window.addEventListener('error', function(event) {
                  if (event.message && (event.message.includes('Minified React error #299') || event.filename && event.filename.includes('chrome-extension://'))) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                  }
                }, true);
              })();
            `,
          }}
        />
        <ErrorSuppressor />
        <MainNav />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
