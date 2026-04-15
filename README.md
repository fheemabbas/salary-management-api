# 💼 Salary Management API

A RESTful backend API built with **Express + TypeScript** for managing employee records, calculating salaries with country-based tax deductions, and providing salary metrics by country and job title.

---

## ✨ Features

- **Employee CRUD** — Create, Read, Update, Delete employees
- **Salary Calculation** — Gross, TDS, and Net salary based on country-specific tax rules
- **Metrics API** — Average, min, and max salary insights by country or job title
- **SQL Migrations** — Version-controlled schema management
- **Swagger Docs** — Interactive API documentation at `/api-docs`
- **Test Suite** — Full integration test coverage with Jest + Supertest

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express v5 |
| Database | SQLite (better-sqlite3) |
| Testing | Jest + Supertest |
| API Docs | swagger-jsdoc + swagger-ui-express |

---

## 📁 Project Structure

```
salary-management-api/
├── migrations/              # SQL migration files
├── src/
│   ├── config/              # DB connection, migrations runner, Swagger config
│   ├── controllers/         # Route handler logic
│   ├── routes/              # Express routers with Swagger JSDoc
│   ├── services/            # Business logic layer
│   └── types/               # TypeScript interfaces and types
├── tests/                   # Jest integration tests
├── .env                     # Environment variables (not committed)
├── .env.example             # Sample environment file
├── jest.config.js
├── package.json
└── tsconfig.json
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js >= 18
- npm

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/fheemabbas/salary-management-api.git
cd salary-management-api

# 2. Install dependencies
npm install

# 3. Copy environment file and configure
cp .env.example .env

# 4. Run database migrations
npm run migrate

# 5. Start development server
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
PORT=3025
DB_FILE=database.sqlite
```

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3025` | Port the server listens on |
| `DB_FILE` | `database.sqlite` | Path to the SQLite database file |

---

## 🗃️ Database Setup

Migrations are plain `.sql` files located in the `migrations/` folder and are tracked to avoid re-running.

```bash
# Run all pending migrations
npm run migrate
```

Each migration runs once and is recorded in a `migrations` table automatically.

---

## 🚀 Running the App

```bash
# Development (with hot reload)
npm run dev

# Production build
npm run build
npm start
```

Server runs at: **http://localhost:3025**

---

## 🧪 Running Tests

Tests use a separate `test.sqlite` database and reset state before each test for full isolation.

```bash
npm test
```

- Runs with `--runInBand` for sequential execution
- Generates a coverage report in `coverage/`

---

## 📖 Swagger API Documentation

Interactive API docs are available at:

**http://localhost:3025/api-docs**

### How to use

1. Open the URL in your browser
2. Expand any endpoint group (Employees, Salary, Metrics)
3. Click **"Try it out"** on any endpoint
4. Fill in the parameters or request body
5. Click **"Execute"** to send a live request

> **Note:** CORS is enabled on the server, so Swagger UI can call the API directly from the browser without any issues.

---

## 📌 Example API Endpoints

### Employee

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/employees` | Create a new employee |
| `GET` | `/employees` | List all employees |
| `GET` | `/employees/:id` | Get employee by ID |
| `PUT` | `/employees/:id` | Update employee by ID |
| `DELETE` | `/employees/:id` | Delete employee by ID |

### Salary

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/salary/:employeeId` | Get salary breakdown (gross, TDS, net) |

### Metrics

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/metrics/country/:country` | Min, max, average salary for a country |
| `GET` | `/metrics/job-title/:jobTitle` | Average salary for a job title |

### Sample Request

```bash
# Create an employee
curl -X POST http://localhost:3025/employees \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "jobTitle": "Software Engineer",
    "country": "India",
    "salary": 75000
  }'

# Get salary breakdown
curl http://localhost:3025/salary/1
```

### Sample Response — `/salary/:id`

```json
{
  "gross": 75000,
  "tds": 7500,
  "net": 67500
}
```

---

## 📝 Notes & Best Practices

- **Never commit** `.env` or `*.sqlite` files — they are in `.gitignore`
- **Tests** use a dedicated `test.sqlite` — your development DB is never touched during tests
- **Adding new endpoints** — just add a route + JSDoc comment above it; Swagger picks it up automatically on restart
- **Migration naming** — prefix files with numbers (e.g. `001_create_employees.sql`) to enforce execution order