import React, { useEffect, useState } from "react";
import { ethers,utils } from 'ethers';
import abi from "./utils/Lottery.json";
import './App.css';
function App() {

  const contractAddress = '0x7EEfa9A072CFe672D219929BbB4f213cdDc9aa2E';
  const contractABI = abi.abi;
  const connectWallet = async()=>{
if(window.ethereum == undefined){
  console.log("Install metamask");
}
else{
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  console.log(accounts[0]);
     document.getElementById('address').innerText = accounts[0];

}

  }

  const entry=async()=>{
    try{
      if(window.ethereum){ 
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const signer = provider.getSigner();
   const lottery_Contract = new ethers.Contract(
     contractAddress,
     contractABI,
     signer
   );
   let enter = await lottery_Contract.enter({ value: utils.parseEther("0.1") });

   }
    }
    catch (error) {
      console.log(error);
    }
  }


  const pickwinner=async()=>{
    try{
      if(window.ethereum){ 
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   const signer = provider.getSigner();
   const lottery_Contract = new ethers.Contract(
     contractAddress,
     contractABI,
     signer
   );
   let winner = await lottery_Contract.pickWinner();
   console.log(winner);
   let showWinner = await lottery_Contract.getWinners();
   document.getElementById('pick').innerText = showWinner

   }
    }
    catch (error) {
      console.log(error);
    }
  }


  return (
  <div >  
    <button className = "button-cwallet" onClick={connectWallet}>Connect Wallet</button>
    <div className="App">
      <h3 id="address"></h3>
      <button className = "button-entry" onClick={entry}>Entry</button>
      <button className = "button-pick" onClick={pickwinner}>Pick Winner</button>
      <h3 id="pick"></h3>
    </div>
  </div>
  );
}

export default App;
