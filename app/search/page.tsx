import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BusinessCard } from "@/components/business-card";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// force dynamic
export const dynamic = 'force-dynamic'

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; q?: string }>;
}) {
    const { category: categoryFilter, q: query } = await searchParams;

    const where: any = {};
    if (categoryFilter) {
        where.category = categoryFilter;
    }
    if (query) {
        where.OR = [
            { name: { contains: query } }, // sqlite contains is simpler, casing might vary but sufficient for hackathon
            { description: { contains: query } }
        ]
    }

    const filteredBusinesses = await prisma.business.findMany({
        where,
        orderBy: { rating: 'desc' }
    });

    return (
        <div className="container py-8 mx-auto px-4">
            <div className="mb-8 space-y-4">
                <h1 className="text-3xl font-bold">
                    {categoryFilter ? `${categoryFilter} in your area` : query ? `Search results for "${query}"` : "All Businesses"}
                </h1>
                <div className="flex gap-2">
                    {["Restaurants", "Shopping", "Services"].map(cat => (
                        <Link key={cat} href={`/search?category=${cat}`}>
                            <Badge variant={categoryFilter === cat ? "default" : "secondary"} className="cursor-pointer px-4 py-1">
                                {cat}
                            </Badge>
                        </Link>
                    ))}
                    <Link href="/search">
                        <Badge variant={!categoryFilter && !query ? "default" : "secondary"} className="cursor-pointer px-4 py-1">
                            All
                        </Badge>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBusinesses.length === 0 && (
                    <div className="col-span-3 text-center py-20">
                        <p className="text-xl text-muted-foreground">No businesses found matching your criteria.</p>
                        <Link href="/search">
                            <Button variant="link" className="mt-4 text-primary">Clear Filters</Button>
                        </Link>
                    </div>
                )}
                {filteredBusinesses.map((item) => (
                    <div key={item.id} className="h-[400px]">
                        <BusinessCard business={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}
