'use client';

import { useState, useEffect } from 'react';

interface RSVP {
    id: string;
    name: string;
    email: string;
    phone?: string;
    attendance: string;
    mealPreference?: string;
    allergies?: string;
    plusOne: boolean;
    plusOneName?: string;
    plusOneMeal?: string;
    message?: string;
    createdAt: string;
}

interface Stats {
    total: number;
    attending: number;
    notAttending: number;
    withPlusOne: number;
    totalGuests: number;
    mealStats: {
        meat: number;
        fish: number;
        vegetarian: number;
        vegan: number;
    };
}

export default function AdminPage() {
    const [rsvps, setRsvps] = useState<RSVP[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [adminKey, setAdminKey] = useState('');
    const [authenticated, setAuthenticated] = useState(false);

    const fetchRSVPs = async () => {
        try {
            const response = await fetch(`/api/rsvp?key=${adminKey}`);
            if (response.ok) {
                const data = await response.json();
                setRsvps(data.rsvps);
                setStats(data.stats);
                setAuthenticated(true);
            } else {
                alert('Ungültiger Admin-Key');
            }
        } catch (error) {
            console.error('Error fetching RSVPs:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!authenticated) {
        return (
            <div
                className="min-h-screen bg-gray-50 flex items-center justify-center"
                data-oid="gj:z:xv"
            >
                <div className="bg-white p-8 rounded-lg shadow-md" data-oid="dthnzhk">
                    <h1 className="text-2xl font-bold mb-4" data-oid="ci86nsc">
                        Admin Login
                    </h1>
                    <input
                        type="password"
                        placeholder="Admin Key"
                        value={adminKey}
                        onChange={(e) => setAdminKey(e.target.value)}
                        className="w-full p-3 border rounded-lg mb-4"
                        data-oid=":-jd_qz"
                    />

                    <button
                        onClick={fetchRSVPs}
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                        data-oid="bj3yb6."
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6" data-oid=".cf8h4l">
            <div className="max-w-7xl mx-auto" data-oid="ay_j.8n">
                <h1 className="text-3xl font-bold mb-8" data-oid="rddag1x">
                    RSVP Admin Dashboard
                </h1>

                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="v50-mfw">
                        <div className="bg-white p-6 rounded-lg shadow" data-oid="afd046g">
                            <h3 className="text-lg font-semibold text-gray-700" data-oid="mnw7.rf">
                                Gesamt Anmeldungen
                            </h3>
                            <p className="text-3xl font-bold text-blue-600" data-oid="vxkpnw0">
                                {stats.total}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow" data-oid="kcbjmt3">
                            <h3 className="text-lg font-semibold text-gray-700" data-oid="r-8pkf0">
                                Zusagen
                            </h3>
                            <p className="text-3xl font-bold text-green-600" data-oid="572tsoa">
                                {stats.attending}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow" data-oid="xijiub3">
                            <h3 className="text-lg font-semibold text-gray-700" data-oid="n6qbow5">
                                Absagen
                            </h3>
                            <p className="text-3xl font-bold text-red-600" data-oid="03w5oqr">
                                {stats.notAttending}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow" data-oid="qfq29nc">
                            <h3 className="text-lg font-semibold text-gray-700" data-oid="ddh3uh0">
                                Gesamt Gäste
                            </h3>
                            <p className="text-3xl font-bold text-purple-600" data-oid="ige:318">
                                {stats.totalGuests}
                            </p>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow overflow-hidden" data-oid="inyx4d7">
                    <div className="px-6 py-4 border-b" data-oid="z1d3p-y">
                        <h2 className="text-xl font-semibold" data-oid="ul73jgx">
                            Alle Anmeldungen
                        </h2>
                    </div>
                    <div className="overflow-x-auto" data-oid="be96q-2">
                        <table className="w-full" data-oid="eug_bhl">
                            <thead className="bg-gray-50" data-oid="vsilrbn">
                                <tr data-oid="9k13x6b">
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        data-oid="4jc3xz1"
                                    >
                                        Name
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        data-oid="zb1c6:3"
                                    >
                                        E-Mail
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        data-oid="c2xbd96"
                                    >
                                        Teilnahme
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        data-oid="rksr7wk"
                                    >
                                        Menü
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        data-oid="xtz8i-m"
                                    >
                                        Begleitung
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        data-oid="0oh96wb"
                                    >
                                        Datum
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200" data-oid="l11tl9:">
                                {rsvps.map((rsvp) => (
                                    <tr key={rsvp.id} data-oid="9jatq0.">
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                                            data-oid="i297hg9"
                                        >
                                            {rsvp.name}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            data-oid="irj972z"
                                        >
                                            {rsvp.email}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap"
                                            data-oid="1h5hisn"
                                        >
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full ${
                                                    rsvp.attendance === 'yes'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                                data-oid="sis16r."
                                            >
                                                {rsvp.attendance === 'yes' ? 'Zusage' : 'Absage'}
                                            </span>
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            data-oid="iyu7voo"
                                        >
                                            {rsvp.mealPreference || '-'}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            data-oid="_3d70r2"
                                        >
                                            {rsvp.plusOne
                                                ? `${rsvp.plusOneName} (${rsvp.plusOneMeal})`
                                                : 'Nein'}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            data-oid="mnnk522"
                                        >
                                            {new Date(rsvp.createdAt).toLocaleDateString('de-DE')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
