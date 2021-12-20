const express = require('express');
const app = express();
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require('cors')

app.use(cors());
app.use(express.json());

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.89jki.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db('Volunteer_work');
      const VolunteerCollection = database.collection('Volunteer '); 
      const userCollection = database.collection('Volunteer_User '); 
    

     app.get('/Volunteers', async(req, res) =>{
         const user = await VolunteerCollection.find({}).toArray();
         
         res.send(user);
     });


    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close()
    }
  }
  run().catch(console.dir);

app.get('/', (req, res)=>{
    console.log('response');
    res.send('hit the post');
});

app.listen(port, ()=>{
    console.log('Volunteer server start', port);
});