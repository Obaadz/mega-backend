import { Router } from "express";
import { productRoute } from "./productRoute.js";
import { categoryRoute } from "./categoryRoute.js";
import { userRoute } from "./userRoute.js";
import { orderRoute } from "./orderRoute.js";
import { paymentMethodRoute } from "./paymentMethodRoute.js";
import hpp from "hpp";

const apiRoutes = Router();

apiRoutes.use(hpp());
apiRoutes.use("/api", productRoute, categoryRoute, userRoute, orderRoute, paymentMethodRoute);

export default apiRoutes;
