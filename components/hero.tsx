"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Utensils, ShoppingBag, Wrench, Sparkles, MapPin } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function Hero() {
    const categories = [
        { name: "Restaurants", icon: Utensils, color: "text-orange-400", bg: "bg-orange-400/10" },
        { name: "Shopping", icon: ShoppingBag, color: "text-blue-400", bg: "bg-blue-400/10" },
        { name: "Services", icon: Wrench, color: "text-green-400", bg: "bg-green-400/10" },
    ]

    return (
        <section className="relative flex flex-col items-center justify-center min-h-[90vh] overflow-hidden pt-20">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-blob mix-blend-screen" />
                <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />
                <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-screen" />
            </div>

            <div className="z-10 text-center px-4 max-w-5xl space-y-8 relative">
                {/* Floating Elements (Decorative) */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -right-20 hidden lg:block opacity-50"
                >
                    <Sparkles className="h-12 w-12 text-yellow-300" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm border-primary/30 bg-primary/10 backdrop-blur-md text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                        <TrendingUp className="mr-2 h-3.5 w-3.5" />
                        Voted #1 Review Platform of 2026
                    </Badge>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1] text-white drop-shadow-2xl"
                >
                    Discover the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x">
                        Extraordinary
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed"
                >
                    Your curated guide to the hidden gems, local favorites, and top-rated experiences in your city.
                </motion.p>

                <motion.form
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    action="/search"
                    className="flex w-full max-w-2xl items-center mx-auto mt-10 p-2 rounded-full glass ring-1 ring-white/20 shadow-2xl relative group"
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-xl group-hover:blur-2xl transition-all duration-300 -z-10" />

                    <MapPin className="ml-4 h-5 w-5 text-muted-foreground hidden sm:block" />
                    <Input
                        name="q"
                        className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-4 text-lg h-14 placeholder:text-muted-foreground/70 text-white"
                        placeholder="Search for restaurants, spas, boutiques..."
                    />
                    <Button type="submit" size="icon" className="rounded-full h-12 w-12 shrink-0 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-lg mr-1">
                        <Search className="h-5 w-5 text-white" />
                    </Button>
                </motion.form>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-6 pt-12"
                >
                    {categories.map((cat, i) => (
                        <Link key={cat.name} href={`/search?category=${cat.name}`}>
                            <motion.div
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex flex-col items-center gap-3 p-6 rounded-3xl glass-card w-40 group cursor-pointer border border-white/5 hover:border-white/20"
                            >
                                <div className={`p-4 rounded-2xl ${cat.bg} group-hover:scale-110 transition-transform duration-300`}>
                                    <cat.icon className={`h-8 w-8 ${cat.color}`} />
                                </div>
                                <span className="text-base font-semibold text-white/90">{cat.name}</span>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </motion.div>
        </section>
    )
}
