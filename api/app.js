import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
const PORT = 3000;

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());  


app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
