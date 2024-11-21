
const express = require('express')
const app = express()
const port = 3000
const mongoose = require("mongoose")
const {addUser,getUsers}=require("./handlers/userHandle")
const userRoutes = require("./routes/user-route");
app.use(express.json());
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:4200', // Replace with your Angular app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions))

app.use(userRoutes);
app.get('/', (req, res) => {
    res.send('running')
})

// app.post('/users',async (req,res)=>{
//     ///////////////// user add
//     await addUser(req.body);
//     res.send("done")
// })
//
// app.get('/users',async (req,res)=>{
//     ///////////////// user add
//     let users = await getUsers();
//     res.send(users)
// })
async function connectDb() {

        await mongoose.connect("mongodb://localhost:27017", {
            dbName: "UsersDb",
        });
}

connectDb().catch((err)=> console.log(err));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})