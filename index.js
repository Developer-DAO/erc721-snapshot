const CONTRACT_ACCOUNT = "0x25ed58c027921E14D86380eA2646E3a1B5C55A8b";
const CONTRACT_START = 13153967;
const INFURA_KEY = "263a394bc14c4107949a73b0fb485ebb";
const fs = require('fs')

const Web3 = require('web3'); // Use web3@1.0.0-beta.36+ https://github.com/ethereum/web3.js/issues/1916
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/' + INFURA_KEY));
const erc721 = require("@0xcert/ethereum-erc721/build/erc721.json").ERC721;
const contract = new web3.eth.Contract(erc721.abi, CONTRACT_ACCOUNT);
var idToOwner = {};

contract.getPastEvents('Transfer', {fromBlock: CONTRACT_START, toBlock: CONTRACT_START+60000}).then(events => {
  events.forEach(event => {
    idToOwner[event.returnValues._tokenId] = event.returnValues._to
  });
  console.log(idToOwner);
  fs.writeFileSync('./snapshot.json', JSON.stringify(idToOwner))
});