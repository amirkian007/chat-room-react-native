# RN Chat

Chat Room app made with React Native, Nativepaper, nodejs, express js and socket io.

## Libraries used

- React Native with React Hooks, NativeBase and express
- React Navigation 4.0, Redux, Redux Thunk
- socket io 4 , express 4.17
- MongoDb Atlas for database

## Installation and running

### Server

- `npm install` to install the dependecies(both client and server)
- set database connection in the `server/app.js` for example `mongodb+srv://test1:1111111@cluster0.0tiwc.mongodb.net/database`
- `npm run server` to start the server on `http://localhost:3000`

### Client


- set the server url in the `/screens/chatroom.js` for example `const server_url = "http://192.168.1.103:3000"` or run `ipconfig` in cmd/terminal to get the Wireless LAN adapter Wi-Fi ans set one of the ips int the server url like `const server_url = "255.255.255.0"` 
- `NOTE : DO NOT SET http://localhost:3000 in  const server_url`
- `npm start` to run React Native client on the running Android emulator

## Screenshots

 <img src="/screen%20shot/gif.gif" width="270"/><img src="/screen%20shot/4.jpg" width="270"/><img src="/screen%20shot/2.jpg" width="270"/> 
<img src="/screen%20shot/3.jpg" width="270"/><img src="/screen%20shot/5.jpg" width="270"/>


