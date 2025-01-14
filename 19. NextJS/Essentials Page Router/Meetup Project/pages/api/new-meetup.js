// Always run on server side
// /api/new-meetup
import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        // The passwd is safe here because this code runs on server, never in the client side
        const client = await MongoClient.connect('mongodb+srv://adriangonzalezmeda:WRWvjMSiNy4oe9PQ@cluster0.gl87o.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
        const db = client.db();

        // if doesn't exist, created on the fly
        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);
        console.log(result);

        client.close();

        res.status(201).json({message: 'Meetup inserted!'});
    }
}

export default handler;