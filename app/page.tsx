'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SmartphonePhotoCapture } from '@/components/SmartphonePhotoCapture';
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
            data-oid="i1yd3t3"
        >
            {/* Header */}
            <header
                className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50"
                data-oid=".3tp5i0"
            >
                <div className="max-w-6xl mx-auto px-6 py-4" data-oid="3b4f7:h">
                    <nav className="flex justify-center space-x-8" data-oid=".54sfuj">
                        <button
                            onClick={() => setActiveTab('story')}
                            className={`wedding-nav px-4 py-2 rounded-full transition-all ${activeTab === 'story' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="dklml1l"
                        >
                            Unsere Geschichte
                        </button>
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`wedding-nav px-4 py-2 rounded-full transition-all ${activeTab === 'events' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="72p53o:"
                        >
                            Termine
                        </button>
                        <button
                            onClick={() => setActiveTab('location')}
                            className={`wedding-nav px-4 py-2 rounded-full transition-all ${activeTab === 'location' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="7ouo1op"
                        >
                            Locations
                        </button>
                        <button
                            onClick={() => setActiveTab('gallery')}
                            className={`wedding-nav px-4 py-2 rounded-full transition-all ${activeTab === 'gallery' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="ej-:0d8"
                        >
                            Galerie
                        </button>
                        <button
                            onClick={() => setActiveTab('travel')}
                            className={`wedding-nav px-4 py-2 rounded-full transition-all ${activeTab === 'travel' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="tmpl3t3"
                        >
                            Anfahrt
                        </button>
                        <button
                            onClick={() => setActiveTab('rsvp')}
                            className={`wedding-nav px-4 py-2 rounded-full transition-all ${activeTab === 'rsvp' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="xpf_4i5"
                        >
                            RSVP
                        </button>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="text-center py-20 px-6" data-oid="oldbx66">
                <div className="max-w-4xl mx-auto" data-oid="n7g0gzj">
                    <div className="mb-8" data-oid="yt5f5_z">
                        <h1
                            className="text-6xl md:text-8xl wedding-title text-orange-300 mb-4"
                            data-oid="rwnf1_r"
                        >
                            Johanna & Lukas
                        </h1>
                        <div
                            className="w-32 h-px bg-gradient-to-r from-orange-300 to-blue-300 mx-auto mb-6"
                            data-oid="l752er9"
                        ></div>
                        <p className="text-2xl text-gray-600 wedding-subtitle" data-oid="-3emlrn">
                            Wir heiraten!
                        </p>

                        {/* Countdown Timer */}
                        <div className="mt-8 mb-8" data-oid=".outudd">
                            <p
                                className="text-lg text-gray-600 wedding-text mb-4"
                                data-oid="z32y2q."
                            >
                                Noch bis zur großen Feier:
                            </p>
                            <div
                                className="grid grid-cols-4 gap-4 max-w-md mx-auto"
                                data-oid=":9fdcgv"
                            >
                                <div
                                    className="bg-white/80 rounded-lg p-4 text-center shadow-sm"
                                    data-oid="s78l9bp"
                                >
                                    <div
                                        className="text-2xl font-bold text-orange-600 wedding-title"
                                        data-oid="k2uzzab"
                                    >
                                        {timeLeft.days}
                                    </div>
                                    <div
                                        className="text-sm text-gray-600 wedding-text"
                                        data-oid="jox:x0z"
                                    >
                                        Tage
                                    </div>
                                </div>
                                <div
                                    className="bg-white/80 rounded-lg p-4 text-center shadow-sm"
                                    data-oid="eoh.1g:"
                                >
                                    <div
                                        className="text-2xl font-bold text-orange-600 wedding-title"
                                        data-oid="ac33491"
                                    >
                                        {timeLeft.hours}
                                    </div>
                                    <div
                                        className="text-sm text-gray-600 wedding-text"
                                        data-oid="z.xt3pu"
                                    >
                                        Stunden
                                    </div>
                                </div>
                                <div
                                    className="bg-white/80 rounded-lg p-4 text-center shadow-sm"
                                    data-oid="dcxm.so"
                                >
                                    <div
                                        className="text-2xl font-bold text-orange-600 wedding-title"
                                        data-oid="ywfvsth"
                                    >
                                        {timeLeft.minutes}
                                    </div>
                                    <div
                                        className="text-sm text-gray-600 wedding-text"
                                        data-oid="jdi-1tv"
                                    >
                                        Minuten
                                    </div>
                                </div>
                                <div
                                    className="bg-white/80 rounded-lg p-4 text-center shadow-sm"
                                    data-oid="0lch78w"
                                >
                                    <div
                                        className="text-2xl font-bold text-orange-600 wedding-title"
                                        data-oid="t:ba01."
                                    >
                                        {timeLeft.seconds}
                                    </div>
                                    <div
                                        className="text-sm text-gray-600 wedding-text"
                                        data-oid="eb.9g1a"
                                    >
                                        Sekunden
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                        data-oid="ad0zxqr"
                    >
                        <div className="grid md:grid-cols-2 gap-8" data-oid="9g.9qgg">
                            <div className="text-center" data-oid="7tk_a:q">
                                <div className="text-4xl text-orange-400 mb-2" data-oid="r7om3e6">
                                    💒
                                </div>
                                <h3
                                    className="text-xl font-medium text-gray-700 mb-2"
                                    data-oid="-nlb4m-"
                                >
                                    Standesamtliche Trauung
                                </h3>
                                <p className="text-lg text-blue-600 font-medium" data-oid="11gpak2">
                                    16. August 2025
                                </p>
                                <p className="text-gray-600" data-oid="cn2muap">
                                    Burg Brüggen
                                </p>
                            </div>
                            <div className="text-center" data-oid="ex7lv5g">
                                <div className="text-4xl text-blue-400 mb-2" data-oid="9x1.ufx">
                                    🎉
                                </div>
                                <h3
                                    className="text-xl font-medium text-gray-700 mb-2"
                                    data-oid="axwn.d_"
                                >
                                    Große Feier
                                </h3>
                                <p className="text-lg text-blue-600 font-medium" data-oid="w_r.6p:">
                                    5. September 2025
                                </p>
                                <p className="text-gray-600" data-oid="5tsq-nr">
                                    Restaurant Waldau, Bonn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <main className="max-w-6xl mx-auto px-6 pb-20" data-oid="8os9l96">
                {activeTab === 'story' && (
                    <div
                        className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-orange-100"
                        data-oid="rpsc-nx"
                    >
                        <h2
                            className="text-4xl wedding-title text-center text-gray-700 mb-12"
                            data-oid="zikn39b"
                        >
                            Unsere Liebesgeschichte
                        </h2>

                        <div className="space-y-12" data-oid="dssth2_">
                            <div className="flex items-center space-x-8" data-oid="e6.zz05">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center text-2xl"
                                    data-oid="qxj0hbz"
                                >
                                    💕
                                </div>
                                <div data-oid="sarq7i2">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-2"
                                        data-oid="nwd1.l2"
                                    >
                                        13. Mai 2018
                                    </h3>
                                    <p
                                        className="text-lg text-gray-600 wedding-text"
                                        data-oid="v8gs4_r"
                                    >
                                        Der Tag, an dem wir uns ineinander verliebt haben
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-8" data-oid="l4gv6eu">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center text-2xl"
                                    data-oid="ciig471"
                                >
                                    💍
                                </div>
                                <div data-oid="lgmfq7o">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-2"
                                        data-oid="1-liqkq"
                                    >
                                        13. August 2024
                                    </h3>
                                    <p
                                        className="text-lg text-gray-600 wedding-text"
                                        data-oid="l:-p..."
                                    >
                                        Unser Verlobungstag - der Beginn unseres gemeinsamen Weges
                                        zum Altar
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-8" data-oid="veg8c2f">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-orange-300 to-blue-300 rounded-full flex items-center justify-center text-2xl"
                                    data-oid="sc8::ag"
                                >
                                    👰‍♀️🤵‍♂️
                                </div>
                                <div data-oid="oqnc6:l">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-2"
                                        data-oid="e9xs5da"
                                    >
                                        2025
                                    </h3>
                                    <p
                                        className="text-lg text-gray-600 wedding-text"
                                        data-oid="z38a8rh"
                                    >
                                        Das Jahr, in dem wir Mann und Frau werden
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'events' && (
                    <div className="grid md:grid-cols-2 gap-8" data-oid="4s.f09k">
                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                            data-oid="7a9bchl"
                        >
                            <div className="text-center mb-6" data-oid="beregy_">
                                <div className="text-5xl mb-4" data-oid="-5lxok1">
                                    💒
                                </div>
                                <h3
                                    className="text-3xl wedding-title text-gray-700 mb-2"
                                    data-oid="t99fhhg"
                                >
                                    Standesamtliche Trauung
                                </h3>
                            </div>
                            <div className="space-y-4" data-oid="qw14031">
                                <div
                                    className="flex justify-between items-center py-2 border-b border-orange-100"
                                    data-oid="1f.yrzj"
                                >
                                    <span className="text-gray-600" data-oid="gd:lczg">
                                        Datum:
                                    </span>
                                    <span className="font-medium text-blue-600" data-oid="mmi55hr">
                                        16. August 2025
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-orange-100"
                                    data-oid="t2p9zvc"
                                >
                                    <span className="text-gray-600" data-oid="y6sqq-p">
                                        Ort:
                                    </span>
                                    <span className="font-medium" data-oid="jagzhyg">
                                        Burg Brüggen
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-orange-100"
                                    data-oid="8-5j_.6"
                                >
                                    <span className="text-gray-600" data-oid="05wpcas">
                                        Adresse:
                                    </span>
                                    <span className="font-medium" data-oid="_wtymvl">
                                        41379 Brüggen
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2"
                                    data-oid="qv_25vv"
                                >
                                    <span className="text-gray-600" data-oid="jtv.qb9">
                                        Gäste:
                                    </span>
                                    <span className="font-medium" data-oid="qcwzq9e">
                                        Engster Familienkreis
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100"
                            data-oid="t-m1.gv"
                        >
                            <div className="text-center mb-6" data-oid="jlm34st">
                                <div className="text-5xl mb-4" data-oid=":4mcm.3">
                                    🎉
                                </div>
                                <h3
                                    className="text-3xl wedding-title text-gray-700 mb-2"
                                    data-oid="mnf._0y"
                                >
                                    Große Feier
                                </h3>
                            </div>
                            <div className="space-y-4" data-oid="g9fn2po">
                                <div
                                    className="flex justify-between items-center py-2 border-b border-blue-100"
                                    data-oid=".5::y3r"
                                >
                                    <span className="text-gray-600" data-oid="l.o2m.2">
                                        Datum:
                                    </span>
                                    <span className="font-medium text-blue-600" data-oid="o-2len4">
                                        5. September 2025
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-blue-100"
                                    data-oid="_ubm_b7"
                                >
                                    <span className="text-gray-600" data-oid="qad7:os">
                                        Ort:
                                    </span>
                                    <span className="font-medium" data-oid=".:swv3u">
                                        Restaurant Waldau
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-blue-100"
                                    data-oid="-lifafz"
                                >
                                    <span className="text-gray-600" data-oid="u04.qgo">
                                        Stadt:
                                    </span>
                                    <span className="font-medium" data-oid="u.t7e_m">
                                        Bonn
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2"
                                    data-oid="x2ry_vk"
                                >
                                    <span className="text-gray-600" data-oid=":_we967">
                                        Gäste:
                                    </span>
                                    <span className="font-medium" data-oid="dp19mdc">
                                        Familie & Freunde
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'location' && (
                    <div className="space-y-8" data-oid="5eevkln">
                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                            data-oid="dqpj1xs"
                        >
                            <h3
                                className="text-3xl wedding-title text-center text-gray-700 mb-8"
                                data-oid="prqxk6m"
                            >
                                Burg Brüggen
                            </h3>
                            <div
                                className="grid md:grid-cols-2 gap-8 items-center"
                                data-oid="k42jb-6"
                            >
                                <div data-oid="_s8.xbv">
                                    <p
                                        className="text-lg text-gray-600 mb-4 wedding-text"
                                        data-oid="avj_kju"
                                    >
                                        Unsere standesamtliche Trauung findet in der historischen
                                        Burg Brüggen statt - ein romantischer Ort voller Geschichte
                                        für den Beginn unserer gemeinsamen Zukunft.
                                    </p>
                                    <div className="space-y-2" data-oid="m5fff4w">
                                        <p className="text-gray-700" data-oid="n:vk-hm">
                                            <strong data-oid="z1.vi.3">Adresse:</strong> 41379
                                            Brüggen
                                        </p>
                                        <p className="text-gray-700" data-oid="3e-fltt">
                                            <strong data-oid="a1-fl5.">Datum:</strong> 16. August
                                            2025
                                        </p>
                                        <p className="text-gray-700" data-oid="mtim-.-">
                                            <strong data-oid="f37wz_8">Gäste:</strong> Engster
                                            Familienkreis
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8 text-center"
                                    data-oid="fd3z:yv"
                                >
                                    <div className="text-6xl mb-4" data-oid="_k7wmih">
                                        🏰
                                    </div>
                                    <p className="text-gray-600" data-oid="revvehs">
                                        Historische Burg Brüggen
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100"
                            data-oid="fvj93lq"
                        >
                            <h3
                                className="text-3xl wedding-title text-center text-gray-700 mb-8"
                                data-oid=".pfqghu"
                            >
                                Restaurant Waldau
                            </h3>
                            <div
                                className="grid md:grid-cols-2 gap-8 items-center"
                                data-oid="6cha_rc"
                            >
                                <div
                                    className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 text-center"
                                    data-oid="er9n7.e"
                                >
                                    <div className="text-6xl mb-4" data-oid="3clerbc">
                                        🌲
                                    </div>
                                    <p className="text-gray-600" data-oid="g:edbp4">
                                        Restaurant Waldau, Bonn
                                    </p>
                                </div>
                                <div data-oid=".vgcdyc">
                                    <p
                                        className="text-lg text-gray-600 mb-4 wedding-text"
                                        data-oid="4mq3njd"
                                    >
                                        Unsere große Feier und freie Trauung findet im wunderschönen
                                        Restaurant Waldau in Bonn statt - hier feiern wir mit all
                                        unseren Liebsten diesen besonderen Tag.
                                    </p>
                                    <div className="space-y-2" data-oid="m161sp7">
                                        <p className="text-gray-700" data-oid="17_0xr9">
                                            <strong data-oid="4dpllvl">Ort:</strong> Restaurant
                                            Waldau
                                        </p>
                                        <p className="text-gray-700" data-oid="-:a61nf">
                                            <strong data-oid="l66px6j">Stadt:</strong> Bonn
                                        </p>
                                        <p className="text-gray-700" data-oid="o-o4.-r">
                                            <strong data-oid="aohmxch">Datum:</strong> 5. September
                                            2025
                                        </p>
                                        <p className="text-gray-700" data-oid="llniey5">
                                            <strong data-oid="4ulf_gc">Gäste:</strong> Familie &
                                            Freunde
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'gallery' && (
                    <div className="space-y-8" data-oid="flx18yi">
                        {/* Unsere Bilder */}
                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                            data-oid="0ljengx"
                        >
                            <h2
                                className="text-4xl wedding-title text-center text-gray-700 mb-8"
                                data-oid="8zb5i84"
                            >
                                Unsere Liebesgeschichte in Bildern
                            </h2>

                            <div
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                                data-oid="o6bntja"
                            >
                                {/* Placeholder Images - Replace with your actual photos */}
                                <div
                                    className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg aspect-square flex items-center justify-center"
                                    data-oid="bz27g7o"
                                >
                                    <div className="text-center" data-oid="xd-:f4o">
                                        <div className="text-4xl mb-2" data-oid="85.z6vp">
                                            💕
                                        </div>
                                        <p
                                            className="text-sm text-gray-600 wedding-text"
                                            data-oid="2cer1ib"
                                        >
                                            Erstes Date
                                        </p>
                                        <p
                                            className="text-xs text-gray-500 wedding-text"
                                            data-oid="4q3gnqe"
                                        >
                                            Mai 2018
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg aspect-square flex items-center justify-center"
                                    data-oid="igpyy05"
                                >
                                    <div className="text-center" data-oid="k5sad-y">
                                        <div className="text-4xl mb-2" data-oid="yfih574">
                                            🏖️
                                        </div>
                                        <p
                                            className="text-sm text-gray-600 wedding-text"
                                            data-oid="9yqj05u"
                                        >
                                            Urlaub zusammen
                                        </p>
                                        <p
                                            className="text-xs text-gray-500 wedding-text"
                                            data-oid="78i6ce."
                                        >
                                            Sommer 2019
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="bg-gradient-to-br from-orange-200 to-blue-200 rounded-lg aspect-square flex items-center justify-center"
                                    data-oid="0xv-ec:"
                                >
                                    <div className="text-center" data-oid=":n2x05g">
                                        <div className="text-4xl mb-2" data-oid="5y3:hy_">
                                            🏠
                                        </div>
                                        <p
                                            className="text-sm text-gray-600 wedding-text"
                                            data-oid="q6rvtzv"
                                        >
                                            Zusammenziehen
                                        </p>
                                        <p
                                            className="text-xs text-gray-500 wedding-text"
                                            data-oid="9j.xoaq"
                                        >
                                            2020
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg aspect-square flex items-center justify-center"
                                    data-oid="kubdwmx"
                                >
                                    <div className="text-center" data-oid="w1j609h">
                                        <div className="text-4xl mb-2" data-oid="4bk9qt3">
                                            💍
                                        </div>
                                        <p
                                            className="text-sm text-gray-600 wedding-text"
                                            data-oid="mbdx46m"
                                        >
                                            Verlobung
                                        </p>
                                        <p
                                            className="text-xs text-gray-500 wedding-text"
                                            data-oid=".ghuhgz"
                                        >
                                            August 2024
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg aspect-square flex items-center justify-center"
                                    data-oid="tse7q7p"
                                >
                                    <div className="text-center" data-oid="k0e9bdl">
                                        <div className="text-4xl mb-2" data-oid="8q8o8uq">
                                            📸
                                        </div>
                                        <p
                                            className="text-sm text-gray-600 wedding-text"
                                            data-oid="h94-kcc"
                                        >
                                            Engagement Shooting
                                        </p>
                                        <p
                                            className="text-xs text-gray-500 wedding-text"
                                            data-oid="f6iadcq"
                                        >
                                            2024
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg aspect-square flex items-center justify-center"
                                    data-oid="l:4ahw7"
                                >
                                    <div className="text-center" data-oid="7.usoi6">
                                        <div className="text-4xl mb-2" data-oid="y.3roly">
                                            🎉
                                        </div>
                                        <p
                                            className="text-sm text-gray-600 wedding-text"
                                            data-oid="dtg4.:z"
                                        >
                                            Bald verheiratet!
                                        </p>
                                        <p
                                            className="text-xs text-gray-500 wedding-text"
                                            data-oid="jmunq63"
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
                            data-oid=":ri19dy"
                        />

                        {/* Gästefotos */}
                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100"
                            data-oid="v:t_0mi"
                        >
                            <GuestPhotos data-oid="t03y211" />
                        </div>
                    </div>
                )}

                {activeTab === 'travel' && (
                    <div className="space-y-8" data-oid="7_1nlit">
                        {/* Anfahrt */}
                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                            data-oid="t6ijul9"
                        >
                            <h2
                                className="text-4xl wedding-title text-center text-gray-700 mb-8"
                                data-oid="r98ybme"
                            >
                                Anfahrt & Unterkunft
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8" data-oid="j.ixb55">
                                {/* Burg Brüggen */}
                                <div className="space-y-4" data-oid="4sgsmzx">
                                    <h3
                                        className="text-2xl wedding-title text-gray-700 mb-4"
                                        data-oid="5f6btj4"
                                    >
                                        🏰 Burg Brüggen
                                    </h3>
                                    <div className="bg-orange-50 rounded-lg p-4" data-oid="vdfrp1f">
                                        <p
                                            className="font-medium wedding-label mb-2"
                                            data-oid="qovikg8"
                                        >
                                            Adresse:
                                        </p>
                                        <p
                                            className="wedding-text text-gray-700 mb-3"
                                            data-oid="jo3nsod"
                                        >
                                            Burgwall 1<br data-oid="78yurpa" />
                                            41379 Brüggen
                                        </p>

                                        <p
                                            className="font-medium wedding-label mb-2"
                                            data-oid="-2qdydd"
                                        >
                                            Anfahrt mit dem Auto:
                                        </p>
                                        <p
                                            className="wedding-text text-gray-700 mb-3"
                                            data-oid="kr5srk2"
                                        >
                                            A61 → Ausfahrt Brüggen → Richtung Zentrum
                                        </p>

                                        <p
                                            className="font-medium wedding-label mb-2"
                                            data-oid="v:30d6f"
                                        >
                                            Parken:
                                        </p>
                                        <p
                                            className="wedding-text text-gray-700 mb-3"
                                            data-oid="tei_ttl"
                                        >
                                            Kostenlose Parkplätze am Burgwall verfügbar
                                        </p>

                                        <button
                                            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors wedding-button"
                                            data-oid="e2yo6v4"
                                        >
                                            📍 In Google Maps öffnen
                                        </button>
                                    </div>
                                </div>

                                {/* Restaurant Waldau */}
                                <div className="space-y-4" data-oid="kjwyyed">
                                    <h3
                                        className="text-2xl wedding-title text-gray-700 mb-4"
                                        data-oid="gk1qif8"
                                    >
                                        🌲 Restaurant Waldau
                                    </h3>
                                    <div className="bg-blue-50 rounded-lg p-4" data-oid="2.m.apw">
                                        <p
                                            className="font-medium wedding-label mb-2"
                                            data-oid="8ug957s"
                                        >
                                            Adresse:
                                        </p>
                                        <p
                                            className="wedding-text text-gray-700 mb-3"
                                            data-oid="p20coip"
                                        >
                                            Waldaustraße 99
                                            <br data-oid="anjpi9e" />
                                            53177 Bonn
                                        </p>

                                        <p
                                            className="font-medium wedding-label mb-2"
                                            data-oid="5isn4ee"
                                        >
                                            Anfahrt mit dem Auto:
                                        </p>
                                        <p
                                            className="wedding-text text-gray-700 mb-3"
                                            data-oid=".qh8y:b"
                                        >
                                            A565 → Ausfahrt Bonn-Hardtberg → Richtung Waldau
                                        </p>

                                        <p
                                            className="font-medium wedding-label mb-2"
                                            data-oid="rjtjpsc"
                                        >
                                            Öffentliche Verkehrsmittel:
                                        </p>
                                        <p
                                            className="wedding-text text-gray-700 mb-3"
                                            data-oid="0ns_cot"
                                        >
                                            Bus 631 bis Haltestelle "Waldau"
                                        </p>

                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors wedding-button"
                                            data-oid="3gavu80"
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
                            data-oid="w92850d"
                        >
                            <h3
                                className="text-3xl wedding-title text-center text-gray-700 mb-8"
                                data-oid="araw4ho"
                            >
                                🏨 Unterkunft-Empfehlungen
                            </h3>

                            <div className="grid md:grid-cols-3 gap-6" data-oid="cg0uxc9">
                                <div
                                    className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6"
                                    data-oid="loi39rz"
                                >
                                    <h4
                                        className="text-xl wedding-title text-gray-700 mb-3"
                                        data-oid="6w_bt2a"
                                    >
                                        Hotel Rheinland
                                    </h4>
                                    <p
                                        className="wedding-text text-gray-600 mb-3"
                                        data-oid="_dgaclz"
                                    >
                                        Nur 5 Minuten vom Restaurant Waldau entfernt
                                    </p>
                                    <p
                                        className="text-sm wedding-text text-gray-500 mb-3"
                                        data-oid=".p8gbav"
                                    >
                                        📍 Bonn-Zentrum
                                        <br data-oid="lsgjcyn" />
                                        💰 €€ - Mittelklasse
                                        <br data-oid="r4nerur" />
                                        🚗 Kostenlose Parkplätze
                                    </p>
                                    <button
                                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors wedding-button text-sm"
                                        data-oid=":1as5.h"
                                    >
                                        Verfügbarkeit prüfen
                                    </button>
                                </div>

                                <div
                                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6"
                                    data-oid="vs6oyll"
                                >
                                    <h4
                                        className="text-xl wedding-title text-gray-700 mb-3"
                                        data-oid="gp0g2-u"
                                    >
                                        Pension Waldblick
                                    </h4>
                                    <p
                                        className="wedding-text text-gray-600 mb-3"
                                        data-oid="jzyh_nk"
                                    >
                                        Gemütliche Pension in der Nähe beider Locations
                                    </p>
                                    <p
                                        className="text-sm wedding-text text-gray-500 mb-3"
                                        data-oid="tni38ea"
                                    >
                                        📍 Zwischen Brüggen & Bonn
                                        <br data-oid="avjny2q" />
                                        💰 € - Budget-freundlich
                                        <br data-oid="00d3t-o" />
                                        🌳 Ruhige Lage
                                    </p>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors wedding-button text-sm"
                                        data-oid="42h7s:9"
                                    >
                                        Verfügbarkeit prüfen
                                    </button>
                                </div>

                                <div
                                    className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6"
                                    data-oid="varcde1"
                                >
                                    <h4
                                        className="text-xl wedding-title text-gray-700 mb-3"
                                        data-oid="0wz43as"
                                    >
                                        Boutique Hotel Lux
                                    </h4>
                                    <p
                                        className="wedding-text text-gray-600 mb-3"
                                        data-oid=":d4uqth"
                                    >
                                        Luxuriöse Unterkunft für besondere Anlässe
                                    </p>
                                    <p
                                        className="text-sm wedding-text text-gray-500 mb-3"
                                        data-oid="8f3coi6"
                                    >
                                        📍 Bonn-Zentrum
                                        <br data-oid="c2j.hs7" />
                                        💰 €€€ - Premium
                                        <br data-oid="hykmbcm" />⭐ 4-Sterne Service
                                    </p>
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors wedding-button text-sm"
                                        data-oid="vy9boz2"
                                    >
                                        Verfügbarkeit prüfen
                                    </button>
                                </div>
                            </div>

                            <div
                                className="mt-8 bg-yellow-50 rounded-lg p-6 text-center"
                                data-oid="k0em:x9"
                            >
                                <h4
                                    className="text-lg wedding-title text-gray-700 mb-2"
                                    data-oid="8vr6209"
                                >
                                    💡 Tipp für auswärtige Gäste
                                </h4>
                                <p className="wedding-text text-gray-600" data-oid="84i-5_c">
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
                        data-oid="c-3q6tt"
                    >
                        <h2
                            className="text-4xl wedding-title text-center text-gray-700 mb-8"
                            data-oid="5_cnefx"
                        >
                            Gästeanmeldung
                        </h2>

                        {!isSubmitted ? (
                            <form
                                onSubmit={handleRSVPSubmit}
                                className="max-w-2xl mx-auto space-y-6"
                                data-oid="4ejct47"
                            >
                                {/* Personal Information */}
                                <div className="space-y-4" data-oid="bhz-g4n">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-4 wedding-title"
                                        data-oid="l8yybc9"
                                    >
                                        Persönliche Angaben
                                    </h3>

                                    <div data-oid=":u:e0cq">
                                        <label
                                            className="block text-sm wedding-label text-gray-700 mb-2"
                                            data-oid="gd76ksj"
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
                                            data-oid="d9_umnl"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4" data-oid="esafc:n">
                                        <div data-oid="evea.gd">
                                            <label
                                                className="block text-sm wedding-label text-gray-700 mb-2"
                                                data-oid="qcm:5w1"
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
                                                data-oid="clrd2no"
                                            />
                                        </div>

                                        <div data-oid="zmu.f03">
                                            <label
                                                className="block text-sm wedding-label text-gray-700 mb-2"
                                                data-oid="_age:7i"
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
                                                data-oid="r_-5ser"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Attendance */}
                                <div className="space-y-4" data-oid="xj-gu.b">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-4 wedding-title"
                                        data-oid="n88jscu"
                                    >
                                        Teilnahme
                                    </h3>

                                    <div data-oid="xnidhg2">
                                        <label
                                            className="block text-sm wedding-label text-gray-700 mb-3"
                                            data-oid=".g6oal_"
                                        >
                                            Können Sie an unserer Hochzeit teilnehmen? *
                                        </label>
                                        <div className="flex space-x-4" data-oid="9qsyaqy">
                                            <label className="flex items-center" data-oid="oen5hwz">
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
                                                    data-oid="59x_u5v"
                                                />

                                                <span
                                                    className="text-green-600 font-medium wedding-text"
                                                    data-oid="e:cks9."
                                                >
                                                    ✓ Ja, ich komme gerne!
                                                </span>
                                            </label>
                                            <label className="flex items-center" data-oid="0791p:8">
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
                                                    data-oid="nfhi3a."
                                                />

                                                <span
                                                    className="text-red-600 font-medium wedding-text"
                                                    data-oid=".esf-_-"
                                                >
                                                    ✗ Leider kann ich nicht
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Meal Preferences - only show if attending */}
                                {rsvpData.attendance === 'yes' && (
                                    <div className="space-y-4" data-oid="_:f8mkb">
                                        <h3
                                            className="text-2xl font-medium text-gray-700 mb-4 wedding-title"
                                            data-oid="576hpsl"
                                        >
                                            Menüwahl
                                        </h3>

                                        <div data-oid="74b.ozd">
                                            <label
                                                className="block text-sm wedding-label text-gray-700 mb-3"
                                                data-oid="em85fzf"
                                            >
                                                Ihre Menüwahl *
                                            </label>
                                            <div
                                                className="grid md:grid-cols-2 gap-3"
                                                data-oid="3wum8g2"
                                            >
                                                <label
                                                    className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                    data-oid="3dg4th9"
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
                                                        data-oid="9b_:cpq"
                                                    />

                                                    <div data-oid="g2uw441">
                                                        <div
                                                            className="font-medium wedding-text"
                                                            data-oid="5t6r-11"
                                                        >
                                                            🥩 Fleischgericht
                                                        </div>
                                                        <div
                                                            className="text-sm text-gray-600 wedding-text"
                                                            data-oid="e.36eta"
                                                        >
                                                            Rinderfilet mit Beilagen
                                                        </div>
                                                    </div>
                                                </label>

                                                <label
                                                    className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                    data-oid="-gdgoay"
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
                                                        data-oid="u6c9a01"
                                                    />

                                                    <div data-oid="9p536cv">
                                                        <div
                                                            className="font-medium wedding-text"
                                                            data-oid="97llq_t"
                                                        >
                                                            🐟 Fischgericht
                                                        </div>
                                                        <div
                                                            className="text-sm text-gray-600 wedding-text"
                                                            data-oid="5ulo60n"
                                                        >
                                                            Lachsfilet mit Gemüse
                                                        </div>
                                                    </div>
                                                </label>

                                                <label
                                                    className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                    data-oid="xfltokt"
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
                                                        data-oid="3ayky7v"
                                                    />

                                                    <div data-oid="46j-ybc">
                                                        <div
                                                            className="font-medium wedding-text"
                                                            data-oid="jkifaxn"
                                                        >
                                                            🥬 Vegetarisch
                                                        </div>
                                                        <div
                                                            className="text-sm text-gray-600 wedding-text"
                                                            data-oid="a-llg2d"
                                                        >
                                                            Gemüse-Risotto
                                                        </div>
                                                    </div>
                                                </label>

                                                <label
                                                    className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                    data-oid="7ozo343"
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
                                                        data-oid="llpf5qy"
                                                    />

                                                    <div data-oid="55.msqb">
                                                        <div
                                                            className="font-medium wedding-text"
                                                            data-oid="adic5yr"
                                                        >
                                                            🌱 Vegan
                                                        </div>
                                                        <div
                                                            className="text-sm text-gray-600 wedding-text"
                                                            data-oid="_ytcauy"
                                                        >
                                                            Quinoa-Bowl
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        <div data-oid="31wmd_6">
                                            <label
                                                className="block text-sm wedding-label text-gray-700 mb-2"
                                                data-oid="f5cwevd"
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
                                                data-oid="ptpow79"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Plus One - only show if attending */}
                                {rsvpData.attendance === 'yes' && (
                                    <div className="space-y-4" data-oid="gj3y:d8">
                                        <h3
                                            className="text-2xl font-medium text-gray-700 mb-4 wedding-title"
                                            data-oid="1yzrvzc"
                                        >
                                            Begleitung
                                        </h3>

                                        <div data-oid="h4fv7k.">
                                            <label className="flex items-center" data-oid="5ckn9t5">
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
                                                    data-oid="wngnr:5"
                                                />

                                                <span
                                                    className="font-medium wedding-text"
                                                    data-oid=".:qem5t"
                                                >
                                                    Ich bringe eine Begleitung mit
                                                </span>
                                            </label>
                                        </div>

                                        {rsvpData.plusOne && (
                                            <div
                                                className="space-y-4 pl-6 border-l-2 border-orange-200"
                                                data-oid="q4iiy57"
                                            >
                                                <div data-oid="53ropry">
                                                    <label
                                                        className="block text-sm wedding-label text-gray-700 mb-2"
                                                        data-oid="feeq798"
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
                                                        data-oid="33c1jrp"
                                                    />
                                                </div>

                                                <div data-oid="vhiaru1">
                                                    <label
                                                        className="block text-sm wedding-label text-gray-700 mb-3"
                                                        data-oid="5w0_6f9"
                                                    >
                                                        Menüwahl für Begleitung *
                                                    </label>
                                                    <div
                                                        className="grid md:grid-cols-2 gap-3"
                                                        data-oid="lm5ptnz"
                                                    >
                                                        <label
                                                            className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                            data-oid="hcb0118"
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
                                                                data-oid="-dqs2z0"
                                                            />

                                                            <div data-oid="9qfjz_r">
                                                                <div
                                                                    className="font-medium wedding-text"
                                                                    data-oid="fu83fqy"
                                                                >
                                                                    🥩 Fleischgericht
                                                                </div>
                                                            </div>
                                                        </label>

                                                        <label
                                                            className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                            data-oid="ssfcowj"
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
                                                                data-oid="4uxvzmf"
                                                            />

                                                            <div data-oid="ixc9yv0">
                                                                <div
                                                                    className="font-medium wedding-text"
                                                                    data-oid="s0ytg7n"
                                                                >
                                                                    🐟 Fischgericht
                                                                </div>
                                                            </div>
                                                        </label>

                                                        <label
                                                            className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                            data-oid="qvj-7.j"
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
                                                                data-oid="_dhdd.."
                                                            />

                                                            <div data-oid="e8r5hm0">
                                                                <div
                                                                    className="font-medium wedding-text"
                                                                    data-oid="tv34-1f"
                                                                >
                                                                    🥬 Vegetarisch
                                                                </div>
                                                            </div>
                                                        </label>

                                                        <label
                                                            className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                            data-oid="9s45y9l"
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
                                                                data-oid="uf-lds6"
                                                            />

                                                            <div data-oid="1le9rpc">
                                                                <div
                                                                    className="font-medium wedding-text"
                                                                    data-oid="mjj5c7v"
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
                                <div className="space-y-4" data-oid="xmnurc1">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-4 wedding-title"
                                        data-oid="ku3o8ac"
                                    >
                                        Nachricht
                                    </h3>

                                    <div data-oid="hyyfkm.">
                                        <label
                                            className="block text-sm wedding-label text-gray-700 mb-2"
                                            data-oid="iommess"
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
                                            data-oid="9gsqyun"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6" data-oid="4sfq8qx">
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-orange-400 to-blue-400 text-white wedding-button py-4 px-8 rounded-lg hover:from-orange-500 hover:to-blue-500 transition-all duration-300 shadow-lg"
                                        data-oid="aun6u05"
                                    >
                                        RSVP absenden
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="text-center py-12" data-oid="b_02ud0">
                                <div className="text-6xl mb-6" data-oid="8fb3d4k">
                                    🎉
                                </div>
                                <h3
                                    className="text-3xl wedding-title text-gray-700 mb-4"
                                    data-oid="8rnh0h:"
                                >
                                    Vielen Dank!
                                </h3>
                                <p
                                    className="text-lg text-gray-600 mb-6 wedding-text"
                                    data-oid="daa8e4e"
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
                                        data-oid="gw2k-yf"
                                    >
                                        <h4
                                            className="font-medium text-gray-700 mb-2 wedding-label"
                                            data-oid="u3g989d"
                                        >
                                            Ihre Anmeldung:
                                        </h4>
                                        <div
                                            className="text-sm text-gray-600 space-y-1 wedding-text"
                                            data-oid="134p0gk"
                                        >
                                            <p data-oid="gl3w5k:">
                                                <strong data-oid="vszy02d">Name:</strong>{' '}
                                                {rsvpData.name}
                                            </p>
                                            <p data-oid="e05pfzg">
                                                <strong data-oid="ljihou1">Menü:</strong>{' '}
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
                                                    <p data-oid="trd6mil">
                                                        <strong data-oid="f:ew6tp">
                                                            Begleitung:
                                                        </strong>{' '}
                                                        {rsvpData.plusOneName}
                                                    </p>
                                                    <p data-oid="ohdmzn9">
                                                        <strong data-oid="mhf7fqn">
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
                                    data-oid="ms_pixd"
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
                data-oid="9tis8yz"
            >
                <div className="max-w-4xl mx-auto text-center px-6" data-oid="a-.yi:i">
                    <h3 className="text-3xl wedding-title text-gray-700 mb-4" data-oid="uxfez1.">
                        Johanna & Lukas
                    </h3>
                    <p className="text-gray-600 mb-6 wedding-text" data-oid="znt-_ll">
                        Wir freuen uns darauf, diesen besonderen Tag mit euch zu teilen!
                    </p>
                    <div className="flex justify-center space-x-4 text-2xl" data-oid=".uchp5q">
                        <span data-oid="wrdcmc-">💕</span>
                        <span data-oid="n:0n9dt">💍</span>
                        <span data-oid="6c:1e_m">👰‍♀️</span>
                        <span data-oid="6g1svh0">🤵‍♂️</span>
                        <span data-oid="pn8_k8d">🎉</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
