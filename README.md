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
5. 

### Start the development server

```bash
  firebase emulators:start
```

#### Deploy to Firebase Hosting

```bash
  firebase deploy
```