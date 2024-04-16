import express from "express";
import authenticatioRoute from "./authenticatio.route";
import userRoute from "./users.route";
import invoiceRoute from "./invoice.route";
const router = express.Router();

export default (): express.Router => {
  authenticatioRoute(router);
  userRoute(router);
  invoiceRoute(router);
  return router;
};
