const { ethers } = require("hardhat");

const getBalance = async (address)=>{
    let bigIntBalance = await ethers.provider.getBalance(address);
    return ethers.utils.formatEther(bigIntBalance)
}


const PrintBalance = async(message,deployer,tipper,buyMeACoffee) =>{
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("message: " + message);
    console.log("---------BALANCE OF DEPLOYER---------");
    console.log("Account balance:", await getBalance(deployer.address));
    console.log("");
    console.log("---------BALANCE OF SENDER---------");
    console.log("Account balance:", await getBalance(tipper.address));
    console.log("");
    console.log("---------BALANCE OF CONTRACT---------");
    console.log("Account balance:", await getBalance(buyMeACoffee.address));
    console.log("");
}

async function main() {
  const [deployer, tipper] = await ethers.getSigners();

  const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await PrintBalance("initial",deployer,tipper,buyMeACoffee)


  //buy coffee

const tip = {value:ethers.utils.parseEther("2")};
await buyMeACoffee.connect(tipper).buyCoffee("Ahmad","Amazing",tip);
await PrintBalance("after tipping",deployer,tipper,buyMeACoffee)

// withdraw funds
await buyMeACoffee.connect(deployer).withdrawTips();
await PrintBalance("after withdraw",deployer,tipper,buyMeACoffee)



const memos =await buyMeACoffee.connect(deployer).allMemos();
console.log(memos,"memos")

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
