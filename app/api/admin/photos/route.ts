import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const photos = await prisma.guestPhoto.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json({ photos });
    } catch (error) {
        console.error('Error fetching admin photos:', error);
        return NextResponse.json({ error: 'Fehler beim Laden der Fotos' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const { photoId, approved } = await request.json();

        const updatedPhoto = await prisma.guestPhoto.update({
            where: { id: photoId },
            data: { approved },
        });

        return NextResponse.json({
            success: true,
            photo: updatedPhoto,
        });
    } catch (error) {
        console.error('Error updating photo:', error);
        return NextResponse.json({ error: 'Fehler beim Aktualisieren des Fotos' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { photoId } = await request.json();

        await prisma.guestPhoto.delete({
            where: { id: photoId },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting photo:', error);
        return NextResponse.json({ error: 'Fehler beim Löschen des Fotos' }, { status: 500 });
    }
}
