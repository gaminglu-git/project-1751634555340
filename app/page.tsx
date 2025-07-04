'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PhotoUpload } from '@/components/PhotoUpload';
import { GuestPhotos } from '@/components/GuestPhotos';

// Zod Schema für Validierung
const rsvpSchema = z
    .object({
        name: z
            .string()
            .min(2, 'Name muss mindestens 2 Zeichen lang sein')
            .max(50, 'Name darf maximal 50 Zeichen lang sein')
            .regex(
                /^[a-zA-ZäöüÄÖÜß\s-]+$/,
                'Name darf nur Buchstaben, Leerzeichen und Bindestriche enthalten',
            ),
        email: z
            .string()
            .email('Bitte geben Sie eine gültige E-Mail-Adresse ein')
            .min(1, 'E-Mail-Adresse ist erforderlich'),
        phone: z
            .string()
            .optional()
            .refine((val) => !val || /^[\+]?[0-9\s\-\(\)]{10,}$/.test(val), {
                message: 'Bitte geben Sie eine gültige Telefonnummer ein',
            }),
        attendance: z.enum(['yes', 'no'], {
            required_error: 'Bitte wählen Sie aus, ob Sie teilnehmen können',
        }),
        mealPreference: z.enum(['meat', 'fish', 'vegetarian', 'vegan']).optional(),
        allergies: z
            .string()
            .max(500, 'Allergieangaben dürfen maximal 500 Zeichen lang sein')
            .optional(),
        plusOne: z.boolean().default(false),
        plusOneName: z.string().optional(),
        plusOneMeal: z.enum(['meat', 'fish', 'vegetarian', 'vegan']).optional(),
        message: z.string().max(1000, 'Nachricht darf maximal 1000 Zeichen lang sein').optional(),
    })
    .refine(
        (data) => {
            // Wenn teilnehmend, muss Menüwahl getroffen werden
            if (data.attendance === 'yes' && !data.mealPreference) {
                return false;
            }
            return true;
        },
        {
            message: 'Bitte wählen Sie ein Menü aus',
            path: ['mealPreference'],
        },
    )
    .refine(
        (data) => {
            // Wenn Plus One, muss Name angegeben werden
            if (data.plusOne && (!data.plusOneName || data.plusOneName.trim().length < 2)) {
                return false;
            }
            return true;
        },
        {
            message: 'Bitte geben Sie den Namen Ihrer Begleitung ein',
            path: ['plusOneName'],
        },
    )
    .refine(
        (data) => {
            // Wenn Plus One, muss Menüwahl getroffen werden
            if (data.plusOne && !data.plusOneMeal) {
                return false;
            }
            return true;
        },
        {
            message: 'Bitte wählen Sie ein Menü für Ihre Begleitung aus',
            path: ['plusOneMeal'],
        },
    );

type RSVPFormData = z.infer<typeof rsvpSchema>;

interface RSVPData {
    name: string;
    email: string;
    phone: string;
    attendance: 'yes' | 'no' | '';
    mealPreference: 'meat' | 'fish' | 'vegetarian' | 'vegan' | '';
    allergies: string;
    plusOne: boolean;
    plusOneName: string;
    plusOneMeal: 'meat' | 'fish' | 'vegetarian' | 'vegan' | '';
    message: string;
}

