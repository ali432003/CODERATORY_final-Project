import { Server } from "socket.io";
import { setSocketInstance } from "./socketInstance.js";
import timeLogDB from "../models/timeTrackSchema.js";

let connectedUsers = {}; // To store connected users
let userActivityTimers = {}; // To store timers for each user's activity

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            credentials: true
        }
    });

    setSocketInstance(io); // Store the io instance globally

    io.on('connection', (socket) => {
        console.log('New user connected:', socket.id);

        // Track when a user connects
        socket.on('user-connected', async (userId) => {
            connectedUsers[userId] = socket.id; // Map userId to socket.id
            console.log(`User ${userId} connected`);

            // Initialize or resume tracking for the connected user
            const logs = await timeLogDB.findOne({ userId });
            if (!logs) {
                // If no logs exist for the user, create a new entry
                await timeLogDB.create({ userId, totalActivityTime: 0 });
            }
        });

        // Track user activity (mouse movements, key presses, etc.)
        socket.on('activity', async (data) => {
            const { userId, activityType } = data;
            console.log(`Activity detected for User ${userId}: ${activityType}`);

            if (!userActivityTimers[userId]) {
                // Start tracking the time if it's not already started
                userActivityTimers[userId] = Date.now();
            }
        });

        // Track user inactivity (e.g., mouse static or no keypress)
        socket.on('inactive', async (userId) => {
            console.log(`User ${userId} became inactive`);

            // If the user was active, calculate the time they were active and update the DB
            if (userActivityTimers[userId]) {
                const currentTime = Date.now();
                const activityDuration = (currentTime - userActivityTimers[userId]) / (1000 * 60 * 60); // Convert milliseconds to hours

                // Update the user's total activity time in the database
                const logs = await timeLogDB.findOne({ userId });
                if (logs) {
                    logs.totalActivityTime += activityDuration;
                    await logs.save();
                }

                // Clear the timer for the user
                delete userActivityTimers[userId];
            }
        });

        // Detect if user switches tab or window, resume tracking
        socket.on('tab-changed', async (userId) => {
            console.log(`User ${userId} changed tab or window`);

            // If the user had an active session before tab change, we resume the timer
            if (!userActivityTimers[userId]) {
                userActivityTimers[userId] = Date.now(); // Start the timer again when the user resumes after switching tabs
                console.log(`Resumed tracking for User ${userId}`);
            }
        });

        // Handle disconnection
        socket.on('disconnect', async () => {
            console.log(`User disconnected: ${socket.id}`);

            // Find the userId associated with the disconnected socket
            const userId = Object.keys(connectedUsers).find(key => connectedUsers[key] === socket.id);

            if (userId) {
                // If the user was active before disconnecting, log the activity duration
                if (userActivityTimers[userId]) {
                    const currentTime = Date.now();
                    const activityDuration = (currentTime - userActivityTimers[userId]) / (1000 * 60 * 60); // Convert milliseconds to hours

                    // Update the total activity time in the DB
                    const logs = await timeLogDB.findOne({ userId });
                    if (logs) {
                        logs.totalActivityTime += activityDuration;
                        await logs.save();
                    }

                    // Clear the timer for the disconnected user
                    delete userActivityTimers[userId];
                }

                // Remove the user from the connected users list
                delete connectedUsers[userId];
            }
        });
    });

    return io;
};

export default initializeSocket;
