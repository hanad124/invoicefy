import mongoose from "mongoose";
import { InvoiceModel } from "./invoice.model";
import { ItemModel } from "./items.model";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  authentication: {
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
    sessionToken: {
      type: String,
      select: false,
    },
  },
  profilePicture: {
    type: String,
    default:
      "https://qph.cf2.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd",
  },
});

// remove all invoices related to the user if that user is deleted
// UserSchema.pre("remove", async function (next: any) {
//   await InvoiceModel.deleteMany({ user: this._id });
//   next();
// });

export const UserModel = mongoose.model("users", UserSchema);
