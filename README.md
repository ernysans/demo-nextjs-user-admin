# User Admin interface

This project uses Next.js for server-side rendering, React for building user interfaces, Firebase for authentication and
database management, and Tailwind CSS for styling.

## Demo

Open this link to see the demo of the project: [Demo Link](https://user-admin--fabricelements.us-central1.hosted.app/)

## Pre-requisites

1. Node.js and npm installed on your machine.
2. A Firebase project set up with Realtime Database and App Hosting enabled.
3. Download the Firebase Admin SDK and set up your service account credentials.

## Getting Started

### Set the service account credentials

```bash
  export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-file.json"
```

### Install dependencies

```bash
  npm install
```

### Connect to Firebase

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Create a Realtime Database in your Firebase project.
3. Set up Firebase App Hosting in your Firebase project.
4. Download the Firebase Admin SDK and save the service account JSON file to your project directory.
5. Connect the Firebase CLI to your project:

```bash
  firebase login
  firebase use YOURPROJECT_ID
```

### Configure Firebase Emulator (for local development)

### Start the development server

```bash
  firebase emulators:start
```

#### Deploy to Firebase Hosting

```bash
  firebase deploy
```

## UI Paths

- `/` or `/users` - User List Page
- `/users/new` - Add New User Page
- `/users/[id]` - Edit User Page

## User API Endpoints

| Method | Endpoint      | Description                 | Path Parameter | Request Body         | Response                |
|--------|---------------|-----------------------------|----------------|----------------------|-------------------------|
| GET    | `/users`      | Retrieve all users          | -              | -                    | Array of `User` objects |
| GET    | `/users/{id}` | Retrieve a user by their ID | `id` (string)  | -                    | Single `User` object    |
| POST   | `/users`      | Add a new user              | -              | `User` object (JSON) | Created `User` object   |
| PATCH  | `/users/{id}` | Update an existing user     | `id` (string)  | Partial/full `User`  | Updated `User` object   |
| DELETE | `/users/{id}` | Delete a user by their ID   | `id` (string)  | -                    | No content (success)    |

## User Interface

Defines the structure of a user object.

| Property    | Type   | Description                     |
|-------------|--------|---------------------------------|
| `id`        | string | Unique identifier for the user  |
| `name`      | string | Name of the user                |
| `zipCode`   | string | Zip code of the user's location |
| `latitude`  | number | Latitude coordinate             |
| `longitude` | number | Longitude coordinate            |
| `timezone`  | number | Timezone offset                 |
| `createdAt` | string | ISO timestamp of creation       |
| `updatedAt` | string | ISO timestamp of last update    |

### Sample User Object

```json
{
  "createdAt": "2025-08-14T19:47:59.697Z",
  "latitude": 37.7813,
  "longitude": -122.4167,
  "name": "Lolo R",
  "timezone": -25200,
  "updatedAt": "2025-08-14T19:54:00.867Z",
  "zipCode": "94102",
  "id": "361d798f-4b86-40c7-9a66-0fdc52df949a"
}
```
