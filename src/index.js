import loadEnvironment from "./utils/loadEnvironment.js";

loadEnvironment();

import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import express from "express";
import connectMongo from "./utils/connectMongo.js";
import MongoDBStore from "connect-mongodb-session";
import session from "express-session";
import { componentLoader } from "./components/components.js";
import globalErrorsMW from "./middlewares/globalErrorsMW.js";
import morgan from "morgan";
import apiRoutes from "./routes/index.js";
import categoryResource from "./resources/categoryResource.js";
import productResource from "./resources/productResource.js";
import userResource from "./resources/userResource.js";
import orderResource from "./resources/orderResource.js";

await connectMongo();
const authenticate = async (email, password) => {
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    return Promise.resolve({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    });
  }

  return null;
};

const ConnectSession = MongoDBStore(session);
const sessionStore = new ConnectSession({
  uri: process.env.DB_URI,
  collection: "session",
});

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const app = express();

app.set("trust proxy", 1);

app.use("/images", express.static("public/images"));

const admin = new AdminJS({
  branding: {
    companyName: "Mega Store - Dashboard",
    withMadeWithLove: false,
    logo: false,
    favicon: false,
  },
  resources: [userResource, orderResource, categoryResource, productResource],
  componentLoader,
});

admin.watch();

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate,
    cookieName: "adminjs",
    cookiePassword: process.env.SESSION_SECRET,
  },
  null,
  {
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      httpOnly: false,
      secure: false,
    },
    name: "adminjs",
  }
);

app.use(admin.options.rootPath, adminRouter);

app.use(express.json({ limit: process.env.DEFAULT_JSON_LIMIT }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(apiRoutes);
app.use(globalErrorsMW);

app.listen(process.env.PORT, () => {
  console.log(`App started on http://localhost:${process.env.PORT}`);
});

process.on("uncaughtException", (err) => {
  console.log("caught error:\n", err);
});
