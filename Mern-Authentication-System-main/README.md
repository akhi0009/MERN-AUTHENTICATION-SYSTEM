# MERN Authentication System

A **secure authentication system** built using the **MERN stack**, enabling users to sign up, log in, and reset passwords with robust validation and security best practices.

## 🚀 Features

- **User Registration & Login**
- **Email verification** via NodeMailer + SMTP
- **Password reset with email link**
- **Secure password hashing** (bcrypt)
- **JWT-based authentication**
- **Form validation on client and server**
- **Protected routes for authenticated users**
- **Responsive and user-friendly UI**

## 🛠 Tech Stack

- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, bcrypt
- **Email Service:** NodeMailer + SMTP

## 💻 Getting Started

### Prerequisites

- Node.js (>=14.x)
- MongoDB (local or cloud like Atlas)

### Installation

1️⃣ Clone the repository:

bash
git clone https://github.com/your-username/mern-auth-system.git
cd mern-auth-system
2️⃣ Install server dependencies:

bash
Copy
Edit
cd server
npm install
3️⃣ Install client dependencies:

bash
Copy
Edit
cd ../client
npm install
4️⃣ Create environment variables:

In server/.env:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
5️⃣ Run the app:

bash
Copy
Edit
# Start backend
cd server
npm start

# Start frontend (in a separate terminal)
cd ../client
npm start
Visit:

arduino
Copy
Edit
http://localhost:3000
📂 Project Structure
perl
Copy
Edit
mern-auth-system/
├── client/         # React frontend
├── server/         # Node + Express backend
├── README.md
📌 Future Enhancements
OAuth (Google / GitHub login)

2FA (Two-Factor Authentication)

Admin panel

Rate limiting / captcha for added security
