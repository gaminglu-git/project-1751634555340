export interface DeviceCapabilities {
    isMobile: boolean;
    isIOS: boolean;
    isAndroid: boolean;
    hasCamera: boolean;
    hasFileAPI: boolean;
    supportsCapture: boolean;
    userAgent: string;
    screenSize: {
        width: number;
        height: number;
    };
}

export const detectDeviceCapabilities = (): DeviceCapabilities => {
    if (typeof window === 'undefined') {
        return {
            isMobile: false,
            isIOS: false,
            isAndroid: false,
            hasCamera: false,
            hasFileAPI: false,
            supportsCapture: false,
            userAgent: '',
            screenSize: { width: 0, height: 0 },
        };
    }

    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
    );
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);

    const hasCamera = 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;
    const hasFileAPI =
        'File' in window && 'FileReader' in window && 'FileList' in window && 'Blob' in window;

    // Check if capture attribute is supported
    const supportsCapture = (() => {
        const input = document.createElement('input');
        input.type = 'file';
        return 'capture' in input;
    })();

    return {
        isMobile,
        isIOS,
        isAndroid,
        hasCamera,
        hasFileAPI,
        supportsCapture,
        userAgent,
        screenSize: {
            width: window.innerWidth,
            height: window.innerHeight,
        },
    };
};

export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getOptimalImageDimensions = (deviceCapabilities: DeviceCapabilities) => {
    const { isMobile, screenSize } = deviceCapabilities;

    if (isMobile) {
        // For mobile devices, optimize for screen size and bandwidth
        const maxDimension = Math.min(screenSize.width * 2, 1920); // 2x for retina displays
        return {
            maxWidth: maxDimension,
            maxHeight: maxDimension,
            quality: 0.8,
        };
    }

    // For desktop, allow higher quality
    return {
        maxWidth: 2560,
        maxHeight: 2560,
        quality: 0.9,
    };
};

export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
    const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
        'image/heic',
        'image/heif',
    ];
    const maxSize = 15 * 1024 * 1024; // 15MB
    const minSize = 1024; // 1KB

    if (!allowedTypes.includes(file.type.toLowerCase())) {
        return {
            valid: false,
            error: `Dateityp nicht unterstützt. Erlaubt: ${allowedTypes.map((t) => t.split('/')[1].toUpperCase()).join(', ')}`,
        };
    }

    if (file.size > maxSize) {
        return {
            valid: false,
            error: `Datei zu groß. Maximum: ${formatFileSize(maxSize)}`,
        };
    }

    if (file.size < minSize) {
        return {
            valid: false,
            error: 'Datei zu klein oder beschädigt',
        };
    }

    return { valid: true };
};
