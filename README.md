## Code Ninjas Aurora — 2nd Anniversary: Weekly MakeCode Arcade Challenges

Celebrate Code Ninjas Aurora’s second anniversary with a web experience built to release and showcase weekly MakeCode Arcade challenges for kids. Families could follow along, complete challenges, and track progress throughout the celebration.

• Event site and prizes: `https://www.cnaurora-secondanniversary.ca/prizes`

### Overview
- **What it is**: A full-stack app for publishing weekly game dev challenges using Microsoft MakeCode Arcade, collecting submissions, and engaging our local ninjas during the anniversary celebration.
- **Who it’s for**: Kids and families at Code Ninjas Aurora who want to learn game development and earn fun prizes by completing weekly challenges.
- **How it worked**: New challenges were released weekly. Kids built games in MakeCode Arcade and submitted links/screenshots for review and prizes.

### Tech Stack
- **Client**: React 18 + Vite + TypeScript, TailwindCSS
- **Server**: Node.js + Express, MongoDB/Mongoose

### Quick Start

Prerequisites:
- Node.js 18+ and npm

Install dependencies:

```bash
cd client && npm install
cd ../server && npm install
```

Run the client (Vite dev server on port 5173 by default):

```bash
cd client
npm run dev
```

Run the server (Express on port 3000 by default):

```bash
cd server
npm run dev
```

Build the client for production:

```bash
cd client
npm run build
```

### Environment Variables (server)
Create a `.env` in `server/` with your configuration (examples):

```bash
PORT=3000
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=change-me
EMAIL_USER=you@example.com
EMAIL_PASS=app-password
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=...
```

### Project Structure
- `client/`: Frontend React app (pages for Home, Riddles/Challenges, Admin, Auth, etc.)
- `server/`: Express API (users, submissions, notifications, password reset, etc.)

### Contributing
Issues and pull requests are welcome. Please open an issue first to discuss substantial changes.

### License
Copyright © Code Ninjas Aurora. All rights reserved.


