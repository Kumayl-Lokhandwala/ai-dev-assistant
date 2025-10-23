# CodeSmith: AI-Powered Development Assistant

[![License: MIT](https://imgshields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
CodeSmith is a full-stack web application engineered to enhance developer productivity by automating the generation of boilerplate code. By leveraging advanced AI models, CodeSmith translates natural language project descriptions and technology stack specifications into production-ready project structures, significantly reducing initial setup time.

[<img src="<link-to-your-screenshot-or-gif>" alt="CodeSmith Application Screenshot" width="800"/>]()
**Live Demo:** [Link to your deployed application (if available)]()

---

## Overview

The initial phase of software development often involves repetitive configuration and boilerplate code setup across various technology stacks. CodeSmith streamlines this process by providing an intelligent platform where developers describe their application requirements. The integrated AI analyzes these prompts and generates a comprehensive, structured project, complete with necessary files and configurations. This allows developers to bypass tedious setup tasks and immediately focus on implementing core business logic and features.

---

## Key Features

- **Intelligent Code Generation**: Utilizes the Google Gemini API for context-aware generation of project boilerplate based on user-defined prompts.
- **Multi-Stack Compatibility**: Supports code generation for a diverse range of modern frontend and backend frameworks and libraries.
- **Cloud-Based File Storage**: Employs AWS S3 for secure, scalable storage of all generated project files, linked directly to user accounts.
- **Integrated Code Editor**: Features an in-browser Monaco Editor (the engine behind VS Code) enabling users to view, modify, and save generated code files directly.
- **Comprehensive Project Management**: Provides a full suite of RESTful API endpoints for complete CRUD (Create, Read, Update, Delete) operations on projects and individual files.
- **Secure User Authentication**: Implements a robust JWT (JSON Web Token) based authentication system to safeguard user accounts and associated projects.
- **Modern User Interface**: A clean, responsive, and intuitive user interface developed with React, TypeScript, and Tailwind CSS, leveraging components from the shadcn/ui library.
- **Integrated Documentation**: Includes a dedicated documentation section detailing API usage, features, and getting started guides.

---

## Technology Stack

**Frontend:**

- **Framework/Library**: React (v18+) utilizing Vite for build tooling
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui Component Library
- **Routing**: React Router DOM (v6)
- **State Management**: React Context API
- **API Client**: Axios
- **Code Editor**: Monaco Editor (@monaco-editor/react)
- **Notifications**: React Hot Toast

**Backend:**

- **Runtime**: Node.js (v18+ recommended)
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM) - For storing user profiles and project metadata.
- **Object Storage**: AWS S3 (using `@aws-sdk/client-s3`) - For storing generated source code files.
- **Authentication**: JSON Web Tokens (jsonwebtoken), Bcrypt.js (for password hashing)
- **Middleware**: Cors (Cross-Origin Resource Sharing)
- **Utilities**: dotenv (Environment Variables), Archiver (File Archiving)

**Artificial Intelligence:**

- **Model Provider**: Google Gemini API (accessed via REST)

---

## Local Development Setup

Follow these instructions to configure and run the CodeSmith application on your local machine.

### Prerequisites

- Node.js (v18 or later recommended)
- npm (v8+) or yarn package manager
- Access to a running MongoDB instance (local installation or a cloud service like MongoDB Atlas)
- An AWS Account with:
  - An S3 bucket created and accessible.
  - IAM user credentials (Access Key ID and Secret Access Key) possessing appropriate S3 permissions.
- A Google Gemini API Key obtained from Google AI Studio or Google Cloud Console.

### Backend Configuration

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-name>/backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment Variables:** Create a `.env` file in the `backend` directory. Populate it with your specific credentials and configuration details, using `.env.example` as a template if available. Refer to the [Environment Variables](#environment-variables) section for required fields.
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The backend API service will initialize and listen on `http://localhost:3001` (or the port specified in your `.env`).

### Frontend Configuration

1.  **Navigate to the `frontend` directory:**
    ```bash
    cd ../frontend # (If currently in the backend directory)
    # Or navigate directly: cd path/to/frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **(Optional) Configure API Base URL:** Create a `.env` file in the `frontend` root if your backend API is running on a different URL than the default (`http://localhost:3001/api` specified in `src/api/apiService.ts`).
    ```env
    VITE_API_BASE_URL=http://your-backend-api-url
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The frontend application will be accessible via your browser, typically at `http://localhost:5173`.

---

## Environment Variables

The backend requires the following environment variables defined within a `.env` file for proper operation:

````env
# Server Configuration
PORT=3001

# MongoDB Connection URI (Replace with your actual connection string)
MONGO_URI="mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"

# JWT Authentication Secret (Use a strong, unique, and random string)
JWT_SECRET="YOUR_SECURE_RANDOM_JWT_SECRET_KEY"

# Google Gemini API Key
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# AWS S3 Configuration
AWS_ACCESS_KEY_ID="YOUR_AWS_ACCESS_KEY_ID"
AWS_SECRET_ACCESS_KEY="YOUR_AWS_SECRET_ACCESS_KEY"
AWS_REGION="your_s3_bucket_region" # Example: us-east-1, ap-south-1
S3_BUCKET_NAME="your_globally_unique_s3_bucket_name"

Okay, here is the complete, professional README.md file for your CodeSmith project. You can copy and paste this directly.

Markdown

# CodeSmith: AI-Powered Development Assistant

[![License: MIT](https://imgshields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
CodeSmith is a full-stack web application engineered to enhance developer productivity by automating the generation of boilerplate code. By leveraging advanced AI models, CodeSmith translates natural language project descriptions and technology stack specifications into production-ready project structures, significantly reducing initial setup time.

[<img src="<link-to-your-screenshot-or-gif>" alt="CodeSmith Application Screenshot" width="800"/>]()
**Live Demo:** [Link to your deployed application (if available)]()

---

## Overview

The initial phase of software development often involves repetitive configuration and boilerplate code setup across various technology stacks. CodeSmith streamlines this process by providing an intelligent platform where developers describe their application requirements. The integrated AI analyzes these prompts and generates a comprehensive, structured project, complete with necessary files and configurations. This allows developers to bypass tedious setup tasks and immediately focus on implementing core business logic and features.

---

## Key Features

* **Intelligent Code Generation**: Utilizes the Google Gemini API for context-aware generation of project boilerplate based on user-defined prompts.
* **Multi-Stack Compatibility**: Supports code generation for a diverse range of modern frontend and backend frameworks and libraries.
* **Cloud-Based File Storage**: Employs AWS S3 for secure, scalable storage of all generated project files, linked directly to user accounts.
* **Integrated Code Editor**: Features an in-browser Monaco Editor (the engine behind VS Code) enabling users to view, modify, and save generated code files directly.
* **Comprehensive Project Management**: Provides a full suite of RESTful API endpoints for complete CRUD (Create, Read, Update, Delete) operations on projects and individual files.
* **Secure User Authentication**: Implements a robust JWT (JSON Web Token) based authentication system to safeguard user accounts and associated projects.
* **Modern User Interface**: A clean, responsive, and intuitive user interface developed with React, TypeScript, and Tailwind CSS, leveraging components from the shadcn/ui library.
* **Integrated Documentation**: Includes a dedicated documentation section detailing API usage, features, and getting started guides.

---

## Technology Stack

**Frontend:**

* **Framework/Library**: React (v18+) utilizing Vite for build tooling
* **Language**: TypeScript
* **Styling**: Tailwind CSS, shadcn/ui Component Library
* **Routing**: React Router DOM (v6)
* **State Management**: React Context API
* **API Client**: Axios
* **Code Editor**: Monaco Editor (@monaco-editor/react)
* **Notifications**: React Hot Toast

**Backend:**

* **Runtime**: Node.js (v18+ recommended)
* **Framework**: Express.js
* **Database**: MongoDB (with Mongoose ODM) - For storing user profiles and project metadata.
* **Object Storage**: AWS S3 (using `@aws-sdk/client-s3`) - For storing generated source code files.
* **Authentication**: JSON Web Tokens (jsonwebtoken), Bcrypt.js (for password hashing)
* **Middleware**: Cors (Cross-Origin Resource Sharing)
* **Utilities**: dotenv (Environment Variables), Archiver (File Archiving)

**Artificial Intelligence:**

* **Model Provider**: Google Gemini API (accessed via REST)

---

## Local Development Setup

Follow these instructions to configure and run the CodeSmith application on your local machine.

### Prerequisites

* Node.js (v18 or later recommended)
* npm (v8+) or yarn package manager
* Access to a running MongoDB instance (local installation or a cloud service like MongoDB Atlas)
* An AWS Account with:
    * An S3 bucket created and accessible.
    * IAM user credentials (Access Key ID and Secret Access Key) possessing appropriate S3 permissions.
* A Google Gemini API Key obtained from Google AI Studio or Google Cloud Console.

### Backend Configuration

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-name>/backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment Variables:** Create a `.env` file in the `backend` directory. Populate it with your specific credentials and configuration details, using `.env.example` as a template if available. Refer to the [Environment Variables](#environment-variables) section for required fields.
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The backend API service will initialize and listen on `http://localhost:3001` (or the port specified in your `.env`).

### Frontend Configuration

1.  **Navigate to the `frontend` directory:**
    ```bash
    cd ../frontend # (If currently in the backend directory)
    # Or navigate directly: cd path/to/frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **(Optional) Configure API Base URL:** Create a `.env` file in the `frontend` root if your backend API is running on a different URL than the default (`http://localhost:3001/api` specified in `src/api/apiService.ts`).
    ```env
    VITE_API_BASE_URL=http://your-backend-api-url
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The frontend application will be accessible via your browser, typically at `http://localhost:5173`.

---

## Environment Variables

The backend requires the following environment variables defined within a `.env` file for proper operation:

```env
# Server Configuration
PORT=3001

# MongoDB Connection URI (Replace with your actual connection string)
MONGO_URI="mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"

# JWT Authentication Secret (Use a strong, unique, and random string)
JWT_SECRET="YOUR_SECURE_RANDOM_JWT_SECRET_KEY"

# Google Gemini API Key
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# AWS S3 Configuration
AWS_ACCESS_KEY_ID="YOUR_AWS_ACCESS_KEY_ID"
AWS_SECRET_ACCESS_KEY="YOUR_AWS_SECRET_ACCESS_KEY"
AWS_REGION="your_s3_bucket_region" # Example: us-east-1, ap-south-1
S3_BUCKET_NAME="your_globally_unique_s3_bucket_name"
Ensure placeholder values are replaced with your actual service credentials and configuration.

API Endpoints
The backend exposes a RESTful API with the base path /api. All endpoints, excluding user registration and login, require Bearer Token authentication via the Authorization header.

Authentication (/auth): POST /register, POST /login, GET /me

Generation (/): POST /generate

Projects (/projects): GET /, POST /, GET /:id, PATCH /:id, DELETE /:id

Project Files (/projects/:id/file): POST /, PATCH /, DELETE /, GET /?path=<filepath>

Download (/projects/download/:id): GET /

Refer to the integrated API documentation page or backend source code for detailed request/response schemas.

Project Structure
.
├── backend/          # Node.js/Express API application
│   ├── controllers/    # Route handler logic
│   ├── models/         # Mongoose data models (User, Project)
│   ├── middleware/     # Express middleware (e.g., authentication)
│   ├── routes/         # API endpoint definitions
│   ├── services/       # Business logic modules (aiService, s3Service)
│   ├── .env            # Environment variable storage (gitignored)
│   ├── index.js        # Main server entry point
│   └── package.json    # Backend dependencies and scripts
│
├── frontend/         # React/Vite user interface
│   ├── public/         # Static assets (images, favicon)
│   ├── src/
│   │   ├── api/          # Centralized API service configuration (Axios)
│   │   ├── components/   # Reusable UI elements (Navbar, shadcn ui)
│   │   ├── context/      # Global state management (AuthContext)
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Top-level page components
│   │   ├── App.tsx       # Root component with routing setup
│   │   ├── index.css     # Global CSS and Tailwind directives
│   │   └── main.tsx      # Frontend application entry point
│   ├── tailwind.config.js # Tailwind CSS theme configuration
│   ├── tsconfig.json   # TypeScript configuration
│   ├── vite.config.ts  # Vite build tool configuration
│   └── package.json    # Frontend dependencies and scripts
│
└── README.md           # Project overview and documentation (this file)
Deployment Strategy
[Detail the recommended or actual deployment process here. Be specific about platforms and steps.]

Example using Vercel (Frontend) and Render (Backend):

Frontend Deployment (Vercel):

Connect your Git repository (GitHub, GitLab, etc.) to a new Vercel project.

Vercel typically auto-detects Vite projects. Ensure the Build Command is npm run build and the Output Directory is dist.

Configure Environment Variables: Add VITE_API_BASE_URL pointing to your deployed backend service URL.

Deploy. Vercel will handle the build and hosting.

Backend Deployment (Render):

Create a new "Web Service" on Render and connect your Git repository.

Set the Runtime environment to "Node".

Configure the Build Command: npm install.

Configure the Start Command: node index.js.

Add all necessary Environment Variables (from your .env file) in the Render service settings.

Ensure your Render service's IP address is allowed access to your MongoDB instance (if using IP allowlisting) and that the AWS credentials have appropriate permissions.

Deploy. Render will build and run your Node.js server.

Contributing
Contributions to CodeSmith are welcome. To contribute, please adhere to the following guidelines:

Fork the repository.

Create a feature branch (git checkout -b feature/YourFeatureName).

Implement your changes or bug fixes.

Commit your changes with clear, descriptive messages (git commit -m 'feat: Add functionality for X').

Push your changes to your fork (git push origin feature/YourFeatureName).

Submit a Pull Request detailing your changes and their purpose.

Please ensure code quality, follow existing conventions, and add tests if applicable before submitting a pull request.

License
This project is distributed under the MIT License. See the LICENSE file for more information. (Note: You should create a LICENSE file containing the MIT License text in your repository root).

Acknowledgements
CodeSmith relies on the excellent work of the open-source community and various service providers:

Google Gemini for the core AI capabilities.

Amazon Web Services for scalable S3 storage.

MongoDB Atlas (or self-hosted MongoDB) for database persistence.

The teams behind React, Vite, Node.js, Express, Mongoose, Tailwind CSS, shadcn/ui, Monaco Editor, and numerous other libraries.
````
