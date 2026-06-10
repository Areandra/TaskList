# GivenTech — Facility & Asset Borrowing Management System

> Modern facility/item loan management information system for campuses, organizations, and companies. Integrated with online booking, QR Code verification, approval workflow, room location tracking, and real-time notifications (WhatsApp Cloud API). Designed as a full-stack application with scalable and modular architecture using AdonisJS 6.

![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=nodedotjs&logoColor=white)
![AdonisJS](https://img.shields.io/badge/AdonisJS-6.x-6E4AFF?logo=adonisjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=white)
![InertiaJS](https://img.shields.io/badge/InertiaJS-2.x-9553E9?logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)
![MySQL](https://img.shields.io/badge/Database-MySQL%2FMariaDB-4479A1?logo=mysql&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-010101?logo=socketdotio&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-greenn)

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [System Requirements](#-system-requirements)
- [Installation & Setup](#-installation--setup)
- [Environment Configuration](#-environment-configuration)
- [Running the Application](#-running-the-application)
- [Roles & Usage Flow](#-roles--usage-flow)
- [Admin Management via CLI](#-admin-management-via-cli)
- [API Endpoints](#-api-endpoints)
- [WebSocket Events](#-websocket-events)
- [Available Commands](#-available-commands)
- [Testing](#-testing)
- [CI/CD](#-cicd)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## 📖 About the Project

**GivenTech** is a facility and asset borrowing management system built with AdonisJS 6 on the backend and React 19 + InertiaJS on the frontend. The system provides a structured borrowing workflow — from submission, admin confirmation, QR Code-based pick-up, through to return — with everything monitored in realtime.

Key highlights:

- **Admins** manage facilities, rooms, users, and the entire booking process.
- **Users** submit bookings, track status, and use QR Codes to confirm facility pick-up and return.
- Automatic WhatsApp notifications are sent to all admins when a new booking is created, and to the user when their booking status changes.
- An interactive map displays rooms and the facilities currently being borrowed in realtime.
- A full REST API, GraphQL API, and OpenAPI documentation are available built-in.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Node.js 20+, AdonisJS 6.x, TypeScript 5.x |
| **Frontend** | React 19.x, InertiaJS 2.x, Lucide React |
| **Build Tool** | Vite 6.x, SWC |
| **Database** | MySQL 8.x / MariaDB 10.4+ (Lucid ORM) |
| **Authentication** | Session (web) + API Token + Google OAuth 2.0 |
| **Realtime** | Socket.IO 4.x |
| **Cache / OTP** | Redis (OTP expires in 5 minutes) |
| **Email** | AdonisJS Mail via SMTP |
| **Notifications** | WhatsApp Cloud API (Meta Graph API v22.0) |
| **QR Code** | `qrcode` + HMAC SHA-256 signature |
| **Map** | Leaflet + React-Leaflet |
| **API Docs** | OpenAPI (`@foadonis/openapi`) — `/docs`, `/docs.json`, `/docs.yml` |
| **GraphQL** | `@foadonis/graphql` + TypeGraphQL — endpoint `/graphql` |
| **Testing** | Japa + `@japa/api-client` + `@japa/openapi-assertions` |
| **Linter/Formatter** | ESLint, Prettier |

---

## ✨ Features

- **Role-based access control** — `admin` and `user` roles enforced via per-route middleware
- **Facility management** — Full CRUD for facilities with detailed status tracking
- **Room management** — CRUD rooms with longitude/latitude coordinates for the map
- **Booking management** — Complete booking flow from `Pending` to `Done` with admin approval
- **QR Code per booking** — QR Codes signed with HMAC SHA-256, used to confirm pick-up and return via mobile scan
- **Realtime updates** — Socket.IO automatically refreshes admin and user pages without reload when bookings or facilities change
- **Location map** — Leaflet displays rooms and the count of facilities currently borrowed (`Picked Up`) in realtime
- **WhatsApp notifications** — Automatic notifications to all admins on new bookings, and to the user when their booking is confirmed or cancelled
- **OTP email** — Forgot password uses a 6-digit OTP code sent via email, stored in Redis with a 5-minute expiry
- **Google OAuth 2.0** — Sign in with Google for both web session and API token
- **REST API** — Full endpoint set at `/api/v1` with bearer token authentication
- **GraphQL API** — Query users, bookings, facilities, and rooms via `/graphql`
- **OpenAPI Docs** — Auto-generated API documentation at `/docs`
- **User management** — CRUD users including profile updates and self-account deletion
- **CI/CD** — GitHub Actions workflow with MySQL 8, lint, migration, and automated tests

---

## 📁 Project Structure

```
GiveNTech/
├── app/
│   ├── controllers/
│   │   ├── auth_controller.ts          # Login, register, logout, OAuth, OTP
│   │   ├── bookings_controller.ts      # Booking CRUD (admin)
│   │   ├── fasilities_controller.ts    # Facility CRUD (admin)
│   │   ├── rooms_controller.ts         # Room CRUD + map data
│   │   ├── users_controller.ts         # User CRUD
│   │   ├── us_controller.ts            # /me endpoints (own profile & bookings)
│   │   ├── views_controller.ts         # Inertia page rendering
│   │   └── open_apis_controller.ts     # Serve OpenAPI docs
│   ├── graphql/resolvers/              # GraphQL resolvers (booking, facility, room, user)
│   ├── mailers/
│   │   └── send_otp.ts                 # OTP mailer via email
│   ├── middleware/
│   │   ├── auth_middleware.ts
│   │   ├── guest_middleware.ts
│   │   ├── role_based_acsess_middleware.ts  # Admin/user role guard
│   │   ├── silent_auth_middleware.ts
│   │   └── container_bindings_middleware.ts
│   ├── models/
│   │   ├── user.ts
│   │   ├── booking.ts
│   │   ├── facility.ts
│   │   └── room.ts
│   ├── rules/
│   │   ├── is_admin_rules.ts           # Admin-only field validation
│   │   └── is_admin_except_rules.ts    # Field validation with exceptions
│   ├── schemas/                        # OpenAPI + VineJS schema definitions
│   ├── services/
│   │   ├── booking_service.ts          # Booking business logic + WhatsApp notifications
│   │   ├── fasility_service.ts         # Facility business logic
│   │   ├── user_service.ts             # User business logic
│   │   ├── qr_code_service.ts          # QR Code generation & verification (HMAC SHA-256)
│   │   ├── web_socket_service.ts       # Socket.IO server & event handlers
│   │   └── whatsapp_cloud_api_service.ts  # WhatsApp Cloud API v22.0
│   └── validators/                     # VineJS validators
├── commands/
│   ├── app_admin.ts                    # CLI: create, promote, password-reset, list, destroy
│   ├── make_rule.ts
│   └── make_schema.ts
├── config/                             # AdonisJS config (auth, ally, mail, redis, cors, etc.)
├── database/
│   └── migrations/                     # 5 migration files
├── inertia/
│   ├── app/                            # React entry points (app.tsx, ssr.tsx)
│   ├── components/
│   │   ├── BottomNav.tsx
│   │   ├── DynamicMap.tsx              # Leaflet map (lazy loaded)
│   │   ├── FacilityForm.tsx
│   │   ├── RoomForm.tsx
│   │   └── QRCodeToCanvas.tsx
│   ├── layout/
│   │   ├── AuthenticatedLayout.tsx     # Admin layout
│   │   └── GuestLayout.tsx
│   ├── pages/
│   │   ├── auth/                       # Login, register, forgot password
│   │   ├── errors/                     # 403, 404, 500
│   │   ├── dashboard.tsx               # Admin dashboard (facility stats)
│   │   ├── booking.tsx                 # Booking management (admin)
│   │   ├── bookingEdit.tsx
│   │   ├── bookingForm.tsx
│   │   ├── bookingHistory.tsx
│   │   ├── detailBooking.tsx
│   │   ├── facility.tsx
│   │   ├── facilityCreate.tsx
│   │   ├── facilityEdit.tsx
│   │   ├── room.tsx
│   │   ├── roomCreate.tsx
│   │   ├── roomEdit.tsx
│   │   ├── map.tsx                     # Realtime room location map
│   │   ├── qrcode.tsx                  # Booking QR Code display
│   │   ├── qrcodeReader.tsx            # QR Code scanner
│   │   ├── userDashboard.tsx           # User dashboard
│   │   └── userFacility.tsx            # Facility list for users
│   └── types/index.ts                  # TypeScript interfaces
├── resources/
│   ├── docs.json                       # OpenAPI spec
│   └── views/inertia_layout.edge       # Edge template layout
├── start/
│   ├── env.ts                          # Environment variable validation & typing
│   ├── kernel.ts                       # Middleware registration
│   ├── routes.ts                       # All routes (web + API)
│   ├── graphql.ts                      # GraphQL initialization
│   └── ws.ts                           # Socket.IO initialization
├── tests/functional/
│   └── deployment_test.spec.ts         # Functional tests (Japa + OpenAPI assertions)
├── .github/workflows/
│   └── giventech-ci.yml                # GitHub Actions CI
├── .env.example
├── package.json
├── adonisrc.ts
├── tsconfig.json
└── vite.config.ts
```

---

## 🗄️ Database Schema

| Table | Description |
|-------|-------------|
| `users` | All system users with `username`, `email`, `phone_number`, `password`, `role` |
| `access_tokens` | API tokens for bearer authentication |
| `facilities` | Borrowable facilities/assets with availability status tracking |
| `rooms` | Rooms with `longitude` and `latitude` coordinates for the map |
| `bookings` | Booking records with relations to user, approver, facility, and room |

### Key Column Details

**`users`**

| Column | Type | Notes |
|--------|------|-------|
| `id` | int (PK) | |
| `username` | string | |
| `email` | string | Unique |
| `phone_number` | string | Format: `628xxx` (for WhatsApp) |
| `password` | string / null | Nullable — OAuth users have no local password |
| `role` | enum | `admin`, `user` |

**`facilities`**

| Column | Type | Notes |
|--------|------|-------|
| `id` | int (PK) | |
| `name` | string(100) | |
| `type` | string(100) | e.g. Room, Vehicle, Equipment |
| `status` | enum | `Available`, `Booked`, `Borrowed`, `Under Inspection`, `Maintenance`, `Damaged` |

**`rooms`**

| Column | Type | Notes |
|--------|------|-------|
| `id` | int (PK) | |
| `room_name` | string(100) | |
| `longitude` | decimal(10,7) | |
| `latitude` | decimal(10,7) | |

**`bookings`**

| Column | Type | Notes |
|--------|------|-------|
| `id` | int (PK) | |
| `id_user` | int FK | References `users` (CASCADE) |
| `id_approver` | int FK / null | References `users` — the admin who approved |
| `id_facility` | int FK | References `facilities` (CASCADE) |
| `id_room` | int FK / null | References `rooms` (SET NULL) |
| `booking_date` | date | |
| `return_date` | date / null | |
| `status` | enum | `Pending`, `Confirmed`, `Picked Up`, `Returned`, `Cancelled`, `Penalized`, `Done` |
| `purpose` | text | Borrowing purpose |
| `notes` | string / null | Additional notes |

---

## ⚙️ System Requirements

| Requirement | Version |
|-------------|---------|
| **Node.js** | ≥ 20.x (LTS recommended) |
| **npm** | ≥ 10.x |
| **MySQL** | 8.x or **MariaDB** 10.4.x and above |
| **Redis** | 6.x and above (required for OTP) |
| **OS** | Windows 10/11, Ubuntu 22.04+, macOS |

### Recommended Tools

- Code editor: [VSCode](https://code.visualstudio.com/)
- Database GUI: [DBeaver](https://dbeaver.io/) or phpMyAdmin
- Git: [Git](https://git-scm.com/)

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Areandra/GiveNTech.git
cd GiveNTech
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Copy the Environment File

```bash
cp .env.example .env
```

### 4. Generate the Application Key

```bash
node ace generate:key
```

### 5. Create the Database Manually

Create the database in MySQL/MariaDB before running migrations:

```sql
CREATE DATABASE giventech CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 6. Configure `.env`

See the [Environment Configuration](#-environment-configuration) section below.

### 7. Run Database Migrations

```bash
node ace migration:run
```

> **Note:** If migration fails, make sure the database was created manually, the DB connection is correct, and the DB user has sufficient permissions.

### 8. Build Frontend Assets (Optional for Development)

```bash
npm run build
```

---

## 🔧 Environment Configuration

Fill in the following variables in your `.env` file:

```env
PORT=3333
HOST=localhost
APP_KEY=                        # Filled automatically after node ace generate:key
NODE_ENV=development
LOG_LEVEL=info
SESSION_DRIVER=cookie

# Database
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=giventech

# Google OAuth 2.0
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Email SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=
SMTP_PASSWORD=

# Redis (required — for OTP)
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=

# WhatsApp Cloud API (Meta)
PHONE_NUMBER_ID=
WA_ACCESS_TOKEN=
```

> **Note:** Redis, SMTP, Google OAuth, and WhatsApp Cloud API must be configured for their respective features to work. Without Redis, the forgot password OTP feature will not function.

### Google OAuth — Callback URL

Callback URLs configured in `config/ally.ts`:

- **Web session:** `https://<your-domain>/login/oauth/google/callback`
- **API token:** `http://localhost:3333/oauth/google/token/callback`

Adjust the `callbackUrl` in `config/ally.ts` to match the domain used during deployment.

---

## ▶️ Running the Application

### Development

```bash
npm run dev
```

Starts the AdonisJS server with HMR active. Access at: **[http://localhost:3333](http://localhost:3333)**

### Production

```bash
npm run build
node bin/server.js
```

---

## 👥 Roles & Usage Flow

### Roles

| Role | Access |
|------|--------|
| **Admin** | Dashboard, CRUD facilities/rooms/users, manage all bookings, confirm pick-up/return |
| **User** | User dashboard, browse facilities, create bookings, track status, scan/display QR Code |

### Booking Flow

```
[User]    Select facility → Create booking (status: Pending)
              ↓
[System]  Send WhatsApp notification to all admins
              ↓
[Admin]   Confirm booking (status: Confirmed)
              ↓
[System]  Send WhatsApp notification to user — QR Code now available
              ↓
[User]    Arrive → Scan booking QR Code (status: Picked Up)
              ↓                         [facility: Borrowed]
[User]    Return → Scan QR Code (status: Returned)
              ↓                         [facility: Under Inspection]
[Admin]   Finalize → Done  [facility: Available]
                  → Penalized [facility: Damaged]
```

### Booking Status Flow

```
Pending → Confirmed → Picked Up → Returned → Done
                                           → Penalized
        → Cancelled
```

### Facility Status Flow

```
Available → Booked → Borrowed → Under Inspection → Available
                                                 → Damaged (if Penalized)
          → Maintenance
          → Damaged
```

---

## 🔑 Admin Management via CLI

Manage admin accounts with the commands below. The server does not need to be running — these commands access the database directly.

```bash
# Create a new admin
node ace app:admin create

# Promote a user to admin (by ID or email)
node ace app:admin promote <id_or_email>

# Reset admin password
node ace app:admin password-reset <id_or_email>

# List all users
node ace app:admin list

# Delete a user/admin
node ace app:admin destroy <id_or_email>
```

---

## 🌐 API Endpoints

Base URL: `/api/v1` — All endpoints requiring authentication use a Bearer Token.

Full interactive documentation is available at: **`/docs`** (OpenAPI UI) | **`/docs.json`** | **`/docs.yml`**

### Auth

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/auth/login` | Public | Login and receive an API token |
| GET | `/oauth/google/token` | Public | Google login — OAuth redirect |
| GET | `/oauth/google/token/callback` | Public | Google OAuth callback (API token) |
| POST | `/auth/forgot-password` | Public | Send OTP to email |
| PUT | `/auth/forgot-password` | Public | Verify OTP & change password |

### User

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/v1/user` | Public | Register a new user |
| GET | `/api/v1/user` | Admin | List all users |
| GET | `/api/v1/user/:id` | Admin | User detail |
| PUT | `/api/v1/user/:id` | Admin | Update user |
| DELETE | `/api/v1/user/:id` | Admin | Delete user |

### Me (Own Profile)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/v1/me` | Auth | Get own profile |
| POST | `/api/v1/me` | Auth | Update own profile |
| DELETE | `/api/v1/me` | Auth | Delete own account |
| GET | `/api/v1/me/booking` | Auth | List own bookings |
| POST | `/api/v1/me/booking` | Auth | Create a new booking |
| GET | `/api/v1/me/booking/:id` | Auth | Own booking detail |
| POST | `/api/v1/me/booking/:id` | Auth | Update own booking |
| DELETE | `/api/v1/me/booking/:id` | Auth | Delete own booking |

### Facilities

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/v1/facility` | Auth | List all facilities (paginated) |
| GET | `/api/v1/facility/:id` | Auth | Facility detail |
| POST | `/api/v1/facility` | Admin | Add a facility |
| PUT | `/api/v1/facility/:id` | Admin | Update a facility |
| DELETE | `/api/v1/facility/:id` | Admin | Delete a facility |

### Rooms

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/v1/room` | Auth | List all rooms |
| GET | `/api/v1/room/:id` | Auth | Room detail + active bookings |
| GET | `/api/v1/room/mapData` | Auth | Rooms + `Picked Up` bookings for the map |
| POST | `/api/v1/room` | Admin | Add a room |
| PUT | `/api/v1/room/:id` | Admin | Update a room |
| DELETE | `/api/v1/room/:id` | Admin | Delete a room |

### Bookings (Admin)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/v1/booking` | Admin | List all bookings (paginated) |
| GET | `/api/v1/booking/:id` | Admin | Booking detail |
| POST | `/api/v1/booking` | Admin | Create a booking on behalf of a user |
| PUT | `/api/v1/booking/:id` | Admin | Update booking (including status change) |
| DELETE | `/api/v1/booking/:id` | Admin | Delete a booking |

### GraphQL

Endpoint: **`/graphql`**

Available queries: `users`, `user(id)`, `facilities`, `facility(id)`, `rooms`, `room(id)`, `bookings`, `booking(id)`

---

## ⚡ WebSocket Events (Socket.IO)

The frontend connects to the Socket.IO server via `io()` (same-origin). The following events are used for realtime data updates without page reload.

### Broadcast Events (Server → All Clients)

| Event | Triggered When |
|-------|---------------|
| `bookingReload` | A booking is created, updated, or deleted |
| `facilityReload` | A facility status changes |
| `roomReload` | Room data changes |

### QR Code Events (Scan Flow)

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `registerSession` | Client → Server | `sessionId: string` | Register the admin/user browser session |
| `scanQR` | Client → Server | `{ sessionId, user, idBooking }` | Mobile scans QR, triggers browser update |
| `qrScanned` | Server → Client | `{ idBooking, user }` | Notifies browser that QR was scanned |
| `waitingConfirmToPickUp` | Client → Server | `{ sessionId, idBooking }` | Confirm pick-up → status `Picked Up` |
| `facilityPickedUp` | Server → Client | `{ idBooking }` | Broadcasts `Picked Up` status |
| `waitingConfirmToReturn` | Client → Server | `{ sessionId, idBooking }` | Confirm return → status `Returned` |
| `facilityReturned` | Server → Client | `{ idBooking }` | Broadcasts `Returned` status |

---

## 📋 Available Commands

### npm Scripts

```bash
npm run dev          # Start the development server with HMR
npm run build        # Build for production
npm run start        # Start the production build
npm run test         # Run functional tests
npm run lint         # Check code style (ESLint)
npm run format       # Format code (Prettier)
npm run typecheck    # TypeScript type checking
```

### Ace CLI (AdonisJS)

```bash
node ace migration:run           # Run database migrations
node ace migration:rollback      # Rollback the last migration
node ace migration:fresh         # Drop all tables and re-migrate
node ace generate:key            # Generate APP_KEY
node ace serve --hmr             # Start dev server (same as npm run dev)
node ace test                    # Run tests
node ace app:admin <action>      # Admin management (see CLI section)
```

---

## 🧪 Testing

The project uses [Japa](https://japa.dev/) with `@japa/api-client` and `@japa/openapi-assertions`. Functional tests are in `tests/functional/deployment_test.spec.ts` and cover the full flow: registration, login, facility CRUD, room CRUD, and booking CRUD for both admin and user roles.

```bash
# Run all tests
npm run test
# or
node ace test

# Run a specific suite
node ace test --suite=functional
```

---

## ⚙️ CI/CD

The GitHub Actions workflow (`.github/workflows/giventech-ci.yml`) runs automatically on every `push` and `pull_request` to all branches.

Steps executed:

1. Spin up MySQL 8 service (with automatic health check)
2. Set up Node.js 20
3. `npm install`
4. Copy `.env.example` → `.env`
5. `npm run lint`
6. `node ace generate:key`
7. `node ace migration:run --force`
8. `node ace test --silent`

---

## 🤝 Contributing

1. Fork this repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

Please ensure all tests pass and the code is formatted before submitting a PR.

---

## 📬 Contact

| | |
|---|---|
| **Owner** | Areandra (Muhammad Ariel) |
| **GitHub** | [@Areandra](https://github.com/Areandra) |
| **Repository** | [github.com/Areandra/GiveNTech](https://github.com/Areandra/GiveNTech) |
| **LinkedIn** | [muhammad-ariel-4899312a0](https://www.linkedin.com/in/muhammad-ariel-4899312a0/) |

---

<p align="center">Built with AdonisJS · React · Socket.IO · WhatsApp Cloud API</p>
