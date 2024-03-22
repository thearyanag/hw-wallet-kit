const {PublicKey, Keypair} = require('@solana/web3.js');
const bs58 = require('bs58');

// Example hex strings for private and public keys
let privateKeyHex = '5FAD680B14B3F68410F57088F048B3208D9E57B103C8B6B587FC863243722342';
let publicKeyHex = '2823B5420A4299C4C7A8C801448E589F8C7F653C2517D1A2C89943E84B98C16D';

function hexToUint8Array(hex) {
    return new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
}

let privateKeyBytes = hexToUint8Array(privateKeyHex);
let publicKeyBytes = hexToUint8Array(publicKeyHex);
let keypair = Keypair.fromSeed(privateKeyBytes); // Make sure your private key is compatible as a seed
let publicKey = new PublicKey(publicKeyBytes);

console.log(publicKey.equals(keypair.publicKey)); // Should log true if they match
