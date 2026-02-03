import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPendingReviews, approveReview, rejectReview, getAdminStats } from "@/app/actions";
import { Check, X, TrendingUp, Users, Store, MessageSquare, AlertCircle } from "lucide-react";

// Force dynamic to fetch latest reviews
export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
    const [reviews, stats] = await Promise.all([
        getPendingReviews(),
        getAdminStats()
    ]);

    return (
        <div className="container mx-auto py-10 px-4 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground mt-2">Overview of platform activity and moderation.</p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="outline" className="px-3 py-1 bg-primary/10 text-primary border-primary/20">
                        Live Data
                    </Badge>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Businesses"
                    value={stats.businessCount}
                    icon={Store}
                    description="Registered venues"
                    trend="+12% this month"
                />
                <StatsCard
                    title="Active Users"
                    value={stats.userCount}
                    icon={Users}
                    description="Total community members"
                    trend="+5% this week"
                />
                <StatsCard
                    title="Total Reviews"
                    value={stats.totalReviews}
                    icon={MessageSquare}
                    description="All time submissions"
                    trend="+8% this month"
                />
                <StatsCard
                    title="Pending Action"
                    value={stats.pendingReviews}
                    icon={AlertCircle}
                    description="Reviews awaiting moderation"
                    variant="warning"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Pending Reviews */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight">Review Moderation</h2>
                        <Badge variant="secondary">{reviews.length} Pending</Badge>
                    </div>

                    {reviews.length === 0 ? (
                        <Card className="glass-card border-dashed">
                            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                                <Check className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                                <h3 className="text-lg font-medium">All caught up!</h3>
                                <p className="text-muted-foreground">No pending reviews to moderate at this time.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <Card key={review.id} className="glass-card overflow-hidden group hover:border-primary/50 transition-colors">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-lg">{review.business.name}</span>
                                                    <Badge variant="outline" className="text-xs">{review.business.category}</Badge>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <span>by {review.user.name}</span>
                                                    <span>•</span>
                                                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-md">
                                                <span className="font-bold text-yellow-500">★</span>
                                                <span className="font-medium">{review.rating}.0</span>
                                            </div>
                                        </div>

                                        <div className="bg-muted/30 p-4 rounded-lg mb-6 text-sm leading-relaxed border border-white/5">
                                            "{review.text}"
                                        </div>

                                        <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/5">
                                            <form action={async () => {
                                                'use server'
                                                await rejectReview(review.id)
                                            }}>
                                                <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                                                    <X className="mr-2 h-4 w-4" /> Reject
                                                </Button>
                                            </form>
                                            <form action={async () => {
                                                'use server'
                                                await approveReview(review.id)
                                            }}>
                                                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                                                    <Check className="mr-2 h-4 w-4" /> Approve & Publish
                                                </Button>
                                            </form>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar - Quick Breakdown */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
                    <Card className="glass-card border-none bg-gradient-to-br from-card/50 to-card/10">
                        <CardHeader>
                            <CardTitle>Review Status</CardTitle>
                            <CardDescription>Breakdown by current status</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Approved</span>
                                    <span className="font-medium">{stats.approvedReviews}</span>
                                </div>
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 transition-all duration-500"
                                        style={{ width: `${(stats.approvedReviews / (stats.totalReviews || 1)) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Rejected</span>
                                    <span className="font-medium">{stats.rejectedReviews}</span>
                                </div>
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-red-500 transition-all duration-500"
                                        style={{ width: `${(stats.rejectedReviews / (stats.totalReviews || 1)) * 100}%` }}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Pending</span>
                                    <span className="font-medium">{stats.pendingReviews}</span>
                                </div>
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-500 transition-all duration-500"
                                        style={{ width: `${(stats.pendingReviews / (stats.totalReviews || 1)) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card bg-primary/5 border-primary/10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                Insights
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Review volume is up <strong>8%</strong> compared to last week. Most active category is <strong>Restaurants</strong>.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function StatsCard({ title, value, icon: Icon, description, trend, variant = "default" }: any) {
    return (
        <Card className={`glass-card transition-all duration-300 hover:y-[-4px] hover:shadow-lg ${variant === 'warning' ? 'border-yellow-500/20 bg-yellow-500/5' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${variant === 'warning' ? 'text-yellow-500' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {(description || trend) && (
                    <p className="text-xs text-muted-foreground flex justify-between mt-1">
                        <span>{description}</span>
                        {trend && <span className="text-green-500 font-medium">{trend}</span>}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
