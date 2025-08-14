'use client';
import {User} from "@/lib/models/User";
import {use} from "react";
import Link from "next/link";

/**
 * UsersList component displays a list of users.
 * It takes a promise of users as a prop and renders their details.
 * @param {Promise<User[]>} users
 * @constructor
 */
export const UsersList = ({users}: { users: Promise<User[]> }) => {
    const allUsers = use(users);
    return (
        <div className="space-y-6">
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
                                  className={`cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition border border-blue-700`}>
                                Edit
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};