# 🚀 Professional AI Portfolio

A **High-End Developer Portfolio** built to showcase projects and skills with a focus on modern UI/UX, real-time database integration, and an integrated Admin Dashboard for content management.

## 💫 About Project

This project is a sophisticated digital resume designed for developers. It features a high-performance frontend with interactive animations and a secure backend for managing portfolio data dynamically.
* **🧑‍💻 Dynamic Project Showcasing**
* **📊 Interactive Skills & Stats**
* **🔐 Secure Admin Dashboard** – Update bio and projects without touching code
* **📧 Integrated Contact System** – Direct communication via EmailJS
* **✨ Cinematic UI** – Gold-dust particle effects and smooth Framer Motion transitions

## 🏗 Architecture

### 💻 Frontend (Next.js & React)
* **Functional components** with React Hooks
* **Framer Motion** for production-grade animations
* **Tailwind CSS** for a responsive, modern "Dark Mode" aesthetic
* **Key Components**:
    * `AboutMe` – Dynamic bio fetched from Firestore
    * `ProjectGrid` – Filterable display of work
    * `AdminPanel` – Secure gateway for content updates

### ⚙️ Backend & Services
* **Firebase Authentication** – Secure login for the owner only
* **EmailJS** – Client-side email handling without a dedicated mail server
* **Vercel** – Global edge-network hosting and CI/CD deployment

### 🗄 Database (Firebase Firestore)
* **NoSQL document storage** for real-time data syncing
* **Security Rules** – Locked down to allow public `read` but specific email `write`
* **Collections**:
    * `About` – Global site settings and personal bio
    * `Projects` – Detailed records of developed applications

## 💻 Tech Stack

### 🚀 Core
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

### 🛠 Tools
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 📁 Project Structure

```text
root/
├── src/
│   ├── components/       # UI Components (Navbar, About, Projects)
│   ├── firebase/         # Firebase config and DB initialization
│   ├── pages/            # Next.js routing and Admin views
│   └── styles/           # Tailwind and Global CSS
├── public/               # Static assets and profile images
└── .env.local            # Environment variables (API Keys)Copy and paste this entire block directly into your README.md file in GitHub.

Markdown

# 🚀 Professional AI Portfolio

A **High-End Developer Portfolio** built to showcase projects and skills with a focus on modern UI/UX, real-time database integration, and an integrated Admin Dashboard for content management.

## 💫 About Project

This project is a sophisticated digital resume designed for developers. It features a high-performance frontend with interactive animations and a secure backend for managing portfolio data dynamically.
* **🧑‍💻 Dynamic Project Showcasing**
* **📊 Interactive Skills & Stats**
* **🔐 Secure Admin Dashboard** – Update bio and projects without touching code
* **📧 Integrated Contact System** – Direct communication via EmailJS
* **✨ Cinematic UI** – Gold-dust particle effects and smooth Framer Motion transitions

## 🏗 Architecture

### 💻 Frontend (Next.js & React)
* **Functional components** with React Hooks
* **Framer Motion** for production-grade animations
* **Tailwind CSS** for a responsive, modern "Dark Mode" aesthetic
* **Key Components**:
    * `AboutMe` – Dynamic bio fetched from Firestore
    * `ProjectGrid` – Filterable display of work
    * `AdminPanel` – Secure gateway for content updates

### ⚙️ Backend & Services
* **Firebase Authentication** – Secure login for the owner only
* **EmailJS** – Client-side email handling without a dedicated mail server
* **Vercel** – Global edge-network hosting and CI/CD deployment

### 🗄 Database (Firebase Firestore)
* **NoSQL document storage** for real-time data syncing
* **Security Rules** – Locked down to allow public `read` but specific email `write`
* **Collections**:
    * `About` – Global site settings and personal bio
    * `Projects` – Detailed records of developed applications

## 💻 Tech Stack

### 🚀 Core
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

### 🛠 Tools
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 📁 Project Structure

```text
root/
├── src/
│   ├── components/       # UI Components (Navbar, About, Projects)
│   ├── firebase/         # Firebase config and DB initialization
│   ├── pages/            # Next.js routing and Admin views
│   └── styles/           # Tailwind and Global CSS
├── public/               # Static assets and profile images
└── .env.local            # Environment variables (API Keys)
Key Features
✅ Dynamic CMS – Update your portfolio live via the Admin Dashboard

🔐 Secure Access – Identity-based access control using Firebase Auth

⚡ Real-time Sync – Instant updates across the site when data changes in Firestore

📧 Direct Messaging – Automated contact form with instant email alerts

📱 Responsive Design – Optimized for Desktop, Tablet, and Mobile devices

🚀 How to Run Locally
Prerequisites
Node.js (v18+)

Firebase Project

Git

1️⃣ Clone Repository
Bash

git clone [https://github.com/sau240/portfolio-sr.git](https://github.com/sau240/portfolio-sr.git)
cd portfolio-sr
2️⃣ Environment Setup
Create a .env.local file in the root and add your Firebase keys:

Plaintext

NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_id
...etc
3️⃣ Installation & Start
Bash

npm install
npm run dev
📸 Screenshot
<img width="100%" src="https://www.google.com/search?q=https://github.com/user-attachments/assets/f673e5e-initial-commit-decent-ui" />

📬 Contact
Developed by Saurav

📧 Email: sv695177@gmail.com 💼 LinkedIn: https://linkedin.com/in/saurav-rai-m-3a3861396
