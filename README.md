# CodeSmith: AI Developer Assistant

CodeSmith is a modern, full-stack web application designed to accelerate the software development lifecycle. By leveraging the power of Google's Gemini AI, CodeSmith transforms natural language prompts into production-ready boilerplate code for various technology stacks, drastically reducing setup time and allowing developers to focus on core logic.

---

## Overview

Starting new projects often involves repetitive setup and configuration. CodeSmith addresses this pain point by providing an intuitive interface where developers can describe their desired application and technology stack. The AI then generates a structured, downloadable project, complete with necessary files and configurations, ready for immediate development.

## Key Features

- **🤖 AI-Powered Code Generation**: Utilizes the Google Gemini API for intelligent, context-aware boilerplate generation based on user prompts.
- **🌐 Multi-Stack Support**: Flexible architecture capable of generating code for various frontend and backend frameworks and libraries.
- **☁️ Cloud File Storage**: Securely stores generated project files in AWS S3, associated with user accounts.
- **💻 In-Browser Code Editor**: Integrated Monaco Editor (powering VS Code) allows users to view, edit, and save generated files directly within the application.
- **📂 Comprehensive Project Management**: Full RESTful API for creating, viewing, updating, deleting, and downloading generated projects and individual files.
- **🔐 Secure Authentication**: Robust JWT-based authentication system ensures user data and projects are protected.
- **🎨 Modern & Responsive UI**: Clean, intuitive user interface built with React, TypeScript, and Tailwind CSS, featuring components from shadcn/ui for a polished look and feel.
- **📚 Rich Documentation**: Integrated documentation page explaining API usage and features.

---

## Tech Stack

**Frontend:**

- **Framework/Library**: React (v18+) with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Routing**: React Router DOM (v6)
- **State Management**: React Context API
- **API Client**: Axios
- **Code Editor**: Monaco Editor (@monaco-editor/react)
- **Notifications**: React Hot Toast

**Backend:**

- **Runtime**: Node.js (v18+ recommended)
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM) - Stores user data and project metadata.
- **File Storage**: AWS S3 (with `@aws-sdk/client-s3`)
- **Authentication**: JSON Web Tokens (jsonwebtoken), Bcrypt.js
- **Middleware**: Cors
- **Utilities**: dotenv, Archiver (for zipping)

**AI:**

- **Model Provider**: Google Gemini API (via REST)

---

## Getting Started: Local Development Setup

Follow these steps to set up and run CodeSmith on your local machine.

### Prerequisites

- Node.js (v18 or later recommended)
- npm (v8+) or yarn
- Access to a MongoDB instance (local or cloud, e.g., MongoDB Atlas free tier)
- An AWS Account with:
  - An S3 bucket created and configured.
  - IAM user credentials (Access Key ID and Secret Access Key) with S3 permissions.
- A Google Gemini API Key obtained from Google AI Studio or Google Cloud Console.

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-name>/backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the `backend` directory. Copy the contents of `.env.example` (if provided) or create it manually with the following structure:

    ```env
    # Server Configuration
    PORT=3001

    # MongoDB Connection URI (replace with your actual connection string)
    MONGO_URI="mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"

    # JWT Authentication Secret (use a strong, random string)
    JWT_SECRET="YOUR_SUPER_SECRET_RANDOM_JWT_KEY_GOES_HERE"

    # Google Gemini API Key
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

    # AWS S3 Configuration
    AWS_ACCESS_KEY_ID="YOUR_AWS_ACCESS_KEY_ID"
    AWS_SECRET_ACCESS_KEY="YOUR_AWS_SECRET_ACCESS_KEY"
    AWS_REGION="your_s3_bucket_region" # e.g., ap-south-1
    S3_BUCKET_NAME="your_globally_unique_s3_bucket_name"
    ```

    _Replace placeholder values with your actual credentials._

4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The backend API should now be running on `http://localhost:3001`.

### Frontend Setup

1.  **Navigate to the `frontend` directory:**
    ```bash
    cd ../frontend # (If you are in the backend directory)
    # Or navigate directly: cd path/to/frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **(Optional) Create a `.env` file** in the `frontend` directory if you need to override the backend API URL (the default is `http://localhost:3001/api` defined in `apiService.ts`):
    ```env
    VITE_API_BASE_URL=http://localhost:3001/api
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The frontend application should now be running, typically on `http://localhost:5173`.

---

## API Endpoints Overview

The backend exposes a RESTful API (base path: `/api`). Authentication (Bearer Token) is required for all endpoints except `/auth/register` and `/auth/login`.

- **Authentication (`/auth`)**: `POST /register`, `POST /login`, `GET /me`
- **Generation (`/`)**: `POST /generate`
- **Projects (`/projects`)**: `GET /`, `POST /`, `GET /:id`, `PATCH /:id`, `DELETE /:id`
- **Project Files (`/projects/:id/file`)**: `POST /`, `PATCH /`, `DELETE /`, `GET /?path=<filepath>`
- **Download (`/projects/download/:id`)**: `GET /`

_For detailed request/response structures, refer to the API documentation or source code._

---

## Deployment

[Provide instructions on how you deployed or how others can deploy the application. Include platforms like Vercel (frontend), Render/Heroku/AWS EC2 (backend), MongoDB Atlas, etc.]

**Example for Vercel (Frontend) & Render (Backend):**

1.  **Frontend (Vercel):** Connect your Git repository (GitHub, GitLab, Bitbucket) to Vercel. Configure the build command (`npm run build`) and output directory (`dist`). Add environment variables if needed (e.g., `VITE_API_BASE_URL` pointing to your deployed backend).
2.  **Backend (Render):** Create a new "Web Service" on Render, connecting your Git repository. Set the runtime to Node. Configure the build command (`npm install`) and the start command (`node index.js`). Add all necessary environment variables from your `.env` file in the Render dashboard. Ensure your MongoDB instance and AWS S3 bucket are accessible from Render's servers.

---

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code adheres to the project's coding standards and includes tests where applicable.

---
