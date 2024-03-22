const {
  Aptos,
  Account,
  Ed25519PrivateKey,
  Ed25519PublicKey,
} = require("@aptos-labs/ts-sdk");

const hexString =
  "5FAD680B14B3F68410F57088F048B3208D9E57B103C8B6B587FC863243722342"; // Your hex string

let publicKeyHex =
  "2823B5420A4299C4C7A8C801448E589F8C7F653C2517D1A2C89943E84B98C16D";

const privateKey = new Ed25519PrivateKey(hexString);
const publicKey = new Ed25519PublicKey(publicKeyHex);

let acc = Account.fromPrivateKey({
  privateKey,
});

console.log(acc.publicKey.toString() == publicKey.toString());
