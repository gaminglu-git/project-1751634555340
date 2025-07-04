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
                data-oid="1tpf2tw"
            >
                <div className="bg-white p-8 rounded-lg shadow-md" data-oid="5bkknhd">
                    <h1 className="text-2xl font-bold mb-4" data-oid="_mm5gua">
                        Admin Login
                    </h1>
                    <input
                        type="password"
                        placeholder="Admin Key"
                        value={adminKey}
                        onChange={(e) => setAdminKey(e.target.value)}
                        className="w-full p-3 border rounded-lg mb-4"
                        data-oid="8lhx0-m"
                    />

                    <button
                        onClick={fetchRSVPs}
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                        data-oid="w53lv.p"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6" data-oid="2o674y5">
            <div className="max-w-7xl mx-auto" data-oid="zdvc.mv">
                <h1 className="text-3xl font-bold mb-8" data-oid="olqsna3">
                    RSVP Admin Dashboard
                </h1>

                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="a7wl8e2">
                        <div className="bg-white p-6 rounded-lg shadow" data-oid="tfzqry8">
                            <h3 className="text-lg font-semibold text-gray-700" data-oid="uhz:enn">
                                Gesamt Anmeldungen
                            </h3>
                            <p className="text-3xl font-bold text-blue-600" data-oid="g54krlz">
                                {stats.total}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow" data-oid="z76urv1">
                            <h3 className="text-lg font-semibold text-gray-700" data-oid="1n0avfg">
                                Zusagen
                            </h3>
                            <p className="text-3xl font-bold text-green-600" data-oid="3ztc17v">
                                {stats.attending}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow" data-oid="0p141o5">
                            <h3 className="text-lg font-semibold text-gray-700" data-oid="_6eu6t4">
                                Absagen
                            </h3>
                            <p className="text-3xl font-bold text-red-600" data-oid="kc8n48t">
                                {stats.notAttending}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow" data-oid="v1n3oa2">
                            <h3 className="text-lg font-semibold text-gray-700" data-oid="03m74ut">
                                Gesamt Gäste
                            </h3>
                            <p className="text-3xl font-bold text-purple-600" data-oid="2-o3.r-">
                                {stats.totalGuests}
                            </p>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow overflow-hidden" data-oid="d7l5__-">
                    <div className="px-6 py-4 border-b" data-oid="-1vrb_q">
                        <h2 className="text-xl font-semibold" data-oid="79m4-o2">
                            Alle Anmeldungen
                        </h2>
                    </div>
                    <div className="overflow-x-auto" data-oid="ck_4hbx">
                        <table className="w-full" data-oid="tkd-8-1">
                            <thead className="bg-gray-50" data-oid="332-blz">
                                <tr data-oid="_crf8j.">
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        data-oid="al5yu_8"
                                    >
                                        Name
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        data-oid=":yly47e"
                                    >
                                        E-Mail
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        data-oid="wb7ygyn"
                                    >
                                        Teilnahme
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        data-oid="c7n6b2p"
                                    >
                                        Menü
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        data-oid="yqbzk_v"
                                    >
                                        Begleitung
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        data-oid="6ot_8l."
                                    >
                                        Datum
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200" data-oid="_k8j1hg">
                                {rsvps.map((rsvp) => (
                                    <tr key={rsvp.id} data-oid="vdddlkc">
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                                            data-oid="prm-bdz"
                                        >
                                            {rsvp.name}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            data-oid="kkwedop"
                                        >
                                            {rsvp.email}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap"
                                            data-oid="ninewxk"
                                        >
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full ${
                                                    rsvp.attendance === 'yes'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                                data-oid="2pvhs-c"
                                            >
                                                {rsvp.attendance === 'yes' ? 'Zusage' : 'Absage'}
                                            </span>
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            data-oid="60w-8f5"
                                        >
                                            {rsvp.mealPreference || '-'}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            data-oid=":zlt00:"
                                        >
                                            {rsvp.plusOne
                                                ? `${rsvp.plusOneName} (${rsvp.plusOneMeal})`
                                                : 'Nein'}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                            data-oid="b2p-iom"
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
