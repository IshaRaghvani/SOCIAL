# SOCIAL
![image](https://github.com/IshaRaghvani/SOCIAL/assets/114795191/c300e50b-797e-438b-90ec-2920c7b34b51)

Welcome to SOCIAL, a dynamic MERN social media platform that transcends boundaries to redefine your online interactions. Crafted with MongoDB, Express.js, React.js, and Node.js, SOCIAL brings together a vibrant community with features like likes, comments, profiles, friends, and real-time chat using Socket.io.

# Features that Illuminate Your Social Universe
**1. Seamless Authentication**
Effortless Signups and Logins: Navigate the social cosmos with ease by registering or securely logging in.

**2. Radiant Profile Management**
Personal Starry Space: Customize your profile with stunning visuals, including profile pictures, a captivating bio, and personal details.

**3. Social Connections**
Posts: Share your thoughts and experiences with multimedia-rich posts that shine bright in the community.
Hearts and Likes: Express yourself by liking posts and leaving stellar comments.

**4. Friendship Bonds**
Connections: Forge connections with other users through friend requests and nurture meaningful friendships.
Friendship Feeds: Experience a tailored feed featuring posts exclusively from your cosmic companions.

**5. Real-Time Chat**
Light-Speed Messaging: Communicate with friends in real-time through our advanced chat feature powered by Socket.io.

**6. Illuminating Light and Dark Modes**
Aesthetics: Toggle between light and dark modes to suit your mood and enhance your viewing experience.



# Technologies used:

**Frontend :** React.js

**Backend :** Node.js, Express.js

**Database :** MongoDB

**Authentication :** JWT Magic

**Real-Time Communication Warp:** Socket.io

Certainly! Below is a simplified "Getting Started" section for a MERN social media app with separate client and server parts:

---

# Getting Started with SOCIAL

SOCIAL is a MERN (MongoDB, Express.js, React.js, Node.js) social media app that connects you with a vibrant community. The app is divided into client and server parts for seamless development and deployment.

## Prerequisites

Before you begin, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/) - v14 or later
- [MongoDB](https://www.mongodb.com/try/download/community) - Make sure MongoDB is running on your machine or use a cloud-based solution.

## Clone the Repository

```bash
git clone https://github.com/yourusername/social.git
cd social
```

## Server Setup

### Install Dependencies

Navigate to the server directory and install the dependencies:

```bash
cd server
npm install
```

### Configure Environment Variables

Create a `.env` file in the server directory with the following content:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Start the Server

```bash
npm start
```

Your server will be running at [http://localhost:5000](http://localhost:5000).

## Client Setup

### Install Dependencies

Navigate to the client directory and install the dependencies:

```bash
cd client
npm install
```

### Configure API Endpoint

Open `client/src/api/index.js` and set the `BASE_URL` variable to your server's URL:

```javascript
const BASE_URL = 'http://localhost:5000/api'; // Update this with your server URL
```

### Start the Client

```bash
npm start
```

Your client will be accessible at [http://localhost:3000](http://localhost:3000).

## Launch Your Social Odyssey

Open your browser, navigate to [http://localhost:3000](http://localhost:3000), and embark on your social journey with SOCIAL!

