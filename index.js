const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s88xr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const database = client.db(`${process.env.DB_NAME}`);
        const bannerData = database.collection(`${process.env.DB_COLLECTION1}`);
        const howItWorksData = database.collection(`${process.env.DB_COLLECTION2}`);       
        const categoriesCollection = database.collection(`${process.env.DB_COLLECTION3}`);
        const introVideoData = database.collection(`${process.env.DB_COLLECTION4}`);
        const faqsCollection = database.collection(`${process.env.DB_COLLECTION5}`);
        const readingMaterialsCollection = database.collection(`${process.env.DB_COLLECTION6}`);
        const hotTopicsCollection = database.collection(`${process.env.DB_COLLECTION7}`);

        //GET API
        //For fetching all the categories
        app.get('/banner', async (req, res) => {
            const cursor = bannerData.find({});
            const banner = await cursor.toArray();
            res.send(banner);
        });

        app.get('/categories', async (req, res) => {
            const cursor = categoriesCollection.find({});
            const categories = await cursor.toArray();
            res.send(categories);
        });

        app.get('/introVideo', async (req, res) => {
            const cursor = introVideoData.find({});
            const introVideo = await cursor.toArray();
            res.send(introVideo);
        });

        app.get('/faqs', async (req, res) => {
            const cursor = faqsCollection.find({});
            const faqs = await cursor.toArray();
            res.send(faqs);
        });

        app.get('/hotTopics', async (req, res) => {
            const cursor = hotTopicsCollection.find({});
            const hotTopics = await cursor.toArray();
            res.send(hotTopics);
        });

        app.get('/readingMaterials', async (req, res) => {
            const cursor = readingMaterialsCollection.find({});
            const readingMaterials = await cursor.toArray();
            res.send(readingMaterials);
        });

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})