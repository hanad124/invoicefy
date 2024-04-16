import express from "express";

import {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  updateInvoiceStatus,
  deleteInvoice,
  deleteItem,
} from "../controllers/invoice.controller";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.post("/invoices", getAllInvoices);
  router.post("/invoices/:id", isAuthenticated, isOwner, getInvoiceById);
  router.post("/createInvoice", createInvoice);
  router.put(
    "/invoices/updateInvoiceStatus",
    isAuthenticated,
    isOwner,
    updateInvoiceStatus
  );
  router.put("/invoices/:id", isAuthenticated, isOwner, updateInvoice);
  router.delete(
    "/invoices/deleteInvoice",
    isAuthenticated,
    isOwner,
    deleteInvoice
  );
  router.delete("/invoices/deleteItem", isAuthenticated, deleteItem);

  return router;
};
