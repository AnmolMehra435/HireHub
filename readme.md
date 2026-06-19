# HireHub

HireHub is a full-stack MERN job portal inspired by platforms like Naukri, LinkedIn Jobs, and Internshala. It provides a complete recruitment ecosystem where candidates can discover and apply for jobs, employers can manage job postings and applicants, and administrators can oversee platform operations.

The project is being built using industry-standard backend architecture patterns, secure authentication mechanisms, scalable database design, cloud file storage, transactional email services, and real-time communication.

---

## Current Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Access Token Authentication
* Refresh Token Rotation
* Secure Logout
* Refresh Token Reuse Detection
* Protected Routes
* Role-Based Access Control (RBAC)
* Candidate, Employer, and Admin Roles
* Password Hashing using bcrypt

---

### Job Management

#### Employer Features

* Create Job Listings
* Update Job Listings
* Delete Job Listings
* View Own Posted Jobs
* Ownership Verification
* Job Status Management

#### Public Features

* Browse Available Jobs
* Search Jobs
* Filter Jobs
* Pagination Support
* Full-Text Search
* Sorting by Latest Jobs

---

### Application Management

#### Candidate Features

* Apply to Jobs
* Upload Resume While Applying
* View Applied Jobs
* Track Application Status

#### Employer Features

* View Applications for Posted Jobs
* Review Candidate Profiles
* Update Application Status
* Manage Hiring Workflow

---

### Resume Upload System

* Multer File Upload Middleware
* Cloudinary Cloud Storage Integration
* Resume URL Management
* Secure File Validation
* Production-Ready Upload Architecture

---

### Notification System

* Real-Time Notifications using Socket.IO
* User-Specific Notification Delivery
* WebSocket Authentication
* Online User Tracking
* Event-Based Notification Architecture
* Application Status Notifications

---

### Email Service

* Nodemailer Integration
* Transactional Email Architecture
* Application Status Update Emails
* Candidate Notification Emails
* Employer Notification Emails

---

## Tech Stack

### Frontend

* React
* React Router DOM
* Zustand
* React Query (TanStack Query)
* Axios
* Tailwind CSS
* Shadcn UI
* Vite
* Socket.IO Client

### Backend

* Node.js
* Express.js
* Socket.IO
* Zod Validation
* JWT
* bcrypt

### Database

* MongoDB
* Mongoose

### Cloud Services

* Cloudinary
* SMTP Email Service

---

## Backend Architecture

The backend follows a layered architecture:

```text
src/
├── controllers/
├── services/
├── repositories/
├── models/
├── routes/
├── middlewares/
├── validators/
├── socket/
├── config/
├── utils/
└── app.js
```

### Design Principles

* Separation of Concerns
* Service Layer Pattern
* Repository Pattern
* RESTful API Design
* Centralized Error Handling
* Schema Validation using Zod
* Role-Based Authorization
* Production-Ready Folder Structure

---

## Database Models

### User

* Name
* Email
* Password
* Role
* Refresh Tokens
* Profile Information

### Job

* Title
* Description
* Company
* Location
* Salary
* Experience Level
* Job Type
* Skills
* Category
* Status
* Posted By

### Application

* Candidate
* Job
* Resume URL
* Cover Letter
* Status

### Notification

* Recipient
* Message
* Type
* Read Status

---

## Security Features

* Password Hashing
* JWT Authentication
* Refresh Token Rotation
* Refresh Token Revocation
* Protected APIs
* Role-Based Authorization
* Ownership Verification
* Input Validation with Zod
* Secure Cookie Handling

---

## Implemented Concepts

### Frontend

* React Router Protected Routes
* Role-Based Routing
* Zustand Global State Management
* Axios Interceptors
* Automatic Token Refresh
* React Query Data Fetching
* Form Validation
* Socket.IO Client Integration

### Backend

* Authentication System Design
* Authorization Middleware
* MongoDB Data Modeling
* Mongoose Middleware
* Instance Methods
* REST API Development
* Pagination
* Search & Filtering
* File Upload Architecture
* Cloud Storage Integration
* Transactional Email Services
* Real-Time Communication
* WebSocket Event Management

---

## Future Roadmap

### Candidate Dashboard

* Saved Jobs
* Profile Builder
* Resume Management
* Interview Tracking

### Employer Dashboard

* Company Profiles
* Hiring Analytics
* Advanced Applicant Tracking

### Admin Dashboard

* User Management
* Job Moderation
* Platform Analytics

### Platform Enhancements

* Interview Scheduling
* AI Resume Screening
* AI Job Recommendations
* Chat System
* Video Interviews
* Payment Integration
* Production Deployment

---

## Learning Objectives

This project is being developed to gain hands-on experience with:

* MERN Stack Development
* Scalable Backend Architecture
* Authentication & Authorization Systems
* Database Design
* REST API Development
* Real-Time Systems
* Cloud Storage Services
* Transactional Email Systems
* Production-Level Development Practices
* Full-Stack Software Engineering

---

## Project Status

🚧 Active Development

Current Progress:

* Authentication System ✅
* Authorization System ✅
* Job Management APIs ✅
* Job Search & Filtering ✅
* Application Management ✅
* Resume Upload System ✅
* Email Notification System ✅
* Real-Time Notification System ✅
* Frontend Dashboard Development 🔄
* Admin Module ⏳
* Deployment ⏳

This project is being built as a portfolio-grade full-stack MERN application following industry-standard architecture and software engineering practices.
