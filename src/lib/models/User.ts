import {HTTPRequest} from "@/lib/utils/http_request";
import {API, BUILD_TIME} from "@/lib/variables";

/**
 * User interface defines the structure of the user object.
 */
export interface User {
    id?: string;
    name?: string;
    zipCode?: string;
    latitude?: number;
    longitude?: number;
    timezone?: number;
    createdAt?: string;
    updatedAt?: string;
}

export class UserStore {
    httpRequest: HTTPRequest;

    constructor() {
        this.httpRequest = new HTTPRequest({});
    }

    /**
     * Get all Users
     */
    async index(): Promise<User[]> {
        if (BUILD_TIME) return []; /// If build time, return empty array
        try {
            const response = await this.httpRequest.fetch(`${API}/users`);
            return await HTTPRequest.response(response) as User[];
        } catch (error) {
            console.error(`Could not get users. Error: ${error}`);
            throw error;
        }
    }

    /**
     * Get User by ID
     */
    async get(id: string): Promise<User> {
        try {
            const response = await this.httpRequest.fetch(`${API}/users/${id}`);
            return await HTTPRequest.response(response) as User;
        } catch (error) {
            console.error(`Could not get user. Error: ${error}`);
            throw error;
        }
    }

    /**
     * Update User
     * @param {User} user
     */
    async update(user: User): Promise<User> {
        try {
            const response = await this.httpRequest.fetch(`${API}/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            return await HTTPRequest.response(response) as User;
        } catch (error) {
            console.error(`Could not update user. Error: ${error}`);
            throw error;
        }
    }

    /**
     * Delete User
     * @param {string} id
     */
    async delete(id: string): Promise<void> {
        try {
            const response = await this.httpRequest.fetch(`${API}/users/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Failed to delete user with ID ${id}`);
            }
        } catch (error) {
            console.error(`Could not delete user. Error: ${error}`);
            throw error;
        }
    }

    /**
     * Add User
     * @param {User} user
     */
    async add(user: User): Promise<User> {
        try {
            const response = await this.httpRequest.fetch(`${API}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            return await HTTPRequest.response(response) as User;
        } catch (error) {
            console.error(`Could not add user. Error: ${error}`);
            throw error;
        }
    }
}

