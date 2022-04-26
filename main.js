const SHA256 = require("crypto-js/SHA256");
const http = require('http');
const fs = require('fs');
const port = 3000; 

const server = http.createServer(function(req,res){
    res.writeHead(200, { 'Content-type': 'text/html'})
    fs.readFile('index.html', function(error, data){
        if(error) {
            res.writeHead(404);
            res.writeHead("Error: File Not Found")
        }
        else{
            res.write(data)
        }
        res.end();
    })
    // res.write("Hello Node");
    
})

server.listen(port, function(error){
    if(error) {
        console.log('Something went wrong')
    }
    else {
        console.log(`Server listening at port ${port}`)
    }
} )
class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash()
    }

    calculateHash(){;
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    mineBlock(difficulty)
    {
        while(this.hash.substring(0, difficulty) !== Array(difficulty +1).join("0")){
            this.nonce++
            this.hash = this.calculateHash();
        }
        console.log(`Block mined: ${this.hash}`)
    }
}

class Blockchain {
    constructor(){
        this.chain = [this.creatGenesisBlock()];
        this.difficulty = 5;
    }
    creatGenesisBlock(){
        return (new Block(0,"01/01/2022","Genesis Block", "0"));

    }
    getLatestBlock(){
        return(this.chain[this.chain.length-1]);
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty)   
        this.chain.push(newBlock)
    }

    isChainValid(){
        for(let i = 1; i<this.chain.length;i++)
        {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return (currentBlock.hash);
            }
            if (currentBlock.previousHash !== previousBlock.hash){
                return (`${currentBlock.previousHash} + ${previousBlock.hash} previous hash `);
        }
        return true;
    }}
}


let domicoin = new Blockchain();
console.log("Mining Block 1....");
domicoin.addBlock(new Block(1, "25/04/2022",{amount: 500.00, sender: "Adeobi Chukwuneke", receiver: "Chimalobi"}))
console.log("Mining Block 2....");
domicoin.addBlock(new Block(1, "25/04/2022",{amount: 500.00, sender: "Mark Nsukabagu", receiver: "Albert Eins"}))

// console.log(JSON.stringify(domicoin, null, 4)); 
// console.log(domicoin.isChainValid()); 
// console.log(domicoin.chain.length)
