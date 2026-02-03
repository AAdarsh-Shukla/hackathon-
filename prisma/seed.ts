import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database with PERMANENT LOCAL content...')

    // Cleanup
    const deleteReviews = prisma.review.deleteMany()
    const deleteBusinesses = prisma.business.deleteMany()
    const deleteUsers = prisma.user.deleteMany()

    await prisma.$transaction([deleteReviews, deleteBusinesses, deleteUsers])

    // Create Users
    const user = await prisma.user.create({
        data: {
            name: 'Alex Wanderer',
            email: 'alex@example.com',
            role: 'USER',
        }
    })

    const admin = await prisma.user.create({
        data: {
            name: 'System Admin',
            email: 'admin@example.com',
            role: 'ADMIN'
        }
    })

    // Using LOCAL images located in /public/images
    // This removes all upstream dependencies and 404 errors.

    const businesses = [
        // RESTAURANTS
        {
            name: "Lumière Bistro",
            description: "Experience the art of French cuisine in a setting that glows with warmth.",
            category: "Restaurants",
            rating: 4.9,
            reviewCount: 342,
            image: "/images/restaurant.jpg",
            address: "124 Rue de Paris, Arts District"
        },
        {
            name: "Sakura Omakase",
            description: "An intimate 12-seat sushi counter offering a traditional Edomae experience.",
            category: "Restaurants",
            rating: 5.0,
            reviewCount: 128,
            image: "/images/restaurant.jpg", // Reuse for consistency
            address: "88 Blossom Way, Cherry Hill"
        },
        {
            name: "The Iron Fork",
            description: "Industrial-chic gastropub serving bold flavors and craft beers.",
            category: "Restaurants",
            rating: 4.6,
            reviewCount: 567,
            image: "/images/restaurant.jpg",
            address: "42 Factory Lane, Industrial Park"
        },
        {
            name: "Verde Organic Kitchen",
            description: "Plant-based dining reimagined. Vibrant, healthy, and absolutely delicious.",
            category: "Restaurants",
            rating: 4.7,
            reviewCount: 210,
            image: "/images/restaurant.jpg",
            address: "15 Green St, Eco Village"
        },

        // SHOPPING
        {
            name: "Noir Boutique",
            description: "Avant-garde fashion and curated minimalist pieces.",
            category: "Shopping",
            rating: 4.5,
            reviewCount: 89,
            image: "/images/shopping.jpg",
            address: "505 Fifth Ave, Fashion District"
        },
        {
            name: "Analog Vinyl & Hi-Fi",
            description: "For the audiophiles. Rare records, vintage turntables, and a listening lounge.",
            category: "Shopping",
            rating: 4.9,
            reviewCount: 156,
            image: "/images/shopping.jpg",
            address: "33 RPM Road, Retro Quarter"
        },
        {
            name: "Botanic Haven",
            description: "Transform your home into a jungle. Rare house plants and pots.",
            category: "Shopping",
            rating: 4.8,
            reviewCount: 230,
            image: "/images/shopping.jpg",
            address: "77 Fern St, Greenhouse District"
        },
        {
            name: "CyberGadget",
            description: "The latest in tech, drones, and smart home automation.",
            category: "Shopping",
            rating: 4.4,
            reviewCount: 412,
            image: "/images/shopping.jpg",
            address: "101 Silicon Way, Tech Hub"
        },

        // SERVICES
        {
            name: "Elite Grooming Co.",
            description: "Precision haircuts and hot towel shaves.",
            category: "Services",
            rating: 4.7,
            reviewCount: 320,
            image: "/images/services.jpg",
            address: "22 Gentle St, Uptown"
        },
        {
            name: "Paws & Play",
            description: "Luxury pet hotel and daycare.",
            category: "Services",
            rating: 4.9,
            reviewCount: 180,
            image: "/images/services.jpg",
            address: "99 Barker Lane,Suburbia"
        },
        {
            name: "Zenith Yoga Studio",
            description: "Find your balance. Hot yoga and meditation classes.",
            category: "Services",
            rating: 4.8,
            reviewCount: 275,
            image: "/images/services.jpg",
            address: "44 Lotus Blvd, Wellness Park"
        },

        // WELLNESS
        {
            name: "Aura Spa & Wellness",
            description: "Rejuvenate your body and mind with our hydrotherapy pools.",
            category: "Wellness",
            rating: 4.6,
            reviewCount: 145,
            image: "/images/wellness.jpg",
            address: "10 Serenity Dr, Highlands"
        },
        {
            name: "Ironclad Gym",
            description: "State-of-the-art equipment and personal training.",
            category: "Wellness",
            rating: 4.5,
            reviewCount: 500,
            image: "/images/wellness.jpg",
            address: "500 Strong Ave, Downtown"
        },

        // NIGHTLIFE
        {
            name: "The Midnight Lounge",
            description: "Craft cocktails and jazz in a speakeasy atmosphere.",
            category: "Nightlife",
            rating: 4.8,
            reviewCount: 210,
            image: "/images/nightlife.jpg",
            address: "Hidden Alley, Old Town"
        },
        {
            name: "Neon Pulse",
            description: "Electronic music, rooftop views, and electric energy.",
            category: "Nightlife",
            rating: 4.3,
            reviewCount: 680,
            image: "/images/nightlife.jpg",
            address: "100 Skyline Dr, Downtown"
        }
    ]

    console.log(`Adding ${businesses.length} businesses with LOCAL images...`)

    for (const b of businesses) {
        await prisma.business.create({
            data: b
        })
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
