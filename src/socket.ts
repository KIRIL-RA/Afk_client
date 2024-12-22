import { Server } from 'socket.io';
import { config } from './configs/config_loader'
import { handleACtion } from './actions';
import { io } from 'socket.io-client';

let clientIO: Server;
enum SocketRoom {
    SEND_COMMAND = 'command-cli'
}

export const initializeWebScoket = () => {
    console.log(`http://${config.serverIp}:${config.port}?type=client&password=${config.password}`);
    const socket = io(`http://${config.serverIp}:${config.port}?type=client&password=${config.password}`); // Replace with your server's address

    socket.on('connect', () => console.log('Connected to server'));

    // Disconnect handler
    socket.on('disconnect', () => {
        console.log('Disconnected from server');

        // Retry in 5 seconds
        setTimeout(() => {
            console.log("Attempting to connect to server");
            socket.connect();
        }, 5000); 
    });

    // Socket handle messages
    socket.on(SocketRoom.SEND_COMMAND, (message: string) => {
        console.log('Received message:', message);
        handleACtion(message);
    });
}