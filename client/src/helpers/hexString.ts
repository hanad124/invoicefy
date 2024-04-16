export const generate12ByteHex = (): string => {
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  const hexString = Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hexString;
};

const hexString = generate12ByteHex();
console.log(hexString);
