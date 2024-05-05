import express from 'express'
import cors from 'cors'
import mysql from 'mysql'


// // const express = require("express");
// // const mysql = require('mysql');
// // const cors = require('cors');

// const app= express();
// app.use(cors());
// app.use(express.json());

// const db= mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"Anvi_jain@20",
//     database:"codepen_data"
// })

// app.post('/LoginSignup', (req,res)=>{
//     const sql="INSERT INTO users (username, email, password) VALUES (?)";
//     const values=[
//         req.body.name,
//         req.body.email,
//         req.body.password
//     ]
//     db.query(sql,[values],(err,data)=>{
//         if(err){
//             return res.json("Error");
//         }
//         return res.json(data);
//     })
// })

// app.listen(8081, ()=>{
//     console.log("listening");
// })

// server.js

// const express = require('express');
// const mysql = require('mysql');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Anvi_jain@20', // Replace with your MySQL password
    database: 'codepen_data'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        throw err;
    }
    console.log('Connected to MySQL');
});

// Route to handle user login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Check if user exists in the database
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Login error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const user = results[0];
        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, users.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Create JWT token
        const token = jwt.sign({ id: users.id }, 'secret');
        res.json({ token });
    });
});

// Route to handle user registration
app.post('/LoginSignup', async (req, res) => {
    const { email, password } = req.body;
    // Check if user with the same email already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Signup error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Insert new user into the database
        db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err, result) => {
            if (err) {
                console.error('Signup error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(201).json({ message: 'User created successfully' });
        });
    });
});

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
