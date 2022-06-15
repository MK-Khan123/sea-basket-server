const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const logoData = database.collection(`${process.env.DB_COLLECTION8}`);

        //GET API
        app.get('/banner', async (req, res) => {
            const cursor = bannerData.find({});
            const banner = await cursor.toArray();
            res.send(banner);
        });

        app.get('/howItWorks', async (req, res) => {
            const cursor = howItWorksData.find({});
            const howItWorks = await cursor.toArray();
            res.send(howItWorks);
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

        app.get('/logo', async (req, res) => {
            const cursor = logoData.find({});
            const logo = await cursor.toArray();
            res.send(logo);
        });

        //PATCH API
        app.patch('/editBanner/:id', async (req, res) => {
            const id = req.params.id;
            const updatedBannerUrl = req.body.imageUrl;
            const filter = { _id: ObjectId(id) };
            const action = {
                $set: { imageUrl: updatedBannerUrl }
            };
            const result = await bannerData.updateOne(filter, action);
            res.send(result.modifiedCount > 0);
        });

        app.patch('/editContent/:id', async (req, res) => {
            const id = req.params.id;
            const updatedContent = req.body.content;
            const filter = { _id: ObjectId(id) };
            const action = {
                $set: { content: updatedContent }
            };
            const result = await howItWorksData.updateOne(filter, action);
            res.send(result.modifiedCount > 0);
        });

        app.patch('/editVideo/:id', async (req, res) => {
            const id = req.params.id;
            const updatedVideo = req.body.videoUrl;
            const filter = { _id: ObjectId(id) };
            const action = {
                $set: { videoUrl: updatedVideo }
            };
            const result = await introVideoData.updateOne(filter, action);
            res.send(result.modifiedCount > 0);
        });

        app.patch('/editLogo/:id', async (req, res) => {
            const id = req.params.id;
            const updatedLogo = req.body.imageUrl;
            const filter = { _id: ObjectId(id) };
            const action = {
                $set: { imageUrl: updatedLogo }
            };
            const result = await logoData.updateOne(filter, action);
            res.send(result.modifiedCount > 0);
        });

        //POST API
        app.post('/addCategories', async (req, res) => {
            const newCategory = req.body;
            const result = await categoriesCollection.insertOne(newCategory);
            res.json(result);
        });

        app.post('/addFaqs', async (req, res) => {
            const newFAQ = req.body;
            const result = await faqsCollection.insertOne(newFAQ);
            res.json(result);
        });

        app.post('/addReadingMaterials', async (req, res) => {
            const newReadingMaterial = req.body;
            const result = await readingMaterialsCollection.insertOne(newReadingMaterial);
            res.json(result);
        });

        app.post('/addHotTopics', async (req, res) => {
            const newHotTopic = req.body;
            const result = await hotTopicsCollection.insertOne(newHotTopic);
            res.json(result);
        });

        //DELETE API
        app.delete('/deleteCategory/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await categoriesCollection.deleteOne(query);
            res.json(result);
        });

        app.delete('/deleteFaq/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await faqsCollection.deleteOne(query);
            res.json(result);
        });

        app.delete('/deleteReadingMaterials/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await readingMaterialsCollection.deleteOne(query);
            res.json(result);
        });

        app.delete('/deleteHotTopics/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await hotTopicsCollection.deleteOne(query);
            res.json(result);
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