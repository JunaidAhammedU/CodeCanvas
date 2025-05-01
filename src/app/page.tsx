'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2, Sparkle, Zap } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <header className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Code2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">CodeCanvas</span>
          </motion.div>
          <ThemeToggle />
        </header>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="my-20 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
              <Sparkle className="mr-1 h-3 w-3" /> New Release
            </span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Compile Your JS
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Write, compile, and test your code in real-time with our modern JavaScript compiler. Supporting multiple languages and instant feedback.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/compiler" className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              <span>Start Coding</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Language Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {/* JavaScript Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative rounded-xl overflow-hidden bg-card p-6 border shadow-lg"
          >
            <div className="aspect-square rounded-lg overflow-hidden mb-4">
              <img
                src="https://ellipsiseducation.com/wp-content/uploads/2023/02/javascript-736400_1280.png"
                alt="JavaScript"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">JavaScript</h3>
            <p className="text-sm text-muted-foreground">
              The language of the web. Perfect for building interactive websites and server-side applications.
            </p>
          </motion.div>

          {/* TypeScript Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative rounded-xl overflow-hidden bg-card p-6 border shadow-lg"
          >
            <div className="aspect-square rounded-lg overflow-hidden mb-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png"
                alt="TypeScript"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">TypeScript</h3>
            <p className="text-sm text-muted-foreground">
              JavaScript with syntax for types. Enhance your development with better tooling and scalability.
            </p>
          </motion.div>

          {/* Python Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative rounded-xl overflow-hidden bg-card p-6 border shadow-lg"
          >
            <div className="aspect-square rounded-lg overflow-hidden mb-4">
              <img
                src="https://blog.accredian.com/wp-content/uploads/2019/04/Python-logo.jpg"
                alt="Python"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Python</h3>
            <p className="text-sm text-muted-foreground">
              Simple yet powerful. Ideal for beginners and perfect for data science and automation.
            </p>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="flex flex-col items-center text-center p-6">
            <Zap className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-time Compilation</h3>
            <p className="text-sm text-muted-foreground">
              See your code come to life instantly with our real-time compilation engine.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <Code2 className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Multiple Languages</h3>
            <p className="text-sm text-muted-foreground">
              Support for JavaScript, TypeScript, and Python with more languages coming soon.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <Sparkle className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Modern Interface</h3>
            <p className="text-sm text-muted-foreground">
              A beautiful, intuitive interface that makes coding a joy.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
