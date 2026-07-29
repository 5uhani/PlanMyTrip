# PlanMyTrip

PlanMyTrip is a modern travel planning web application built using React.js and Firebase. It enables users to discover travel destinations, create personalized itineraries, plan budgets, and organize trips efficiently through a responsive and intuitive interface.

---

## Features

### Authentication
- User Registration and Login
- Firebase Authentication
- Forgot Password functionality
- Protected Routes

### Destination Management
- Browse popular travel destinations
- View destination details
- Search destinations
- Weather information for destinations

### Trip Planning
- Create personalized itineraries
- Save and manage travel plans
- Default itinerary suggestions

### Budget Planning
- Estimate travel expenses
- Plan and manage trip budgets

### User Experience
- Responsive design
- Light and Dark Theme
- Interactive UI
- Loading indicators
- Reusable React components

---

## Technology Stack

### Frontend
- React.js
- React Router DOM
- JavaScript (ES6+)
- HTML5
- CSS3
- Tailwind CSS
- Vite

### Backend & Database
- Firebase Authentication
- Cloud Firestore

### Libraries
- Axios
- React Toastify
- React Icons
- Lucide React
- React Slick
- Motion

### Tools
- Git
- GitHub
- ESLint
- npm

---

## Project Structure

```
PlanMyTrip/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── firebase/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/Suhani/PlanMyTrip.git
```

Navigate to the project directory

```bash
cd PlanMyTrip
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file in the root directory and add the following Firebase configuration.

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

---

## Key Functionalities

- Secure user authentication using Firebase Authentication
- Cloud-based data storage with Cloud Firestore
- Personalized itinerary creation
- Budget planning module
- Destination search
- Weather information
- Responsive design across devices
- Context API for state management
- Protected routing

---

## Future Enhancements

- AI-powered trip recommendations
- Flight booking integration
- Hotel booking integration
- Interactive maps
- Expense tracking
- Collaborative trip planning
- Travel history dashboard

---

## Author

**Suhani Malani**

GitHub: https://github.com/Suhani
