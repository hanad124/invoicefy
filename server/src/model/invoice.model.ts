import mongoose from "mongoose";
import { ItemModel } from "./items.model";

// invoice type
export interface IInvoice {
  user: string;
  clientName: string;
  description: string;
  total: number;
  status: string;
  invoiceDate: Date;
}

const InvoiceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "paid", "cancelled"],
    },
    invoiceDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// remove all items related to the invoice if that invoice is deleted
// InvoiceSchema.pre("remove", async function (next: any) {
//   await ItemModel.deleteMany({ invoice: this._id });
//   next();
// });

export const InvoiceModel = mongoose.model<IInvoice>("invoices", InvoiceSchema);
