# Click Game Dashboard Frontend

This is the frontend for the Click Game Dashboard, a real-time web application where players click bananas to earn points, and admins manage users. Built with React, TypeScript, Vite, Redux Toolkit, Socket.IO-client, Tailwind CSS, and React Router, it provides a responsive UI for user authentication, real-time updates, and admin actions like blocking users, which logs out and disconnects blocked users.

## Features
- **User Authentication**: Login with email/password, secured with JWT tokens stored in localStorage.
- **Real-Time Updates**: Socket.IO-client handles events for banana counts, active users, rankings, user status.
- **Player Dashboard**: Click bananas to earn points, view personal banana count, and see rankings.
- **Admin Dashboard**: View active users (excluding self), block users, unblock user, edit and delete user.
- **Responsive Design**: Styled with Tailwind CSS for a modern, mobile-friendly UI.
- **Protected Routes**: Restricts admin access to authorized users using React Router.

## Prerequisites
- **Node.js**
- **npm**
- **Backend Server**: Running at `http://localhost:5000` (see backend README for setup)

## Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd click-game-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory with the following:
   ```env
   VITE_APP_BASE_URL=http://localhost:5000/api
   ```
   - `VITE_APP_BASE_URL`: Backend API base URL (adjust if backend runs elsewhere).

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The frontend will start at `http://localhost:5173`. Open this URL in your browser.

## Project Structure

```
click-game-frontend/
├── src/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── Auth.tsx           # Login page
│   │   │   └── authSlice.ts       # Redux slice for authentication
│   │   │   └── fetch_helper.ts    # api 
│   │   ├── dashboard/
│   │   │   ├── Dashboard.tsx      # Admin
│   │   │   └── dashboardSlice.ts  # Redux slice for admin
│   │   │   └── fetch_helper.ts    # api 
│   │   ├── player/
│   │   │   ├── Player.tsx         # Player dashboard (banana clicks)
│   │   │   ├── playerSlice.ts     # Redux slice for player data
│   │   ├── ranks/
│   │   │   ├── Ranks.tsx          # player ranks (banana clicks)
│   │   │   └── ranksSlice.ts      # Redux slice for rankings
│   │   ├── socket/
│   │   │   └── socketSlice.ts      # Redux slice for socket update
│   ├── redux/
│   │   ├── hook.ts                # Typed Redux hooks
│   │   └── store.tsx              # Redux store configuration
│   ├── utils/
│   │   ├── protectedRoute.ts      # protected routes
│   │   ├── socket.ts              # Socket.IO-client service
│   │   └── types.ts               # TypeScript interfaces
│   ├── App.tsx                    # Main app component (routes)
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles (Tailwind CSS)
├── public/                        # Static assets
├── package.json                   # Dependencies and scripts
├── .env                           # Environment variables
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.js             # Tailwind CSS configuration
└── README.md                      # This file
```

- **src/features/**: Contains feature-specific components and Redux slices (dashboard, auth, player, etc.).
- **src/redux/**: Configures Redux store and typed hooks.
- **src/utils/**: Includes API helpers, Socket.IO service, and TypeScript interfaces.
- **src/App.tsx**: Defines routes using React Router.
- **src/main.tsx**: Renders the app with Redux Provider.

## Dependencies
- **react**, **react-dom**: Core React libraries.
- **react-router-dom**: Client-side routing.
- **@reduxjs/toolkit**, **react-redux**: State management.
- **socket.io-client**: Real-time communication with backend.
- **axios**: HTTP requests to backend API.
- **tailwindcss**, **postcss**, **autoprefixer**: Styling.
- **typescript**: Type safety.
- **vite**: Build tool and development server.
- **@types/***: Type definitions for React, React Router, etc.

Install with:
```bash
npm install react react-dom react-router-dom @reduxjs/toolkit react-redux socket.io-client axios tailwindcss postcss autoprefixer typescript vite @types/react @types/react-dom @types/node
```

## Usage

1. **Start the Backend**
   - Ensure the backend is running at `http://localhost:5000` (see backend README).
   - Verify MongoDB is running and seeded with users.

2. **Start the Frontend**
   ```bash
   npm run dev
   ```
   Access at `http://localhost:5173`.

3. **Test Features**
   - **Login**: Navigate to `/sign-in`, enter credentials (e.g., username: `test`, password: `test123`).
   - **Player Dashboard**: At `/player`, click the banana button, check banana count updates, view rankings at `/ranks`.
   - **Admin Dashboard**: At `/admin` (admin only), view active users, block a user, unblock, edit and delete user.
   - **Socket Status**: Monitor connection status (green/red) on dashboards.

4. **Monitor Logs**
   - Open browser DevTools (Console) to check:
     - Socket events (`Received bananaCount`, `Received userBlocked`).
     - Redux state changes (`Admin state: ...`).
     - API errors (`Failed to block user`).

## Routes
- **/sign-in**: Login page.
- **/player**: Player dashboard (protected, player/admin access).
- **/admin**: Admin dashboard (protected, admin only).
- **/ranks**: Rankings page (protected, player/admin access).

## Troubleshooting
- **Backend Connection Fails**:
  - Verify `VITE_APP_BASE_URL=http://localhost:5000/api` in `.env`.
  - Ensure backend is running and CORS allows `http://localhost:5173`.
- **Socket.IO Errors**:
  - Check JWT token is sent in socket `auth.token`.
  - Confirm backend emits events (`activeUsers`, `userBlocked`).
- **Login Fails**:
  - Verify username/password and backend `/auth/login` endpoint.
  - Check `JWT_SECRET` matches backend.
- **Admin Route Blocked**:
  - Ensure user has `role: admin` in JWT payload.
  - Check `ProtectedRoute` logic in `App.tsx`.
- **TypeScript Errors**:
  - Run `npm run build` to identify issues.
  - Verify `tsconfig.json` includes `src/` files.
- **Blocking Not Working**:
  - Confirm admin credentials and user `_id` exists.
  - Check `userBlocked` event triggers logout/redirect.

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/xyz`).
3. Commit changes (`git commit -m 'Add xyz feature'`).
4. Push to the branch (`git push origin feature/xyz`).
5. Open a pull request.

## License
MIT License. See `LICENSE` for details.