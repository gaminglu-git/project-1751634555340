'use client';

import { useState } from 'react';

export default function Page() {
    const [activeTab, setActiveTab] = useState('story');

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <nav className="flex justify-center space-x-8">
                        <button
                            onClick={() => setActiveTab('story')}
                            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'story' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                        >
                            Unsere Geschichte
                        </button>
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'events' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                        >
                            Termine
                        </button>
                        <button
                            onClick={() => setActiveTab('location')}
                            className={`px-4 py-2 rounded-full transition-all ${activeTab === 'location' ? 'bg-orange-200 text-orange-800' : 'text-gray-600 hover:text-orange-600'}`}
                        >
                            Locations
                        </button>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="text-center py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1
                            className="text-6xl md:text-8xl font-light text-orange-300 mb-4"
                            style={{ fontFamily: 'serif' }}
                        >
                            Johanna & Lukas
                        </h1>
                        <div className="w-32 h-px bg-gradient-to-r from-orange-300 to-blue-300 mx-auto mb-6"></div>
                        <p className="text-2xl text-gray-600 font-light">Wir heiraten!</p>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="text-center">
                                <div className="text-4xl text-orange-400 mb-2">💒</div>
                                <h3 className="text-xl font-medium text-gray-700 mb-2">
                                    Standesamtliche Trauung
                                </h3>
                                <p className="text-lg text-blue-600 font-medium">16. August 2025</p>
                                <p className="text-gray-600">Burg Brüggen</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl text-blue-400 mb-2">🎉</div>
                                <h3 className="text-xl font-medium text-gray-700 mb-2">
                                    Große Feier
                                </h3>
                                <p className="text-lg text-blue-600 font-medium">
                                    5. September 2025
                                </p>
                                <p className="text-gray-600">Restaurant Waldau, Bonn</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <main className="max-w-6xl mx-auto px-6 pb-20">
                {activeTab === 'story' && (
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-lg border border-orange-100">
                        <h2
                            className="text-4xl font-light text-center text-gray-700 mb-12"
                            style={{ fontFamily: 'serif' }}
                        >
                            Unsere Liebesgeschichte
                        </h2>

                        <div className="space-y-12">
                            <div className="flex items-center space-x-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center text-2xl">
                                    💕
                                </div>
                                <div>
                                    <h3 className="text-2xl font-medium text-gray-700 mb-2">
                                        13. Mai 2018
                                    </h3>
                                    <p className="text-lg text-gray-600">
                                        Der Tag, an dem wir uns ineinander verliebt haben
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center text-2xl">
                                    💍
                                </div>
                                <div>
                                    <h3 className="text-2xl font-medium text-gray-700 mb-2">
                                        13. August 2024
                                    </h3>
                                    <p className="text-lg text-gray-600">
                                        Unser Verlobungstag - der Beginn unseres gemeinsamen Weges
                                        zum Altar
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-orange-300 to-blue-300 rounded-full flex items-center justify-center text-2xl">
                                    👰‍♀️🤵‍♂️
                                </div>
                                <div>
                                    <h3 className="text-2xl font-medium text-gray-700 mb-2">
                                        2025
                                    </h3>
                                    <p className="text-lg text-gray-600">
                                        Das Jahr, in dem wir Mann und Frau werden
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'events' && (
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100">
                            <div className="text-center mb-6">
                                <div className="text-5xl mb-4">💒</div>
                                <h3
                                    className="text-3xl font-light text-gray-700 mb-2"
                                    style={{ fontFamily: 'serif' }}
                                >
                                    Standesamtliche Trauung
                                </h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-orange-100">
                                    <span className="text-gray-600">Datum:</span>
                                    <span className="font-medium text-blue-600">
                                        16. August 2025
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-orange-100">
                                    <span className="text-gray-600">Ort:</span>
                                    <span className="font-medium">Burg Brüggen</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-orange-100">
                                    <span className="text-gray-600">Adresse:</span>
                                    <span className="font-medium">41379 Brüggen</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Gäste:</span>
                                    <span className="font-medium">Engster Familienkreis</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100">
                            <div className="text-center mb-6">
                                <div className="text-5xl mb-4">🎉</div>
                                <h3
                                    className="text-3xl font-light text-gray-700 mb-2"
                                    style={{ fontFamily: 'serif' }}
                                >
                                    Große Feier
                                </h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                                    <span className="text-gray-600">Datum:</span>
                                    <span className="font-medium text-blue-600">
                                        5. September 2025
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                                    <span className="text-gray-600">Ort:</span>
                                    <span className="font-medium">Restaurant Waldau</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                                    <span className="text-gray-600">Stadt:</span>
                                    <span className="font-medium">Bonn</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Gäste:</span>
                                    <span className="font-medium">Familie & Freunde</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'location' && (
                    <div className="space-y-8">
                        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100">
                            <h3
                                className="text-3xl font-light text-center text-gray-700 mb-8"
                                style={{ fontFamily: 'serif' }}
                            >
                                Burg Brüggen
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <p className="text-lg text-gray-600 mb-4">
                                        Unsere standesamtliche Trauung findet in der historischen
                                        Burg Brüggen statt - ein romantischer Ort voller Geschichte
                                        für den Beginn unserer gemeinsamen Zukunft.
                                    </p>
                                    <div className="space-y-2">
                                        <p className="text-gray-700">
                                            <strong>Adresse:</strong> 41379 Brüggen
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Datum:</strong> 16. August 2025
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Gäste:</strong> Engster Familienkreis
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8 text-center">
                                    <div className="text-6xl mb-4">🏰</div>
                                    <p className="text-gray-600">Historische Burg Brüggen</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-blue-100">
                            <h3
                                className="text-3xl font-light text-center text-gray-700 mb-8"
                                style={{ fontFamily: 'serif' }}
                            >
                                Restaurant Waldau
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 text-center">
                                    <div className="text-6xl mb-4">🌲</div>
                                    <p className="text-gray-600">Restaurant Waldau, Bonn</p>
                                </div>
                                <div>
                                    <p className="text-lg text-gray-600 mb-4">
                                        Unsere große Feier und freie Trauung findet im wunderschönen
                                        Restaurant Waldau in Bonn statt - hier feiern wir mit all
                                        unseren Liebsten diesen besonderen Tag.
                                    </p>
                                    <div className="space-y-2">
                                        <p className="text-gray-700">
                                            <strong>Ort:</strong> Restaurant Waldau
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Stadt:</strong> Bonn
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Datum:</strong> 5. September 2025
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Gäste:</strong> Familie & Freunde
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white/80 backdrop-blur-sm border-t border-orange-100 py-12">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h3
                        className="text-3xl font-light text-gray-700 mb-4"
                        style={{ fontFamily: 'serif' }}
                    >
                        Johanna & Lukas
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Wir freuen uns darauf, diesen besonderen Tag mit euch zu teilen!
                    </p>
                    <div className="flex justify-center space-x-4 text-2xl">
                        <span>💕</span>
                        <span>💍</span>
                        <span>👰‍♀️</span>
                        <span>🤵‍♂️</span>
                        <span>🎉</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
