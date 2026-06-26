# CareerConnect 💼

CareerConnect is a full-stack Job Portal that connects job seekers with recruiters through an intuitive platform. Job seekers can create accounts, browse job opportunities, and apply for jobs, while recruiters can post and manage job listings and view applications.

---

## 🚀 Features

### 👨‍💼 Job Seeker

* User Registration & Login
* Secure Authentication using JWT
* Create and Update Profile
* Browse Available Jobs
* Apply for Jobs
* View Applied Jobs

### 🏢 Recruiter

* Recruiter Registration & Login
* Create Company Profile
* Post New Jobs
* Edit/Delete Job Listings
* View Applicants
* Manage Posted Jobs

### 🔒 Authentication & Security

* JWT-based Authentication
* Password Hashing using bcrypt
* Protected Routes
* Role-based Access Control

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Other Libraries

* bcrypt
* jsonwebtoken
* dotenv
* cors

---

## 📁 Project Structure

```
CareerConnect/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── css/
│   ├── js/
│   └── index.html
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/Pranjal-Agrawal-246/CareerConnect.git
cd CareerConnect
```

### Install backend dependencies

```bash
cd backend
npm install
```

### Start the backend server

```bash
npm run dev
```

or

```bash
npm start
```

### Run the frontend

Open the `frontend` folder using Live Server or any static web server.

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🌟 Future Improvements

* Resume Upload
* AI Resume Analysis
* Job Recommendation System
* Email Verification
* Forgot Password
* Real-time Notifications
* Company Reviews & Ratings
* Interview Preparation Resources

---

## 👨‍💻 Author

**Pranjal Agrawal**

B.Tech, Information Technology

National Institute of Technology Raipur

GitHub: https://github.com/Pranjal-Agrawal-246

---

If you found this project useful, consider giving it a ⭐ on GitHub.
