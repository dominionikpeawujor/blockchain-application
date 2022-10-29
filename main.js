const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const Blockchain = require('./blockchain');
// import { Blockchain } from './blockchain.js';

app.get('/',(req,res) => {
    let domicoin = new Blockchain();
    console.log("Mining Block 1....");
    domicoin.addBlock(new Block(1, "25/04/2022",{amount: 500.00, sender: "Adeobi Chukwuneke", receiver: "Chimalobi"}))
    console.log("Mining Block 2....");
    domicoin.addBlock(new Block(1, "25/04/2022",{amount: 500.00, sender: "Mark Nsukabagu", receiver: "Albert Eins"}))
    let result = domicoin.getLatestBlock();
    res.render('index.html',results)
})

app.listen(port,()=> {
    console.log(`App listening at port ${port}`)
})

