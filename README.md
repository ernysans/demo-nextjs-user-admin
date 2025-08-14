# User Admin interface

This project uses Next.js for server-side rendering, React for building user interfaces, Firebase for authentication and
database management, and Tailwind CSS for styling.

## Demo

Open this link to see the demo of the project: [Demo Link](https://user-admin--fabricelements.us-central1.hosted.app/)

## Pre-requisites

1. Node.js and npm installed on your machine.
2. A Firebase project set up with Realtime Database and App Hosting enabled.
3. Download the Firebase Admin SDK and set up your service account credentials.

-----

## How to Run Your Code (Step-by-Step Instructions)

### 1. Set the service account credentials

```bash
  export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-file.json"
```

### 2. Install dependencies

```bash
  npm install
```

### 3. Connect to Firebase

* Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
* Create a Realtime Database in your Firebase project.
* Set up Firebase App Hosting in your Firebase project.
* Download the Firebase Admin SDK and save the service account JSON file to your project directory.
* Connect the Firebase CLI to your project:

```bash
    firebase login
    firebase use YOURPROJECT_ID
```

### 4. Configure Firebase Emulator (for local development)

### 5. Run the development server

The app will be available at the local URL provided by the emulator.

```bash
  firebase emulators:start
```

#### Deploy to Firebase Hosting

```bash
  firebase deploy
```

-----

## Approach

* Uses Next.js for server-side rendering and routing, React for UI, Firebase Realtime Database for database, and
  Tailwind CSS for styling.
* API routes are implemented in the src/app/api/users directory, following RESTful conventions.
* UI pages are mapped to /users, /users/new, and /users/[id] for listing, creating, and editing users.

-----

## Implemented Features

- User list page (/users)
- Add new user page (/users/new)
- Edit user page (/users/[id])
- RESTful API endpoints for user CRUD operations
- Firebase Realtime Database integration
- Responsive UI with Tailwind CSS
- Loading and error states
- Unit and integration tests

-----

## Assumptions Made

- Firebase Realtime Database is used for user data storage.
- Service account credentials are available and correctly configured.
- The app is run in a Node.js environment with npm.
- All users have unique IDs.
- The Firebase Emulator is used for local development and testing.
- Authentication is not required for accessing user features.

-----

## Testing Done (What You Tested and How)

**Unit Tests**: Implemented using Jest and React Testing Library to test individual components.

1. The test verifies that the "Add New User" page renders the form fields for "Name" and "Zip Code", as well as the "Add
   User" button and "Cancel" link.
2. Snapshot testing is used to ensure the UI remains consistent.

### Run Tests

```bash
  npm run test
```

-----

## UI Paths

| Path            | Description       |
|-----------------|-------------------|
| `/` or `/users` | User List Page    |
| `/users/new`    | Add New User Page |
| `/users/[id]`   | Edit User Page    |

-----

## User API Endpoints

| Method | Endpoint      | Description                 | Path Parameter | Request Body         | Response                |
|--------|---------------|-----------------------------|----------------|----------------------|-------------------------|
| GET    | `/users`      | Retrieve all users          | -              | -                    | Array of `User` objects |
| GET    | `/users/{id}` | Retrieve a user by their ID | `id` (string)  | -                    | Single `User` object    |
| POST   | `/users`      | Add a new user              | -              | `User` object (JSON) | Created `User` object   |
| PATCH  | `/users/{id}` | Update an existing user     | `id` (string)  | Partial/full `User`  | Updated `User` object   |
| DELETE | `/users/{id}` | Delete a user by their ID   | `id` (string)  | -                    | No content (success)    |

-----

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

## Credits

Developed by [Erny Sans](https://github.com/ernysans).

## License

This project is licensed under the MIT License.