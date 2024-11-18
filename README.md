#  Collaborative Document Editor

Welcome to the **Collaborative Document Editor**! This app lets multiple users edit documents together in real time, making teamwork a breeze. Built with modern tools like **React**, **Slate.js**, and **Node.js**, it’s simple, fast, and reliable.

---

## Features

-  **Real-Time Collaboration**: Changes sync instantly across users.
-  **Create & Manage Documents**: Easily create, edit, and share documents.
-  **Conflict-Free Editing**: Smart handling of simultaneous edits.
-  **Secure Editing**: Only authorized users can access documents.
-  **Performance Optimized**: Smooth updates and minimal network traffic.

---

##  Tech Stack

- **Frontend**: React + Slate.js  
- **Backend**: Node.js with WebSocket API  
- **Database**: MongoDB (local or Atlas)  
- **Hosting**: MongoDB Atlas + Local WebSocket Server  

---

##  Getting Started

### Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)  
- [Docker Compose](https://docs.docker.com/compose/)  

---

###  Installation Steps

1. **Clone the Project**  
   ```bash
   git clone https://github.com/viveksinghvats/VKDoc/
   cd VkDoc

2. **Set Up Environment Variables**
   
    Add .env files in both the frontend and backend folders:
   
    Backend (VkDOC-BE/src/.env)
   ```bash
   PORT=2000
   Socket_PORT=8080
   JWT_SECRET=
   MONGODB_URI=
   ```

   Frontend (VkDOC-FE/.env)
   ```bash
   REACT_APP_API_URL=http://localhost:2000
   ```
 4. **Build and Start Containers**
  
    Use Docker Compose to build and start all containers:
    ```bash
    docker-compose up --build
    ```
    Run Frontend:
    ```
    cd VkDOC-FE
    npm start
    
## 🎯 How to Use
Access the Application

Open http://localhost:1234 in your browser.
Sign In or Register

Create an account or log in.
Start Collaborating

Create a document and share it with others for real-time editing!
    
    
   This command will:
   Build the frontend, backend, and MongoDB containers.<br>
   Expose the frontend on http://localhost:1234.<br>
   Expose the backend on http://localhost:2020.
