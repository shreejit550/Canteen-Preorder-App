import express from "express";
import cors from "cors";
import connectDB from "./src/db/db.js";
import foodRouter from "./src/routes/foodroute.js";
import { userRouter } from "./src/routes/userRoute.js";
import canteenRouter from "./src/routes/canteenRoute.js";
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// database connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/canteen", canteenRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
