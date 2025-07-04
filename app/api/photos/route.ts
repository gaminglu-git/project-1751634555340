import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const guestPhotos = await prisma.guestPhoto.findMany({
            where: {
                approved: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                filename: true,
                guestName: true,
                message: true,
                createdAt: true,
            },
        });

        return NextResponse.json({ photos: guestPhotos });
    } catch (error) {
        console.error('Error fetching photos:', error);
        return NextResponse.json({ error: 'Fehler beim Laden der Fotos' }, { status: 500 });
    }
}
