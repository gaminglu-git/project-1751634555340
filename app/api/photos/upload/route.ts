import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const uploadSchema = z.object({
    guestName: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein'),
    message: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('photo') as File;
        const guestName = formData.get('guestName') as string;
        const message = formData.get('message') as string;

        // Validate input
        const validatedData = uploadSchema.parse({
            guestName,
            message: message || undefined,
        });

        if (!file) {
            return NextResponse.json({ error: 'Keine Datei hochgeladen' }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Nur JPEG, PNG und WebP Dateien sind erlaubt' },
                { status: 400 },
            );
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'Datei ist zu groß. Maximum 10MB erlaubt.' },
                { status: 400 },
            );
        }

        // Create uploads directory if it doesn't exist
        const uploadsDir = join(process.cwd(), 'public', 'uploads', 'guest-photos');
        try {
            await mkdir(uploadsDir, { recursive: true });
        } catch (error) {
            // Directory might already exist
        }

        // Generate unique filename
        const timestamp = Date.now();
        const fileExtension = file.name.split('.').pop();
        const filename = `guest-${timestamp}.${fileExtension}`;
        const filepath = join(uploadsDir, filename);

        // Save file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);

        // Save to database
        const guestPhoto = await prisma.guestPhoto.create({
            data: {
                filename,
                originalName: file.name,
                guestName: validatedData.guestName,
                message: validatedData.message,
                mimeType: file.type,
                size: file.size,
                approved: false, // Photos need approval before showing
            },
        });

        return NextResponse.json({
            success: true,
            message:
                'Foto erfolgreich hochgeladen! Es wird nach Überprüfung in der Galerie angezeigt.',
            photoId: guestPhoto.id,
        });
    } catch (error) {
        console.error('Upload error:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Ungültige Eingabedaten', details: error.errors },
                { status: 400 },
            );
        }

        return NextResponse.json({ error: 'Fehler beim Hochladen des Fotos' }, { status: 500 });
    }
}
