# Application Running Instructions

This document provides instructions on how to run the application, including starting the development server, starting the api server, installing dependencies, and running tests.

## 1. Install Dependencies

Before running the application, you need to install all the necessary dependencies. Run the following command:

```bash
npm install
```

## 2. Add an env.local file
Add an env.local file at the root of the project with this content: 
```bash
NEXT_PUBLIC_FLIGHT_SERVICE_ENDPOINT=http://localhost:3000
```

## 3. Start the Development Server
To start the Next.js application in development mode, use the following command:

```bash
npm run dev
```

This will start the development server, and you can access the application at http://localhost:4000

## 4. Start the API Server
To start the  API server, use the following command:

```bash
npm run server
```


## 5. To run unit tests
To start the Next.js application in development mode, use the following command:

```bash
npm run test
```

## 6. Visit the App
Open your browser and go to http://localhost:4000.

## 7. Register a New User
Register a new user and voila, you can login and enjoy flight management.