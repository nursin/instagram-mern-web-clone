import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import dbModel from './dbModel.js';

// app config
const app = express();
const port = process.env.PORT || 8080;

const pusher = new Pusher({
  appId: "1286132",
  key: "fa14fc9271ab4c159777",
  secret: "3688ef1641703705d7e4",
  cluster: "us2",
  useTLS: true
});

// middleware
app.use(express.json());
app.use(cors());

// db config 
const connection_url = 'mongodb+srv://admin:PynyxaoF1bhfT45k@cluster0.gw1qf.mongodb.net/tinderdb?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log('DB Connected')

    const changeStream = mongoose.connection.collection('posts').watch();

    changeStream.on('change', (change) => {
        console.log('change was triggered on pusherchange...')
        console.log(change)
        console.log('End of change')

        if (change.operationType === 'insert') {
            console.log('Triggering Pusher ***IMG UPLOAD***')

            const postDetails = change.fullDocument;
            pusher.trigger('posts', 'inserted', {
                user: postDetails.user,
                caption: postDetails.caption,
                image: postDetails.image
            })
        } else {
            console.log('Unknown trigger from Pusher')
        }
    })
})

// api routes 
app.get('/', (req, res) => res.status(200).send('Hello World!'));

app.get('/sync', (req, res) => {
    dbModel.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

app.post('/upload', (req, res) => {
    const body = req.body;

    dbModel.create(body, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});


// listener
app.listen(port, () => console.log(`listening on localhost:${port}`));
