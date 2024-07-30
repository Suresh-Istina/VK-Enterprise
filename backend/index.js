import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/Database.js";
import AdminRoute from "./routes/AdminRoute.js";
import CustomerRoute from "./routes/CustomerRoute.js";
import EmployeeRoute from "./routes/EmployeeRoute.js";
import AdminAuthRoute from "./routes/AdminAuthRoute.js";
import EmployeeAuthRoute from "./routes/EmployeeAuthRoute.js";
import CustomerAuthRoute from "./routes/CustomerAuthRoute.js";
import SlotRoute from "./routes/SlotRoute.js";
import RoleRoute from "./routes/RoleRoute.js";
import RateRoute from "./routes/RateRoute.js";
import PaymentRoute from "./routes/PaymentRoute.js";
import BookingRoute from "./routes/BookingRoute.js";
import PasswordResetRoute from "./routes/PasswordResetRoute.js";
dotenv.config();

// (async () => {
//   await db.sync();
// })();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use(AdminRoute);
app.use(CustomerRoute);
app.use(EmployeeRoute);
app.use(AdminAuthRoute);
app.use(EmployeeAuthRoute);
app.use(CustomerAuthRoute);
app.use(SlotRoute);
app.use(RoleRoute);
app.use(RateRoute);
app.use(PaymentRoute);
app.use(BookingRoute);
app.use(PasswordResetRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Backend server up and running");
});
