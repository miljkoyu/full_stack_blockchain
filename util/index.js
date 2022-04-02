const EC = require('elliptic').ec;

//same elliptic curve for generating keys use bitcoin and ethereum
const ec = new EC('secp256k1');

module.exports = { ec };