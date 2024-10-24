// Step 1 Set up Game and Get User input
const prompt = require('prompt-sync')();
const username = prompt("What is your username? ")

console.log(`Welcome, ${username}! Time to start cutting grass and upgrading your tools!`);

// Step 2 Define Tools and Wallet 
// toolBox is an obj that stores players's current tool and available tools 

const toolBox = {
    currentTool: 'teeth',
    tools: {
        teeth: {power: 1, price:0},
        scissors: {power: 5, price:5},
        lawnmower: {power: 10, price:20},
        trimmer: {power: 20, price:50},
    }
}

let wallet = 0; // player starts with $0
// LEVEL UP 2- Milestones & Achievements
const milestones = [
    {amount: 50, message: "Congrats!, You've earned $50 and unlocked the 'Grass Rockstar' Badge!"},
    {amount: 100, message: "Congrats!, You've earned $100 and unlocked the 'Grass Master' Badge!"},
    {amount: 200, message: "Congrats!, You've earned $200 and unlocked the 'Grass Legend' Badge!"},
]
const achievedMilestones = []; // To track achieved milestones


// Step 3: Display Available Tools for Purchase
//  loops through tools and prints (teeth is not displayed since it's free)
const displayTool = () =>{
console.log("\nAvavilable tools for purchase:");
for(const tool in toolBox.tools){
  if(  toolBox.tools[tool].price > 0){
    console.log(`${tool}: $${toolBox.tools[tool].price}`);
  }
    
}
console.log("\n");
};

// LEVEL UP 2- Step 2 
const checkMilestones = () =>{
milestones.forEach((milestone)=>{
    if(wallet >= milestone.amount && !achievedMilestones.includes(milestone.amount)){
        console.log(milestone.message);
        achievedMilestones.push(milestone.amount)  
    }
})
};

// Step 4: Cutting Grass to Earn Money
const cutGrass = () =>{
    // Earn money based on the current tool's power
    let earnings = toolBox.tools[toolBox.currentTool].power;
// LEVEL UP 1 ADD ON - Random Bonus Events
// 25% chance to trigger a bonus event 
if(Math.random() < 0.25){
 earnings *= 2; // Double the earnings
 console.log("Lucky day! You got a bonus and earned double the amount!");
}
   wallet += earnings;
   console.log(`You cut grass with your ${toolBox.currentTool}! You earned $${toolBox.tools[toolBox.currentTool].power}. Total in wallet: $${wallet}.`);
 checkMilestones();
};
// cutGrass();

// Step 5: Buying a New Tool
const buyTool = () =>{
    displayTool(); // show available tools
    // prompts users to pick a tool
    const toolsToBuy = prompt("Which tool would you like to buy? ")

    // check if tool exisit
    if(toolBox.tools[toolsToBuy]){
        const toolPrice = toolBox.tools[toolsToBuy].price;
        if(wallet >= toolPrice){   // Check if the player has enough money
            wallet -= toolPrice; // Deduct the price from the wallet
            toolBox.currentTool = toolsToBuy; // Set the current tool to the new one
            console.log(`You bought the ${toolsToBuy} for $${toolPrice}. Your new tool is ${toolsToBuy}`);
        }else{
            console.log(`You dont't have enough money to buy the ${toolsToBuy}`);        
        }
    }else{
        console.log("That tool is not available for purchase.");
    }
};

// Step 6: Adding a Game Loop

while(true){
console.log("\n What would you like to do?");
console.log("1. Cut grass");
console.log("2. Buy a new tool");
console.log("3. Check wallet");
console.log("4. Exit");

const choice = prompt("Enter your choice (1-4): ");

if(choice === '1'){
    cutGrass();
}else if(choice === '2'){
    buyTool();
}else if(choice === '3'){
    console.log(`You have $${wallet} in your wallet`);
    
}else if(choice === '4'){
    console.log("Thanks for playing! Goodbye.");
    break;
}else{
    console.log("Invalid choice. Please enter 1, 2, 3, or 4.");
}
}