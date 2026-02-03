import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database with premium content...')

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

    // Verified High-Quality Unsplash Images
    // Using simple formatting ?q=80&w=1200

    const businesses = [
        // RESTAURANTS
        {
            name: "Lumière Bistro",
            description: "Experience the art of French cuisine in a setting that glows with warmth. Our tasting menu changes weekly, featuring locally sourced ingredients and paired with exquisite wines.",
            category: "Restaurants",
            rating: 4.9,
            reviewCount: 342,
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200",
            address: "124 Rue de Paris, Arts District"
        },
        {
            name: "Sakura Omakase",
            description: "An intimate 12-seat sushi counter offering a traditional Edomae experience. Fish flown in daily from Toyosu Market.",
            category: "Restaurants",
            rating: 5.0,
            reviewCount: 128,
            image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1200",
            address: "88 Blossom Way, Cherry Hill"
        },
        {
            name: "The Iron Fork",
            description: "Industrial-chic gastropub serving bold flavors and craft beers. Famous for our truffle fries and wagyu burgers.",
            category: "Restaurants",
            rating: 4.6,
            reviewCount: 567,
            image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200",
            address: "42 Factory Lane, Industrial Park"
        },
        {
            name: "Verde Organic Kitchen",
            description: "Plant-based dining reimagined. Vibrant, healthy, and absolutely delicious bowls and smoothies.",
            category: "Restaurants",
            rating: 4.7,
            reviewCount: 210,
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200",
            address: "15 Green St, Eco Village"
        },

        // SHOPPING
        {
            name: "Noir Boutique",
            description: "Avant-garde fashion and curated minimalist pieces. Discover the future of style.",
            category: "Shopping",
            rating: 4.5,
            reviewCount: 89,
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200",
            address: "505 Fifth Ave, Fashion District"
        },
        {
            name: "Analog Vinyl & Hi-Fi",
            description: "For the audiophiles. Rare records, vintage turntables, and a listening lounge.",
            category: "Shopping",
            rating: 4.9,
            reviewCount: 156,
            image: "https://images.unsplash.com/photo-1532452119098-a3650b3c46d3?q=80&w=1200",
            address: "33 RPM Road, Retro Quarter"
        },
        {
            name: "Botanic Haven",
            description: "Transform your home into a jungle. Rare house plants, handmade pots, and expert advice.",
            category: "Shopping",
            rating: 4.8,
            reviewCount: 230,
            image: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=1200",
            address: "77 Fern St, Greenhouse District"
        },
        {
            name: "CyberGadget",
            description: "The latest in tech, drones, and smart home automation. Try before you buy.",
            category: "Shopping",
            rating: 4.4,
            reviewCount: 412,
            image: "https://images.unsplash.com/photo-1468495244123-6c6ef332df75?q=80&w=1200",
            address: "101 Silicon Way, Tech Hub"
        },

        // SERVICES
        {
            name: "Elite Grooming Co.",
            description: "Precision haircuts and hot towel shaves. A modern barbershop with old-school service.",
            category: "Services",
            rating: 4.7,
            reviewCount: 320,
            image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200", // NEW: Barbershop
            address: "22 Gentle St, Uptown"
        },
        {
            name: "Paws & Play",
            description: "Luxury pet hotel and daycare. Because your furry friends deserve a vacation too.",
            category: "Services",
            rating: 4.9,
            reviewCount: 180,
            image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200",
            address: "99 Barker Lane,Suburbia"
        },
        {
            name: "Zenith Yoga Studio",
            description: "Find your balance. Hot yoga, vinyasa flow, and meditation classes for all levels.",
            category: "Services",
            rating: 4.8,
            reviewCount: 275,
            image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200", // NEW: Yoga
            address: "44 Lotus Blvd, Wellness Park"
        },

        // WELLNESS
        {
            name: "Aura Spa & Wellness",
            description: "Rejuvenate your body and mind with our hydrotherapy pools and deep tissue massages.",
            category: "Wellness",
            rating: 4.6,
            reviewCount: 145,
            image: "https://images.unsplash.com/photo-1600334089648-b0d9d302427f?q=80&w=1200", // NEW: Spa
            address: "10 Serenity Dr, Highlands"
        },
        {
            name: "Ironclad Gym",
            description: "State-of-the-art equipment, personal training, and 24/7 access. Build your best self.",
            category: "Wellness",
            rating: 4.5,
            reviewCount: 500,
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200",
            address: "500 Strong Ave, Downtown"
        },

        // NIGHTLIFE
        {
            name: "The Midnight Lounge",
            description: "Craft cocktails and jazz in a speakeasy atmosphere. Dress code enforced.",
            category: "Nightlife",
            rating: 4.8,
            reviewCount: 210,
            image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200",
            address: "Hidden Alley, Old Town"
        },
        {
            name: "Neon Pulse",
            description: "Electronic music, rooftop views, and electric energy. The city's premier nightclub.",
            category: "Nightlife",
            rating: 4.3,
            reviewCount: 680,
            image: "https://images.unsplash.com/photo-1570140224673-c8209867566a?q=80&w=1200", // NEW: Nightclub (Neon) - old one 566737236500 often fails
            address: "100 Skyline Dr, Downtown"
        }
    ]

    console.log(`Adding ${businesses.length} businesses...`)

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
