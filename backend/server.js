const express = require('express');
const cors = require('cors');
const app= express();
const mysql= require('mysql2');

const db= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Adithya@&16',
    database: 'demo'
})

db.connect((err) => {
    if (err) {
        console.log('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
})

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

app.get('/', (req, res) => {
    console.log('Received a GET request');
    db.query('SELECT * FROM demo_table', (err, results) => {
        if (err) {
            console.log('Error executing query:', err);
            return;
        }
        console.log('Query executed successfully:', results);
        res.send(results);
    })
})

app.post('/sample', (req, res) => {
    console.log(req.body);
    db.query(`insert into demo_table(demo_list) values('${req.body.text}')`, (err, result) => {
        if (err) {
            console.log('Error executing query:', err);
            return;
        }
        console.log('Query executed successfully:', result);
    })
     res.send('Data received successfully');
}) 

app.put('/todo-update', (req, res) => {
    console.log(req.body);
    db.query(`update demo_table set demo_list='${req.body.text}' where Id=${req.body.Id}`, (err, result) => {
        if (err) {
            console.log('Error executing query:', err);
            return;
        }
        console.log('Query executed successfully:', result);
    });
    res.send('Data updated successfully');
});

app.delete('/todo-delete/', (req, res) => {
    db.query(`delete from demo_table where Id=${req.body.Id}`, (err, result) => {
        if (err) {
            console.log('Error executing query:', err);
            return;
        }
        console.log('Query executed successfully:', result);
    })
})