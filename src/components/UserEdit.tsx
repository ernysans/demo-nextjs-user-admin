'use client';

import {User} from "@/lib/models/User";
import {use, useActionState, useState} from "react";
import {ActionResponse, deleteUser, updateUser} from "@/lib/actions";
import Link from "next/link";

const initialState: ActionResponse = {
    errors: ''
}

/**
 * UserEdit component allows editing user details.
 * It fetches the user data, displays a form with fields for name and zip code,
 * and handles the submission to update the user information.
 * @param user
 * @constructor
 */
export const UserEdit = ({user}: { user: Promise<User> }) => {
    const userData = use(user);
    const [form, setForm] = useState<User>(userData);
    const [state, action, pending] = useActionState(updateUser, initialState);
    const [stateDelete, actionDelete, pendingDelete] = useActionState(deleteUser, initialState);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <form action={action} className="mx-auto p-6 bg-white rounded shadow">
                <input type="hidden" name="id" value={form.id}/>
                <div className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-1 gap-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={e => setForm({...form, name: e.target.value})}
                            required
                            className="mb-4 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">Zip
                            Code</label>
                        <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={form.zipCode}
                            onChange={e => setForm({...form, zipCode: e.target.value})}
                            required
                            className="mb-4 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <label htmlFor="latitude"
                               className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                        <input
                            type="number"
                            id="latitude"
                            name="latitude"
                            value={form.latitude ?? ''}
                            disabled
                            className="mb-4 block w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <label htmlFor="longitude"
                               className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                        <input
                            type="number"
                            id="longitude"
                            name="longitude"
                            value={form.longitude ?? ''}
                            disabled
                            className="mb-4 block w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <label htmlFor="timezone"
                               className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                        <input
                            type="number"
                            id="timezone"
                            name="timezone"
                            value={form.timezone ?? ''}
                            disabled
                            className="mb-4 block w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700 mb-1">Created
                            At</label>
                        <input
                            type="text"
                            id="createdAt"
                            name="createdAt"
                            value={form.createdAt ? new Date(form.createdAt).toLocaleString() : ''}
                            disabled
                            className="mb-4 block w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <label htmlFor="updatedAt" className="block text-sm font-medium text-gray-700 mb-1">Updated
                            At</label>
                        <input
                            type="text"
                            id="updatedAt"
                            name="updatedAt"
                            value={form.updatedAt ? new Date(form.updatedAt).toLocaleString() : ''}
                            disabled
                            className="mb-4 block w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center mt-6 gap-4">
                    <Link
                        href="/"
                        className="inline-block px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition border border-gray-400"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={pending}
                        className={`cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition border border-blue-700 ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {pending ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
                {state?.errors && <p className="mt-4 text-red-600">{state.errors}</p>}
            </form>

            <form action={actionDelete}>
                <input type="hidden" name="id" value={userData.id}/>
                <button
                    type="submit"
                    disabled={pendingDelete}
                    className={`w-full cursor-pointer px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Delete
                </button>
                {stateDelete?.errors && <p className="mt-4 text-red-600">{stateDelete.errors}</p>}
            </form>
        </div>
    );
};