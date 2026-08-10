import express from "express";
import cors from "cors";
import connectDB from "./src/db/db.js";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// database connection
connectDB();

app.get("/", (req, res) => {
    res.send("EasyServe Backend API is running");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
