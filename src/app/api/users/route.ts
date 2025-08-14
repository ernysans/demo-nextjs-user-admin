'use server';
import admin from 'firebase-admin';
import {NextResponse} from "next/server";
import {User} from "@/lib/models/User";
import {LocationStore} from "@/lib/models/Location";

/**
 * Init firebase app first
 */
if (!admin.apps.length) {
    admin.initializeApp();
    console.log('Firebase admin initialized');
}

/**
 * GET all users
 * @constructor
 */
export async function GET() {
    try {
        const db = admin.database();
        const usersRef = db.ref('users');
        const snapshot = await usersRef.once('value');
        const baseUsers = (snapshot.val() || {}) as Record<string, User>;
        // Map users id's to objects
        const users = Object.entries(baseUsers).map(([id, user]) => {
            return {
                ...user,
                id: id,
            } as User;
        });
        // Sort by createdAt desc
        users.sort((a, b) => {
            return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
        });

        return NextResponse.json(users, {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({message}, {status: 400});
    }
}

/**
 * Create a new user
 * @param request
 * @constructor
 */
export async function POST(request: Request) {
    // Parse the request body
    const body = (await request.json()) as User;
    const {zipCode, name} = body;
    const locationStore = new LocationStore();
    // Validate the input
    if (!zipCode || zipCode.trim() === '') {
        return NextResponse.json({message: "Missing required fields: zipCode is required"}, {status: 400});
    }
    if (!name || name.trim() === '') {
        return NextResponse.json({message: "Missing required fields: name is required"}, {status: 400});
    }
    try {
        // Create a new user object
        const location = await locationStore.getByZipCode(zipCode);
        const newData: User = {
            name: name,
            zipCode: zipCode.toString(),
            latitude: location.coord.lat,
            longitude: location.coord.lon,
            timezone: location.timezone,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
        const id = crypto.randomUUID(); // Generate a unique ID for the user
        // Save the new user to the database
        const db = admin.database();
        const usersRef = db.ref('users');
        await usersRef.child(id).set(newData);
        // Get data for zip code
        return NextResponse.json({
            ...newData,
            id: id,
        }, {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({message}, {status: 400});
    }
}
