'use client';

import { useState } from 'react';

export default function Page() {
    const [activeTab, setActiveTab] = useState('story');

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50"
            data-oid="od25fjm"
        >
            {/* Header */}
            <header
                className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50"
                data-oid="f-:-r85"
            >
                <div className="max-w-6xl mx-auto px-6 py-4" data-oid="muv-bkp">
                    <nav className="flex justify-center space-x-8" data-oid=".jwy9lb">
                        <button
                            onClick={() => setActiveTab('story')}
                            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'story' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="pf.tos."
                        >
                            Unsere Geschichte
                        </button>
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'events' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="jzxao4i"
                        >
                            Termine
                        </button>
                        <button
                            onClick={() => setActiveTab('location')}
                            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'location' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="pn.pzik"
                        >
                            Locations
                        </button>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="text-center py-20 px-6" data-oid="3p_p8h5">
                <div className="max-w-4xl mx-auto" data-oid="20vxawd">
                    <div className="mb-8" data-oid="hj1dji_">
                        <h1
                            className="text-6xl md:text-8xl font-light text-orange-300 mb-4"
                            style={{ fontFamily: 'serif' }}
                            data-oid="9yv_5-w"
                        >
                            Johanna & Lukas
                        </h1>
                        <div
                            className="w-32 h-px bg-gradient-to-r from-orange-300 to-blue-300 mx-auto mb-6"
                            data-oid="i0rjg0g"
                        ></div>
                        <p className="text-2xl text-gray-600 font-light" data-oid="7sh4tee">
                            Wir heiraten!
                        </p>
                    </div>

                    <div
                        className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                        data-oid="o7ny.gl"
                    >
                        <div className="grid md:grid-cols-2 gap-8" data-oid="ggu.3iu">
                            <div className="text-center" data-oid="48:gsv8">
                                <div className="text-4xl text-orange-400 mb-2" data-oid="sdr.ycp">
                                    💒
                                </div>
                                <h3
                                    className="text-xl font-medium text-gray-700 mb-2"
                                    data-oid="_fuw81t"
                                >
                                    Standesamtliche Trauung
                                </h3>
                                <p className="text-lg text-blue-600 font-medium" data-oid="4i_ogq.">
                                    16. August 2025
                                </p>
                                <p className="text-gray-600" data-oid="ovpg_bq">
                                    Burg Brüggen
                                </p>
                            </div>
                            <div className="text-center" data-oid="4a:1nee">
                                <div className="text-4xl text-blue-400 mb-2" data-oid="vy-naws">
                                    🎉
                                </div>
                                <h3
                                    className="text-xl font-medium text-gray-700 mb-2"
                                    data-oid="xy-ic5m"
                                >
                                    Große Feier
                                </h3>
                                <p className="text-lg text-blue-600 font-medium" data-oid="dey7_hz">
                                    5. September 2025
                                </p>
                                <p className="text-gray-600" data-oid=":8hs:7n">
                                    Restaurant Waldau, Bonn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <main className="max-w-6xl mx-auto px-6 pb-20" data-oid="b31u477">
                {activeTab === 'story' && (
                    <div
                        className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-orange-100"
                        data-oid="y_nagsp"
                    >
                        <h2
                            className="text-4xl font-light text-center text-gray-700 mb-12"
                            style={{ fontFamily: 'serif' }}
                            data-oid="b9l0-pi"
                        >
                            Unsere Liebesgeschichte
                        </h2>

                        <div className="space-y-12" data-oid="3gcu3hw">
                            <div className="flex items-center space-x-8" data-oid="5mf1i7j">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center text-2xl"
                                    data-oid="d2_z.z5"
                                >
                                    💕
                                </div>
                                <div data-oid="z6k9-4s">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-2"
                                        data-oid="f6k_a6r"
                                    >
                                        13. Mai 2018
                                    </h3>
                                    <p className="text-lg text-gray-600" data-oid="jjoy63i">
                                        Der Tag, an dem wir uns ineinander verliebt haben
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-8" data-oid="4m:vhmu">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center text-2xl"
                                    data-oid="xqiyi9a"
                                >
                                    💍
                                </div>
                                <div data-oid="op0xufs">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-2"
                                        data-oid="kau7.za"
                                    >
                                        13. August 2024
                                    </h3>
                                    <p className="text-lg text-gray-600" data-oid="pl80s-e">
                                        Unser Verlobungstag - der Beginn unseres gemeinsamen Weges
                                        zum Altar
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-8" data-oid="n2a2i:0">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-orange-300 to-blue-300 rounded-full flex items-center justify-center text-2xl"
                                    data-oid="xreymh6"
                                >
                                    👰‍♀️🤵‍♂️
                                </div>
                                <div data-oid="a8eqhlt">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-2"
                                        data-oid=":6..ly5"
                                    >
                                        2025
                                    </h3>
                                    <p className="text-lg text-gray-600" data-oid="2fgz7ee">
                                        Das Jahr, in dem wir Mann und Frau werden
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'events' && (
                    <div className="grid md:grid-cols-2 gap-8" data-oid="j:g-k47">
                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                            data-oid="-171cmi"
                        >
                            <div className="text-center mb-6" data-oid="t-7yjjn">
                                <div className="text-5xl mb-4" data-oid="cwfy46t">
                                    💒
                                </div>
                                <h3
                                    className="text-3xl font-light text-gray-700 mb-2"
                                    style={{ fontFamily: 'serif' }}
                                    data-oid="h_s1kn:"
                                >
                                    Standesamtliche Trauung
                                </h3>
                            </div>
                            <div className="space-y-4" data-oid="u0636f1">
                                <div
                                    className="flex justify-between items-center py-2 border-b border-orange-100"
                                    data-oid="gqaw4y1"
                                >
                                    <span className="text-gray-600" data-oid="e5bikke">
                                        Datum:
                                    </span>
                                    <span className="font-medium text-blue-600" data-oid="fvlwt_3">
                                        16. August 2025
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-orange-100"
                                    data-oid="qx3mdqy"
                                >
                                    <span className="text-gray-600" data-oid="c2ef42o">
                                        Ort:
                                    </span>
                                    <span className="font-medium" data-oid="tf_g7vr">
                                        Burg Brüggen
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-orange-100"
                                    data-oid="v48u285"
                                >
                                    <span className="text-gray-600" data-oid="5823b_4">
                                        Adresse:
                                    </span>
                                    <span className="font-medium" data-oid="73h84-c">
                                        41379 Brüggen
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2"
                                    data-oid="2pt09--"
                                >
                                    <span className="text-gray-600" data-oid="zc4gca.">
                                        Gäste:
                                    </span>
                                    <span className="font-medium" data-oid="pp9itgr">
                                        Engster Familienkreis
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100"
                            data-oid="5.wrdg-"
                        >
                            <div className="text-center mb-6" data-oid="dtifd-9">
                                <div className="text-5xl mb-4" data-oid=".7-4owz">
                                    🎉
                                </div>
                                <h3
                                    className="text-3xl font-light text-gray-700 mb-2"
                                    style={{ fontFamily: 'serif' }}
                                    data-oid="arr15q3"
                                >
                                    Große Feier
                                </h3>
                            </div>
                            <div className="space-y-4" data-oid="c1w6pu0">
                                <div
                                    className="flex justify-between items-center py-2 border-b border-blue-100"
                                    data-oid="jp6lyxc"
                                >
                                    <span className="text-gray-600" data-oid="a4id8cb">
                                        Datum:
                                    </span>
                                    <span className="font-medium text-blue-600" data-oid="565rgt_">
                                        5. September 2025
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-blue-100"
                                    data-oid="jbcrae2"
                                >
                                    <span className="text-gray-600" data-oid="c9_3k5h">
                                        Ort:
                                    </span>
                                    <span className="font-medium" data-oid="y-74ru0">
                                        Restaurant Waldau
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-blue-100"
                                    data-oid="_iirld9"
                                >
                                    <span className="text-gray-600" data-oid="jxvzdl7">
                                        Stadt:
                                    </span>
                                    <span className="font-medium" data-oid="t:uy0i3">
                                        Bonn
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2"
                                    data-oid="13zcno9"
                                >
                                    <span className="text-gray-600" data-oid="1s8rfd4">
                                        Gäste:
                                    </span>
                                    <span className="font-medium" data-oid="l2gy7yn">
                                        Familie & Freunde
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'location' && (
                    <div className="space-y-8" data-oid="q1d4yi5">
                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                            data-oid="fj_o7y-"
                        >
                            <h3
                                className="text-3xl font-light text-center text-gray-700 mb-8"
                                style={{ fontFamily: 'serif' }}
                                data-oid="h72esbt"
                            >
                                Burg Brüggen
                            </h3>
                            <div
                                className="grid md:grid-cols-2 gap-8 items-center"
                                data-oid="5pelans"
                            >
                                <div data-oid="uljtczb">
                                    <p className="text-lg text-gray-600 mb-4" data-oid="s6peva7">
                                        Unsere standesamtliche Trauung findet in der historischen
                                        Burg Brüggen statt - ein romantischer Ort voller Geschichte
                                        für den Beginn unserer gemeinsamen Zukunft.
                                    </p>
                                    <div className="space-y-2" data-oid="9.27ped">
                                        <p className="text-gray-700" data-oid="5r22z5i">
                                            <strong data-oid="jzoymzh">Adresse:</strong> 41379
                                            Brüggen
                                        </p>
                                        <p className="text-gray-700" data-oid="db1bs.h">
                                            <strong data-oid="a7.wli8">Datum:</strong> 16. August
                                            2025
                                        </p>
                                        <p className="text-gray-700" data-oid="ecfgabs">
                                            <strong data-oid=".mq_bfx">Gäste:</strong> Engster
                                            Familienkreis
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8 text-center"
                                    data-oid="o_ms.sb"
                                >
                                    <div className="text-6xl mb-4" data-oid="7x1z5to">
                                        🏰
                                    </div>
                                    <p className="text-gray-600" data-oid="m1obyhe">
                                        Historische Burg Brüggen
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100"
                            data-oid="b84shd0"
                        >
                            <h3
                                className="text-3xl font-light text-center text-gray-700 mb-8"
                                style={{ fontFamily: 'serif' }}
                                data-oid="ydfwv8."
                            >
                                Restaurant Waldau
                            </h3>
                            <div
                                className="grid md:grid-cols-2 gap-8 items-center"
                                data-oid="4hl7t_9"
                            >
                                <div
                                    className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 text-center"
                                    data-oid="2t-60ez"
                                >
                                    <div className="text-6xl mb-4" data-oid="klzhe_:">
                                        🌲
                                    </div>
                                    <p className="text-gray-600" data-oid="0w-yw9h">
                                        Restaurant Waldau, Bonn
                                    </p>
                                </div>
                                <div data-oid="ly.iwzw">
                                    <p className="text-lg text-gray-600 mb-4" data-oid="q.d1iwc">
                                        Unsere große Feier und freie Trauung findet im wunderschönen
                                        Restaurant Waldau in Bonn statt - hier feiern wir mit all
                                        unseren Liebsten diesen besonderen Tag.
                                    </p>
                                    <div className="space-y-2" data-oid="jtqxrgo">
                                        <p className="text-gray-700" data-oid="n9lr_ol">
                                            <strong data-oid="-wc4yvy">Ort:</strong> Restaurant
                                            Waldau
                                        </p>
                                        <p className="text-gray-700" data-oid="vtk6lct">
                                            <strong data-oid="ryzcq7y">Stadt:</strong> Bonn
                                        </p>
                                        <p className="text-gray-700" data-oid="k.u5m91">
                                            <strong data-oid="o-xykzm">Datum:</strong> 5. September
                                            2025
                                        </p>
                                        <p className="text-gray-700" data-oid="e:t4_m0">
                                            <strong data-oid="igjq8hu">Gäste:</strong> Familie &
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
                data-oid="vl9a09h"
            >
                <div className="max-w-4xl mx-auto text-center px-6" data-oid=":k5h7l7">
                    <h3
                        className="text-3xl font-light text-gray-700 mb-4"
                        style={{ fontFamily: 'serif' }}
                        data-oid="ji6buea"
                    >
                        Johanna & Lukas
                    </h3>
                    <p className="text-gray-600 mb-6" data-oid="iqpp339">
                        Wir freuen uns darauf, diesen besonderen Tag mit euch zu teilen!
                    </p>
                    <div className="flex justify-center space-x-4 text-2xl" data-oid="c:nczxj">
                        <span data-oid="s9rl76h">💕</span>
                        <span data-oid="u-6s.wf">💍</span>
                        <span data-oid="mwi:01b">👰‍♀️</span>
                        <span data-oid="rmjcrjr">🤵‍♂️</span>
                        <span data-oid="6y1fn.7">🎉</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
