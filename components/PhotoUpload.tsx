'use client';

import { useState, useRef } from 'react';
import { Camera, Upload, X, Check } from 'lucide-react';

interface PhotoUploadProps {
    onUploadSuccess?: () => void;
}

export function PhotoUpload({ onUploadSuccess }: PhotoUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [guestName, setGuestName] = useState('');
    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
        setError(null);

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const clearSelection = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (cameraInputRef.current) cameraInputRef.current.value = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFile || !guestName.trim()) {
            setError('Bitte wählen Sie ein Foto aus und geben Sie Ihren Namen ein.');
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('photo', selectedFile);
            formData.append('guestName', guestName.trim());
            if (message.trim()) {
                formData.append('message', message.trim());
            }

            const response = await fetch('/api/photos/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setUploadSuccess(true);
                setGuestName('');
                setMessage('');
                clearSelection();
                onUploadSuccess?.();

                // Reset success message after 3 seconds
                setTimeout(() => setUploadSuccess(false), 3000);
            } else {
                setError(result.error || 'Fehler beim Hochladen');
            }
        } catch (error) {
            setError('Netzwerkfehler beim Hochladen');
        } finally {
            setIsUploading(false);
        }
    };

    if (uploadSuccess) {
        return (
            <div
                className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                data-oid="8dxv67k"
            >
                <Check className="w-12 h-12 text-green-500 mx-auto mb-4" data-oid="gpu:gk." />
                <h3 className="text-lg font-medium text-green-800 mb-2" data-oid="_smrb6a">
                    Foto erfolgreich hochgeladen!
                </h3>
                <p className="text-green-600" data-oid="w1-822b">
                    Vielen Dank! Ihr Foto wird nach Überprüfung in der Galerie angezeigt.
                </p>
            </div>
        );
    }

    return (
        <div
            className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-orange-100"
            data-oid="ebkm5bh"
        >
            <h3 className="text-xl font-medium text-gray-700 mb-4 wedding-title" data-oid="870le0g">
                📸 Foto hinzufügen
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4" data-oid="as.ovby">
                {/* File Selection */}
                <div className="space-y-3" data-oid="02btlto">
                    <div className="grid grid-cols-2 gap-3" data-oid="3tvycaq">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-orange-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors"
                            data-oid="w.8w:5v"
                        >
                            <Upload className="w-5 h-5 text-orange-500" data-oid="lb:y-07" />
                            <span className="text-sm font-medium text-gray-700" data-oid="j8ufm7t">
                                Datei wählen
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => cameraInputRef.current?.click()}
                            className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
                            data-oid="td.-n4z"
                        >
                            <Camera className="w-5 h-5 text-blue-500" data-oid=":iyy9qw" />
                            <span className="text-sm font-medium text-gray-700" data-oid="_q-4dut">
                                Foto aufnehmen
                            </span>
                        </button>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                        data-oid="ckylgzd"
                    />

                    <input
                        ref={cameraInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileInputChange}
                        className="hidden"
                        data-oid="yu.ihic"
                    />
                </div>

                {/* Preview */}
                {previewUrl && (
                    <div className="relative" data-oid="63edyaz">
                        <img
                            src={previewUrl}
                            alt="Vorschau"
                            className="w-full h-48 object-cover rounded-lg"
                            data-oid="willgn2"
                        />

                        <button
                            type="button"
                            onClick={clearSelection}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            data-oid="gslojdb"
                        >
                            <X className="w-4 h-4" data-oid="tnyabc2" />
                        </button>
                    </div>
                )}

                {/* Guest Info */}
                <div className="space-y-3" data-oid="by1t3_9">
                    <div data-oid="bmb5cx.">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            data-oid="s_wtaqp"
                        >
                            Ihr Name *
                        </label>
                        <input
                            type="text"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Wie sollen wir Sie nennen?"
                            required
                            data-oid="07dcmg3"
                        />
                    </div>

                    <div data-oid="_fh0d0z">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            data-oid="3wfd.4n"
                        >
                            Nachricht (optional)
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            rows={2}
                            placeholder="Möchten Sie etwas zu diesem Foto sagen?"
                            data-oid="fv3f1hr"
                        />
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div
                        className="bg-red-50 border border-red-200 rounded-lg p-3"
                        data-oid="hcxx39w"
                    >
                        <p className="text-red-600 text-sm" data-oid="7pmvo94">
                            {error}
                        </p>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isUploading || !selectedFile || !guestName.trim()}
                    className="w-full bg-gradient-to-r from-orange-400 to-blue-400 text-white py-3 px-4 rounded-lg hover:from-orange-500 hover:to-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    data-oid="5-c-okw"
                >
                    {isUploading ? 'Wird hochgeladen...' : 'Foto hochladen'}
                </button>
            </form>
        </div>
    );
}
