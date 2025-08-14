import {UserStore} from "@/lib/models/User";
import {Suspense} from "react";
import {UserEdit} from "@/components/UserEdit";
import {LoadingCard} from "@/components/LoadingCard";

/**
 * Edit user page
 * This page is used to edit an existing user.
 * It fetches the user data based on the ID from the URL parameters.
 * The user data is then passed to the UserEdit component for rendering.
 * @param params
 * @constructor
 */
export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const userStore = new UserStore();
    const id = (await params).id;
    const user = userStore.get(id);
    return (
        <Suspense fallback={<LoadingCard/>}>
            <UserEdit user={user}/>
        </Suspense>
    )
}
