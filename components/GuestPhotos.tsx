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
            <div className="text-center py-8" data-oid="142sndu">
                <div
                    className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"
                    data-oid="z450_qx"
                ></div>
                <p className="text-gray-600 mt-2" data-oid="wv.7g54">
                    Fotos werden geladen...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="bg-red-50 border border-red-200 rounded-lg p-4 text-center"
                data-oid="3lpjgsd"
            >
                <p className="text-red-600" data-oid="s4ws8t2">
                    {error}
                </p>
            </div>
        );
    }

    if (photos.length === 0) {
        return (
            <div className="text-center py-8" data-oid=".nroxp6">
                <div className="text-4xl mb-4" data-oid="o1bpk:-">
                    📷
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2" data-oid="wwi.7pr">
                    Noch keine Gästefotos
                </h3>
                <p className="text-gray-600" data-oid="agdnk1n">
                    Seien Sie der Erste und teilen Sie ein Foto mit uns!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6" data-oid="-4709xw">
            <div className="text-center mb-6" data-oid="j7metwx">
                <h3
                    className="text-2xl font-medium text-gray-700 mb-2 wedding-title"
                    data-oid="l.n2lql"
                >
                    📸 Gästefotos ({photos.length})
                </h3>
                <p className="text-gray-600" data-oid="g_hpogv">
                    Wunderbare Momente, die unsere Gäste mit uns geteilt haben
                </p>
            </div>

            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                data-oid="dp4gy_5"
            >
                {photos.map((photo) => (
                    <div
                        key={photo.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                        data-oid="05k-qk9"
                    >
                        <div className="aspect-square relative" data-oid="tauo_gl">
                            <img
                                src={`/uploads/guest-photos/${photo.filename}`}
                                alt={`Foto von ${photo.guestName}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                data-oid="gxkr137"
                            />
                        </div>

                        <div className="p-4" data-oid="yr6ok4w">
                            <div className="flex items-center gap-2 mb-2" data-oid="fwzyb93">
                                <Heart className="w-4 h-4 text-red-500" data-oid="bz8516a" />
                                <span className="font-medium text-gray-700" data-oid=".l54sib">
                                    {photo.guestName}
                                </span>
                            </div>

                            {photo.message && (
                                <div className="flex items-start gap-2 mb-3" data-oid="4qterz.">
                                    <MessageCircle
                                        className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0"
                                        data-oid="e_ax_2v"
                                    />

                                    <p
                                        className="text-gray-600 text-sm leading-relaxed"
                                        data-oid="sq4kk76"
                                    >
                                        "{photo.message}"
                                    </p>
                                </div>
                            )}

                            <div
                                className="flex items-center gap-2 text-xs text-gray-500"
                                data-oid="g1tf_1x"
                            >
                                <Calendar className="w-3 h-3" data-oid=".27zlei" />
                                <span data-oid="va3sg9i">{formatDate(photo.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
