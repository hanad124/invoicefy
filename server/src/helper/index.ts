import crypto from "crypto";

const SECRET = "Hanad-secret";

export const random = () => crypto.randomBytes(128).toString("base64");

export const authentication = (
  salt: string | null | undefined,
  password: string
) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};
