'use client';
import {UserStore} from "@/lib/models/User";
import {Suspense} from "react";
import {UsersList} from "@/components/UsersList";
import {LoadingCard} from "@/components/LoadingCard";
import Link from "next/link";

/**
 * Users List Page
 * This page displays a list of users and allows adding new users.
 * It uses the UserStore to fetch the users and displays them in a list.
 * The page is wrapped in a Suspense component to handle loading states.
 * It also includes a link to add a new user.
 * @constructor
 */
export default function Page() {
    const userStore = new UserStore();
    const users = userStore.index();
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Users List</h2>
            <p className="text-gray-600 mb-4">
                Below is a list of all users. You can edit or delete each user.
            </p>
            <Link href="/users/new"
                  className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Add New User
            </Link>
            <Suspense fallback={<LoadingCard/>}>
                <UsersList users={users}/>
            </Suspense>
        </div>
    )
}
