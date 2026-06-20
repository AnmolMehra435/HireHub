# HireHub API Documentation

## Base URL

```txt
http://localhost:5000/api
```

---

# Authentication

## Register User

### Endpoint

```http
POST /auth/register
```

### Authentication

Not Required

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Registered Successfully",
  "data": {
    "accessToken": "jwt-token",
    "user": {
      "id": "userId",
      "email": "john@example.com",
      "name": "John Doe",
      "role": "candidate"
    }
  }
}
```

### Possible Errors

| Status | Description                      |
| ------ | -------------------------------- |
| 400    | Invalid user entry               |
| 409    | Email already registered         |
| 429    | Too many authentication attempts |

---

## Login

### Endpoint

```http
POST /auth/login
```

### Authentication

Not Required

### Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "jwt-token",
    "userData": {
      "userId": "userId",
      "email": "john@example.com",
      "name": "John Doe",
      "role": "candidate"
    }
  }
}
```

### Possible Errors

| Status | Description                      |
| ------ | -------------------------------- |
| 400    | Invalid entry                    |
| 401    | Unauthorized                     |
| 429    | Too many authentication attempts |

---

## Refresh Access Token

### Endpoint

```http
POST /auth/refresh
```

### Authentication

Refresh Token Cookie Required

### Success Response

```json
{
  "success": true,
  "message": "Refresh done",
  "data": {
    "accessToken": "new-access-token"
  }
}
```

### Possible Errors

| Status | Description                      |
| ------ | -------------------------------- |
| 401    | Unauthorized                     |
| 429    | Too many authentication attempts |

---

## Logout

### Endpoint

```http
POST /auth/logout
```

### Authentication

Refresh Token Cookie Required

### Success Response

```json
{
  "success": true,
  "message": "Logout successful",
  "data": null
}
```

---

# Jobs

## Create Job

### Endpoint

```http
POST /jobs
```

### Authentication

Required

### Role

Employer

### Request Body

```json
{
  "title": "Backend Developer",
  "description": "Node.js developer required",
  "company": "HireHub",
  "location": "Remote",
  "type": "full-time",
  "experience": "1-2 years",
  "salary": {
    "min": 500000,
    "max": 1000000,
    "currency": "INR"
  },
  "skills": ["Node.js", "MongoDB"],
  "category": "Software Development",
  "deadline": "2026-12-31"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Job created successfully",
  "data": {
    "job": {}
  }
}
```

### Possible Errors

| Status | Description   |
| ------ | ------------- |
| 400    | Invalid entry |
| 401    | Unauthorized  |
| 403    | Forbidden     |

---

## Get Public Jobs

### Endpoint

```http
GET /jobs
```

### Authentication

Not Required

### Query Parameters

| Parameter  | Description        |
| ---------- | ------------------ |
| search     | Text search        |
| location   | Filter by location |
| type       | Job type           |
| experience | Experience level   |
| category   | Job category       |
| page       | Page number        |
| limit      | Results per page   |

### Success Response

```json
{
  "success": true,
  "message": "Fetched jobs",
  "data": {
    "jobs": [],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalJobs": 10,
      "hasNextPage": false,
      "hasPrevPage": false
    }
  }
}
```

### Possible Errors

| Status | Description       |
| ------ | ----------------- |
| 429    | Too many requests |

---

## Get Single Job

### Endpoint

```http
GET /jobs/:id
```

### Authentication

Not Required

### Success Response

```json
{
  "success": true,
  "message": "Fetched Job",
  "data": {
    "job": {}
  }
}
```

### Possible Errors

| Status | Description       |
| ------ | ----------------- |
| 404    | Job not found     |
| 429    | Too many requests |

---

## Get Employer Jobs

### Endpoint

```http
GET /jobs/my-jobs
```

### Authentication

Required

### Role

Employer

### Query Parameters

```txt
page
limit
```

### Success Response

```json
{
  "success": true,
  "message": "Jobs fetched successfully",
  "data": {
    "jobs": []
  }
}
```

---

## Update Job

### Endpoint

```http
PATCH /jobs/:id
```

### Authentication

Required

### Role

Employer

### Success Response

```json
{
  "success": true,
  "message": "Job updated successfully",
  "data": {
    "newJob": {}
  }
}
```

### Possible Errors

| Status | Description   |
| ------ | ------------- |
| 404    | Job not found |
| 403    | Forbidden     |

---

## Close Job

### Endpoint

```http
PATCH /jobs/:id/close
```

### Authentication

Required

### Role

Employer

### Success Response

```json
{
  "success": true,
  "message": "Job closed",
  "data": {
    "closedJob": {}
  }
}
```

---

## Job Statistics

### Endpoint

```http
GET /jobs/stats
```

### Authentication

Not Required

### Success Response

```json
{
  "success": true,
  "message": "Calculated stats",
  "data": {
    "stats": {
      "totalJobs": 0,
      "jobsByCategory": [],
      "recentJobs": 0
    }
  }
}
```

### Possible Errors

| Status | Description       |
| ------ | ----------------- |
| 429    | Too many requests |

---

# Applications

## Apply For Job

### Endpoint

```http
POST /application/apply/:jobId
```

### Authentication

Required

### Role

Candidate

### Content Type

```txt
multipart/form-data
```

### Form Fields

| Field       | Type     |
| ----------- | -------- |
| resume      | PDF File |
| coverLetter | String   |

### Success Response

```json
{
  "success": true,
  "message": "Application created",
  "data": {
    "application": {}
  }
}
```

### Possible Errors

| Status | Description                         |
| ------ | ----------------------------------- |
| 400    | Bad request                         |
| 400    | Already applied                     |
| 401    | Unauthorized                        |
| 429    | Too many job applications submitted |

---

## Get My Applications

### Endpoint

```http
GET /application/my-applications
```

### Authentication

Required

### Role

Candidate

### Query Parameters

```txt
page
limit
```

### Success Response

```json
{
  "success": true,
  "message": "Fetched applications",
  "data": {
    "applications": []
  }
}
```

---

## Get Job Applicants

### Endpoint

```http
GET /application/job/:jobId
```

### Authentication

Required

### Role

Employer

### Success Response

```json
{
  "success": true,
  "message": "Fetched all applicants",
  "data": {
    "applicants": []
  }
}
```

### Possible Errors

| Status | Description         |
| ------ | ------------------- |
| 403    | Unauthorized access |

---

## Update Application Status

### Endpoint

```http
PATCH /application/:applicationId/status
```

### Authentication

Required

### Role

Employer

### Request Body

```json
{
  "status": "shortlisted"
}
```

### Allowed Status Values

```txt
pending
reviewed
shortlisted
selected
rejected
```

### Success Response

```json
{
  "success": true,
  "message": "Application updated successfully",
  "data": {
    "updatedApplication": {}
  }
}
```

### Possible Errors

| Status | Description           |
| ------ | --------------------- |
| 400    | Invalid status        |
| 404    | Application not found |

---

# Standard Response Format

## Success

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

## Error

```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

---

# Security Features

* JWT Access Tokens
* Refresh Token Rotation
* HTTP Only Refresh Cookies
* Role Based Access Control
* Helmet Security Headers
* CORS Protection
* Rate Limiting
* Zod Request Validation
* Global Error Handling
* Async Error Middleware
* Secure Password Hashing using bcrypt
* Cloudinary Resume Storage
* Socket.IO Real-time Notifications
* Transactional Email Notifications
