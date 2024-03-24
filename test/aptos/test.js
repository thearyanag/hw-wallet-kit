const {
  Aptos,
  Account,
  Ed25519PrivateKey,
  Ed25519PublicKey,
  Ed25519Signature,
  AccountAuthenticatorEd25519,
  AccountAuthenticator,
  AccountAuthenticatorSingleKey,
  generateSigningMessage,
  AccountAuthenticatorMultiEd25519,
  generateSignedTransaction,
} = require("@aptos-labs/ts-sdk");
const readline = require("readline");

// Create readline interface for input from console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const aptos = new Aptos();

// Example hex strings for private and public keys - do not use these in production
const privateKeyHex =
  "50C8A36870D656A33891C12D9A214BCFA2253EE5BACEF2A5D6E9305713AB7031";
let publicKeyHex =
  "EBB1F36F6C40DC268652B90751C68BD2360DD49D31D0ACE2C14940CF21CA1931";

const privateKey = new Ed25519PrivateKey(privateKeyHex);
const publicKey = new Ed25519PublicKey(publicKeyHex);

function chunkString(str, length = 64) {
  let result = [];
  for (let i = 0; i < str.length; i += length) {
    result.push(str.substring(i, i + length));
  }
  return result;
}

let acc = Account.fromPrivateKey({
  privateKey,
});

console.log(acc.publicKey.toString() == publicKey.toString());

const transaction = aptos.transaction.build.simple({
  sender: acc.publicKey.toString(),
  data: {
    function: "0x1::coin::transfer",
    typeArguments: ["0x1::aptos_coin::AptosCoin"],
    functionArguments: [
      "0x3eee857d66e0b29ae5c2130b57b8a1868bc4fb61b2f0ae9f82ba0fb1640633b9",
      1,
    ],
  },
});

transaction.then((tx) => {
  const signingMessage = Buffer.from(generateSigningMessage(tx)).toString(
    "hex"
  );

  console.log(signingMessage);
  console.log(chunkString(signingMessage));

  // Prompt the user to enter the signatureHex
  rl.question("Enter signatureHex: ", (signatureHex) => {
    signatureHex = signatureHex.toLowerCase();
    let sig = new Ed25519Signature(signatureHex);
    let senderAuthenticator = new AccountAuthenticatorEd25519(
      publicKey,
      sig
    );

    console.log(signatureHex.length);

    const senderAuth = aptos.transaction.submit
      .simple({
        transaction: tx,
        senderAuthenticator: senderAuthenticator,
      })
      .then((res) => {
        console.log(res);
      });

    // Close the readline interface after getting the input
    rl.close();
  });
});
