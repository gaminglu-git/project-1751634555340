import localFont from 'next/font/local';
export const customHelloBellaYzApo = localFont({
    src: [
        {
            path: '../public/fonts/HelloBellaYzApoRegular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/HelloBellaYzApoRegular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/HelloBellaYzApoRegular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/HelloBellaYzApoRegular.otf',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-custom-hello-bella-yz-apo',
    display: 'swap',
    fallback: ['system-ui', 'sans-serif'],
    preload: true,
});
