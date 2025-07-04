import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendRSVPConfirmationEmail, sendRSVPNotificationEmail } from '@/lib/email';
import { z } from 'zod';

// Validation schema
const rsvpSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    phone: z.string().optional(),
    attendance: z.enum(['yes', 'no']),
    mealPreference: z.enum(['meat', 'fish', 'vegetarian', 'vegan']).optional(),
    allergies: z.string().max(500).optional(),
    plusOne: z.boolean().default(false),
    plusOneName: z.string().optional(),
    plusOneMeal: z.enum(['meat', 'fish', 'vegetarian', 'vegan']).optional(),
    message: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate the data
        const validatedData = rsvpSchema.parse(body);

        // Additional validation for conditional fields
        if (validatedData.attendance === 'yes' && !validatedData.mealPreference) {
            return NextResponse.json(
                { error: 'Menüwahl ist erforderlich bei Teilnahme' },
                { status: 400 },
            );
        }

        if (validatedData.plusOne && (!validatedData.plusOneName || !validatedData.plusOneMeal)) {
            return NextResponse.json(
                { error: 'Name und Menüwahl für Begleitung sind erforderlich' },
                { status: 400 },
            );
        }

        // Save to database
        const rsvp = await prisma.rSVP.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                phone: validatedData.phone || null,
                attendance: validatedData.attendance,
                mealPreference: validatedData.mealPreference || null,
                allergies: validatedData.allergies || null,
                plusOne: validatedData.plusOne,
                plusOneName: validatedData.plusOneName || null,
                plusOneMeal: validatedData.plusOneMeal || null,
                message: validatedData.message || null,
            },
        });

        // Send confirmation email to guest
        const confirmationResult = await sendRSVPConfirmationEmail(validatedData);

        // Send notification email to couple
        const notificationResult = await sendRSVPNotificationEmail(validatedData);

        return NextResponse.json({
            success: true,
            message: 'RSVP erfolgreich gespeichert',
            rsvp: {
                id: rsvp.id,
                name: rsvp.name,
                attendance: rsvp.attendance,
                createdAt: rsvp.createdAt,
            },
            emailSent: confirmationResult.success,
            notificationSent: notificationResult.success,
        });
    } catch (error) {
        console.error('RSVP submission error:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Ungültige Daten', details: error.errors },
                { status: 400 },
            );
        }

        return NextResponse.json({ error: 'Interner Server-Fehler' }, { status: 500 });
    }
}

// GET endpoint to retrieve RSVPs (for admin purposes)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const adminKey = searchParams.get('key');

        // Simple admin authentication (in production, use proper auth)
        if (adminKey !== process.env.ADMIN_KEY) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const rsvps = await prisma.rSVP.findMany({
            orderBy: { createdAt: 'desc' },
        });

        // Calculate statistics
        const stats = {
            total: rsvps.length,
            attending: rsvps.filter((r) => r.attendance === 'yes').length,
            notAttending: rsvps.filter((r) => r.attendance === 'no').length,
            withPlusOne: rsvps.filter((r) => r.plusOne).length,
            totalGuests: rsvps.reduce(
                (acc, r) => acc + (r.attendance === 'yes' ? (r.plusOne ? 2 : 1) : 0),
                0,
            ),
            mealStats: {
                meat:
                    rsvps.filter((r) => r.mealPreference === 'meat').length +
                    rsvps.filter((r) => r.plusOneMeal === 'meat').length,
                fish:
                    rsvps.filter((r) => r.mealPreference === 'fish').length +
                    rsvps.filter((r) => r.plusOneMeal === 'fish').length,
                vegetarian:
                    rsvps.filter((r) => r.mealPreference === 'vegetarian').length +
                    rsvps.filter((r) => r.plusOneMeal === 'vegetarian').length,
                vegan:
                    rsvps.filter((r) => r.mealPreference === 'vegan').length +
                    rsvps.filter((r) => r.plusOneMeal === 'vegan').length,
            },
        };

        return NextResponse.json({
            rsvps,
            stats,
        });
    } catch (error) {
        console.error('Error fetching RSVPs:', error);
        return NextResponse.json({ error: 'Interner Server-Fehler' }, { status: 500 });
    }
}
