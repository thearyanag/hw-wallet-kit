const {
  Aptos,
  Account,
  Ed25519PrivateKey,
  Ed25519PublicKey,
  Ed25519Signature,
  AccountAuthenticatorEd25519,
  generateSigningMessage,
  AccountAuthenticatorMultiEd25519,
} = require("@aptos-labs/ts-sdk");

const aptos = new Aptos();

// Example hex strings for private and public keys - do not use these in production
const privateKeyHex =
  "50C8A36870D656A33891C12D9A214BCFA2253EE5BACEF2A5D6E9305713AB7031";
let publicKeyHex =
  "EBB1F36F6C40DC268652B90751C68BD2360DD49D31D0ACE2C14940CF21CA1931";

const privateKey = new Ed25519PrivateKey(privateKeyHex);
const publicKey = new Ed25519PublicKey(publicKeyHex);

let acc = Account.fromPrivateKey({
  privateKey,
});
let reciever = Account.generate();

const sendTx = async () => {
  let txObj = await aptos.transferCoinTransaction({
    sender: acc.publicKey.toString(),
    recipient: reciever.publicKey.toString(),
    amount: 1,
  });
  let tx = await aptos.signAndSubmitTransaction({
    signer: acc,
    transaction: txObj,
  });
  console.log(tx);
};

sendTx();
