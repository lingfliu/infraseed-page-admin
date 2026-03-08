# Infraseed Admin Page

Admin UI for Infraseed: dashboard, user management, data management, service management, and 3rd-party service configuration.

## Stack

- **React** + **Next.js** (App Router)
- **Redux** (Toolkit)
- **Material UI**
- **Axios**

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Copy env example and set the API base URL:

   ```bash
   cp env.example .env.local
   ```

   Edit `.env.local` and set `NEXT_PUBLIC_API_BASE_URL` to your backend API base URL (e.g. `http://localhost:3001/api`).

3. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). In development, auth is **skipped by default** so you can open `/dashboard` and all pages without logging in. To test the login flow in dev, set `NEXT_PUBLIC_SKIP_AUTH=false` in `.env.local` and restart.

4. **Temporary – skip auth in production:** To allow viewing pages without a token in a production build, set `NEXT_PUBLIC_SKIP_AUTH=true` in the build env. Remove it (or set `false`) for real deployments.

### Scripts

- `npm run dev` – start development server
- `npm run build` – build for production
- `npm run start` – start production server
- `npm run lint` – run ESLint

## Deployment

Deployment is handled by [infraseed-devops](https://github.com/lingfliu/infraseed-devops). This repository does not contain deployment configuration.

For production builds, ensure the following environment variable is set at build or runtime as needed:

- `NEXT_PUBLIC_API_BASE_URL` – backend API base URL (no trailing slash)

## License

Apache-2.0 (see [LICENSE](LICENSE)).
