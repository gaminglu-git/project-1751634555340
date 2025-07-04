'use client';

import { useState } from 'react';

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
            data-oid="67od5ia"
        >
            {/* Header */}
            <header
                className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50"
                data-oid="nak3z2h"
            >
                <div className="max-w-6xl mx-auto px-6 py-4" data-oid="axhe5-0">
                    <nav className="flex justify-center space-x-8" data-oid=".jsc_vv">
                        <button
                            onClick={() => setActiveTab('story')}
                            className={`wedding-nav px-4 py-2 rounded-full transition-all ${activeTab === 'story' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="p:tzd._"
                        >
                            Unsere Geschichte
                        </button>
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`wedding-nav px-4 py-2 rounded-full transition-all ${activeTab === 'events' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="nx:n6n:"
                        >
                            Termine
                        </button>
                        <button
                            onClick={() => setActiveTab('location')}
                            className={`wedding-nav px-4 py-2 rounded-full transition-all ${activeTab === 'location' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="02m0v2w"
                        >
                            Locations
                        </button>
                        <button
                            onClick={() => setActiveTab('rsvp')}
                            className={`wedding-nav px-4 py-2 rounded-full transition-all ${activeTab === 'rsvp' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="rsvp-tab"
                        >
                            RSVP
                        </button>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="text-center py-20 px-6" data-oid="6r2a:j5">
                <div className="max-w-4xl mx-auto" data-oid="jpvn44g">
                    <div className="mb-8" data-oid=":z991m:">
                        <h1
                            className="text-6xl md:text-8xl wedding-title text-orange-300 mb-4"
                            data-oid="u8c0cza"
                        >
                            Johanna & Lukas
                        </h1>
                        <div
                            className="w-32 h-px bg-gradient-to-r from-orange-300 to-blue-300 mx-auto mb-6"
                            data-oid="8llr5ne"
                        ></div>
                        <p className="text-2xl text-gray-600 wedding-subtitle" data-oid="m.b3maw">
                            Wir heiraten!
                        </p>
                    </div>

                    <div
                        className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                        data-oid="0efdcjs"
                    >
                        <div className="grid md:grid-cols-2 gap-8" data-oid="a-6yj2w">
                            <div className="text-center" data-oid="xwj9ehc">
                                <div className="text-4xl text-orange-400 mb-2" data-oid="f3:oh8-">
                                    💒
                                </div>
                                <h3
                                    className="text-xl font-medium text-gray-700 mb-2"
                                    data-oid="s5l.jq0"
                                >
                                    Standesamtliche Trauung
                                </h3>
                                <p className="text-lg text-blue-600 font-medium" data-oid="xq2jk68">
                                    16. August 2025
                                </p>
                                <p className="text-gray-600" data-oid="v4cqsx9">
                                    Burg Brüggen
                                </p>
                            </div>
                            <div className="text-center" data-oid="-skp-ld">
                                <div className="text-4xl text-blue-400 mb-2" data-oid="czy4h7s">
                                    🎉
                                </div>
                                <h3
                                    className="text-xl font-medium text-gray-700 mb-2"
                                    data-oid="2amuy3p"
                                >
                                    Große Feier
                                </h3>
                                <p className="text-lg text-blue-600 font-medium" data-oid="z92a_2e">
                                    5. September 2025
                                </p>
                                <p className="text-gray-600" data-oid="7-oh_f1">
                                    Restaurant Waldau, Bonn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <main className="max-w-6xl mx-auto px-6 pb-20" data-oid="1213fow">
                {activeTab === 'story' && (
                    <div
                        className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-orange-100"
                        data-oid="8-w79a:"
                    >
                        <h2
                            className="text-4xl wedding-title text-center text-gray-700 mb-12"
                            data-oid="dgh90di"
                        >
                            Unsere Liebesgeschichte
                        </h2>

                        <div className="space-y-12" data-oid="ev3dudu">
                            <div className="flex items-center space-x-8" data-oid="mjwllkl">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center text-2xl"
                                    data-oid="es6vfbr"
                                >
                                    💕
                                </div>
                                <div data-oid="som4nvh">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-2"
                                        data-oid="58k9-_h"
                                    >
                                        13. Mai 2018
                                    </h3>
                                    <p
                                        className="text-lg text-gray-600 wedding-text"
                                        data-oid="e_z-0re"
                                    >
                                        Der Tag, an dem wir uns ineinander verliebt haben
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-8" data-oid="m.cg2d7">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center text-2xl"
                                    data-oid="po6q9ey"
                                >
                                    💍
                                </div>
                                <div data-oid="ftp-.k-">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-2"
                                        data-oid="8wmgoah"
                                    >
                                        13. August 2024
                                    </h3>
                                    <p
                                        className="text-lg text-gray-600 wedding-text"
                                        data-oid="s:x8wku"
                                    >
                                        Unser Verlobungstag - der Beginn unseres gemeinsamen Weges
                                        zum Altar
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-8" data-oid="aefh42i">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-orange-300 to-blue-300 rounded-full flex items-center justify-center text-2xl"
                                    data-oid="v8vm2:_"
                                >
                                    👰‍♀️🤵‍♂️
                                </div>
                                <div data-oid="01.mvys">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-2"
                                        data-oid="ckpwqrp"
                                    >
                                        2025
                                    </h3>
                                    <p
                                        className="text-lg text-gray-600 wedding-text"
                                        data-oid="lsv8e3g"
                                    >
                                        Das Jahr, in dem wir Mann und Frau werden
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'events' && (
                    <div className="grid md:grid-cols-2 gap-8" data-oid="hal9_c-">
                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                            data-oid="81p3iwb"
                        >
                            <div className="text-center mb-6" data-oid="00oxgwc">
                                <div className="text-5xl mb-4" data-oid="5j248yq">
                                    💒
                                </div>
                                <h3
                                    className="text-3xl wedding-title text-gray-700 mb-2"
                                    data-oid=":3.e8nr"
                                >
                                    Standesamtliche Trauung
                                </h3>
                            </div>
                            <div className="space-y-4" data-oid="4c722i0">
                                <div
                                    className="flex justify-between items-center py-2 border-b border-orange-100"
                                    data-oid="h9lex.q"
                                >
                                    <span className="text-gray-600" data-oid="4:_w5da">
                                        Datum:
                                    </span>
                                    <span className="font-medium text-blue-600" data-oid="q8ebjlx">
                                        16. August 2025
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-orange-100"
                                    data-oid="oc.::nu"
                                >
                                    <span className="text-gray-600" data-oid="4zykwdi">
                                        Ort:
                                    </span>
                                    <span className="font-medium" data-oid="1mmy28g">
                                        Burg Brüggen
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-orange-100"
                                    data-oid="kwpoel4"
                                >
                                    <span className="text-gray-600" data-oid="6.5e9ov">
                                        Adresse:
                                    </span>
                                    <span className="font-medium" data-oid="croceb7">
                                        41379 Brüggen
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2"
                                    data-oid="lt7wya2"
                                >
                                    <span className="text-gray-600" data-oid="-i-0y3c">
                                        Gäste:
                                    </span>
                                    <span className="font-medium" data-oid="dt1pign">
                                        Engster Familienkreis
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100"
                            data-oid="4jjiewx"
                        >
                            <div className="text-center mb-6" data-oid="lsideks">
                                <div className="text-5xl mb-4" data-oid="z_p1w8t">
                                    🎉
                                </div>
                                <h3
                                    className="text-3xl wedding-title text-gray-700 mb-2"
                                    data-oid="18h6f0a"
                                >
                                    Große Feier
                                </h3>
                            </div>
                            <div className="space-y-4" data-oid="hpuz84v">
                                <div
                                    className="flex justify-between items-center py-2 border-b border-blue-100"
                                    data-oid="shefaqw"
                                >
                                    <span className="text-gray-600" data-oid="3c9k5:z">
                                        Datum:
                                    </span>
                                    <span className="font-medium text-blue-600" data-oid="1tsc6n3">
                                        5. September 2025
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-blue-100"
                                    data-oid="mvu73w:"
                                >
                                    <span className="text-gray-600" data-oid="_hllnm1">
                                        Ort:
                                    </span>
                                    <span className="font-medium" data-oid="z._81q-">
                                        Restaurant Waldau
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-blue-100"
                                    data-oid="izv:zqm"
                                >
                                    <span className="text-gray-600" data-oid="qbb8a94">
                                        Stadt:
                                    </span>
                                    <span className="font-medium" data-oid="m-ylwp9">
                                        Bonn
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2"
                                    data-oid=":4xft45"
                                >
                                    <span className="text-gray-600" data-oid="0u:owv8">
                                        Gäste:
                                    </span>
                                    <span className="font-medium" data-oid="da-i:qi">
                                        Familie & Freunde
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'location' && (
                    <div className="space-y-8" data-oid="2z6z.:t">
                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                            data-oid=".k9kjh6"
                        >
                            <h3
                                className="text-3xl wedding-title text-center text-gray-700 mb-8"
                                data-oid="uea_-mx"
                            >
                                Burg Brüggen
                            </h3>
                            <div
                                className="grid md:grid-cols-2 gap-8 items-center"
                                data-oid="m.2myq9"
                            >
                                <div data-oid="mshfhtr">
                                    <p
                                        className="text-lg text-gray-600 mb-4 wedding-text"
                                        data-oid="ni33i8q"
                                    >
                                        Unsere standesamtliche Trauung findet in der historischen
                                        Burg Brüggen statt - ein romantischer Ort voller Geschichte
                                        für den Beginn unserer gemeinsamen Zukunft.
                                    </p>
                                    <div className="space-y-2" data-oid="nbbou43">
                                        <p className="text-gray-700" data-oid="-mm8igh">
                                            <strong data-oid="rk0abjo">Adresse:</strong> 41379
                                            Brüggen
                                        </p>
                                        <p className="text-gray-700" data-oid="n3rojdg">
                                            <strong data-oid="sf2az:c">Datum:</strong> 16. August
                                            2025
                                        </p>
                                        <p className="text-gray-700" data-oid="mbig4cs">
                                            <strong data-oid="-mw49j-">Gäste:</strong> Engster
                                            Familienkreis
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8 text-center"
                                    data-oid="zy0vjjd"
                                >
                                    <div className="text-6xl mb-4" data-oid="35_3ziw">
                                        🏰
                                    </div>
                                    <p className="text-gray-600" data-oid="0knrri6">
                                        Historische Burg Brüggen
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100"
                            data-oid="z2dga1d"
                        >
                            <h3
                                className="text-3xl wedding-title text-center text-gray-700 mb-8"
                                data-oid="72l0okl"
                            >
                                Restaurant Waldau
                            </h3>
                            <div
                                className="grid md:grid-cols-2 gap-8 items-center"
                                data-oid="a.enerr"
                            >
                                <div
                                    className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 text-center"
                                    data-oid="skfdjv-"
                                >
                                    <div className="text-6xl mb-4" data-oid="q.e_cqu">
                                        🌲
                                    </div>
                                    <p className="text-gray-600" data-oid="58byh7n">
                                        Restaurant Waldau, Bonn
                                    </p>
                                </div>
                                <div data-oid="-9r1prp">
                                    <p
                                        className="text-lg text-gray-600 mb-4 wedding-text"
                                        data-oid="t08tteo"
                                    >
                                        Unsere große Feier und freie Trauung findet im wunderschönen
                                        Restaurant Waldau in Bonn statt - hier feiern wir mit all
                                        unseren Liebsten diesen besonderen Tag.
                                    </p>
                                    <div className="space-y-2" data-oid="5e60k0s">
                                        <p className="text-gray-700" data-oid="z7bavsy">
                                            <strong data-oid="voey2s1">Ort:</strong> Restaurant
                                            Waldau
                                        </p>
                                        <p className="text-gray-700" data-oid="lu_v3q5">
                                            <strong data-oid="l27cxwb">Stadt:</strong> Bonn
                                        </p>
                                        <p className="text-gray-700" data-oid="h:wa28d">
                                            <strong data-oid="vmvf:dy">Datum:</strong> 5. September
                                            2025
                                        </p>
                                        <p className="text-gray-700" data-oid="geso3n_">
                                            <strong data-oid="wj36ua.">Gäste:</strong> Familie &
                                            Freunde
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'rsvp' && (
                    <div
                        className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                        data-oid="rsvp-section"
                    >
                        <h2
                            className="text-4xl wedding-title text-center text-gray-700 mb-8"
                            data-oid="rsvp-title"
                        >
                            Gästeanmeldung
                        </h2>

                        {!isSubmitted ? (
                            <form
                                onSubmit={handleRSVPSubmit}
                                className="max-w-2xl mx-auto space-y-6"
                                data-oid="etrjoeh"
                            >
                                {/* Personal Information */}
                                <div className="space-y-4" data-oid="t41liol">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-4 wedding-title"
                                        data-oid="2p-blq8"
                                    >
                                        Persönliche Angaben
                                    </h3>

                                    <div data-oid="usyn:f.">
                                        <label
                                            className="block text-sm wedding-label text-gray-700 mb-2"
                                            data-oid="2jkg353"
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
                                            data-oid="0zjyzz4"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4" data-oid="43078z8">
                                        <div data-oid="9oq:ni8">
                                            <label
                                                className="block text-sm wedding-label text-gray-700 mb-2"
                                                data-oid="xlah51k"
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
                                                data-oid="p17.qi5"
                                            />
                                        </div>

                                        <div data-oid="ht_4w_8">
                                            <label
                                                className="block text-sm wedding-label text-gray-700 mb-2"
                                                data-oid="8naa10b"
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
                                                data-oid="w3n8ddb"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Attendance */}
                                <div className="space-y-4" data-oid="su:ot5.">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-4 wedding-title"
                                        data-oid="a48_79."
                                    >
                                        Teilnahme
                                    </h3>

                                    <div data-oid="t6-9irj">
                                        <label
                                            className="block text-sm wedding-label text-gray-700 mb-3"
                                            data-oid="z:ss:t3"
                                        >
                                            Können Sie an unserer Hochzeit teilnehmen? *
                                        </label>
                                        <div className="flex space-x-4" data-oid="3u3wxmi">
                                            <label className="flex items-center" data-oid="h7ld0e:">
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
                                                    data-oid="70d43r-"
                                                />

                                                <span
                                                    className="text-green-600 font-medium wedding-text"
                                                    data-oid="ml4zeca"
                                                >
                                                    ✓ Ja, ich komme gerne!
                                                </span>
                                            </label>
                                            <label className="flex items-center" data-oid=".55s_ed">
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
                                                    data-oid="7s:iw8u"
                                                />

                                                <span
                                                    className="text-red-600 font-medium wedding-text"
                                                    data-oid="ehr8ug2"
                                                >
                                                    ✗ Leider kann ich nicht
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Meal Preferences - only show if attending */}
                                {rsvpData.attendance === 'yes' && (
                                    <div className="space-y-4" data-oid="ubf0l1g">
                                        <h3
                                            className="text-2xl font-medium text-gray-700 mb-4 wedding-title"
                                            data-oid="pab.sum"
                                        >
                                            Menüwahl
                                        </h3>

                                        <div data-oid="mcs496f">
                                            <label
                                                className="block text-sm wedding-label text-gray-700 mb-3"
                                                data-oid="jhawidg"
                                            >
                                                Ihre Menüwahl *
                                            </label>
                                            <div
                                                className="grid md:grid-cols-2 gap-3"
                                                data-oid="dsg-_tk"
                                            >
                                                <label
                                                    className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                    data-oid="lup7j_3"
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
                                                        data-oid="w4y7_ee"
                                                    />

                                                    <div data-oid="7tdbzc7">
                                                        <div
                                                            className="font-medium wedding-text"
                                                            data-oid="lmndcf6"
                                                        >
                                                            🥩 Fleischgericht
                                                        </div>
                                                        <div
                                                            className="text-sm text-gray-600 wedding-text"
                                                            data-oid="wo4wo22"
                                                        >
                                                            Rinderfilet mit Beilagen
                                                        </div>
                                                    </div>
                                                </label>

                                                <label
                                                    className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                    data-oid="n8j2hzp"
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
                                                        data-oid="56ak-_1"
                                                    />

                                                    <div data-oid="583oocw">
                                                        <div
                                                            className="font-medium wedding-text"
                                                            data-oid="b:t53gd"
                                                        >
                                                            🐟 Fischgericht
                                                        </div>
                                                        <div
                                                            className="text-sm text-gray-600 wedding-text"
                                                            data-oid="81s3mci"
                                                        >
                                                            Lachsfilet mit Gemüse
                                                        </div>
                                                    </div>
                                                </label>

                                                <label
                                                    className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                    data-oid="1z4yrxn"
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
                                                        data-oid="rv093_b"
                                                    />

                                                    <div data-oid="5f_dy3q">
                                                        <div
                                                            className="font-medium wedding-text"
                                                            data-oid="nn3:i2_"
                                                        >
                                                            🥬 Vegetarisch
                                                        </div>
                                                        <div
                                                            className="text-sm text-gray-600 wedding-text"
                                                            data-oid="5s.oqzf"
                                                        >
                                                            Gemüse-Risotto
                                                        </div>
                                                    </div>
                                                </label>

                                                <label
                                                    className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                    data-oid="v6jna6k"
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
                                                        data-oid="mhhzgx0"
                                                    />

                                                    <div data-oid="868w9yk">
                                                        <div
                                                            className="font-medium wedding-text"
                                                            data-oid="bk1.10n"
                                                        >
                                                            🌱 Vegan
                                                        </div>
                                                        <div
                                                            className="text-sm text-gray-600 wedding-text"
                                                            data-oid="1917r39"
                                                        >
                                                            Quinoa-Bowl
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        <div data-oid="ugw.cyr">
                                            <label
                                                className="block text-sm wedding-label text-gray-700 mb-2"
                                                data-oid="w1c9yln"
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
                                                data-oid="0vfol9j"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Plus One - only show if attending */}
                                {rsvpData.attendance === 'yes' && (
                                    <div className="space-y-4" data-oid="l4yq2_s">
                                        <h3
                                            className="text-2xl font-medium text-gray-700 mb-4 wedding-title"
                                            data-oid="g:khs4o"
                                        >
                                            Begleitung
                                        </h3>

                                        <div data-oid="4v101qc">
                                            <label className="flex items-center" data-oid="r5nxrzv">
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
                                                    data-oid="a.bysga"
                                                />

                                                <span
                                                    className="font-medium wedding-text"
                                                    data-oid="-5-tgle"
                                                >
                                                    Ich bringe eine Begleitung mit
                                                </span>
                                            </label>
                                        </div>

                                        {rsvpData.plusOne && (
                                            <div
                                                className="space-y-4 pl-6 border-l-2 border-orange-200"
                                                data-oid="4uhk_yy"
                                            >
                                                <div data-oid="e1h1umd">
                                                    <label
                                                        className="block text-sm wedding-label text-gray-700 mb-2"
                                                        data-oid="_imn06y"
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
                                                        data-oid="yfhjbcy"
                                                    />
                                                </div>

                                                <div data-oid=".20cucx">
                                                    <label
                                                        className="block text-sm wedding-label text-gray-700 mb-3"
                                                        data-oid="mchan1."
                                                    >
                                                        Menüwahl für Begleitung *
                                                    </label>
                                                    <div
                                                        className="grid md:grid-cols-2 gap-3"
                                                        data-oid="o85fe-d"
                                                    >
                                                        <label
                                                            className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                            data-oid="1cwgjrq"
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
                                                                data-oid="b7odzo7"
                                                            />

                                                            <div data-oid="bfkik5p">
                                                                <div
                                                                    className="font-medium wedding-text"
                                                                    data-oid="s5ubn5_"
                                                                >
                                                                    🥩 Fleischgericht
                                                                </div>
                                                            </div>
                                                        </label>

                                                        <label
                                                            className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                            data-oid="fwtokf6"
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
                                                                data-oid="0jnwrk5"
                                                            />

                                                            <div data-oid="z9r0lqv">
                                                                <div
                                                                    className="font-medium wedding-text"
                                                                    data-oid="qmnmeui"
                                                                >
                                                                    🐟 Fischgericht
                                                                </div>
                                                            </div>
                                                        </label>

                                                        <label
                                                            className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                            data-oid="20-s.u9"
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
                                                                data-oid="lliznkj"
                                                            />

                                                            <div data-oid="1o98pk7">
                                                                <div
                                                                    className="font-medium wedding-text"
                                                                    data-oid="cz3dugr"
                                                                >
                                                                    🥬 Vegetarisch
                                                                </div>
                                                            </div>
                                                        </label>

                                                        <label
                                                            className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-orange-50 cursor-pointer"
                                                            data-oid="9.bg_5w"
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
                                                                data-oid="-witj-p"
                                                            />

                                                            <div data-oid="4l9.flv">
                                                                <div
                                                                    className="font-medium wedding-text"
                                                                    data-oid="6x.5ki_"
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
                                <div className="space-y-4" data-oid="uf9-tlc">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-4 wedding-title"
                                        data-oid="spr1k9m"
                                    >
                                        Nachricht
                                    </h3>

                                    <div data-oid="3egl4sk">
                                        <label
                                            className="block text-sm wedding-label text-gray-700 mb-2"
                                            data-oid="zl60qq7"
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
                                            data-oid="bm.6-sd"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-6" data-oid="7yhz5pn">
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-orange-400 to-blue-400 text-white wedding-button py-4 px-8 rounded-lg hover:from-orange-500 hover:to-blue-500 transition-all duration-300 shadow-lg"
                                        data-oid="xpewe-s"
                                    >
                                        RSVP absenden
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="text-center py-12" data-oid="dn8qsh:">
                                <div className="text-6xl mb-6" data-oid="v7mtn8l">
                                    🎉
                                </div>
                                <h3
                                    className="text-3xl wedding-title text-gray-700 mb-4"
                                    data-oid=":bk9ubz"
                                >
                                    Vielen Dank!
                                </h3>
                                <p
                                    className="text-lg text-gray-600 mb-6 wedding-text"
                                    data-oid="x5__dyp"
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
                                        data-oid="_s8zuip"
                                    >
                                        <h4
                                            className="font-medium text-gray-700 mb-2 wedding-label"
                                            data-oid="0ov5f4j"
                                        >
                                            Ihre Anmeldung:
                                        </h4>
                                        <div
                                            className="text-sm text-gray-600 space-y-1 wedding-text"
                                            data-oid="h46fzt-"
                                        >
                                            <p data-oid="-11z034">
                                                <strong data-oid="wqq126:">Name:</strong>{' '}
                                                {rsvpData.name}
                                            </p>
                                            <p data-oid="wr2lz.7">
                                                <strong data-oid="oq:1.ly">Menü:</strong>{' '}
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
                                                    <p data-oid="13u7wb9">
                                                        <strong data-oid="_h3svue">
                                                            Begleitung:
                                                        </strong>{' '}
                                                        {rsvpData.plusOneName}
                                                    </p>
                                                    <p data-oid="z72e9zj">
                                                        <strong data-oid="9lq6tnv">
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
                                    data-oid="0fel79e"
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
                data-oid="_z31k5y"
            >
                <div className="max-w-4xl mx-auto text-center px-6" data-oid="3y47bl6">
                    <h3 className="text-3xl wedding-title text-gray-700 mb-4" data-oid="c4p4z92">
                        Johanna & Lukas
                    </h3>
                    <p className="text-gray-600 mb-6 wedding-text" data-oid="sqk_5sc">
                        Wir freuen uns darauf, diesen besonderen Tag mit euch zu teilen!
                    </p>
                    <div className="flex justify-center space-x-4 text-2xl" data-oid="sfstw:z">
                        <span data-oid="w9g-ly6">💕</span>
                        <span data-oid="uakzkx-">💍</span>
                        <span data-oid="1n1s4v8">👰‍♀️</span>
                        <span data-oid="k_872eb">🤵‍♂️</span>
                        <span data-oid="edcpw1u">🎉</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
