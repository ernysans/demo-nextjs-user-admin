'use server';
import {redirect} from "next/navigation";
import {User, UserStore} from "@/lib/models/User";
import {revalidatePath} from "next/cache";

export interface ActionResponse extends User {
    errors?: string;
}

/**
 * Add a new user
 * @param initialState
 * @param formData
 */
export async function addUser(initialState: ActionResponse, formData: FormData): Promise<ActionResponse> {
    const name = formData.get('name') as string;
    const zipCode = formData.get('zipCode') as string;
    const userStore = new UserStore();
    try {
        await userStore.add({
            name: name,
            zipCode: zipCode,
        });
    } catch (error) {
        return {
            errors: error instanceof Error ? `Error: ${error.message}` : 'Failed to add user. Please try again later.',
        }
    }
    // Invalidate the cache for the / route
    revalidatePath('/');
    redirect(`/`);
}

/**
 * Update an existing user
 * @param initialState
 * @param formData
 */
export async function updateUser(initialState: ActionResponse, formData: FormData): Promise<ActionResponse> {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const zipCode = formData.get('zipCode') as string;
    const userStore = new UserStore();
    try {
        await userStore.update({
            id: id,
            name: name,
            zipCode: zipCode,
        });
    } catch (error) {
        return {
            errors: error instanceof Error ? `Error: ${error.message}` : 'Failed to update user. Please try again later.',
        }
    }
    // Invalidate the cache for the / route
    revalidatePath('/');
    redirect(`/`);
}

/**
 * Delete a user
 * @param initialState
 * @param formData
 */
export async function deleteUser(initialState: ActionResponse, formData: FormData): Promise<ActionResponse> {
    const id = formData.get('id') as string;
    const userStore = new UserStore();
    try {
        await userStore.delete(id);
    } catch (error) {
        return {
            errors: error instanceof Error ? `Error: ${error.message}` : 'Failed to delete user. Please try again later.',
        } as ActionResponse;
    }
    // Invalidate the cache for the / route
    revalidatePath('/');
    return {
        id: id,
    }
}