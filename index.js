const express = require('express');
const cors = require('cors') // load data on other domain
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Simple node server API running');
});

app.use(cors());
app.use(express.json()); //client site theke data ta json a convert kora


const users = [
    { "id": 1, "name": "Buckley", "email": "buckley@gmail.com" },
    { "id": 2, "name": "Mcfarland", "email": "mcfarland@yahoo.com" },
    { "id": 3, "name": "Joy", "email": "joy@hotmail.com" }
];

// username : dbUser1, password: CIn42bwZCXBOMFBm


const uri = "mongodb+srv://dbUser1:CIn42bwZCXBOMFBm@cluster0.wbb4jrx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


//  normally function likhte hole 
//     function run(){

//     }

//     run() // call kortam aivabe

//     but async function korte hole, function call krr por .catch(console.dir)
//     //dir 1ta function means,je obj ta asbe tar sob property gulo log kortese


//     Ami db er moddhe 1ta userCollection banalam
//     then 1ta collection

//     then 1ta object banalam user nam a

//     then seta k userCollection a send kore dilam (1bar)



async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('users');
        const user = { name: 'Nahiya Mahi', email: 'nehi@gmail.com' }
        const result = await userCollection.insertOne(user);
        console.log(result);
    }
    finally {

    }
}

run().catch(err => console.log(err))



app.get('/users', (req, res) => {
    console.log(req.query); // query diye data filter kore
    const search = req.query.name; // name diye search kora query diye
    if (req.query.name) {
        // filter user by query
        // http://localhost:5000/users?name=joy aikhane name property likhe search dite parbo
        const filtered = users.filter(usr => usr.name.toLocaleLowerCase().indexOf(search) >= 0);
        res.send(filtered); // filtered jinish gulo send
    }
    else {
        res.send(users);
    }
});

// Client site theke data server a pathabo
app.post('/users', (req, res) => {
    // console.log('Post API called'); //client site theke hit kore kina ta janar jnno (middle ware)
    // console.log(req.body); // client site theke body er moddhe data pathano hoise tai read kora
    const user = req.body;
    user.id = users.length + 1; // users er majhe jotogulo obj ase tar theke 1 besi id
    users.push(user);
    console.log(user);
    res.send(user);

});











app.listen(port, () => {
    console.log("Server running on port", port);
});