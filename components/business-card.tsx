"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/ui/star-rating"
import { MapPin, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

interface BusinessCardProps {
    business: {
        id: string
        name: string
        category: string
        image: string | null
        address: string
        rating: number
        reviewCount: number
    }
}

export function BusinessCard({ business }: BusinessCardProps) {
    return (
        <Link href={`/business/${business.id}`} className="block h-full group">
            <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full"
            >
                <Card className="glass-card h-full overflow-hidden border-0 ring-1 ring-white/10 hover:ring-primary/50 relative">
                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 opacity-60 group-hover:opacity-80 transition-opacity duration-300 z-10" />

                    {/* Image Section */}
                    <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                        {business.image ? (
                            <Image
                                src={business.image}
                                alt={business.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full bg-secondary/50">
                                <span className="text-muted-foreground">No Image</span>
                            </div>
                        )}

                        {/* Interactive Action Icon */}
                        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                            <div className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 hover:bg-white/20">
                                <ArrowUpRight className="h-5 w-5 text-white" />
                            </div>
                        </div>

                        <div className="absolute top-4 left-4 z-20">
                            <Badge className="backdrop-blur-md bg-black/60 border-white/10 text-white font-medium hover:bg-black/80">
                                {business.category}
                            </Badge>
                        </div>
                    </div>

                    {/* Content Section */}
                    <CardHeader className="pb-2 relative z-20 -mt-20">
                        <div className="flex justify-between items-end">
                            <CardTitle className="text-2xl font-bold text-white drop-shadow-md group-hover:text-primary-foreground transition-colors">
                                {business.name}
                            </CardTitle>
                        </div>
                        <CardDescription className="flex items-center text-sm mt-1 text-gray-300 font-medium">
                            <MapPin className="mr-1.5 h-3.5 w-3.5 text-primary" />
                            <span className="line-clamp-1">{business.address}</span>
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pb-6 relative z-20">
                        <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-2">
                            <div className="flex items-center space-x-2">
                                <StarRating rating={business.rating} size={16} />
                                <span className="text-base font-bold text-white">{business.rating.toFixed(1)}</span>
                            </div>
                            <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">{business.reviewCount} Reviews</span>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </Link>
    )
}
