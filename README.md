# DevPulse API

A RESTful Issue Tracking API built with **Node.js**, **Express.js**, **TypeScript**, **PostgreSQL**, and **JWT Authentication**. The API provides secure user authentication, role-based authorization, and issue management for collaborative development teams.

---

## Features

* User Registration
* User Login with JWT Authentication
* Password Hashing using bcrypt
* PostgreSQL Database Integration
* Role-Based Authorization
* RESTful API Design
* TypeScript Support
* Centralized Error Handling
* Environment Variable Configuration
* Modular Project Architecture

---

## Tech Stack

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* pg
* JWT (jsonwebtoken)
* bcrypt
* dotenv
* CORS
* Nodemon

---

## Project Structure

```
src/
│
├── app/
│   ├── modules/
│   │   ├── auth/
│   │   ├── issue/
│   │   └── user/
│   │
│   ├── middleware/
│   ├── routes/
│   └── utility/
│
├── config/
├── server.ts
└── app.ts
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/your-username/devpulse-api.git
```

Move into the project directory

```bash
cd devpulse-api
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=3000

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_secret_key
```

Run the development server

```bash
npm run dev
```

---

## API Endpoints

### Authentication

### Register User

```
POST /api/auth/signup
```

### Login User

```
POST /api/auth/login
```

---

### Issues

```
GET     /api/issues
GET     /api/issues/:id
POST    /api/issues
PATCH   /api/issues/:id
DELETE  /api/issues/:id
```

---

## Available Roles

* Maintainer
* Contributor

---

## Scripts

```bash
npm run dev
```

Runs the development server.

```bash
npm run build
```

Compiles the TypeScript project.

```bash
npm start
```

Runs the production build.

---

## Environment Variables

```env
PORT=

DATABASE_URL=

JWT_SECRET=
```

---

## Future Improvements

* Refresh Token Authentication
* Pagination
* Filtering & Searching
* Issue Comments
* File Upload
* API Documentation with Swagger
* Unit & Integration Testing

---

## Author

**Subroto Chanda Shuvo**

Computer Science & Engineering Student

Metropolitan University, Sylhet

GitHub: https://github.com/SubrotoChandaShuvo

