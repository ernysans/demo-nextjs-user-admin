'use server';

import {NextRequest, NextResponse} from 'next/server';
import admin from "firebase-admin";
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
 * Get User by ID
 * @param request
 * @param params
 * @constructor
 */
export async function GET(
    request: NextRequest,
    {params}: { params: Promise<{ id: string }> },
) {
    const id = (await params).id;
    const db = admin.database();
    const usersRef = db.ref('users');
    const snapshot = await usersRef.child(id).once('value');
    const user = snapshot.val();
    if (!user) {
        return NextResponse.json({message: "User not found"}, {status: 404});
    }
    return NextResponse.json({
        ...user,
        id: id,
    }, {
        status: 200,
        headers: {'Content-Type': 'application/json'}
    });
}


/**
 * Delete a user by ID
 * @param request
 * @param params
 * @constructor
 */
export async function DELETE(
    request: NextRequest,
    {params}: { params: Promise<{ id: string }> },
) {
    const id = (await params).id;
    try {
        const db = admin.database();
        const usersRef = db.ref('users').child(id);
        await usersRef.remove();
        return NextResponse.json({
            message: "User deleted successfully",
            id: id,
        }, {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({message: "Error deleting user"}, {status: 500});
    }
}

/**
 * Update a user by ID
 *
 */
export async function PATCH(
    request: NextRequest,
    {params}: { params: Promise<{ id: string }> },
) {
    const id = (await params).id;
    // Parse the request body
    const body = (await request.json()) as User;
    const {zipCode, name} = body;
    const locationStore = new LocationStore();
    // Check if the user exists
    const db = admin.database();
    const usersRef = db.ref('users');
    const snapshot = await usersRef.child(id).once('value');
    const user = snapshot.val();
    if (!user) {
        return NextResponse.json({message: "User not found"}, {status: 404});
    }
    // Validate the input
    if (!zipCode || zipCode.trim() === '') {
        return NextResponse.json({message: "Missing required fields: zipCode is required"}, {status: 400});
    }
    if (!name || name.trim() === '') {
        return NextResponse.json({message: "Missing required fields: name is required"}, {status: 400});
    }
    try {
        // Create a new user object
        const newData: User = {
            ...user,
            name: name,
            updatedAt: new Date().toISOString()
        }
        if (zipCode !== user.zipCode) {
            const location = await locationStore.getByZipCode(zipCode);
            newData.zipCode = zipCode.toString();
            newData.latitude = location.coord.lat;
            newData.longitude = location.coord.lon;
            newData.timezone = location.timezone;
        }
        // Save the updated user to the database
        await usersRef.child(id).update(newData);
        return NextResponse.json({
            ...newData,
            id: id,
        }, {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        console.error('Error updating user:', message);
        return NextResponse.json({message}, {status: 400});
    }
}