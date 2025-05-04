'use client';

import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <div className="animate-fade-in">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight animate-gradient">
          Code Canvas <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Where Code Comes Alive
          </span>
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center mb-8">
          Experience the power of real-time JavaScript coding with our sleek,
          intuitive editor. Write, execute, and see your code come to life instantly –
          all in your browser. Built for developers, by developers.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/compiler">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-2 rounded-lg transform transition-all hover:scale-105">
              Start Coding Now
            </Button>
          </Link>
        </div>
      </div>
    </BackgroundLines>
  );
}
