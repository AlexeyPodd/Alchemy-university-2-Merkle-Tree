const prompt = require("prompt-sync")({ sigint: true });
const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const name = prompt("Type your name please: ");

async function main() {
  const merkleTree = new MerkleTree(niceList);
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name,
    proof: JSON.stringify(proof),
  });

  console.log({ gift });
}

main();