export default function Page() {
    const [activeTab, setActiveTab] = useState('story');
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Countdown Logic
    useEffect(() => {
        const weddingDate = new Date('2025-09-05T15:00:00'); // 5. September 2025, 15:00 Uhr

        const updateCountdown = () => {
            const now = new Date();
            const difference = weddingDate.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        // Update countdown immediately
        updateCountdown();

        // Update countdown every second
        const interval = setInterval(updateCountdown, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const [rsvpData, setRSVPData] = useState<RSVPData>({
        name: '',
        email: '',
        phone: '',
        attendance: '',
        mealPreference: '',
        allergies: '',
        plusOne: false,
        plusOneName: '',
        plusOneMeal: '',
        message: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleRSVPSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log('RSVP Data:', rsvpData);
        setIsSubmitted(true);
    };

    const handleInputChange = (field: keyof RSVPData, value: string | boolean) => {
        setRSVPData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50"
            data-oid="d.q9704"
        >
            {/* Header */}
            <header
                className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50"
                data-oid="lqb7zt4"
            >
                <div className="max-w-6xl mx-auto px-6 py-4" data-oid="bejt.-v">
                    <nav className="flex justify-center space-x-8" data-oid="37tlxc-">
                        <button
                            onClick={() => setActiveTab('story')}
                            className={`wedding-nav px-4 py-2 rounded-full transition-all ${activeTab === 'story' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="3pgf.yu"
                        >
                            Unsere Geschichte
                        </button>
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`wedding-nav px-4 py-2 rounded-full transition-all ${activeTab === 'events' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="kk_s_z6"
                        >
                            Termine
                        </button>
                        <button
                            onClick={() => setActiveTab('location')}
                            className={`wedding-nav px-4 py-2 rounded-full transition-all ${activeTab === 'location' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="5:qpkkc"
                        >
                            Locations
                        </button>
                        <button
                            onClick={() => setActiveTab('gallery')}
                            className={`wedding-nav px-4 py-2 rounded-full transition-all ${activeTab === 'gallery' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="f6r-cqg"
                        >
                            Galerie
                        </button>
                        <button
                            onClick={() => setActiveTab('travel')}
                            className={`wedding-nav px-4 py-2 rounded-full transition-all ${activeTab === 'travel' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="j713ia7"
                        >
                            Anfahrt
                        </button>
                        <button
                            onClick={() => setActiveTab('rsvp')}
                            className={`wedding-nav px-4 py-2 rounded-full transition-all ${activeTab === 'rsvp' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="0c-d4_5"
                        >
                            RSVP
                        </button>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="text-center py-20 px-6" data-oid="jmjnt-.">
                <div className="max-w-4xl mx-auto" data-oid="gotm8-i">
                    <div className="mb-8" data-oid="35tw52k">
                        <h1
                            className="text-6xl md:text-8xl wedding-title text-orange-300 mb-4"
                            data-oid="fqhpqx_"
                        >
                            Johanna & Lukas
                        </h1>
                        <div
                            className="w-32 h-px bg-gradient-to-r from-orange-300 to-blue-300 mx-auto mb-6"
                            data-oid="4tc3jus"
                        ></div>
                        <p className="text-2xl text-gray-600 wedding-subtitle" data-oid="qg:e8.i">
                            Wir heiraten!
                        </p>

                        {/* Countdown Timer */}
                        <div className="mt-8 mb-8" data-oid="o9kno3t">
                            <p
                                className="text-lg text-gray-600 wedding-text mb-4"
                                data-oid="kr24-.6"
                            >
                                Noch bis zur großen Feier:
                            </p>
                            <div
                                className="grid grid-cols-4 gap-4 max-w-md mx-auto"
                                data-oid="pve0:e-"
                            >
                                <div
                                    className="bg-white/80 rounded-lg p-4 text-center shadow-sm"
                                    data-oid="odnlktp"
                                >
                                    <div
                                        className="text-2xl font-bold text-orange-600 wedding-title"
                                        data-oid=":3gezog"
                                    >
                                        {timeLeft.days}
                                    </div>
                                    <div
                                        className="text-sm text-gray-600 wedding-text"
                                        data-oid="scok_oc"
                                    >
                                        Tage
                                    </div>
                                </div>
                                <div
                                    className="bg-white/80 rounded-lg p-4 text-center shadow-sm"
                                    data-oid="5h505ye"
                                >
                                    <div
                                        className="text-2xl font-bold text-orange-600 wedding-title"
                                        data-oid="j:8_-5x"
                                    >
                                        {timeLeft.hours}
                                    </div>
                                    <div
                                        className="text-sm text-gray-600 wedding-text"
                                        data-oid="d-n6nsy"
                                    >
                                        Stunden
                                    </div>
                                </div>
                                <div
                                    className="bg-white/80 rounded-lg p-4 text-center shadow-sm"
                                    data-oid="hpafglt"
                                >
                                    <div
                                        className="text-2xl font-bold text-orange-600 wedding-title"
                                        data-oid="6tbcy52"
                                    >
                                        {timeLeft.minutes}
                                    </div>
                                    <div
                                        className="text-sm text-gray-600 wedding-text"
                                        data-oid="t1n7s4t"
                                    >
                                        Minuten
                                    </div>
                                </div>
                                <div
                                    className="bg-white/80 rounded-lg p-4 text-center shadow-sm"
                                    data-oid="d48_.oz"
                                >
                                    <div
                                        className="text-2xl font-bold text-orange-600 wedding-title"
                                        data-oid="lxu:.t8"
                                    >
                                        {timeLeft.seconds}
                                    </div>
                                    <div
                                        className="text-sm text-gray-600 wedding-text"
                                        data-oid="-9najme"
                                    >
                                        Sekunden
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                        data-oid="9mx7ekq"
                    >
                        <div className="grid md:grid-cols-2 gap-8" data-oid="8.ehdp4">
                            <div className="text-center" data-oid="9-1uw2w">
                                <div className="text-4xl text-orange-400 mb-2" data-oid="nyfnfm4">
                                    💒
                                </div>
                                <h3
                                    className="text-xl font-medium text-gray-700 mb-2"
                                    data-oid="w53il_8"
                                >
                                    Standesamtliche Trauung
                                </h3>
                                <p className="text-lg text-blue-600 font-medium" data-oid="gncry0y">
                                    16. August 2025
                                </p>
                                <p className="text-gray-600" data-oid="otz0tdi">
                                    Burg Brüggen
                                </p>
                            </div>
                            <div className="text-center" data-oid="4pt8xih">
                                <div className="text-4xl text-blue-400 mb-2" data-oid="a1hkiw4">
                                    🎉
                                </div>
                                <h3
                                    className="text-xl font-medium text-gray-700 mb-2"
                                    data-oid="wgd25d1"
                                >
                                    Große Feier
                                </h3>
                                <p className="text-lg text-blue-600 font-medium" data-oid="fvxa46.">
                                    5. September 2025
                                </p>
                                <p className="text-gray-600" data-oid="peturw3">
                                    Restaurant Waldau, Bonn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <main className="max-w-6xl mx-auto px-6 pb-20" data-oid="eiy9-.k">
                {activeTab === 'story' && (
                    <div
                        className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-orange-100"
                        data-oid="33:a2:p"
                    >
                        <h2
                            className="text-4xl wedding-title text-center text-gray-700 mb-12"
                            data-oid="om82g:o"
                        >
                            Unsere Liebesgeschichte
                        </h2>

                        <div className="space-y-12" data-oid="0nlkn:q">
                            <div className="flex items-center space-x-8" data-oid="w1lv8v2">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center text-2xl"
                                    data-oid="le9kmme"
                                >
                                    💕
                                </div>
                                <div data-oid="0pxu.n9">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-2"
                                        data-oid="qi2c98j"
                                    >
                                        13. Mai 2018
                                    </h3>
                                    <p
                                        className="text-lg text-gray-600 wedding-text"
                                        data-oid="a7-zo_c"
                                    >
                                        Der Tag, an dem wir uns ineinander verliebt haben
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-8" data-oid="kftgs6g">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center text-2xl"
                                    data-oid="g:f87sn"
                                >
                                    💍
                                </div>
                                <div data-oid=".r9hthy">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-2"
                                        data-oid=":k:4e85"
                                    >
                                        13. August 2024
                                    </h3>
                                    <p
                                        className="text-lg text-gray-600 wedding-text"
                                        data-oid="dcwdy:q"
                                    >
                                        Unser Verlobungstag - der Beginn unseres gemeinsamen Weges
                                        zum Altar
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-8" data-oid="jih_fhb">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-orange-300 to-blue-300 rounded-full flex items-center justify-center text-2xl"
                                    data-oid=".6g_0cr"
                                >
                                    👰‍♀️🤵‍♂️
                                </div>
                                <div data-oid="ape-_r8">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-2"
                                        data-oid="e-1dthb"
                                    >
                                        2025
                                    </h3>
                                    <p
                                        className="text-lg text-gray-600 wedding-text"
                                        data-oid="p9uk840"
                                    >
                                        Das Jahr, in dem wir Mann und Frau werden
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'events' && (
                    <div className="grid md:grid-cols-2 gap-8" data-oid="yqf4on9">
                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                            data-oid="ahkv3.j"
                        >
                            <div className="text-center mb-6" data-oid="pnq6bkl">
                                <div className="text-5xl mb-4" data-oid="pgn2s6s">
                                    💒
                                </div>
                                <h3
                                    className="text-3xl wedding-title text-gray-700 mb-2"
                                    data-oid="021f7wm"
                                >
                                    Standesamtliche Trauung
                                </h3>
                            </div>
                            <div className="space-y-4" data-oid="rpokmqc">
                                <div
                                    className="flex justify-between items-center py-2 border-b border-orange-100"
                                    data-oid="9ck5pcr"
                                >
                                    <span className="text-gray-600" data-oid="zq-23pv">
                                        Datum:
                                    </span>
                                    <span className="font-medium text-blue-600" data-oid="l6cfl8j">
                                        16. August 2025
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-orange-100"
                                    data-oid="uurjlk3"
                                >
                                    <span className="text-gray-600" data-oid="5ez1kuw">
                                        Ort:
                                    </span>
                                    <span className="font-medium" data-oid="aaxz8_5">
                                        Burg Brüggen
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-orange-100"
                                    data-oid="de5-au4"
                                >
                                    <span className="text-gray-600" data-oid="81dedgj">
                                        Adresse:
                                    </span>
                                    <span className="font-medium" data-oid="zdu0zp_">
                                        41379 Brüggen
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2"
                                    data-oid="tdnigrc"
                                >
                                    <span className="text-gray-600" data-oid="vwrvvaw">
                                        Gäste:
                                    </span>
                                    <span className="font-medium" data-oid="pqa5tgg">
                                        Engster Familienkreis
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100"
                            data-oid="59lz3c8"
                        >
                            <div className="text-center mb-6" data-oid="j.uqts0">
                                <div className="text-5xl mb-4" data-oid="4y61q0a">
                                    🎉
                                </div>
                                <h3
                                    className="text-3xl wedding-title text-gray-700 mb-2"
                                    data-oid="lip0:_y"
                                >
                                    Große Feier
                                </h3>
                            </div>
                            <div className="space-y-4" data-oid="gekr_o.">
                                <div
                                    className="flex justify-between items-center py-2 border-b border-blue-100"
                                    data-oid="0um9pj2"
                                >
                                    <span className="text-gray-600" data-oid="0mbzy1s">
                                        Datum:
                                    </span>
                                    <span className="font-medium text-blue-600" data-oid="0y2.5ng">
                                        5. September 2025
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-blue-100"
                                    data-oid="ele.mw7"
                                >
                                    <span className="text-gray-600" data-oid="kqkrwn_">
                                        Ort:
                                    </span>
                                    <span className="font-medium" data-oid="mahxkdd">
                                        Restaurant Waldau
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-blue-100"
                                    data-oid="w-x65dq"
                                >
                                    <span className="text-gray-600" data-oid="lq2zv6f">
                                        Stadt:
                                    </span>
                                    <span className="font-medium" data-oid="19xz6n5">
                                        Bonn
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2"
                                    data-oid="_n4runw"
                                >
                                    <span className="text-gray-600" data-oid="f.3-x.i">
                                        Gäste:
                                    </span>
                                    <span className="font-medium" data-oid="gddfrec">
                                        Familie & Freunde
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'location' && (
                    <div className="space-y-8" data-oid="o44_ez_">
                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                            data-oid="dq5e9n3"
                        >
                            <h3
                                className="text-3xl wedding-title text-center text-gray-700 mb-8"
                                data-oid="w7q7ecb"
                            >
                                Burg Brüggen
                            </h3>
                            <div
                                className="grid md:grid-cols-2 gap-8 items-center"
                                data-oid="irr0q5r"
                            >
                                <div data-oid="vqdwze:">
                                    <p
                                        className="text-lg text-gray-600 mb-4 wedding-text"
                                        data-oid="lm47dg9"
                                    >
                                        Unsere standesamtliche Trauung findet in der historischen
                                        Burg Brüggen statt - ein romantischer Ort voller Geschichte
                                        für den Beginn unserer gemeinsamen Zukunft.
                                    </p>
                                    <div className="space-y-2" data-oid="9hlyal-">
                                        <p className="text-gray-700" data-oid="xebngp_">
                                            <strong data-oid="p74-bt3">Adresse:</strong> 41379
                                            Brüggen
                                        </p>
                                        <p className="text-gray-700" data-oid="dsc5:-2">
                                            <strong data-oid="lkm_y8k">Datum:</strong> 16. August
                                            2025
                                        </p>
                                        <p className="text-gray-700" data-oid="6e3wan2">
                                            <strong data-oid="gx5ddzv">Gäste:</strong> Engster
                                            Familienkreis
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8 text-center"
                                    data-oid="87w9mr2"
                                >
                                    <div className="text-6xl mb-4" data-oid="n3jn53:">
                                        🏰
                                    </div>
                                    <p className="text-gray-600" data-oid="m_vprhc">
                                        Historische Burg Brüggen
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100"
                            data-oid=".a34src"
                        >
                            <h3
                                className="text-3xl wedding-title text-center text-gray-700 mb-8"
                                data-oid=":sx6j6i"
                            >
                                Restaurant Waldau
                            </h3>
                            <div
                                className="grid md:grid-cols-2 gap-8 items-center"
                                data-oid="so6o3t3"
                            >
                                <div
                                    className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 text-center"
                                    data-oid="fac0noe"
                                >
                                    <div className="text-6xl mb-4" data-oid="ahi:8tr">
                                        🌲
                                    </div>
                                    <p className="text-gray-600" data-oid="4bj_v7n">
                                        Restaurant Waldau, Bonn
                                    </p>
                                </div>
                                <div data-oid="uf6x5j.">
                                    <p
                                        className="text-lg text-gray-600 mb-4 wedding-text"
                                        data-oid="h2d9xnp"
                                    >
                                        Unsere große Feier und freie Trauung findet im wunderschönen
                                        Restaurant Waldau in Bonn statt - hier feiern wir mit all
                                        unseren Liebsten diesen besonderen Tag.
                                    </p>
                                    <div className="space-y-2" data-oid="nu2:r8y">
                                        <p className="text-gray-700" data-oid="_n0sg2p">
                                            <strong data-oid="99:7_p6">Ort:</strong> Restaurant
                                            Waldau
                                        </p>
                                        <p className="text-gray-700" data-oid="2he3g.j">
                                            <strong data-oid="n-wnm1a">Stadt:</strong> Bonn
                                        </p>
                                        <p className="text-gray-700" data-oid="n-4cev1">
                                            <strong data-oid="stfqcb3">Datum:</strong> 5. September
                                            2025
                                        </p>
                                        <p className="text-gray-700" data-oid="3p:yh-4">
                                            <strong data-oid="61q6e:6">Gäste:</strong> Familie &
                                            Freunde
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'gallery' && (
                    <div className="space-y-8" data-oid="0ed8pgr">
                        {/* Unsere Bilder */}
                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                            data-oid="lljtp8p"
                        >
                            <h2
                                className="text-4xl wedding-title text-center text-gray-700 mb-8"
                                data-oid="yexjqj5"
                            >
                                Unsere Liebesgeschichte in Bildern
                            </h2>

                            <div
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                                data-oid="28skqpx"
                            >
                                {/* Placeholder Images - Replace with your actual photos */}
                                <div
                                    className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg aspect-square flex items-center justify-center"
                                    data-oid="di5nd68"
                                >
                                    <div className="text-center" data-oid="6qm70pd">
                                        <div className="text-4xl mb-2" data-oid="g39b0qs">
                                            💕
                                        </div>
                                        <p
                                            className="text-sm text-gray-600 wedding-text"
                                            data-oid="roz4yyd"
                                        >
                                            Erstes Date
                                        </p>
                                        <p
                                            className="text-xs text-gray-500 wedding-text"
                                            data-oid="hng-ou6"
                                        >
                                            Mai 2018
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg aspect-square flex items-center justify-center"
                                    data-oid="qd6m4e-"
                                >
                                    <div className="text-center" data-oid="auy6fhs">
                                        <div className="text-4xl mb-2" data-oid="qhw:v.k">
                                            🏖️
                                        </div>
                                        <p
                                            className="text-sm text-gray-600 wedding-text"
                                            data-oid="p90txia"
                                        >
                                            Urlaub zusammen
                                        </p>
                                        <p
                                            className="text-xs text-gray-500 wedding-text"
                                            data-oid="5xg7mcr"
                                        >
                                            Sommer 2019
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="bg-gradient-to-br from-orange-200 to-blue-200 rounded-lg aspect-square flex items-center justify-center"
                                    data-oid=".92f.9r"
                                >
                                    <div className="text-center" data-oid="4je31wd">
                                        <div className="text-4xl mb-2" data-oid="oex4atz">
                                            🏠
                                        </div>
                                        <p
                                            className="text-sm text-gray-600 wedding-text"
                                            data-oid="_wwsp6s"
                                        >
                                            Zusammenziehen
                                        </p>
                                        <p
                                            className="text-xs text-gray-500 wedding-text"
                                            data-oid="9g880xq"
                                        >
                                            2020
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg aspect-square flex items-center justify-center"
                                    data-oid="nv.k:9-"
                                >
                                    <div className="text-center" data-oid="cpt4kuj">
                                        <div className="text-4xl mb-2" data-oid=":k5j9q.">
                                            💍
                                        </div>
                                        <p
                                            className="text-sm text-gray-600 wedding-text"
                                            data-oid="ha_55v3"
                                        >
                                            Verlobung
                                        </p>
                                        <p
                                            className="text-xs text-gray-500 wedding-text"
                                            data-oid="8n0l597"
                                        >
                                            August 2024
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg aspect-square flex items-center justify-center"
                                    data-oid="ygrbyp8"
                                >
                                    <div className="text-center" data-oid="hrzi93q">
                                        <div className="text-4xl mb-2" data-oid="-yddb25">
                                            📸
                                        </div>
                                        <p
                                            className="text-sm text-gray-600 wedding-text"
                                            data-oid="nom1yrk"
                                        >
                                            Engagement Shooting
                                        </p>
                                        <p
                                            className="text-xs text-gray-500 wedding-text"
                                            data-oid="tlhyn3:"
                                        >
                                            2024
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg aspect-square flex items-center justify-center"
                                    data-oid="2t-lpyr"
                                >
                                    <div className="text-center" data-oid="70y64e1">
                                        <div className="text-4xl mb-2" data-oid="w:zk_.8">
                                            🎉
                                        </div>
                                        <p
                                            className="text-sm text-gray-600 wedding-text"
                                            data-oid="vt8viq-"
                                        >
                                            Bald verheiratet!
                                        </p>
                                        <p
                                            className="text-xs text-gray-500 wedding-text"
                                            data-oid="wy13boa"
                                        >
                                            2025
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Foto Upload */}
                        <PhotoUpload
                            onUploadSuccess={() => window.location.reload()}
                            data-oid="_i1n3ny"
                        />

                        {/* Gästefotos */}
                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100"
                            data-oid="5g1znq8"
                        >
                            <GuestPhotos data-oid="n:zc2cj" />
                        </div>
                    </div>
                )}

                {activeTab === 'travel' && (
                    <div className="space-y-8" data-oid="wzer216">
                        {/* Anfahrt */}
                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                            data-oid="o3sgtn2"
                        >
                            <h2
                                className="text-4xl wedding-title text-center text-gray-700 mb-8"
                                data-oid="t-xkd1q"
                            >
                                Anfahrt & Unterkunft
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8" data-oid="_.g2t_r">
                                {/* Burg Brüggen */}
                                <div className="space-y-4" data-oid="l.ftvy9">
                                    <h3
                                        className="text-2xl wedding-title text-gray-700 mb-4"
                                        data-oid="zmy_srq"
                                    >
                                        🏰 Burg Brüggen
                                    </h3>
                                    <div className="bg-orange-50 rounded-lg p-4" data-oid="vv91ckm">
                                        <p
                                            className="font-medium wedding-label mb-2"
                                            data-oid="dvlsfn4"
                                        >
                                            Adresse:
                                        </p>
                                        <p
                                            className="wedding-text text-gray-700 mb-3"
                                            data-oid="z.a0pyw"
                                        >
                                            Burgwall 1<br data-oid="rxsmiur" />
                                            41379 Brüggen
                                        </p>

                                        <p
                                            className="font-medium wedding-label mb-2"
                                            data-oid="mi9vgvk"
                                        >
                                            Anfahrt mit dem Auto:
                                        </p>
                                        <p
                                            className="wedding-text text-gray-700 mb-3"
                                            data-oid="lba0m0r"
                                        >
                                            A61 → Ausfahrt Brüggen → Richtung Zentrum
                                        </p>

                                        <p
                                            className="font-medium wedding-label mb-2"
                                            data-oid="a0ifrec"
                                        >
                                            Parken:
                                        </p>
                                        <p
                                            className="wedding-text text-gray-700 mb-3"
                                            data-oid="8:s7xvl"
                                        >
                                            Kostenlose Parkplätze am Burgwall verfügbar
                                        </p>

                                        <button
                                            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors wedding-button"
                                            data-oid="cw6803s"
                                        >
                                            📍 In Google Maps öffnen
                                        </button>
                                    </div>
                                </div>

                                {/* Restaurant Waldau */}
                                <div className="space-y-4" data-oid=":rowsrn">
                                    <h3
                                        className="text-2xl wedding-title text-gray-700 mb-4"
                                        data-oid="s7ywpsw"
                                    >
                                        🌲 Restaurant Waldau
                                    </h3>
                                    <div className="bg-blue-50 rounded-lg p-4" data-oid="-6z:o.h">
                                        <p
                                            className="font-medium wedding-label mb-2"
                                            data-oid="0szl2m4"
                                        >
                                            Adresse:
                                        </p>
                                        <p
                                            className="wedding-text text-gray-700 mb-3"
                                            data-oid="60vky9q"
                                        >
                                            Waldaustraße 99
                                            <br data-oid="zzjanr-" />
                                            53177 Bonn
                                        </p>

                                        <p
                                            className="font-medium wedding-label mb-2"
                                            data-oid="ze_fuhi"
                                        >
                                            Anfahrt mit dem Auto:
                                        </p>
                                        <p
                                            className="wedding-text text-gray-700 mb-3"
                                            data-oid="jb0y1fu"
                                        >
                                            A565 → Ausfahrt Bonn-Hardtberg → Richtung Waldau
                                        </p>

                                        <p
                                            className="font-medium wedding-label mb-2"
                                            data-oid="bjygd97"
                                        >
                                            Öffentliche Verkehrsmittel:
                                        </p>
                                        <p
                                            className="wedding-text text-gray-700 mb-3"
                                            data-oid="6-fj8_e"
                                        >
                                            Bus 631 bis Haltestelle "Waldau"
                                        </p>

                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors wedding-button"
                                            data-oid="qhbn_qt"
                                        >
                                            📍 In Google Maps öffnen
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Unterkunft */}
                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100"
                            data-oid=":yh7y_f"
                        >
                            <h3
                                className="text-3xl wedding-title text-center text-gray-700 mb-8"
                                data-oid="jz.:nvr"
                            >
                                🏨 Unterkunft-Empfehlungen
                            </h3>

                            <div className="grid md:grid-cols-3 gap-6" data-oid="e4i6du2">
                                <div
                                    className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6"
                                    data-oid="bk5oad:"
                                >
                                    <h4
                                        className="text-xl wedding-title text-gray-700 mb-3"
                                        data-oid="f:wb6:k"
                                    >
                                        Hotel Rheinland
                                    </h4>
                                    <p
                                        className="wedding-text text-gray-600 mb-3"
                                        data-oid="2i.2.59"
                                    >
                                        Nur 5 Minuten vom Restaurant Waldau entfernt
                                    </p>
                                    <p
                                        className="text-sm wedding-text text-gray-500 mb-3"
                                        data-oid="22ugcsu"
                                    >
                                        📍 Bonn-Zentrum
                                        <br data-oid="k:fo.g8" />
                                        💰 €€ - Mittelklasse
                                        <br data-oid="6ypzl1g" />
                                        🚗 Kostenlose Parkplätze
                                    </p>
                                    <button
                                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors wedding-button text-sm"
                                        data-oid="ky-yoed"
                                    >
                                        Verfügbarkeit prüfen
                                    </button>
                                </div>

                                <div
                                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6"
                                    data-oid="vgx.lt3"
                                >
                                    <h4
                                        className="text-xl wedding-title text-gray-700 mb-3"
                                        data-oid="wjlkuuk"
                                    >
                                        Pension Waldblick
                                    </h4>
                                    <p
                                        className="wedding-text text-gray-600 mb-3"
                                        data-oid="tn3ieib"
                                    >
                                        Gemütliche Pension in der Nähe beider Locations
                                    </p>
                                    <p
                                        className="text-sm wedding-text text-gray-500 mb-3"
                                        data-oid="bwrcjxh"
                                    >
                                        📍 Zwischen Brüggen & Bonn
                                        <br data-oid="w425_g-" />
                                        💰 € - Budget-freundlich
                                        <br data-oid="ud_92dc" />
                                        🌳 Ruhige Lage
                                    </p>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors wedding-button text-sm"
                                        data-oid="q354ih2"
                                    >
                                        Verfügbarkeit prüfen
                                    </button>
                                </div>

                                <div
                                    className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6"
                                    data-oid="u0oetz-"
                                >
                                    <h4
                                        className="text-xl wedding-title text-gray-700 mb-3"
                                        data-oid="mcb-5hd"
                                    >
                                        Boutique Hotel Lux
                                    </h4>
                                    <p
                                        className="wedding-text text-gray-600 mb-3"
                                        data-oid="4_xpbfv"
                                    >
                                        Luxuriöse Unterkunft für besondere Anlässe
                                    </p>
                                    <p
                                        className="text-sm wedding-text text-gray-500 mb-3"
                                        data-oid="sk135zq"
                                    >
                                        📍 Bonn-Zentrum
                                        <br data-oid="dzz3mc_" />
                                        💰 €€€ - Premium
                                        <br data-oid="a5gmq48" />⭐ 4-Sterne Service
                                    </p>
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors wedding-button text-sm"
                                        data-oid="6f6pb_5"
                                    >
                                        Verfügbarkeit prüfen
                                    </button>
                                </div>
                            </div>

                            <div
                                className="mt-8 bg-yellow-50 rounded-lg p-6 text-center"
                                data-oid="wi-t4r4"
                            >
                                <h4
                                    className="text-lg wedding-title text-gray-700 mb-2"
                                    data-oid="62k4m7v"
                                >
                                    💡 Tipp für auswärtige Gäste
                                </h4>
                                <p className="wedding-text text-gray-600" data-oid="6pv45e0">
                                    Bucht am besten für die Nacht vom 5. auf den 6. September, damit
                                    ihr entspannt feiern könnt! Bei Fragen zur Unterkunft könnt ihr
                                    uns gerne kontaktieren.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'rsvp' && (
                    <div
                        className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                        data-oid="fvv-v06"
                    >
                        <h2
                            className="text-4xl wedding-title text-center text-gray-700 mb-8"
                            data-oid="1o..6s."
                        >
                            Gästeanmeldung
                        </h2>

                        {!isSubmitted ? (
                            <form
                                onSubmit={handleRSVPSubmit}
                                className="max-w-2xl mx-auto space-y-6"
                                data-oid="7fio-.e"
                            >
                                {/* Personal Information */}
                                <div className="space-y-4" data-oid="hr6qg1o">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-4 wedding-title"
                                        data-oid="8hbfwnp"
                                    >
                                        Persönliche Angaben
                                    </h3>

                                    <div data-oid="h-v6eji">
                                        <label
                                            className="block text-sm wedding-label text-gray-700 mb-2"
                                            data-oid="i8wkiis"
                                        >
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={rsvpData.name}
                                            onChange={(e) =>
                                                handleInputChange('name', e.target.value)
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent wedding-text"
                                            placeholder="Ihr vollständiger Name"
                                            data-oid="aflf5a-"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4" data-oid="tlvhypi">
                                        <div data-oid="2w22tjk">
                                            <label
                                                className="block text-sm wedding-label text-gray-700 mb-2"
                                                data-oid="77r2dqu"
                                            >
                                                E-Mail *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={rsvpData.email}
                                                onChange={(e) =>
                                                    handleInputChange('email', e.target.value)
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent wedding-text"
                                                placeholder="ihre.email@beispiel.de"
                                                data-oid="pc_xe__"
                                            />
                                        </div>

                                        <div data-oid="zcfc:q3">
                                            <label
                                                className="block text-sm wedding-label text-gray-700 mb-2"
                                                data-oid="esv731:"
                                            >
                                                Telefon
                                            </label>
                                            <input
                                                type="tel"
                                                value={rsvpData.phone}
                                                onChange={(e) =>
                                                    handleInputChange('phone', e.target.value)
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent wedding-text"
                                                placeholder="+49 123 456789"
                                                data-oid=":c7u2.4"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Attendance */}
                                <div className="space-y-4" data-oid="0l944ch">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-4 wedding-title"
                                        data-oid="_dk.e7q"
                                    >
                                        Teilnahme
                                    </h3>

                                    <div data-oid="jqgoax:">
                                        <label
                                            className="block text-sm wedding-label text-gray-700 mb-3"
                                            data-oid="vcmfsku"
                                        >
                                            Können Sie an unserer Hochzeit teilnehmen? *
                                        </label>
                                        <div className="flex space-x-4" data-oid=".pq02my">
                                            <label className="flex items-center" data-oid="y.e85fh">
                                                <input
                                                    type="radio"
                                                    name="attendance"
                                                    value="yes"
                                                    checked={rsvpData.attendance === 'yes'}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'attendance',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="mr-2 text-orange-500 focus:ring-orange-500"
                                                    data-oid="bq1sfjv"
                                                />

                                                <span
                                                    className="text-green-600 font-medium wedding-text"
                                                    data-oid="sgtjyn8"
                                                >
                                                    ✓ Ja, ich komme gerne!
                                                </span>
                                            </label>
                                            <label className="flex items-center" data-oid="-l.9tjt">
                                                <input
                                                    type="radio"
                                                    name="attendance"
                                                    value="no"
                                                    checked={rsvpData.attendance === 'no'}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'attendance',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="mr-2 text-orange-500 focus:ring-orange-500"
                                                    data-oid="dpljbha"
                                                />

                                                <span
                                                    className="text-red-600 font-medium wedding-text"
                                                    data-oid="ajvv9rc"
                                                >
                                                    ✗ Leider kann ich nicht
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Meal Preferences - only show if attending */}
                                {rsvpData.attendance === 'yes' && (
                                    <div className="space-y-4" data-oid=":z5psx-">
                                        <h3
                                            className="text-2xl font-medium text-gray-700 mb-4 wedding-title"
                                            data-oid="e9ylvvt"
                                        >
                                            Menüwahl
                                        </h3>

                                        <div data-oid="f0_kgg4">
                                            <label
                                                className="block text-sm wedding-label text-gray-700 mb-3"
                                                data-oid=":z03wqg"
                                            >
                                                Ihre Menüwahl *
                                            </label>
                                            <div
                                                className="grid md:grid-cols-2 gap-3"
                                                data-oid="4_f2huk"
                                            >
                                                <label
                                                    className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                    data-oid="jjrq98f"
                                                >
                                                    <input
                                                        type="radio"
                                                        name="mealPreference"
                                                        value="meat"
                                                        checked={rsvpData.mealPreference === 'meat'}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                'mealPreference',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="mr-3 text-orange-500 focus:ring-orange-500"
                                                        data-oid="h_1h:a:"
                                                    />

                                                    <div data-oid="u6g7ds:">
                                                        <div
                                                            className="font-medium wedding-text"
                                                            data-oid="dbnh8oz"
                                                        >
                                                            🥩 Fleischgericht
                                                        </div>
                                                        <div
                                                            className="text-sm text-gray-600 wedding-text"
                                                            data-oid="68gb7om"
                                                        >
                                                            Rinderfilet mit Beilagen
                                                        </div>
                                                    </div>
                                                </label>

                                                <label
                                                    className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                    data-oid="orcbdhj"
                                                >
                                                    <input
                                                        type="radio"
                                                        name="mealPreference"
                                                        value="fish"
                                                        checked={rsvpData.mealPreference === 'fish'}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                'mealPreference',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="mr-3 text-orange-500 focus:ring-orange-500"
                                                        data-oid="p6dkxce"
                                                    />

                                                    <div data-oid="7ql:27n">
                                                        <div
                                                            className="font-medium wedding-text"
                                                            data-oid="lgvpwlj"
                                                        >
                                                            🐟 Fischgericht
                                                        </div>
                                                        <div
                                                            className="text-sm text-gray-600 wedding-text"
                                                            data-oid="n8r:jj8"
                                                        >
                                                            Lachsfilet mit Gemüse
                                                        </div>
                                                    </div>
                                                </label>

                                                <label
                                                    className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                    data-oid="_pd358r"
                                                >
                                                    <input
                                                        type="radio"
                                                        name="mealPreference"
                                                        value="vegetarian"
                                                        checked={
                                                            rsvpData.mealPreference === 'vegetarian'
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                'mealPreference',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="mr-3 text-orange-500 focus:ring-orange-500"
                                                        data-oid="56muz7w"
                                                    />

                                                    <div data-oid="jlx532u">
                                                        <div
                                                            className="font-medium wedding-text"
                                                            data-oid="y3vv15i"
                                                        >
                                                            🥬 Vegetarisch
                                                        </div>
                                                        <div
                                                            className="text-sm text-gray-600 wedding-text"
                                                            data-oid="93ywu2i"
                                                        >
                                                            Gemüse-Risotto
                                                        </div>
                                                    </div>
                                                </label>

                                                <label
                                                    className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                    data-oid="o.c91yx"
                                                >
                                                    <input
                                                        type="radio"
                                                        name="mealPreference"
                                                        value="vegan"
                                                        checked={
                                                            rsvpData.mealPreference === 'vegan'
                                                        }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                'mealPreference',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="mr-3 text-orange-500 focus:ring-orange-500"
                                                        data-oid="t2ct66q"
                                                    />

                                                    <div data-oid="k9b.9qs">
                                                        <div
                                                            className="font-medium wedding-text"
                                                            data-oid="z-z3jwc"
                                                        >
                                                            🌱 Vegan
                                                        </div>
                                                        <div
                                                            className="text-sm text-gray-600 wedding-text"
                                                            data-oid="wkpyq3j"
                                                        >
                                                            Quinoa-Bowl
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        <div data-oid="on0ojoy">
                                            <label
                                                className="block text-sm wedding-label text-gray-700 mb-2"
                                                data-oid="zq.vfjt"
                                            >
                                                Allergien oder besondere Ernährungswünsche
                                            </label>
                                            <textarea
                                                value={rsvpData.allergies}
                                                onChange={(e) =>
                                                    handleInputChange('allergies', e.target.value)
                                                }
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent wedding-text"
                                                rows={3}
                                                placeholder="Bitte teilen Sie uns mit, wenn Sie Allergien haben oder besondere Ernährungswünsche..."
                                                data-oid="oxl6a3a"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Plus One - only show if attending */}
                                {rsvpData.attendance === 'yes' && (
                                    <div className="space-y-4" data-oid="1j2k-vh">
                                        <h3
                                            className="text-2xl font-medium text-gray-700 mb-4 wedding-title"
                                            data-oid="5j1ghhj"
                                        >
                                            Begleitung
                                        </h3>

                                        <div data-oid="w45_-z2">
                                            <label className="flex items-center" data-oid="gi70sv7">
                                                <input
                                                    type="checkbox"
                                                    checked={rsvpData.plusOne}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            'plusOne',
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className="mr-3 text-orange-500 focus:ring-orange-500 rounded"
                                                    data-oid="x6k8a9h"
                                                />

                                                <span
                                                    className="font-medium wedding-text"
                                                    data-oid="rqtpjxo"
                                                >
                                                    Ich bringe eine Begleitung mit
                                                </span>
                                            </label>
                                        </div>

                                        {rsvpData.plusOne && (
                                            <div
                                                className="space-y-4 pl-6 border-l-2 border-orange-200"
                                                data-oid="slz94ea"
                                            >
                                                <div data-oid="ed4x.62">
                                                    <label
                                                        className="block text-sm wedding-label text-gray-700 mb-2"
                                                        data-oid="ru2hawp"
                                                    >
                                                        Name der Begleitung *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required={rsvpData.plusOne}
                                                        value={rsvpData.plusOneName}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                'plusOneName',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent wedding-text"
                                                        placeholder="Name Ihrer Begleitung"
                                                        data-oid="gaf8quj"
                                                    />
                                                </div>

                                                <div data-oid="_:uilgu">
                                                    <label
                                                        className="block text-sm wedding-label text-gray-700 mb-3"
                                                        data-oid="hnlb_v-"
                                                    >
                                                        Menüwahl für Begleitung *
                                                    </label>
                                                    <div
                                                        className="grid md:grid-cols-2 gap-3"
                                                        data-oid="vhsfumm"
                                                    >
                                                        <label
                                                            className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                            data-oid=":hjfcuj"
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="plusOneMeal"
                                                                value="meat"
                                                                checked={
                                                                    rsvpData.plusOneMeal === 'meat'
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        'plusOneMeal',
                                                                        e.target.value,
                                                                    )
                                                                }
                                                                className="mr-3 text-orange-500 focus:ring-orange-500"
                                                                data-oid="7cp:nwf"
                                                            />

                                                            <div data-oid="sembozm">
                                                                <div
                                                                    className="font-medium wedding-text"
                                                                    data-oid="f::b1j-"
                                                                >
                                                                    🥩 Fleischgericht
                                                                </div>
                                                            </div>
                                                        </label>

                                                        <label
                                                            className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                            data-oid="unzj8lx"
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="plusOneMeal"
                                                                value="fish"
                                                                checked={
                                                                    rsvpData.plusOneMeal === 'fish'
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        'plusOneMeal',
                                                                        e.target.value,
                                                                    )
                                                                }
                                                                className="mr-3 text-orange-500 focus:ring-orange-500"
                                                                data-oid="bhq65._"
                                                            />

                                                            <div data-oid="083xdg2">
                                                                <div
                                                                    className="font-medium wedding-text"
                                                                    data-oid="s7ik3:0"
                                                                >
                                                                    🐟 Fischgericht
                                                                </div>
                                                            </div>
                                                        </label>

                                                        <label
                                                            className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                            data-oid="-u6p2i4"
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="plusOneMeal"
                                                                value="vegetarian"
                                                                checked={
                                                                    rsvpData.plusOneMeal ===
                                                                    'vegetarian'
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        'plusOneMeal',
                                                                        e.target.value,
                                                                    )
                                                                }
                                                                className="mr-3 text-orange-500 focus:ring-orange-500"
                                                                data-oid="3_t0n9-"
                                                            />

                                                            <div data-oid="d08f0n5">
                                                                <div
                                                                    className="font-medium wedding-text"
                                                                    data-oid="-_ln_xv"
                                                                >
                                                                    🥬 Vegetarisch
                                                                </div>
                                                            </div>
                                                        </label>

                                                        <label
                                                            className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                            data-oid="ah9t_31"
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="plusOneMeal"
                                                                value="vegan"
                                                                checked={
                                                                    rsvpData.plusOneMeal === 'vegan'
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        'plusOneMeal',
                                                                        e.target.value,
                                                                    )
                                                                }
                                                                className="mr-3 text-orange-500 focus:ring-orange-500"
                                                                data-oid="vpqefsn"
                                                            />

                                                            <div data-oid="fzcal.j">
                                                                <div
                                                                    className="font-medium wedding-text"
                                                                    data-oid="30-p_kv"
                                                                >
                                                                    🌱 Vegan
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Message */}
                                <div className="space-y-4" data-oid="832f91t">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-4 wedding-title"
                                        data-oid="l.caj86"
                                    >
                                        Nachricht
                                    </h3>

                                    <div data-oid="dqswzhz">
                                        <label
                                            className="block text-sm wedding-label text-gray-700 mb-2"
                                            data-oid="6fh-f8y"
                                        >
                                            Persönliche Nachricht (optional)
                                        </label>
                                        <textarea
                                            value={rsvpData.message}
                                            onChange={(e) =>
                                                handleInputChange('message', e.target.value)
                                            }
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent wedding-text"
                                            rows={4}
                                            placeholder="Möchten Sie uns etwas mitteilen? Wir freuen uns über Ihre Nachricht!"
                                            data-oid="u8:g4n3"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6" data-oid="cwfs1fg">
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-orange-400 to-blue-400 text-white wedding-button py-4 px-8 rounded-lg hover:from-orange-500 hover:to-blue-500 transition-all duration-300 shadow-lg"
                                        data-oid="lby:-jt"
                                    >
                                        RSVP absenden
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="text-center py-12" data-oid="ikaud33">
                                <div className="text-6xl mb-6" data-oid="uk4dzvr">
                                    🎉
                                </div>
                                <h3
                                    className="text-3xl wedding-title text-gray-700 mb-4"
                                    data-oid="0ugrbnm"
                                >
                                    Vielen Dank!
                                </h3>
                                <p
                                    className="text-lg text-gray-600 mb-6 wedding-text"
                                    data-oid="qolx8ck"
                                >
                                    Ihre Anmeldung wurde erfolgreich übermittelt. Wir freuen uns
                                    sehr darauf,
                                    {rsvpData.attendance === 'yes'
                                        ? ' Sie bei unserer Hochzeit begrüßen zu dürfen!'
                                        : ' von Ihnen gehört zu haben.'}
                                </p>
                                {rsvpData.attendance === 'yes' && (
                                    <div
                                        className="bg-orange-50 rounded-lg p-6 max-w-md mx-auto"
                                        data-oid="r9vv24-"
                                    >
                                        <h4
                                            className="font-medium text-gray-700 mb-2 wedding-label"
                                            data-oid="3_r7uei"
                                        >
                                            Ihre Anmeldung:
                                        </h4>
                                        <div
                                            className="text-sm text-gray-600 space-y-1 wedding-text"
                                            data-oid="x-1a_35"
                                        >
                                            <p data-oid="j2-m6f9">
                                                <strong data-oid="li0cih1">Name:</strong>{' '}
                                                {rsvpData.name}
                                            </p>
                                            <p data-oid="iadusb6">
                                                <strong data-oid="s:lo8st">Menü:</strong>{' '}
                                                {rsvpData.mealPreference === 'meat'
                                                    ? 'Fleischgericht'
                                                    : rsvpData.mealPreference === 'fish'
                                                      ? 'Fischgericht'
                                                      : rsvpData.mealPreference === 'vegetarian'
                                                        ? 'Vegetarisch'
                                                        : rsvpData.mealPreference === 'vegan'
                                                          ? 'Vegan'
                                                          : 'Nicht ausgewählt'}
                                            </p>
                                            {rsvpData.plusOne && (
                                                <>
                                                    <p data-oid=".gr_ozy">
                                                        <strong data-oid="p:k_8g.">
                                                            Begleitung:
                                                        </strong>{' '}
                                                        {rsvpData.plusOneName}
                                                    </p>
                                                    <p data-oid="7k4n2a1">
                                                        <strong data-oid="nors0hs">
                                                            Menü Begleitung:
                                                        </strong>{' '}
                                                        {rsvpData.plusOneMeal === 'meat'
                                                            ? 'Fleischgericht'
                                                            : rsvpData.plusOneMeal === 'fish'
                                                              ? 'Fischgericht'
                                                              : rsvpData.plusOneMeal ===
                                                                  'vegetarian'
                                                                ? 'Vegetarisch'
                                                                : rsvpData.plusOneMeal === 'vegan'
                                                                  ? 'Vegan'
                                                                  : 'Nicht ausgewählt'}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <button
                                    onClick={() => {
                                        setIsSubmitted(false);
                                        setRSVPData({
                                            name: '',
                                            email: '',
                                            phone: '',
                                            attendance: '',
                                            mealPreference: '',
                                            allergies: '',
                                            plusOne: false,
                                            plusOneName: '',
                                            plusOneMeal: '',
                                            message: '',
                                        });
                                    }}
                                    className="mt-6 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors wedding-button"
                                    data-oid="x0nxgva"
                                >
                                    Neue Anmeldung
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer
                className="bg-white/80 backdrop-blur-sm border-t border-orange-100 py-12"
                data-oid="885gimo"
            >
                <div className="max-w-4xl mx-auto text-center px-6" data-oid="5_ff0a7">
                    <h3 className="text-3xl wedding-title text-gray-700 mb-4" data-oid="r.j-rt5">
                        Johanna & Lukas
                    </h3>
                    <p className="text-gray-600 mb-6 wedding-text" data-oid="iygkaq3">
                        Wir freuen uns darauf, diesen besonderen Tag mit euch zu teilen!
                    </p>
                    <div className="flex justify-center space-x-4 text-2xl" data-oid="u9o67ru">
                        <span data-oid="ee2h7:j">💕</span>
                        <span data-oid="2euw2-e">💍</span>
                        <span data-oid="_o16o6j">👰‍♀️</span>
                        <span data-oid="me-17ra">🤵‍♂️</span>
                        <span data-oid="bczmj_.">🎉</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
