import express from "express";
import pg from "pg";
import cors from "cors";
import { Route } from "react-router-dom";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "animeTracker",
    password: "36Postgres172!",
    port: 5432,
  });
db.connect();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get("/get-anime", async(req, res) => {
    const{user_id, type} = req.query;
    //console.log(user_id, type);
    try{
        const response = await db.query("SELECT * FROM animes WHERE user_id=$1 and status=$2", [user_id, type]);
        res.status(200).json({animes: response.rows})
    }catch(error){
        console.log("Error communicating with the database");
    }
})

app.get("/get-anime-recommendations", async(req, res) => {
    const{user_id} = req.query
    console.log(user_id)
})

app.post("/login", async(req, res) => {
    const {email, password} = req.body;
    try{
        const response = await db.query("SELECT * FROM users WHERE email=$1 and password=$2", [email, password])
        console.log(response.rows[0].id);
        if(response.rows.length > 0){
            res.status(200).json({ id: response.rows[0].id });
        }else{
            res.status(401).send("Invalid email or password");
        }
    }catch(error){
        console.log("Error communicating with the database", error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.post("/login-gmail", async(req, res) => {
    const {email, name} = req.body;
    try{
        const response = await db.query("SELECT * FROM users WHERE email=$1;", [email])
        if(response.rows.length === 0){
            //Maybe insert some kind of password to indicate that it is a google account????
            await db.query("INSERT INTO users(username, email) VALUES ($1, $2);",[name, email])
        }
        const responseForId = await db.query("SELECT * FROM users WHERE email=$1;", [email])
        res.status(200).json({ id: response.rows[0].id})
    }catch(error){
        console.log("Db error", error);
    }

})

app.post("/register", async(req, res) => {
    const {username, email, password} = req.body;
    try{
        const response = await db.query("INSERT INTO users(username, email, password) VALUES ($1, $2, $3);",[username, email, password]);
        console.log(response);
        res.status(200).send("User successfully registered");
    }catch(error){
        if (error.code === '23505' && error.constraint === 'users_email_key') {
            res.status(400).send("Email already exists");
        } else {
            res.status(500).send("Internal server error");
        }
    }
})

app.post("/log-anime", async(req, res) => {
    const { id, name, favCharacter, rating, status} = req.body;
    try{
        db.query("INSERT INTO animes (name, favoritecharacter, rating, status, user_id) VALUES($1, $2, $3, $4, $5)", [name, favCharacter, rating, status, id])
        res.status(200).send("Anime successfully added to the database");
    }catch(error){
        console.log("Database error");
    }
})

app.post("/delete-anime", async(req, res) => {
    const {id, user_id} = req.body;
    console.log(id, user_id)
    try{
        db.query("DELETE FROM animes WHERE id=$1 and user_id=$2;", [id, user_id])
        res.status(200).send("Anime successfully deleted from the database");
    }catch(error){
        console.log("Database error");
    }
})



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });