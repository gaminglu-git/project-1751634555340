'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import {
    Camera,
    Upload,
    X,
    Check,
    RotateCcw,
    Download,
    AlertCircle,
    Smartphone,
} from 'lucide-react';

interface SmartphonePhotoCaptureProps {
    onUploadSuccess?: () => void;
    maxFileSize?: number; // in bytes, default 10MB
    allowedFormats?: string[]; // default: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    compressionQuality?: number; // 0.1 to 1.0, default 0.8
}

interface CaptureMode {
    id: string;
    label: string;
    icon: React.ReactNode;
    accept: string;
    capture?: string;
}

export function SmartphonePhotoCapture({
    onUploadSuccess,
    maxFileSize = 10 * 1024 * 1024, // 10MB
    allowedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    compressionQuality = 0.8,
}: SmartphonePhotoCaptureProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [guestName, setGuestName] = useState('');
    const [message, setMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isCompressing, setIsCompressing] = useState(false);
    const [originalFileSize, setOriginalFileSize] = useState<number>(0);
    const [compressedFileSize, setCompressedFileSize] = useState<number>(0);
    const [deviceInfo, setDeviceInfo] = useState<{
        isMobile: boolean;
        hasCamera: boolean;
        userAgent: string;
    }>({ isMobile: false, hasCamera: false, userAgent: '' });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const frontCameraInputRef = useRef<HTMLInputElement>(null);
    const backCameraInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Detect device capabilities
    useEffect(() => {
        const checkDeviceCapabilities = () => {
            const userAgent = navigator.userAgent;
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                userAgent,
            );
            const hasCamera =
                'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;

            setDeviceInfo({
                isMobile,
                hasCamera,
                userAgent,
            });
        };

        checkDeviceCapabilities();
    }, []);

    const captureModes: CaptureMode[] = [
        {
            id: 'gallery',
            label: 'Galerie',
            icon: <Upload className="w-5 h-5" data-oid="7gpd_3b" />,
            accept: allowedFormats.join(','),
        },
        {
            id: 'camera-back',
            label: 'Rückkamera',
            icon: <Camera className="w-5 h-5" data-oid="c975d.x" />,
            accept: 'image/*',
            capture: 'environment',
        },
        {
            id: 'camera-front',
            label: 'Frontkamera',
            icon: <Smartphone className="w-5 h-5" data-oid="t57a19z" />,
            accept: 'image/*',
            capture: 'user',
        },
    ];

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const validateFile = (file: File): string | null => {
        // Check file type
        if (!allowedFormats.includes(file.type)) {
            return `Dateityp nicht unterstützt. Erlaubt: ${allowedFormats.map((f) => f.split('/')[1].toUpperCase()).join(', ')}`;
        }

        // Check file size
        if (file.size > maxFileSize) {
            return `Datei zu groß. Maximum: ${formatFileSize(maxFileSize)}`;
        }

        return null;
    };

    const compressImage = useCallback(
        (file: File): Promise<File> => {
            return new Promise((resolve, reject) => {
                const canvas = canvasRef.current;
                if (!canvas) {
                    resolve(file);
                    return;
                }

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    resolve(file);
                    return;
                }

                const img = new Image();
                img.onload = () => {
                    // Calculate new dimensions (max 1920x1920 for mobile optimization)
                    const maxDimension = 1920;
                    let { width, height } = img;

                    if (width > height && width > maxDimension) {
                        height = (height * maxDimension) / width;
                        width = maxDimension;
                    } else if (height > maxDimension) {
                        width = (width * maxDimension) / height;
                        height = maxDimension;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    // Draw and compress
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                const compressedFile = new File([blob], file.name, {
                                    type: file.type,
                                    lastModified: Date.now(),
                                });
                                setCompressedFileSize(compressedFile.size);
                                resolve(compressedFile);
                            } else {
                                resolve(file);
                            }
                        },
                        file.type,
                        compressionQuality,
                    );
                };

                img.onerror = () => resolve(file);
                img.src = URL.createObjectURL(file);
            });
        },
        [compressionQuality],
    );

    const handleFileSelect = async (file: File) => {
        setError(null);
        setOriginalFileSize(file.size);

        // Validate file
        const validationError = validateFile(file);
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsCompressing(true);

        try {
            // Compress image if it's large
            const processedFile = file.size > 1024 * 1024 ? await compressImage(file) : file;

            setSelectedFile(processedFile);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target?.result as string);
            };
            reader.readAsDataURL(processedFile);
        } catch (error) {
            setError('Fehler beim Verarbeiten des Bildes');
        } finally {
            setIsCompressing(false);
        }
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
        setOriginalFileSize(0);
        setCompressedFileSize(0);
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (frontCameraInputRef.current) frontCameraInputRef.current.value = '';
        if (backCameraInputRef.current) backCameraInputRef.current.value = '';
    };

    const triggerCapture = (mode: CaptureMode) => {
        switch (mode.id) {
            case 'gallery':
                fileInputRef.current?.click();
                break;
            case 'camera-back':
                backCameraInputRef.current?.click();
                break;
            case 'camera-front':
                frontCameraInputRef.current?.click();
                break;
        }
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

                // Reset success message after 5 seconds
                setTimeout(() => setUploadSuccess(false), 5000);
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
                className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 text-center"
                data-oid=":rom4e5"
            >
                <div
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    data-oid="hq42rag"
                >
                    <Check className="w-8 h-8 text-green-600" data-oid="mdthtrp" />
                </div>
                <h3
                    className="text-xl font-medium text-green-800 mb-3 wedding-title"
                    data-oid="72-u9.t"
                >
                    Foto erfolgreich hochgeladen! 📸
                </h3>
                <p className="text-green-700 mb-4" data-oid="zhba-u9">
                    Vielen Dank! Ihr wunderschönes Foto wird nach Überprüfung in unserer Galerie
                    angezeigt.
                </p>
                <button
                    onClick={() => setUploadSuccess(false)}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    data-oid="qq_qd9b"
                >
                    Weiteres Foto hinzufügen
                </button>
            </div>
        );
    }

    return (
        <div
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-orange-100 shadow-lg"
            data-oid="bco-06m"
        >
            <div className="text-center mb-6" data-oid="oi:8kco">
                <div
                    className="w-12 h-12 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-3"
                    data-oid="7iu.j-5"
                >
                    <Camera className="w-6 h-6 text-white" data-oid=".rd.h63" />
                </div>
                <h3 className="text-2xl font-medium text-gray-700 wedding-title" data-oid="oujmx35">
                    📸 Teilen Sie Ihre Momente
                </h3>
                <p className="text-gray-600 text-sm mt-2" data-oid="qw204k8">
                    Nehmen Sie ein Foto auf oder wählen Sie eines aus Ihrer Galerie
                </p>
            </div>

            {/* Device Info */}
            {deviceInfo.isMobile && (
                <div
                    className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4"
                    data-oid="0nd2226"
                >
                    <div className="flex items-center gap-2 text-blue-700" data-oid=".xkfa4a">
                        <Smartphone className="w-4 h-4" data-oid="ozmj45b" />
                        <span className="text-sm font-medium" data-oid="aggf-dq">
                            Mobiles Gerät erkannt - Kamera verfügbar!
                        </span>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" data-oid="39qe_gn">
                {/* Capture Options */}
                <div className="space-y-4" data-oid="k.5e:dr">
                    <label className="block text-sm font-medium text-gray-700" data-oid="gp4z094">
                        Foto aufnehmen oder auswählen
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" data-oid="u-5bk3x">
                        {captureModes.map((mode) => (
                            <button
                                key={mode.id}
                                type="button"
                                onClick={() => triggerCapture(mode)}
                                disabled={isCompressing}
                                className="flex flex-col items-center justify-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                data-oid="7vx35vn"
                            >
                                <div className="text-orange-500" data-oid="4x2eit2">
                                    {mode.icon}
                                </div>
                                <span
                                    className="text-sm font-medium text-gray-700"
                                    data-oid="_mai320"
                                >
                                    {mode.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Hidden file inputs */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={allowedFormats.join(',')}
                        onChange={handleFileInputChange}
                        className="hidden"
                        data-oid="tspopj9"
                    />

                    <input
                        ref={backCameraInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleFileInputChange}
                        className="hidden"
                        data-oid="xgh.nz-"
                    />

                    <input
                        ref={frontCameraInputRef}
                        type="file"
                        accept="image/*"
                        capture="user"
                        onChange={handleFileInputChange}
                        className="hidden"
                        data-oid="4u-9xa3"
                    />
                </div>

                {/* Compression Status */}
                {isCompressing && (
                    <div
                        className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                        data-oid="uzed9g4"
                    >
                        <div className="flex items-center gap-3" data-oid="0gwxm3a">
                            <div
                                className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"
                                data-oid="-mgjr:c"
                            ></div>
                            <span className="text-blue-700 font-medium" data-oid="69ovnh7">
                                Bild wird optimiert...
                            </span>
                        </div>
                    </div>
                )}

                {/* Preview */}
                {previewUrl && (
                    <div className="space-y-3" data-oid="cr14u18">
                        <div className="relative" data-oid="b6zoxuk">
                            <img
                                src={previewUrl}
                                alt="Vorschau"
                                className="w-full h-64 object-cover rounded-xl shadow-md"
                                data-oid="m9gicwq"
                            />

                            <button
                                type="button"
                                onClick={clearSelection}
                                className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                data-oid="jmd.8:8"
                            >
                                <X className="w-4 h-4" data-oid="c9:r2o9" />
                            </button>
                        </div>

                        {/* File Info */}
                        <div className="bg-gray-50 rounded-lg p-3" data-oid="9tg3c3m">
                            <div className="grid grid-cols-2 gap-4 text-sm" data-oid="m1sdk5d">
                                <div data-oid="ytiv19.">
                                    <span className="text-gray-600" data-oid="hx31o2v">
                                        Original:
                                    </span>
                                    <span className="ml-2 font-medium" data-oid="gn6i_ch">
                                        {formatFileSize(originalFileSize)}
                                    </span>
                                </div>
                                {compressedFileSize > 0 &&
                                    compressedFileSize !== originalFileSize && (
                                        <div data-oid="6tt0fiu">
                                            <span className="text-gray-600" data-oid="4ulb0m2">
                                                Optimiert:
                                            </span>
                                            <span
                                                className="ml-2 font-medium text-green-600"
                                                data-oid="g8pu9ls"
                                            >
                                                {formatFileSize(compressedFileSize)}
                                            </span>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Guest Info */}
                <div className="space-y-4" data-oid="5obyr_1">
                    <div data-oid="o:rv1t7">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-2"
                            data-oid="5845wer"
                        >
                            Ihr Name *
                        </label>
                        <input
                            type="text"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent wedding-text"
                            placeholder="Wie sollen wir Sie nennen?"
                            required
                            data-oid="rvt8j_:"
                        />
                    </div>

                    <div data-oid="bzh:0q5">
                        <label
                            className="block text-sm font-medium text-gray-700 mb-2"
                            data-oid="d65_zbw"
                        >
                            Nachricht zu diesem Foto (optional)
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent wedding-text"
                            rows={3}
                            placeholder="Erzählen Sie uns etwas zu diesem besonderen Moment..."
                            data-oid="rzrn4_:"
                        />
                    </div>
                </div>

                {/* File Format Info */}
                <div className="bg-gray-50 rounded-lg p-4" data-oid="b_yoewv">
                    <h4 className="text-sm font-medium text-gray-700 mb-2" data-oid="w6zk1id">
                        📋 Technische Informationen
                    </h4>
                    <div className="text-xs text-gray-600 space-y-1" data-oid="7dql9xq">
                        <p data-oid="apkx-in">
                            <strong data-oid="gfke6p2">Unterstützte Formate:</strong>{' '}
                            {allowedFormats.map((f) => f.split('/')[1].toUpperCase()).join(', ')}
                        </p>
                        <p data-oid="3v9w26:">
                            <strong data-oid="ebuvc47">Maximale Dateigröße:</strong>{' '}
                            {formatFileSize(maxFileSize)}
                        </p>
                        <p data-oid="03xlcuj">
                            <strong data-oid=":uwgx9b">Automatische Optimierung:</strong> Bilder
                            werden für schnelleres Laden komprimiert
                        </p>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div
                        className="bg-red-50 border border-red-200 rounded-lg p-4"
                        data-oid="7qd_e5q"
                    >
                        <div className="flex items-start gap-3" data-oid="8tpvir2">
                            <AlertCircle
                                className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                                data-oid="oc4als2"
                            />
                            <p className="text-red-700 text-sm" data-oid="r.ky-aa">
                                {error}
                            </p>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isUploading || isCompressing || !selectedFile || !guestName.trim()}
                    className="w-full bg-gradient-to-r from-orange-400 to-blue-400 text-white py-4 px-6 rounded-xl hover:from-orange-500 hover:to-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg shadow-lg"
                    data-oid="09nx0d_"
                >
                    {isUploading ? (
                        <div className="flex items-center justify-center gap-3" data-oid="5n8lrg_">
                            <div
                                className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"
                                data-oid="ffn:tvd"
                            ></div>
                            Wird hochgeladen...
                        </div>
                    ) : (
                        '📤 Foto teilen'
                    )}
                </button>
            </form>

            {/* Hidden canvas for image compression */}
            <canvas ref={canvasRef} className="hidden" data-oid="4arwo:9" />
        </div>
    );
}
