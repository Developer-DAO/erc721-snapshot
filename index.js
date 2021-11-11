const CONTRACT_ACCOUNT = "0x25ed58c027921E14D86380eA2646E3a1B5C55A8b";
const CONTRACT_START = 13153967;
const INFURA_KEY = "263a394bc14c4107949a73b0fb485ebb";
const fs = require('fs')

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/' + INFURA_KEY))
const erc721 = require("@0xcert/ethereum-erc721/build/erc721.json").ERC721
const contract = new web3.eth.Contract(erc721.abi, CONTRACT_ACCOUNT)
// var idToOwner = {}
let addresses = []

contract.getPastEvents('Transfer', {fromBlock: CONTRACT_START, toBlock: CONTRACT_START+60000}).then(events => {
  events.forEach(event => {
    // idToOwner[event.returnValues._tokenId] = event.returnValues._to
    addresses.push(event.returnValues._to)
  });
  console.log(addresses);
  addresses = [...new Set(addresses)]
  fs.writeFileSync('./snapshot.json', JSON.stringify(addresses))
});