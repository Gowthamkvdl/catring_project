import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"
import chatRoute from "./routes/chat.route.js"
import messageRoute from "./routes/message.route.js"
const PORT = 3000;

const app = express();   
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());  


app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/user/", userRoute);
app.use("/api/post/", postRoute);
app.use("/api/chat/", chatRoute);
app.use("/api/message/", messageRoute);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
