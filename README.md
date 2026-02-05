# ITSM Ticketing System – Frontend

## Overview

This frontend is a React application for an IT support ticketing system. Users can submit and track tickets, while admins can manage all tickets and update statuses.

## Tech Stack

- React
- Vite
- Axios
- React Router
- Recharts
- CSS

## State Management

Local component state is managed using React's useState hook. Global authentication state (logged-in user, login, logout) is handled using the Context API.

This separation ensures that authentication logic is centralized while ticket-related state remains scoped to the relevant components.

## Routing & Authorization

Client-side routing is implemented using React Router. Public routes include login and registration pages, while protected routes require authentication.

A ProtectedRoute component checks authentication state before allowing access to sensitive routes such as the ticket dashboard.

## API Integration

The frontend integrates with the backend API to:

- Register users
- Authenticate users
- Fetch tickets associated with the logged-in user
- Create new tickets

All API requests are centralized through a shared Axios client to ensure consistent configuration and authorization handling.

## Setup Instructions

1. Clone the repository
2. Navigate to the frontend folder
3. Install dependencies:
   npm install
4. Create a .env file with:
   VITE_API_URL
5. Start the app:
   npm run dev

## Features

- User registration and login
- Role-based dashboards
- Ticket creation and viewing
- Admin ticket management
- Priority-based charts

## Deployment

This frontend is deployed as a static site.

Live URL:
<https://YOUR-FRONTEND-URL>
