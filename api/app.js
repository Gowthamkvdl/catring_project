import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"
import chatRoute from "./routes/chat.route.js"
import messageRoute from "./routes/message.route.js"       
import mongoSanitize from "express-mongo-sanitize"   
import xss from "xss-clean"
const PORT = process.env.PORT || 3000;
       
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())
// Data sanitization against site script xss
app.use(xss())


app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/user/", userRoute);
app.use("/api/post/", postRoute);
app.use("/api/chat/", chatRoute);
app.use("/api/message/", messageRoute);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
