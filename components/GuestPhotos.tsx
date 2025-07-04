'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Calendar } from 'lucide-react';

interface GuestPhoto {
    id: string;
    filename: string;
    guestName: string;
    message?: string;
    createdAt: string;
}

export function GuestPhotos() {
    const [photos, setPhotos] = useState<GuestPhoto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPhotos = async () => {
        try {
            const response = await fetch('/api/photos');
            const data = await response.json();

            if (response.ok) {
                setPhotos(data.photos);
            } else {
                setError(data.error || 'Fehler beim Laden der Fotos');
            }
        } catch (error) {
            setError('Netzwerkfehler beim Laden der Fotos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return (
            <div className="text-center py-8" data-oid="sei8j:y">
                <div
                    className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"
                    data-oid="n12bpks"
                ></div>
                <p className="text-gray-600 mt-2" data-oid="txigk6c">
                    Fotos werden geladen...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="bg-red-50 border border-red-200 rounded-lg p-4 text-center"
                data-oid="jdkxyvr"
            >
                <p className="text-red-600" data-oid="hl0v7iz">
                    {error}
                </p>
            </div>
        );
    }

    if (photos.length === 0) {
        return (
            <div className="text-center py-8" data-oid="9kk867a">
                <div className="text-4xl mb-4" data-oid="98r8kvr">
                    📷
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2" data-oid="tkf6z.0">
                    Noch keine Gästefotos
                </h3>
                <p className="text-gray-600" data-oid="5of4:x_">
                    Seien Sie der Erste und teilen Sie ein Foto mit uns!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6" data-oid="b94q2:h">
            <div className="text-center mb-6" data-oid="-md0p4n">
                <h3
                    className="text-2xl font-medium text-gray-700 mb-2 wedding-title"
                    data-oid="ght.jlu"
                >
                    📸 Gästefotos ({photos.length})
                </h3>
                <p className="text-gray-600" data-oid="0.ydn45">
                    Wunderbare Momente, die unsere Gäste mit uns geteilt haben
                </p>
            </div>

            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                data-oid="xfn7gsq"
            >
                {photos.map((photo) => (
                    <div
                        key={photo.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        data-oid="eikm6ek"
                    >
                        <div className="aspect-square relative" data-oid="3m:ansq">
                            <img
                                src={`/uploads/guest-photos/${photo.filename}`}
                                alt={`Foto von ${photo.guestName}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                data-oid="7ahz.b-"
                            />
                        </div>

                        <div className="p-4" data-oid=".68f_01">
                            <div className="flex items-center gap-2 mb-2" data-oid="q6lprw1">
                                <Heart className="w-4 h-4 text-red-500" data-oid="_zukkig" />
                                <span className="font-medium text-gray-700" data-oid="1twmtou">
                                    {photo.guestName}
                                </span>
                            </div>

                            {photo.message && (
                                <div className="flex items-start gap-2 mb-3" data-oid="-09f:25">
                                    <MessageCircle
                                        className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"
                                        data-oid="7hvp9yd"
                                    />
                                    <p
                                        className="text-gray-600 text-sm leading-relaxed"
                                        data-oid="txbo:8i"
                                    >
                                        "{photo.message}"
                                    </p>
                                </div>
                            )}

                            <div
                                className="flex items-center gap-2 text-xs text-gray-500"
                                data-oid="fis8w3z"
                            >
                                <Calendar className="w-3 h-3" data-oid="j.bngh2" />
                                <span data-oid=":gy4i85">{formatDate(photo.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
