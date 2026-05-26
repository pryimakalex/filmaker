## Tech stack

- Expo SDK 56 / React Native
- Expo Router
- TypeScript
- NativeWind

## What is included

- Auth screens (welcome, sign in, sign up) with mock session
- Dashboard with recent projects
- Portfolio preview
- Projects list and project detail
- Mock upload flow with simulated progress
- Profile screen with logout

## What is mocked

- **Auth** — any email works; demo account loads seed data
- **API** — in-memory store behind `src/services/api/*`
- **Media upload** — placeholder picker and fake processing. In production this would be replaced with a Mux direct upload flow through a backend endpoint.

Demo login: `demo@filmfolio.app` / `demo123`

## Project structure

```
app/           Routes (auth, tabs, project detail)
src/
  features/    Screen building blocks per domain
  shared/      UI primitives, hooks, utils
  services/    Mock API + seed data
  types/       Shared types
```

## Run

```bash
npm install
npm start
```

## Limitations / next steps

- Replace mock auth with Clerk
- Replace mock services with a real API
- Replace mock upload with Mux direct upload via backend
- Add form validation, persistence, and tests
- Wire native video picker and real portfolio hosting
