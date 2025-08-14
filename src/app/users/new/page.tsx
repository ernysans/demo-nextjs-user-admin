'use client';

import {useActionState} from 'react';
import {ActionResponse, addUser} from "@/lib/actions";
import Link from "next/link";
import React from 'react';


const initialState: ActionResponse = {
    errors: ''
}

/**
 * Add New User Page
 * This page provides a form to add a new user.
 * It uses the `useActionState` hook to manage the form state and handle submission.
 * The form includes fields for the user's name and zip code.
 * Upon submission, it calls the `addUser` action to create a new user.
 * If there are any errors during the process, they will be displayed below the form.
 * The page also includes a cancel button that redirects to the home page.
 * @constructor
 */
export default function Page() {
    const [state, action, pending] = useActionState(addUser, initialState)
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Add New User</h2>
            <p className="text-gray-600 mb-4">
                Use the form below to add a new user. All fields are required.
            </p>
            <form action={action} className="mx-auto p-6 bg-white rounded shadow">
                <div className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-1 gap-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
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
                            required
                            className="mb-4 block w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center mt-6">
                    <Link
                        href="/"
                        className="inline-block px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition border border-gray-400"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={pending}
                        className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition border border-blue-700 ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {pending ? 'Creating...' : 'Add User'}
                    </button>
                </div>
                {state?.errors && <p className="mt-4 text-red-600">{state.errors}</p>}
            </form>
        </div>
    )
};