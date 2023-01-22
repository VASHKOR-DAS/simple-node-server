const express = require('express');
const app = express();
const cors = require('cors') // load data on other domain
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); //client site theke data ta json a convert kora

app.get('/', (req, res) => {
    res.send('Simple node server API running');
});

const users = [
    { "id": 1, "name": "Buckley", "email": "buckley@gmail.com" },
    { "id": 2, "name": "Mcfarland", "email": "mcfarland@yahoo.com" },
    { "id": 3, "name": "Joy", "email": "joy@hotmail.com" }
];

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