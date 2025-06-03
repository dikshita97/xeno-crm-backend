# Xeno CRM Backend

This repository contains the backend implementation of a Mini CRM platform built for the Xeno SDE Internship assignment.

## 🚀 Features

- **Google OAuth 2.0 Authentication**
- **Customer Segmentation** using rule-builder or natural language prompts
- **Campaign Delivery** via dummy vendor API (90% delivery success rate)
- **AI Integration** using OpenAI (message generation, NL-to-segment conversion)
- **Communication Logging**
- **Scalable Delivery Receipts** via Redis Streams + batch consumer

---

## 🛠 Tech Stack
- **Node.js** with **TypeScript**
- **Express.js** for routing
- **MongoDB** with **Mongoose**
- **Redis Streams** for async delivery tracking
- **Passport.js** with **Google OAuth2.0**
- **OpenAI API** for NLP

---

## 📁 Project Structure

```
.
├── Dockerfile
├── package.json
├── tsconfig.json
├── .env.example
├── src
│   ├── config
│   ├── consumers
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── server.ts
```

---

## 🧠 AI Features
- **Message Generator**: Auto-generates 3 personalized campaign messages
- **Natural Language → Rules**: Convert plain English into Mongo-style rules
- **(Optional)**: Auto-tag campaigns or simulate smart delivery times

---

## 🔐 Authentication
- Integrated Google OAuth 2.0 login
- Protected routes with `ensureAuth` middleware

---

## 📦 Setup Instructions

```bash
# 1. Clone the repo
$ git clone https://github.com/your-username/xeno-crm-backend.git
$ cd xeno-crm-backend

# 2. Setup env vars
$ cp .env.example .env
# Fill in MongoDB URI, Redis URL, OpenAI Key, Google OAuth Keys

# 3. Install dependencies
$ npm install

# 4. Start development server
$ npm run dev

# 5. In separate terminal, start Redis consumer
$ npm run consume
```

---

## 📦 API Endpoints

- `POST /segments/nl2segment`: Convert prompt into rule
- `POST /segments`: Create segment and start campaign
- `GET /campaigns`: List campaigns
- `GET /campaigns/:id/logs`: Logs per campaign
- `POST /vendor/send`: Dummy vendor message API
- `POST /vendor/receipt`: Receipt callback (streamed)

---

## 🧪 Known Limitations
- Dummy vendor simulates behavior but is not externalized
- Rule parsing is mocked — can be improved with more prompt tuning
- Batch consumer runs indefinitely — no retry logic yet

---


## 📬 Contact
Built by Dikshita Sakhare as part of the Xeno SDE Internship assignment.
