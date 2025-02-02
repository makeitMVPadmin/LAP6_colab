# LAP6_colab

## About The Project

This feature is built to integrate with an existing platform called Communiti, enabling users to connect with like-minded individuals called "Goal Buddy" who share similar goals and aspirations. It facilitates scheduling online meet-ups, mentorship sessions, and networking calls, specifically catering to new graduates and career changers. The goal is to foster a supportive and collaborative space where users can engage with others navigating similar career paths in tech. By encouraging online interaction and knowledge-sharing, this feature helps users build connections, gain support, and advance in their careers.

## Tech Stack

- Frontend
  - React + Vite
  - Typescript
  - SASS
  - HTML
  - Shadcn/ui library

- Backend
  - Firebase/Cloud Firestore

## Project Goals

- Allow users to browse and filter through a list of other users based on their skills, availability, and collaborating preference for a "Goal Buddy"
- Enable users to define their own availability for others to see
- Allow users to book a meetup time with other users that agree with each other's availability
- Create a calender event that syncs with Google Calendar and notifies them about the booked event

## Project Resources

- Figma
- Github
- Jira
- Confluence

## Environment Setup

Create a `.env` file in the root directory with:

```ini
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-app.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-app.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
VITE_FIREBASE_MEASUREMENT_ID="your-measurement-id"
```

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the local development server:

```bash
npm run dev
```
