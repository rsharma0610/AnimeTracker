import express from "express";
import pg from "pg";
import cors from "cors";

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

app.post("/login", async(req, res) => {
    const {email, password} = req.body;
    try{
        const response = await db.query("SELECT * FROM users WHERE email=$1 and password=$2", [email, password])
        console.log(response.rows);
        if(response.rows.length > 0){
            res.status(200).send("Login successful");
        }else{
            res.status(401).send("Invalid email or password");
        }
    }catch(error){
        console.log("Error communicating with the database", error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });