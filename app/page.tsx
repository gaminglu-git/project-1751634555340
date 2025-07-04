'use client';

import { useState } from 'react';

export default function Page() {
    const [activeTab, setActiveTab] = useState('story');

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50"
            data-oid="artsuyv"
        >
            {/* Header */}
            <header
                className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50"
                data-oid="6yf9evp"
            >
                <div className="max-w-6xl mx-auto px-6 py-4" data-oid="tv49_69">
                    <nav className="flex justify-center space-x-8" data-oid="36bqj7l">
                        <button
                            onClick={() => setActiveTab('story')}
                            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'story' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="ukt-w36"
                        >
                            Unsere Geschichte
                        </button>
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'events' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="-039.bx"
                        >
                            Termine
                        </button>
                        <button
                            onClick={() => setActiveTab('location')}
                            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'location' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="lvfem4v"
                        >
                            Locations
                        </button>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="text-center py-20 px-6" data-oid="fbe53:7">
                <div className="max-w-4xl mx-auto" data-oid="u7dz2kx">
                    <div className="mb-8" data-oid=".eyoveg">
                        <h1
                            className="text-6xl md:text-8xl font-light text-orange-300 mb-4"
                            style={{ fontFamily: 'serif' }}
                            data-oid="10ytmwk"
                        >
                            Johanna & Lukas
                        </h1>
                        <div
                            className="w-32 h-px bg-gradient-to-r from-orange-300 to-blue-300 mx-auto mb-6"
                            data-oid="0aaux-f"
                        ></div>
                        <p className="text-2xl text-gray-600 font-light" data-oid="hcktrq4">
                            Wir heiraten!
                        </p>
                    </div>

                    <div
                        className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                        data-oid="ept7i9i"
                    >
                        <div className="grid md:grid-cols-2 gap-8" data-oid="3eh75la">
                            <div className="text-center" data-oid="8lrtl7.">
                                <div className="text-4xl text-orange-400 mb-2" data-oid="ku-ld79">
                                    💒
                                </div>
                                <h3
                                    className="text-xl font-medium text-gray-700 mb-2"
                                    data-oid="hybmqy_"
                                >
                                    Standesamtliche Trauung
                                </h3>
                                <p className="text-lg text-blue-600 font-medium" data-oid="zdpfarn">
                                    16. August 2025
                                </p>
                                <p className="text-gray-600" data-oid="vrbb3ie">
                                    Burg Brüggen
                                </p>
                            </div>
                            <div className="text-center" data-oid="g2doa:d">
                                <div className="text-4xl text-blue-400 mb-2" data-oid=".hswmow">
                                    🎉
                                </div>
                                <h3
                                    className="text-xl font-medium text-gray-700 mb-2"
                                    data-oid="427g20w"
                                >
                                    Große Feier
                                </h3>
                                <p className="text-lg text-blue-600 font-medium" data-oid="me3b6.-">
                                    5. September 2025
                                </p>
                                <p className="text-gray-600" data-oid="cq1rylm">
                                    Restaurant Waldau, Bonn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <main className="max-w-6xl mx-auto px-6 pb-20" data-oid="k7m_rij">
                {activeTab === 'story' && (
                    <div
                        className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-orange-100"
                        data-oid="8p_yd-f"
                    >
                        <h2
                            className="text-4xl font-light text-center text-gray-700 mb-12"
                            style={{ fontFamily: 'serif' }}
                            data-oid="iikjul6"
                        >
                            Unsere Liebesgeschichte
                        </h2>

                        <div className="space-y-12" data-oid="k:y51qb">
                            <div className="flex items-center space-x-8" data-oid="h_nv1yo">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center text-2xl"
                                    data-oid="tcyruob"
                                >
                                    💕
                                </div>
                                <div data-oid="iilrtfo">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-2"
                                        data-oid=":5a4u9m"
                                    >
                                        13. Mai 2018
                                    </h3>
                                    <p className="text-lg text-gray-600" data-oid="6gtez1s">
                                        Der Tag, an dem wir uns ineinander verliebt haben
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-8" data-oid="n_2f:-.">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center text-2xl"
                                    data-oid="3h3.r.s"
                                >
                                    💍
                                </div>
                                <div data-oid="se9f:mp">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-2"
                                        data-oid="dsq8poi"
                                    >
                                        13. August 2024
                                    </h3>
                                    <p className="text-lg text-gray-600" data-oid="gw66lw4">
                                        Unser Verlobungstag - der Beginn unseres gemeinsamen Weges
                                        zum Altar
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-8" data-oid="v_1e9tl">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-orange-300 to-blue-300 rounded-full flex items-center justify-center text-2xl"
                                    data-oid="w4i-tej"
                                >
                                    👰‍♀️🤵‍♂️
                                </div>
                                <div data-oid="9_cfwa8">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-2"
                                        data-oid="al5lmav"
                                    >
                                        2025
                                    </h3>
                                    <p className="text-lg text-gray-600" data-oid="1u0r28i">
                                        Das Jahr, in dem wir Mann und Frau werden
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'events' && (
                    <div className="grid md:grid-cols-2 gap-8" data-oid="u7ekwe2">
                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                            data-oid="8:5e7zq"
                        >
                            <div className="text-center mb-6" data-oid="dezrjnm">
                                <div className="text-5xl mb-4" data-oid="-7-ead9">
                                    💒
                                </div>
                                <h3
                                    className="text-3xl font-light text-gray-700 mb-2"
                                    style={{ fontFamily: 'serif' }}
                                    data-oid="50dymza"
                                >
                                    Standesamtliche Trauung
                                </h3>
                            </div>
                            <div className="space-y-4" data-oid="1bra2h4">
                                <div
                                    className="flex justify-between items-center py-2 border-b border-orange-100"
                                    data-oid="mmr6_nl"
                                >
                                    <span className="text-gray-600" data-oid=".0stsio">
                                        Datum:
                                    </span>
                                    <span className="font-medium text-blue-600" data-oid="_o:zpmg">
                                        16. August 2025
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-orange-100"
                                    data-oid="qzh2-sk"
                                >
                                    <span className="text-gray-600" data-oid="os-d8d:">
                                        Ort:
                                    </span>
                                    <span className="font-medium" data-oid="u02x9f.">
                                        Burg Brüggen
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-orange-100"
                                    data-oid="0p.ko:m"
                                >
                                    <span className="text-gray-600" data-oid="2hroiob">
                                        Adresse:
                                    </span>
                                    <span className="font-medium" data-oid="bkgctvd">
                                        41379 Brüggen
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2"
                                    data-oid="mrfcv51"
                                >
                                    <span className="text-gray-600" data-oid="nn1m9rf">
                                        Gäste:
                                    </span>
                                    <span className="font-medium" data-oid="t2bz:9y">
                                        Engster Familienkreis
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100"
                            data-oid="ub:4os1"
                        >
                            <div className="text-center mb-6" data-oid="mc7r8-1">
                                <div className="text-5xl mb-4" data-oid="jqlg1g5">
                                    🎉
                                </div>
                                <h3
                                    className="text-3xl font-light text-gray-700 mb-2"
                                    style={{ fontFamily: 'serif' }}
                                    data-oid="nqg4gi3"
                                >
                                    Große Feier
                                </h3>
                            </div>
                            <div className="space-y-4" data-oid="va0g4u7">
                                <div
                                    className="flex justify-between items-center py-2 border-b border-blue-100"
                                    data-oid="cou_yqs"
                                >
                                    <span className="text-gray-600" data-oid=":6d0kcl">
                                        Datum:
                                    </span>
                                    <span className="font-medium text-blue-600" data-oid="cvhp-16">
                                        5. September 2025
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-blue-100"
                                    data-oid="wv2t8vs"
                                >
                                    <span className="text-gray-600" data-oid="ite-vuc">
                                        Ort:
                                    </span>
                                    <span className="font-medium" data-oid="infsgpz">
                                        Restaurant Waldau
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-blue-100"
                                    data-oid="qvvu.0l"
                                >
                                    <span className="text-gray-600" data-oid="hd4eiur">
                                        Stadt:
                                    </span>
                                    <span className="font-medium" data-oid="s:2qccl">
                                        Bonn
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2"
                                    data-oid="00ot2o3"
                                >
                                    <span className="text-gray-600" data-oid=":8s_1m0">
                                        Gäste:
                                    </span>
                                    <span className="font-medium" data-oid="m04u_y9">
                                        Familie & Freunde
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'location' && (
                    <div className="space-y-8" data-oid="gfj25uw">
                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                            data-oid="cp-n-h6"
                        >
                            <h3
                                className="text-3xl font-light text-center text-gray-700 mb-8"
                                style={{ fontFamily: 'serif' }}
                                data-oid="htmr660"
                            >
                                Burg Brüggen
                            </h3>
                            <div
                                className="grid md:grid-cols-2 gap-8 items-center"
                                data-oid="zbc0.e7"
                            >
                                <div data-oid="knsw_-t">
                                    <p className="text-lg text-gray-600 mb-4" data-oid="qszgtax">
                                        Unsere standesamtliche Trauung findet in der historischen
                                        Burg Brüggen statt - ein romantischer Ort voller Geschichte
                                        für den Beginn unserer gemeinsamen Zukunft.
                                    </p>
                                    <div className="space-y-2" data-oid="wco8iz3">
                                        <p className="text-gray-700" data-oid="k8y-wsr">
                                            <strong data-oid="rdkq3lk">Adresse:</strong> 41379
                                            Brüggen
                                        </p>
                                        <p className="text-gray-700" data-oid="59b7ad_">
                                            <strong data-oid=":c1oe5v">Datum:</strong> 16. August
                                            2025
                                        </p>
                                        <p className="text-gray-700" data-oid="un_f66q">
                                            <strong data-oid="qjpanid">Gäste:</strong> Engster
                                            Familienkreis
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8 text-center"
                                    data-oid="zwi1ju3"
                                >
                                    <div className="text-6xl mb-4" data-oid="1qdo4ch">
                                        🏰
                                    </div>
                                    <p className="text-gray-600" data-oid="h4saeae">
                                        Historische Burg Brüggen
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100"
                            data-oid="89eax-8"
                        >
                            <h3
                                className="text-3xl font-light text-center text-gray-700 mb-8"
                                style={{ fontFamily: 'serif' }}
                                data-oid="jrn:e60"
                            >
                                Restaurant Waldau
                            </h3>
                            <div
                                className="grid md:grid-cols-2 gap-8 items-center"
                                data-oid="_uevmeu"
                            >
                                <div
                                    className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 text-center"
                                    data-oid="51lk5eb"
                                >
                                    <div className="text-6xl mb-4" data-oid="jkljg7w">
                                        🌲
                                    </div>
                                    <p className="text-gray-600" data-oid="ibk9pl1">
                                        Restaurant Waldau, Bonn
                                    </p>
                                </div>
                                <div data-oid="unfc-mv">
                                    <p className="text-lg text-gray-600 mb-4" data-oid="o96s.:w">
                                        Unsere große Feier und freie Trauung findet im wunderschönen
                                        Restaurant Waldau in Bonn statt - hier feiern wir mit all
                                        unseren Liebsten diesen besonderen Tag.
                                    </p>
                                    <div className="space-y-2" data-oid="0pvfq6h">
                                        <p className="text-gray-700" data-oid="fozp7-z">
                                            <strong data-oid="trlzw_x">Ort:</strong> Restaurant
                                            Waldau
                                        </p>
                                        <p className="text-gray-700" data-oid="zb.i:s5">
                                            <strong data-oid="96fpubk">Stadt:</strong> Bonn
                                        </p>
                                        <p className="text-gray-700" data-oid="kidnq8u">
                                            <strong data-oid="5exz_:2">Datum:</strong> 5. September
                                            2025
                                        </p>
                                        <p className="text-gray-700" data-oid="kp1ta_v">
                                            <strong data-oid="k70lx.u">Gäste:</strong> Familie &
                                            Freunde
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer
                className="bg-white/80 backdrop-blur-sm border-t border-orange-100 py-12"
                data-oid="23qz9i5"
            >
                <div className="max-w-4xl mx-auto text-center px-6" data-oid="m-r-0rc">
                    <h3
                        className="text-3xl font-light text-gray-700 mb-4"
                        style={{ fontFamily: 'serif' }}
                        data-oid="5c-7knh"
                    >
                        Johanna & Lukas
                    </h3>
                    <p className="text-gray-600 mb-6" data-oid="8d98t1k">
                        Wir freuen uns darauf, diesen besonderen Tag mit euch zu teilen!
                    </p>
                    <div className="flex justify-center space-x-4 text-2xl" data-oid="rrk6mx-">
                        <span data-oid="yscj9--">💕</span>
                        <span data-oid="86rg0e0">💍</span>
                        <span data-oid="enip5q9">👰‍♀️</span>
                        <span data-oid="6skdhff">🤵‍♂️</span>
                        <span data-oid="81a435a">🎉</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
