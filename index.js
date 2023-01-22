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
    res.send(users);
});

// Client site theke data server a pathabo
app.post('/users', (req, res) => {
    console.log('Post API called'); //client site theke hit kore kina ta janar jnno (middle ware)
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