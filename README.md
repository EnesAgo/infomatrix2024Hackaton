# Infomatrix 2024 Hackathon Project

## Overview

This project is an online chat application developed for the Infomatrix 2024 Hackathon. The application uses Firebase Firestore for real-time chat, MongoDB as the primary database, Express.js for the backend REST API, Next.js for the frontend, the News API for fetching tech news, and the OpenAI GPT-3.5 API for AI-driven chat responses.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Project Structure](#project-structure)
- [Backend Implementation](#backend-implementation)
    - [Setup](#setup)
    - [Routes](#routes)
- [Frontend Implementation](#frontend-implementation)
    - [Setup](#setup)
    - [Pages and Components](#pages-and-components)
- [Running the Application](#running-the-application)
- [Conclusion](#conclusion)

## Technologies Used

- **Backend**: Express.js
- **Database**: MongoDB
- **Real-time Chat**: Firebase Firestore
- **Frontend**: Next.js
- **APIs**:
    - News API (for fetching tech news)
    - OpenAI GPT-3.5 (for AI chat responses)

## Prerequisites

- Node.js
- MongoDB
- Firebase Account
- News API Key
- OpenAI API Key

## Environment Setup

Create a `.env` file in the root directory and add the following environment variables:

```bash
PORT=3000
MONGO_URI=<Your MongoDB Connection String>
FIREBASE_CONFIG=<Your Firebase Configuration>
NEWS_API_KEY=<Your News API Key>
OPENAI_API_KEY=<Your OpenAI API Key>
JWT_SECRET=<Your JWT Secret>

## Overview

This project is an online chat application that utilizes multiple technologies to provide various functionalities. The application uses Firebase Firestore for real-time chat, MongoDB as the primary database, Express.js for the backend REST API, Next.js for the frontend, the News API for fetching tech news, and the OpenAI GPT-3.5 API for AI-driven chat responses.

## Technologies Used

- **Backend**: Express.js
- **Database**: MongoDB
- **Real-time Chat**: Firebase Firestore
- **Frontend**: Next.js
- **APIs**: 
  - News API (for fetching tech news)
  - OpenAI GPT-3.5 (for AI chat responses)

## Prerequisites

- Node.js
- MongoDB
- Firebase Account
- News API Key
- OpenAI API Key

## Environment Setup

Create a `.env` file in the root directory and add the following environment variables:

```bash
PORT=3000
MONGO_URI=<Your MongoDB Connection String>
FIREBASE_CONFIG=<Your Firebase Configuration>
NEWS_API_KEY=<Your News API Key>
OPENAI_API_KEY=<Your OpenAI API Key>
JWT_SECRET=<Your JWT Secret> 
```

## Project Structure

```
project-root/
├── backend/
│   ├── dbController/
│   │   ├── UserController.js
│   │   └── GPTPromptController.js
│   ├── functions/
│   │   └── generateMathQuestion.js
│   ├── routes/
│   │   └── api.js
│   ├── public/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── styles/
│   ├── .env.local
│   ├── package.json
│   └── next.config.js
└── README.md
```

## Backend Implementation

### Setup
- **Github Repo**:
    1. Clone Github Repo:
       `git clone https://github.com/EnesAgo/infomatrix2024Hackaton.git`
    2. Install Dependencies:



```Bash
cd backend
npm i
npm run dev
```



- **Routes**:


- Create User: POST /createUser
```Bash
{
    "username": "user123",
    "email": "user@example.com",
    "password": "password123"
}
```

- Login User: POST /loginUser


```Bash
{
    "username": "user123",
    "password": "password123"
}
```


- Get All Users: GET /getAllUsers

`GET /getAllUsers?page=1`


- Get One User: GET /getOneUser

`GET /getOneUser?userUUID=<userUUID>`

- Change User Password: PUT /changeUserPassword

```Bash
{
    "oldPass": "oldPassword",
    "newPass": "newPassword"
}
```

- Create GPT Prompt History: POST /createGPTPromptHistory

```Bash
{
    "uuID": "<userUUID>",
    "userPrompt": "What is AI?",
    "answer": "AI stands for Artificial Intelligence."
}
```

- Get User GPT Prompt History: GET /userGPTPromptHistory

```Bash
GET /userGPTPromptHistory?uuID=<userUUID>
```

- Generate Math Question: GET /mathQuestion

`GET /mathQuestion`


- Ask GPT Prompt: POST /askGPTPrompt

```Bash
{
    "prompt": "What is x if x^2-4x+10=0 "
}
```

### Firestore Integration
Configure Firestore in your backend to handle real-time chat. Here’s a simple example:

```Js
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://<your-project-id>.firebaseio.com"
});

const db = admin.firestore();

app.post('/sendMessage', async (req, res) => {
    const { chatId, message, userId } = req.body;
    await db.collection('chats').doc(chatId).collection('messages').add({
        userId,
        message,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    res.send('Message sent');
});

app.get('/getMessages', async (req, res) => {
    const chatId = req.query.chatId;
    const messages = await db.collection('chats').doc(chatId).collection('messages')
        .orderBy('timestamp', 'asc').get();
    res.json(messages.docs.map(doc => doc.data()));
});

```


## Frontend Implementation

### Setup

1. **Install Dependencies**:
    ```bash
    cd frontend
    npm i
    npm run dev
    ```

2. **Firebase Configuration**:
    - Initialize Firebase in your frontend by creating a `firebaseConfig.js` file and adding your Firebase configuration:
    ```javascript
    // firebaseConfig.js
    import firebase from 'firebase/app';
    import 'firebase/firestore';

    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.firestore();

    export { db };
    ```

### Pages and Components

1. **Home Page**:
    - Fetch tech news using the News API and display the list of articles.
    - Create a `pages/index.js` file for the home page:
    ```javascript
    // pages/index.js
    import axios from 'axios';
    import { useEffect, useState } from 'react';

    export default function Home() {
        const [articles, setArticles] = useState([]);

        useEffect(() => {
            const fetchNews = async () => {
                const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=technology&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
                setArticles(response.data.articles);
            };
            fetchNews();
        }, []);

        return (
            <div>
                <h1>Tech News</h1>
                <ul>
                    {articles.map(article => (
                        <li key={article.url}>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    ```

2. **Chat Page**:
    - Connect to Firestore to display real-time messages and allow users to send messages.
    - Create a `pages/chat.js` file for the chat functionality:
    ```javascript
    // pages/chat.js
    import { useState, useEffect } from 'react';
    import { db } from '../firebaseConfig';

    export default function Chat() {
        const [messages, setMessages] = useState([]);
        const [newMessage, setNewMessage] = useState('');

        useEffect(() => {
            const unsubscribe = db.collection('chats').doc('chatId').collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => {
                    setMessages(snapshot.docs.map(doc => doc.data()));
                });
            return () => unsubscribe();
        }, []);

        const sendMessage = async () => {
            await db.collection('chats').doc('chatId').collection('messages').add({
                userId: 'userId',
                message: newMessage,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            setNewMessage('');
        };

        return (
            <div>
                <h1>Chat</h1>
                <div>
                    {messages.map((msg, idx) => (
                        <div key={idx}>{msg.message}</div>
                    ))}
                </div>
                <input 
                    type="text" 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        );
    }
    ```

3. **User Authentication**:
    - Create login and registration forms to authenticate users.
    - Create a `pages/login.js` file for the login page:
    ```javascript
    // pages/login.js
    import { useState } from 'react';
    import axios from 'axios';

    export default function Login() {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            const response = await axios.post('http://localhost:3000/loginUser', { username, password });
            console.log(response.data);
        };

        return (
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Login</button>
            </form>
        );
    }
    ```

    - Similarly, create a `pages/register.js` file for the registration page:
    ```javascript
    // pages/register.js
    import { useState } from 'react';
    import axios from 'axios';

    export default function Register() {
        const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            const response = await axios.post('http://localhost:3000/createUser', { username, email, password });
            console.log(response.data);
        };

        return (
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Register</button>
            </form>
        );
    }
    ```

### Running the Application

1. **Backend**:
    ```bash
    cd backend
    node server.js
    ```

2. **Frontend**:
    ```bash
    cd frontend
    npm run dev
    ```

Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Conclusion
This documentation covers the setup and basic usage of the online chat application. The integration of various technologies like MongoDB, Firestore, and external APIs makes this project a comprehensive example of a modern web application. For further customization and enhancements, you can explore the respective documentation of the technologies used.


