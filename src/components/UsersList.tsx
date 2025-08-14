'use client';
import {User} from "@/lib/models/User";
import {use, useActionState} from "react";
import {ActionResponse, deleteUser} from "@/lib/actions";
import Link from "next/link";

const initialState: ActionResponse = {
    errors: ''
}

/**
 * UsersList component displays a list of users.
 * It takes a promise of users as a prop and renders their details.
 * @param {Promise<User[]>} users
 * @constructor
 */
export const UsersList = ({users}: { users: Promise<User[]> }) => {
    const allUsers = use(users);
    const [state, action, pending] = useActionState(deleteUser, initialState);
    return (
        <div className="space-y-6">
            {state && state.errors && (
                <p aria-live="polite" className="bg-white shadow rounded-lg p-6 text-red-600 mb-4">
                    {state.errors}
                </p>
            )}
            <ul className="space-y-6">
                {allUsers.map((user) => (
                    <li key={user.id} className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-2 pb-2 text-gray-900 border-b border-gray-100">{user.name}</h3>
                        <div className="text-sm text-gray-700 mb-2 space-y-1">
                            <p><strong>Zip Code:</strong> {user.zipCode}</p>
                            <p><strong>Latitude:</strong> {user.latitude}</p>
                            <p><strong>Longitude:</strong> {user.longitude}</p>
                            <p><strong>Timezone:</strong> {user.timezone}</p>
                            <p><strong>Created At:</strong> {new Date(user.createdAt || '').toLocaleString()}</p>
                            <p><strong>Updated At:</strong> {new Date(user.updatedAt || '').toLocaleString()}</p>
                        </div>
                        <div className="flex justify-between items-center mt-6 gap-4">
                            <Link href={`/users/${user.id}`}
                                  className={`cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition border border-blue-700 ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                Edit
                            </Link>
                            <form action={action}>
                                <input type="hidden" name="id" value={user.id}/>
                                <button
                                    type="submit"
                                    disabled={pending}
                                    className={`cursor-pointer px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition ${pending ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Delete
                                </button>
                            </form>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};