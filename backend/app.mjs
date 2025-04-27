import express from "express"
import cors from "cors";
const PORT = 5000 || process.env.PORT;
import userRoutes from "./routes/userRoutes.js";
import connectToDb from "./db/db.js";

const app = express()

app.use(
  cors({
    origin:[
      'http://localhost:5173',
      'http://localhost:5174',
    //   'https://mern-app-production.up.railway.app/',
      ''
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());

connectToDb();


app.use('/api/auth',userRoutes);


app.listen(PORT, () => {
  console.log(`Example app listening on port 5000`)
})