# GivenTech — Sistem Manajemen Peminjaman Fasilitas & Aset

> Platform manajemen peminjaman fasilitas dan aset instansi berbasis web — memudahkan **Admin** dan **User** dalam mengelola inventaris, proses booking, konfirmasi pengambilan/pengembalian via QR Code, serta notifikasi realtime melalui WhatsApp dan Socket.IO.

![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=nodedotjs&logoColor=white)
![AdonisJS](https://img.shields.io/badge/AdonisJS-6.x-6E4AFF?logo=adonisjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=white)
![InertiaJS](https://img.shields.io/badge/InertiaJS-2.x-9553E9?logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)
![MySQL](https://img.shields.io/badge/Database-MySQL%2FMariaDB-4479A1?logo=mysql&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-010101?logo=socketdotio&logoColor=white)
![License](https://img.shields.io/badge/License-UNLICENSED-red)

---

## 📑 Table of Contents

- [Tentang Proyek](#-tentang-proyek)
- [Tech Stack](#-tech-stack)
- [Fitur](#-fitur)
- [Struktur Proyek](#-struktur-proyek)
- [Skema Database](#-skema-database)
- [Kebutuhan Sistem](#-kebutuhan-sistem)
- [Instalasi & Setup](#-instalasi--setup)
- [Konfigurasi Environment](#-konfigurasi-environment)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Role & Alur Penggunaan](#-role--alur-penggunaan)
- [Manajemen Admin via CLI](#-manajemen-admin-via-cli)
- [API Endpoints](#-api-endpoints)
- [WebSocket Events](#-websocket-events)
- [Perintah yang Tersedia](#-perintah-yang-tersedia)
- [Testing](#-testing)
- [CI/CD](#-cicd)
- [Kontribusi](#-kontribusi)
- [Kontak](#-kontak)

---

## 📖 Tentang Proyek

**GivenTech** adalah sistem manajemen peminjaman fasilitas dan aset instansi yang dibangun dengan AdonisJS 6 di backend dan React 19 + InertiaJS di frontend. Sistem ini menyediakan alur peminjaman yang terstruktur mulai dari pengajuan, konfirmasi admin, pengambilan barang via QR Code, hingga pengembalian — semuanya terpantau secara realtime.

Fitur utamanya mencakup:

- **Admin** mengelola fasilitas, ruangan, user, dan seluruh proses booking.
- **User** mengajukan booking, memantau status, dan menggunakan QR Code untuk pengambilan/pengembalian fasilitas.
- Notifikasi otomatis dikirim ke WhatsApp admin saat ada booking baru, dan ke WhatsApp user saat status booking berubah.
- Peta lokasi interaktif menampilkan ruangan beserta fasilitas yang sedang dipinjam secara realtime.
- REST API lengkap, GraphQL API, dan dokumentasi OpenAPI tersedia built-in.

---

## 🛠 Tech Stack

| Layer | Teknologi |
|-------|-----------|
| **Backend** | Node.js 20+, AdonisJS 6.x, TypeScript 5.x |
| **Frontend** | React 19.x, InertiaJS 2.x, Lucide React |
| **Build Tool** | Vite 6.x, SWC |
| **Database** | MySQL 8.x / MariaDB 10.4+ (Lucid ORM) |
| **Autentikasi** | Session (web) + API Token + Google OAuth 2.0 |
| **Realtime** | Socket.IO 4.x |
| **Cache / OTP** | Redis (OTP expire 5 menit) |
| **Email** | AdonisJS Mail via SMTP |
| **Notifikasi** | WhatsApp Cloud API (Meta Graph API v22.0) |
| **QR Code** | `qrcode` + HMAC SHA-256 signature |
| **Peta** | Leaflet + React-Leaflet |
| **API Docs** | OpenAPI (`@foadonis/openapi`) — `/docs`, `/docs.json`, `/docs.yml` |
| **GraphQL** | `@foadonis/graphql` + TypeGraphQL — endpoint `/graphql` |
| **Testing** | Japa + `@japa/api-client` + `@japa/openapi-assertions` |
| **Linter/Formatter** | ESLint, Prettier |

---

## ✨ Fitur

- **Role-based access control** — Role `admin` dan `user` dengan middleware per route
- **Manajemen fasilitas** — CRUD fasilitas dengan tracking status lengkap
- **Manajemen ruangan** — CRUD ruangan dengan koordinat longitude/latitude untuk peta
- **Booking management** — Alur booking lengkap dari `Pending` hingga `Done` dengan approval admin
- **QR Code per booking** — QR Code ter-sign dengan HMAC SHA-256, digunakan untuk konfirmasi pengambilan dan pengembalian via scan mobile
- **Realtime update** — Socket.IO memperbarui halaman admin dan user secara otomatis tanpa reload saat ada perubahan booking atau fasilitas
- **Peta lokasi** — Leaflet menampilkan ruangan dan jumlah fasilitas yang sedang dipinjam (`Picked Up`) secara realtime
- **Notifikasi WhatsApp** — Notifikasi otomatis ke admin saat ada booking baru, dan ke user saat booking dikonfirmasi atau dibatalkan
- **OTP Email** — Lupa password menggunakan kode OTP 6 digit via email, disimpan di Redis dengan expiry 5 menit
- **Google OAuth 2.0** — Login via Google untuk web session maupun API token
- **REST API** — Endpoint lengkap di `/api/v1` dengan autentikasi bearer token
- **GraphQL API** — Query data users, bookings, facilities, rooms via `/graphql`
- **OpenAPI Docs** — Dokumentasi API otomatis di `/docs`
- **Manajemen user** — CRUD user termasuk update profil dan hapus akun sendiri
- **CI/CD** — GitHub Actions workflow dengan MySQL 8, lint, migrasi, dan test otomatis

---

## 📁 Struktur Proyek

```
GiveNTech/
├── app/
│   ├── controllers/
│   │   ├── auth_controller.ts          # Login, register, logout, OAuth, OTP
│   │   ├── bookings_controller.ts      # CRUD booking (admin)
│   │   ├── fasilities_controller.ts    # CRUD fasilitas (admin)
│   │   ├── rooms_controller.ts         # CRUD ruangan + data peta
│   │   ├── users_controller.ts         # CRUD user
│   │   ├── us_controller.ts            # Endpoint /me (profil & booking sendiri)
│   │   ├── views_controller.ts         # Render halaman Inertia
│   │   └── open_apis_controller.ts     # Serve OpenAPI docs
│   ├── graphql/resolvers/              # GraphQL resolvers (booking, facility, room, user)
│   ├── mailers/
│   │   └── send_otp.ts                 # Mailer OTP via email
│   ├── middleware/
│   │   ├── auth_middleware.ts
│   │   ├── guest_middleware.ts
│   │   ├── role_based_acsess_middleware.ts  # Guard role admin/user
│   │   ├── silent_auth_middleware.ts
│   │   └── container_bindings_middleware.ts
│   ├── models/
│   │   ├── user.ts
│   │   ├── booking.ts
│   │   ├── facility.ts
│   │   └── room.ts
│   ├── rules/
│   │   ├── is_admin_rules.ts           # Validasi field khusus admin
│   │   └── is_admin_except_rules.ts    # Validasi field dengan pengecualian
│   ├── schemas/                        # OpenAPI + VineJS schema definitions
│   ├── services/
│   │   ├── booking_service.ts          # Business logic booking + WhatsApp notif
│   │   ├── fasility_service.ts         # Business logic fasilitas
│   │   ├── user_service.ts             # Business logic user
│   │   ├── qr_code_service.ts          # Generate & verify QR (HMAC SHA-256)
│   │   ├── web_socket_service.ts       # Socket.IO server & event handler
│   │   └── whatsapp_cloud_api_service.ts  # WhatsApp Cloud API v22.0
│   └── validators/                     # VineJS validators
├── commands/
│   ├── app_admin.ts                    # CLI: create, promote, password-reset, list, destroy
│   ├── make_rule.ts
│   └── make_schema.ts
├── config/                             # Konfigurasi AdonisJS (auth, ally, mail, redis, cors, dll)
├── database/
│   └── migrations/                     # 5 migration files
├── inertia/
│   ├── app/                            # Entry point React (app.tsx, ssr.tsx)
│   ├── components/
│   │   ├── BottomNav.tsx
│   │   ├── DynamicMap.tsx              # Leaflet map (lazy loaded)
│   │   ├── FacilityForm.tsx
│   │   ├── RoomForm.tsx
│   │   └── QRCodeToCanvas.tsx
│   ├── layout/
│   │   ├── AuthenticatedLayout.tsx     # Layout admin
│   │   └── GuestLayout.tsx
│   ├── pages/
│   │   ├── auth/                       # Login, register, forgot password
│   │   ├── errors/                     # 403, 404, 500
│   │   ├── dashboard.tsx               # Dashboard admin (stats fasilitas)
│   │   ├── booking.tsx                 # Manajemen booking (admin)
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
│   │   ├── map.tsx                     # Peta lokasi ruangan realtime
│   │   ├── qrcode.tsx                  # Tampilan QR Code booking
│   │   ├── qrcodeReader.tsx            # Scanner QR Code
│   │   ├── userDashboard.tsx           # Dashboard user
│   │   └── userFacility.tsx            # Daftar fasilitas untuk user
│   └── types/index.ts                  # TypeScript interfaces
├── resources/
│   ├── docs.json                       # OpenAPI spec
│   └── views/inertia_layout.edge       # Edge template layout
├── start/
│   ├── env.ts                          # Validasi & typing environment variables
│   ├── kernel.ts                       # Middleware registration
│   ├── routes.ts                       # Semua route (web + API)
│   ├── graphql.ts                      # Inisialisasi GraphQL
│   └── ws.ts                           # Inisialisasi Socket.IO
├── tests/functional/
│   └── deployment_test.spec.ts         # Functional tests (Japa + OpenAPI assertion)
├── .github/workflows/
│   └── giventech-ci.yml                # GitHub Actions CI
├── .env.example
├── package.json
├── adonisrc.ts
├── tsconfig.json
└── vite.config.ts
```

---

## 🗄️ Skema Database

| Tabel | Deskripsi |
|-------|-----------|
| `users` | Semua pengguna sistem dengan field `username`, `email`, `phone_number`, `password`, `role` |
| `access_tokens` | Token API untuk autentikasi bearer |
| `facilities` | Data fasilitas/aset yang dapat dipinjam beserta status ketersediaannya |
| `rooms` | Data ruangan dengan koordinat `longitude` dan `latitude` untuk peta |
| `bookings` | Data booking dengan relasi ke user, approver, facility, dan room |

### Detail kolom penting

**`users`**

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | int (PK) | |
| `username` | string | |
| `email` | string | Unique |
| `phone_number` | string | Format: `628xxx` (untuk WhatsApp) |
| `password` | string / null | Nullable — user OAuth tidak punya password lokal |
| `role` | enum | `admin`, `user` |

**`facilities`**

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | int (PK) | |
| `name` | string(100) | |
| `type` | string(100) | Contoh: Ruangan, Kendaraan, Peralatan |
| `status` | enum | `Available`, `Booked`, `Borrowed`, `Under Inspection`, `Maintenance`, `Damaged` |

**`rooms`**

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | int (PK) | |
| `room_name` | string(100) | |
| `longitude` | decimal(10,7) | |
| `latitude` | decimal(10,7) | |

**`bookings`**

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | int (PK) | |
| `id_user` | int FK | Referensi ke `users` (CASCADE) |
| `id_approver` | int FK / null | Referensi ke `users` — admin yang menyetujui |
| `id_facility` | int FK | Referensi ke `facilities` (CASCADE) |
| `id_room` | int FK / null | Referensi ke `rooms` (SET NULL) |
| `booking_date` | date | |
| `return_date` | date / null | |
| `status` | enum | `Pending`, `Confirmed`, `Picked Up`, `Returned`, `Cancelled`, `Penalized`, `Done` |
| `purpose` | text | Tujuan peminjaman |
| `notes` | string / null | Catatan tambahan |

---

## ⚙️ Kebutuhan Sistem

| Kebutuhan | Versi |
|-----------|-------|
| **Node.js** | ≥ 20.x (LTS direkomendasikan) |
| **npm** | ≥ 10.x |
| **MySQL** | 8.x atau **MariaDB** 10.4.x ke atas |
| **Redis** | 6.x ke atas (wajib untuk OTP) |
| **OS** | Windows 10/11, Ubuntu 22.04+, macOS |

### Tools Rekomendasi

- Code editor: [VSCode](https://code.visualstudio.com/)
- Database GUI: [DBeaver](https://dbeaver.io/) atau phpMyAdmin
- Git: [Git](https://git-scm.com/)

---

## 🚀 Instalasi & Setup

### 1. Clone Repository

```bash
git clone https://github.com/Areandra/GiveNTech.git
cd GiveNTech
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Salin File Environment

```bash
cp .env.example .env
```

### 4. Generate Application Key

```bash
node ace generate:key
```

### 5. Buat Database Secara Manual

Buat database di MySQL/MariaDB terlebih dahulu sebelum migrasi:

```sql
CREATE DATABASE giventech CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 6. Konfigurasi `.env`

Lihat bagian [Konfigurasi Environment](#-konfigurasi-environment) di bawah.

### 7. Jalankan Migrasi Database

```bash
node ace migration:run
```

> **Catatan:** Jika migrasi gagal, pastikan database sudah dibuat secara manual, koneksi DB benar, dan user DB memiliki permission yang sesuai.

### 8. Build Frontend Assets (Opsional untuk Development)

```bash
npm run build
```

---

## 🔧 Konfigurasi Environment

Isi file `.env` dengan variabel berikut:

```env
PORT=3333
HOST=localhost
APP_KEY=                        # Diisi otomatis setelah node ace generate:key
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

# Redis (wajib — untuk OTP)
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=

# WhatsApp Cloud API (Meta)
PHONE_NUMBER_ID=
WA_ACCESS_TOKEN=
```

> **Catatan:** Redis, SMTP, Google OAuth, dan WhatsApp Cloud API wajib dikonfigurasi agar fitur terkait berfungsi. Tanpa Redis, fitur lupa password via OTP tidak akan bekerja.

### Google OAuth — Callback URL

Callback URL yang dikonfigurasi di `config/ally.ts`:

- **Web session:** `https://<domain-anda>/login/oauth/google/callback`
- **API token:** `http://localhost:3333/oauth/google/token/callback`

Sesuaikan `callbackUrl` di `config/ally.ts` dengan domain yang digunakan saat deployment.

---

## ▶️ Menjalankan Aplikasi

### Development

```bash
npm run dev
```

Menjalankan server AdonisJS dengan HMR aktif. Akses di: **[http://localhost:3333](http://localhost:3333)**

### Production

```bash
npm run build
node bin/server.js
```

---

## 👥 Role & Alur Penggunaan

### Role

| Role | Akses |
|------|-------|
| **Admin** | Dashboard, CRUD fasilitas/ruangan/user, kelola semua booking, konfirmasi pengambilan/pengembalian |
| **User** | Dashboard user, lihat fasilitas, buat booking, pantau status, scan/tampilkan QR Code |

### Alur Booking

```
[User]    Pilih fasilitas → Buat booking (status: Pending)
              ↓
[Sistem]  Kirim notifikasi WhatsApp ke semua admin
              ↓
[Admin]   Konfirmasi booking (status: Confirmed)
              ↓
[Sistem]  Kirim notifikasi WhatsApp ke user — QR Code tersedia
              ↓
[User]    Datang → Scan QR Code booking (status: Picked Up)
              ↓             [fasilitas: Borrowed]
[User]    Kembalikan → Scan QR Code (status: Returned)
              ↓             [fasilitas: Under Inspection]
[Admin]   Finalisasi → Done [fasilitas: Available]
              atau Penalized [fasilitas: Damaged]
```

### Status Booking

```
Pending → Confirmed → Picked Up → Returned → Done
                                           → Penalized
        → Cancelled
```

### Status Fasilitas

```
Available → Booked → Borrowed → Under Inspection → Available
                                                  → Damaged (jika Penalized)
         → Maintenance
         → Damaged
```

---

## 🔑 Manajemen Admin via CLI

Kelola akun admin melalui perintah berikut. Server tidak perlu berjalan — perintah ini langsung mengakses database.

```bash
# Buat admin baru
node ace app:admin create

# Promosikan user menjadi admin (gunakan ID atau email)
node ace app:admin promote <id_atau_email>

# Reset password admin
node ace app:admin password-reset <id_atau_email>

# Lihat daftar semua user
node ace app:admin list

# Hapus user/admin
node ace app:admin destroy <id_atau_email>
```

---

## 🌐 API Endpoints

Base URL: `/api/v1` — Semua endpoint yang membutuhkan autentikasi menggunakan Bearer Token.

Dokumentasi interaktif lengkap tersedia di: **`/docs`** (OpenAPI UI) | **`/docs.json`** | **`/docs.yml`**

### Auth

| Method | Endpoint | Akses | Deskripsi |
|--------|----------|-------|-----------|
| POST | `/auth/login` | Public | Login, mendapat API token |
| GET | `/oauth/google/token` | Public | Login Google — redirect OAuth |
| GET | `/oauth/google/token/callback` | Public | Callback Google OAuth (API token) |
| POST | `/auth/forgot-password` | Public | Kirim OTP ke email |
| PUT | `/auth/forgot-password` | Public | Verifikasi OTP & ganti password |

### User

| Method | Endpoint | Akses | Deskripsi |
|--------|----------|-------|-----------|
| POST | `/api/v1/user` | Public | Registrasi user baru |
| GET | `/api/v1/user` | Admin | List semua user |
| GET | `/api/v1/user/:id` | Admin | Detail user |
| PUT | `/api/v1/user/:id` | Admin | Update user |
| DELETE | `/api/v1/user/:id` | Admin | Hapus user |

### Me (Profil Sendiri)

| Method | Endpoint | Akses | Deskripsi |
|--------|----------|-------|-----------|
| GET | `/api/v1/me` | Auth | Ambil profil sendiri |
| POST | `/api/v1/me` | Auth | Update profil sendiri |
| DELETE | `/api/v1/me` | Auth | Hapus akun sendiri |
| GET | `/api/v1/me/booking` | Auth | List booking milik sendiri |
| POST | `/api/v1/me/booking` | Auth | Buat booking baru |
| GET | `/api/v1/me/booking/:id` | Auth | Detail booking milik sendiri |
| POST | `/api/v1/me/booking/:id` | Auth | Update booking milik sendiri |
| DELETE | `/api/v1/me/booking/:id` | Auth | Hapus booking milik sendiri |

### Fasilitas

| Method | Endpoint | Akses | Deskripsi |
|--------|----------|-------|-----------|
| GET | `/api/v1/facility` | Auth | List semua fasilitas (paginasi) |
| GET | `/api/v1/facility/:id` | Auth | Detail fasilitas |
| POST | `/api/v1/facility` | Admin | Tambah fasilitas |
| PUT | `/api/v1/facility/:id` | Admin | Update fasilitas |
| DELETE | `/api/v1/facility/:id` | Admin | Hapus fasilitas |

### Ruangan

| Method | Endpoint | Akses | Deskripsi |
|--------|----------|-------|-----------|
| GET | `/api/v1/room` | Auth | List semua ruangan |
| GET | `/api/v1/room/:id` | Auth | Detail ruangan + booking aktif |
| GET | `/api/v1/room/mapData` | Auth | Data ruangan + booking `Picked Up` untuk peta |
| POST | `/api/v1/room` | Admin | Tambah ruangan |
| PUT | `/api/v1/room/:id` | Admin | Update ruangan |
| DELETE | `/api/v1/room/:id` | Admin | Hapus ruangan |

### Booking (Admin)

| Method | Endpoint | Akses | Deskripsi |
|--------|----------|-------|-----------|
| GET | `/api/v1/booking` | Admin | List semua booking (paginasi) |
| GET | `/api/v1/booking/:id` | Admin | Detail booking |
| POST | `/api/v1/booking` | Admin | Buat booking atas nama user lain |
| PUT | `/api/v1/booking/:id` | Admin | Update booking (termasuk ubah status) |
| DELETE | `/api/v1/booking/:id` | Admin | Hapus booking |

### GraphQL

Endpoint: **`/graphql`**

Query yang tersedia: `users`, `user(id)`, `facilities`, `facility(id)`, `rooms`, `room(id)`, `bookings`, `booking(id)`

---

## ⚡ WebSocket Events (Socket.IO)

Koneksi ke server Socket.IO dilakukan dari frontend via `io()` (same-origin). Events berikut digunakan untuk update data realtime tanpa reload halaman.

### Broadcast Events (Server → Semua Client)

| Event | Kapan dikirim |
|-------|---------------|
| `bookingReload` | Setiap kali ada booking dibuat, diupdate, atau dihapus |
| `facilityReload` | Setiap kali status fasilitas berubah |
| `roomReload` | Setiap kali data ruangan berubah |

### QR Code Events (Untuk Alur Scan)

| Event | Arah | Payload | Deskripsi |
|-------|------|---------|-----------|
| `registerSession` | Client → Server | `sessionId: string` | Daftarkan session browser admin/user |
| `scanQR` | Client → Server | `{ sessionId, user, idBooking }` | Mobile scan QR, trigger update ke browser |
| `qrScanned` | Server → Client | `{ idBooking, user }` | Notifikasi bahwa QR sudah di-scan |
| `waitingConfirmToPickUp` | Client → Server | `{ sessionId, idBooking }` | Konfirmasi pengambilan → status `Picked Up` |
| `facilityPickedUp` | Server → Client | `{ idBooking }` | Broadcast status `Picked Up` |
| `waitingConfirmToReturn` | Client → Server | `{ sessionId, idBooking }` | Konfirmasi pengembalian → status `Returned` |
| `facilityReturned` | Server → Client | `{ idBooking }` | Broadcast status `Returned` |

---

## 📋 Perintah yang Tersedia

### npm Scripts

```bash
npm run dev          # Jalankan server development dengan HMR
npm run build        # Build untuk produksi
npm run start        # Jalankan hasil build produksi
npm run test         # Jalankan functional tests
npm run lint         # Cek style code (ESLint)
npm run format       # Format kode (Prettier)
npm run typecheck    # TypeScript type checking
```

### Ace CLI (AdonisJS)

```bash
node ace migration:run           # Jalankan migrasi database
node ace migration:rollback      # Rollback migrasi terakhir
node ace migration:fresh         # Drop semua tabel lalu migrasi ulang
node ace generate:key            # Generate APP_KEY
node ace serve --hmr             # Jalankan server dev (sama dengan npm run dev)
node ace test                    # Jalankan tests
node ace app:admin <action>      # Manajemen admin (lihat bagian CLI)
```

---

## 🧪 Testing

Proyek menggunakan [Japa](https://japa.dev/) dengan `@japa/api-client` dan `@japa/openapi-assertions`. Test functional tersedia di `tests/functional/deployment_test.spec.ts` dan mencakup alur lengkap: registrasi, login, CRUD fasilitas, CRUD ruangan, dan CRUD booking untuk role admin maupun user.

```bash
# Jalankan semua tests
npm run test
# atau
node ace test

# Jalankan suite tertentu
node ace test --suite=functional
```

---

## ⚙️ CI/CD

GitHub Actions workflow (`.github/workflows/giventech-ci.yml`) berjalan otomatis pada setiap `push` dan `pull_request` ke semua branch.

Tahapan yang dijalankan:

1. Spin up layanan MySQL 8 (health check otomatis)
2. Setup Node.js 20
3. `npm install`
4. Salin `.env.example` → `.env`
5. `npm run lint`
6. `node ace generate:key`
7. `node ace migration:run --force`
8. `node ace test --silent`

---

## 🤝 Kontribusi

1. Fork repository ini
2. Buat branch baru: `git checkout -b feature/nama-fitur`
3. Commit perubahan: `git commit -m "feat: tambah fitur"`
4. Push: `git push origin feature/nama-fitur`
5. Buat Pull Request

Pastikan semua test lulus dan kode sudah diformat sebelum mengajukan PR.

---

## 📬 Kontak

| | |
|---|---|
| **Owner** | Areandra (Muhammad Ariel) |
| **GitHub** | [@Areandra](https://github.com/Areandra) |
| **Repository** | [github.com/Areandra/GiveNTech](https://github.com/Areandra/GiveNTech) |
| **LinkedIn** | [muhammad-ariel-4899312a0](https://www.linkedin.com/in/muhammad-ariel-4899312a0/) |

---

<p align="center">Built with AdonisJS · React · Socket.IO · WhatsApp Cloud API</p>
