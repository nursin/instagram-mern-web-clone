import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Pusher from 'pusher';

// app config
const app = express();
const port = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(cors());

// db config 

// api routes 
app.get('/', (req, res) => res.status(200).send('Hello World!'));

// listener
app.listen(port, () => console.log(`listening on localhost:${port}`));
