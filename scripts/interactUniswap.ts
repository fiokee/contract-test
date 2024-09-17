const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  const routerAddress = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"; 
  const tokenAAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; 
  const tokenBAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; 

  const routerAbi = [
    'function swapTokensForExactTokens(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
    'function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB, uint liquidity)'
  ];

  
  const routerContract = new ethers.Contract(routerAddress, routerAbi, deployer);

  const amountOut = ethers.utils.parseUnits('100', 18); 
  const amountInMax = ethers.utils.parseUnits('10', 18); 
  const path = [tokenAAddress, tokenBAddress];
  const to = deployer.address;
  const deadline = Math.floor(Date.now() / 1000) + (60 * 20); 

  console.log("Swapping tokens...");
  const swapTx = await routerContract.swapTokensForExactTokens(amountOut, amountInMax, path, to, deadline);
  console.log(`Swap Transaction Hash: ${swapTx.hash}`);
  await swapTx.wait();
  console.log('Token Swap Complete!');

  
  const amountADesired = ethers.utils.parseUnits('5', 18); 
  const amountBDesired = ethers.utils.parseUnits('5', 18); 
  const amountAMin = ethers.utils.parseUnits('4.5', 18); 
  const amountBMin = ethers.utils.parseUnits('4.5', 18); 

  console.log("Adding liquidity...");
  const liquidityTx = await routerContract.addLiquidity(
    tokenAAddress, 
    tokenBAddress, 
    amountADesired, 
    amountBDesired, 
    amountAMin, 
    amountBMin, 
    to, 
    deadline
  );
  console.log(`Liquidity Transaction Hash: ${liquidityTx.hash}`);
  await liquidityTx.wait();
  console.log('Liquidity Added!');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
