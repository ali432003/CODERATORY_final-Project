// socketInstance.js
let io;

export const setSocketInstance = (socketInstance) => {
    io = socketInstance;
};

export const getSocketInstance = () => io;
