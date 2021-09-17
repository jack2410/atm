# ATM queue

### Features

- There are 3 ATMs at the beginning, ATMs can be added or removed
- There is a queue for waiting customers.
- A new customer arrives at the queue in a random period of time (between 2 and 4 seconds).
- A customer holds a random number of transactions (between 1- 3).
- An ATM needs 2 seconds to complete a transaction.
- The algorithm will take waiting customers from queue to free ATM.

### Technology

- Backend: NestJS framework, using @nestjs/bull for queue and Node.js multiple-threading for process transactions (each ATM stands for a thread).
- Frontend: React.js, using hooks and an interval for retriving new data (browser will call server every second to get new data).
- Deployment: Docker, using docker-compose with 3 services (redis, server, client).

### Setup

- Clone code from this repo:

##### Run in local

- Run redis server (recommend using docker): `docker run --name redis-server -p 6379:6379 -d redis`.
- cd to server folder and run `npm i` to install packages for nestjs app
- cd to client folder and run `npm i` to install packages for react app.
- cd to server folder and run `npm start` to start the backend.
- Open another terminal, cd to client folder and run `npm start` to start the frontend.
- Now you can see your app is online at: `http://localhost:3000`

##### Deploy

- cd to root folder, run `docker-compose up -d`.
- Note: run `docker-compose down` and `docker-compose up -d --build` to redeploy new code.
- Now you can see your app is online at: `http://localhost:3000`
