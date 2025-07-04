'use client';

import { useState } from 'react';

export default function Page() {
    const [activeTab, setActiveTab] = useState('story');

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50"
            data-oid="ti7ji6x"
        >
            {/* Header */}
            <header
                className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50"
                data-oid="gnopw9w"
            >
                <div className="max-w-6xl mx-auto px-6 py-4" data-oid="_ltx168">
                    <nav className="flex justify-center space-x-8" data-oid="e2o24bc">
                        <button
                            onClick={() => setActiveTab('story')}
                            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'story' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="y:04xuz"
                        >
                            Unsere Geschichte
                        </button>
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'events' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="qb8xkm6"
                        >
                            Termine
                        </button>
                        <button
                            onClick={() => setActiveTab('location')}
                            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'location' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                            data-oid="pj_1mtn"
                        >
                            Locations
                        </button>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="text-center py-20 px-6" data-oid="rsku6aw">
                <div className="max-w-4xl mx-auto" data-oid="v9e093-">
                    <div className="mb-8" data-oid="1loojm:">
                        <h1
                            className="text-6xl md:text-8xl font-light text-orange-300 mb-4"
                            style={{ fontFamily: 'serif' }}
                            data-oid="jcin920"
                        >
                            Johanna & Lukas
                        </h1>
                        <div
                            className="w-32 h-px bg-gradient-to-r from-orange-300 to-blue-300 mx-auto mb-6"
                            data-oid="a35fdej"
                        ></div>
                        <p className="text-2xl text-gray-600 font-light" data-oid="s:2y598">
                            Wir heiraten!
                        </p>
                    </div>

                    <div
                        className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                        data-oid="a6bv.fi"
                    >
                        <div className="grid md:grid-cols-2 gap-8" data-oid="6rcl5ev">
                            <div className="text-center" data-oid="33l-0i8">
                                <div className="text-4xl text-orange-400 mb-2" data-oid="1mcl6.c">
                                    💒
                                </div>
                                <h3
                                    className="text-xl font-medium text-gray-700 mb-2"
                                    data-oid="hm2vlim"
                                >
                                    Standesamtliche Trauung
                                </h3>
                                <p className="text-lg text-blue-600 font-medium" data-oid="ag7.ch3">
                                    16. August 2025
                                </p>
                                <p className="text-gray-600" data-oid="otghye9">
                                    Burg Brüggen
                                </p>
                            </div>
                            <div className="text-center" data-oid="0zuxfza">
                                <div className="text-4xl text-blue-400 mb-2" data-oid="159t7a.">
                                    🎉
                                </div>
                                <h3
                                    className="text-xl font-medium text-gray-700 mb-2"
                                    data-oid="r-3_82c"
                                >
                                    Große Feier
                                </h3>
                                <p className="text-lg text-blue-600 font-medium" data-oid="fl1py2c">
                                    5. September 2025
                                </p>
                                <p className="text-gray-600" data-oid="criz899">
                                    Restaurant Waldau, Bonn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <main className="max-w-6xl mx-auto px-6 pb-20" data-oid="hqr.:3l">
                {activeTab === 'story' && (
                    <div
                        className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-orange-100"
                        data-oid="azlnyp8"
                    >
                        <h2
                            className="text-4xl font-light text-center text-gray-700 mb-12"
                            style={{ fontFamily: 'serif' }}
                            data-oid="cu2os51"
                        >
                            Unsere Liebesgeschichte
                        </h2>

                        <div className="space-y-12" data-oid="tktdv9s">
                            <div className="flex items-center space-x-8" data-oid="k:iri8q">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center text-2xl"
                                    data-oid="bf-nzu4"
                                >
                                    💕
                                </div>
                                <div data-oid="m32gb5o">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-2"
                                        data-oid="z5rmmu5"
                                    >
                                        13. Mai 2018
                                    </h3>
                                    <p className="text-lg text-gray-600" data-oid="sbyzjbp">
                                        Der Tag, an dem wir uns ineinander verliebt haben
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-8" data-oid="o.x6win">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center text-2xl"
                                    data-oid="kxwwoqp"
                                >
                                    💍
                                </div>
                                <div data-oid="i9en-do">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-2"
                                        data-oid="8l.v9.c"
                                    >
                                        13. August 2024
                                    </h3>
                                    <p className="text-lg text-gray-600" data-oid="9pw.7c9">
                                        Unser Verlobungstag - der Beginn unseres gemeinsamen Weges
                                        zum Altar
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-8" data-oid="oekyw.8">
                                <div
                                    className="w-20 h-20 bg-gradient-to-br from-orange-300 to-blue-300 rounded-full flex items-center justify-center text-2xl"
                                    data-oid="sr294ns"
                                >
                                    👰‍♀️🤵‍♂️
                                </div>
                                <div data-oid="32r4qrq">
                                    <h3
                                        className="text-2xl font-medium text-gray-700 mb-2"
                                        data-oid="00_-_0m"
                                    >
                                        2025
                                    </h3>
                                    <p className="text-lg text-gray-600" data-oid="ufepsyu">
                                        Das Jahr, in dem wir Mann und Frau werden
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'events' && (
                    <div className="grid md:grid-cols-2 gap-8" data-oid="3km7e..">
                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                            data-oid="6n8cf1n"
                        >
                            <div className="text-center mb-6" data-oid="w3y_zav">
                                <div className="text-5xl mb-4" data-oid="ukluyx2">
                                    💒
                                </div>
                                <h3
                                    className="text-3xl font-light text-gray-700 mb-2"
                                    style={{ fontFamily: 'serif' }}
                                    data-oid="na7xn86"
                                >
                                    Standesamtliche Trauung
                                </h3>
                            </div>
                            <div className="space-y-4" data-oid="2ug9qr.">
                                <div
                                    className="flex justify-between items-center py-2 border-b border-orange-100"
                                    data-oid="kkpo6gm"
                                >
                                    <span className="text-gray-600" data-oid="f6vv9.a">
                                        Datum:
                                    </span>
                                    <span className="font-medium text-blue-600" data-oid="ztxs51_">
                                        16. August 2025
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-orange-100"
                                    data-oid="nukr5dk"
                                >
                                    <span className="text-gray-600" data-oid="kqkfdn-">
                                        Ort:
                                    </span>
                                    <span className="font-medium" data-oid="n2u6l_v">
                                        Burg Brüggen
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-orange-100"
                                    data-oid="ykw.fbn"
                                >
                                    <span className="text-gray-600" data-oid="kxh4xqr">
                                        Adresse:
                                    </span>
                                    <span className="font-medium" data-oid="ckmsvjl">
                                        41379 Brüggen
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2"
                                    data-oid="nm-6m32"
                                >
                                    <span className="text-gray-600" data-oid="5hb6rtc">
                                        Gäste:
                                    </span>
                                    <span className="font-medium" data-oid="hhhpm7m">
                                        Engster Familienkreis
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100"
                            data-oid="u32i5xp"
                        >
                            <div className="text-center mb-6" data-oid="42z73_y">
                                <div className="text-5xl mb-4" data-oid="mewhjn_">
                                    🎉
                                </div>
                                <h3
                                    className="text-3xl font-light text-gray-700 mb-2"
                                    style={{ fontFamily: 'serif' }}
                                    data-oid="g-z4_az"
                                >
                                    Große Feier
                                </h3>
                            </div>
                            <div className="space-y-4" data-oid="6s8udfi">
                                <div
                                    className="flex justify-between items-center py-2 border-b border-blue-100"
                                    data-oid="262o73."
                                >
                                    <span className="text-gray-600" data-oid="v6aastn">
                                        Datum:
                                    </span>
                                    <span className="font-medium text-blue-600" data-oid="juf.1c:">
                                        5. September 2025
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-blue-100"
                                    data-oid="ltqhh-n"
                                >
                                    <span className="text-gray-600" data-oid="mtd.tr6">
                                        Ort:
                                    </span>
                                    <span className="font-medium" data-oid="xsxz.tk">
                                        Restaurant Waldau
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2 border-b border-blue-100"
                                    data-oid=".2cy_dp"
                                >
                                    <span className="text-gray-600" data-oid="xg3dxvh">
                                        Stadt:
                                    </span>
                                    <span className="font-medium" data-oid="zvuu6vk">
                                        Bonn
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between items-center py-2"
                                    data-oid="0abbsei"
                                >
                                    <span className="text-gray-600" data-oid="utluoax">
                                        Gäste:
                                    </span>
                                    <span className="font-medium" data-oid="_1yf3ho">
                                        Familie & Freunde
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'location' && (
                    <div className="space-y-8" data-oid="vmgk6a2">
                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100"
                            data-oid="tp9r5oq"
                        >
                            <h3
                                className="text-3xl font-light text-center text-gray-700 mb-8"
                                style={{ fontFamily: 'serif' }}
                                data-oid="5.pmdox"
                            >
                                Burg Brüggen
                            </h3>
                            <div
                                className="grid md:grid-cols-2 gap-8 items-center"
                                data-oid="2y_-xmu"
                            >
                                <div data-oid="kee8s1:">
                                    <p className="text-lg text-gray-600 mb-4" data-oid="iifjtjj">
                                        Unsere standesamtliche Trauung findet in der historischen
                                        Burg Brüggen statt - ein romantischer Ort voller Geschichte
                                        für den Beginn unserer gemeinsamen Zukunft.
                                    </p>
                                    <div className="space-y-2" data-oid="ra16nm3">
                                        <p className="text-gray-700" data-oid="z6c9l05">
                                            <strong data-oid="c1stoqb">Adresse:</strong> 41379
                                            Brüggen
                                        </p>
                                        <p className="text-gray-700" data-oid="1rj77h7">
                                            <strong data-oid="5y2vqo_">Datum:</strong> 16. August
                                            2025
                                        </p>
                                        <p className="text-gray-700" data-oid="u:afjcn">
                                            <strong data-oid="jk:z_.j">Gäste:</strong> Engster
                                            Familienkreis
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8 text-center"
                                    data-oid="qktasse"
                                >
                                    <div className="text-6xl mb-4" data-oid="3dvi-vd">
                                        🏰
                                    </div>
                                    <p className="text-gray-600" data-oid="1m3o5o_">
                                        Historische Burg Brüggen
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100"
                            data-oid="_64u.-v"
                        >
                            <h3
                                className="text-3xl font-light text-center text-gray-700 mb-8"
                                style={{ fontFamily: 'serif' }}
                                data-oid="gv-9rmw"
                            >
                                Restaurant Waldau
                            </h3>
                            <div
                                className="grid md:grid-cols-2 gap-8 items-center"
                                data-oid="bzyc7d-"
                            >
                                <div
                                    className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 text-center"
                                    data-oid="h30r7ps"
                                >
                                    <div className="text-6xl mb-4" data-oid="wq8oj6h">
                                        🌲
                                    </div>
                                    <p className="text-gray-600" data-oid="4ch.4cu">
                                        Restaurant Waldau, Bonn
                                    </p>
                                </div>
                                <div data-oid="fy7s-yc">
                                    <p className="text-lg text-gray-600 mb-4" data-oid="wa2w:mh">
                                        Unsere große Feier und freie Trauung findet im wunderschönen
                                        Restaurant Waldau in Bonn statt - hier feiern wir mit all
                                        unseren Liebsten diesen besonderen Tag.
                                    </p>
                                    <div className="space-y-2" data-oid="sv0_v_4">
                                        <p className="text-gray-700" data-oid="zwam5g0">
                                            <strong data-oid=".0id2q9">Ort:</strong> Restaurant
                                            Waldau
                                        </p>
                                        <p className="text-gray-700" data-oid="z1-o4hn">
                                            <strong data-oid="_5eyz0a">Stadt:</strong> Bonn
                                        </p>
                                        <p className="text-gray-700" data-oid="ng4.ki3">
                                            <strong data-oid="su_q9nj">Datum:</strong> 5. September
                                            2025
                                        </p>
                                        <p className="text-gray-700" data-oid="apzsu2-">
                                            <strong data-oid="ua3_em-">Gäste:</strong> Familie &
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
                data-oid="7:n_v:t"
            >
                <div className="max-w-4xl mx-auto text-center px-6" data-oid="x86vsr5">
                    <h3
                        className="text-3xl font-light text-gray-700 mb-4"
                        style={{ fontFamily: 'serif' }}
                        data-oid="cb_0a5y"
                    >
                        Johanna & Lukas
                    </h3>
                    <p className="text-gray-600 mb-6" data-oid="p_ufog5">
                        Wir freuen uns darauf, diesen besonderen Tag mit euch zu teilen!
                    </p>
                    <div className="flex justify-center space-x-4 text-2xl" data-oid="7vnld3w">
                        <span data-oid="x1-bzj4">💕</span>
                        <span data-oid="65xvbei">💍</span>
                        <span data-oid="n3yjc_4">👰‍♀️</span>
                        <span data-oid="d5-e1tr">🤵‍♂️</span>
                        <span data-oid="xjkx:ce">🎉</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
