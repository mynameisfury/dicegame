"use strict";

function runGame(){
		let fists = {
	 	'weapon': "fists",
	 	"damage": 8,
	 	"accuracy": 70
	 };
		let knife = {
	 	'weapon': "knife",
	 	"damage": 15,
	 	"accuracy": 75
	 };
	 	let bat = {
	 	'weapon': "bat",
	 	"damage": 10,
	 	"accuracy": 65
	 };
	 	let sword = {
	 	'weapon': "sword",
	 	"damage": 20,
	 	"accuracy": 70
	 };
	 	let pistol = {
	 	'weapon': "pistol",
	 	"damage": 30,
	 	"accuracy": 50
	 };
	 	let rifle = {
	 	'weapon': "rifle",
	 	"damage": 40,
	 	"accuracy": 40
	 };
	 	let shotgun = {
	 	'weapon': "shotgun",
	 	"damage": 60,
	 	"accuracy": 35
	 };
	 	let assaultRifle = {
	 	'weapon': "assaultRifle",
	 	"damage": 55,
	 	"accuracy": 45
	 };
	 	let rocket = {
	 	'weapon': "rocket",
	 	"damage": 80,
	 	"accuracy": 20
	 };
	 	let laser = {
	 	'weapon': "laser",
	 	"damage": 100,
	 	"accuracy": 100
	 };


	 let weaponChoice = weaponSelector(fists, knife, bat, sword, pistol, rifle, shotgun, assaultRifle, rocket, laser);
	 let weaponRollDialogue = "Roll for a weapon"
	let player = {
		"name": prompt("Enter Your Name",""),
		"weapon": alert(weaponChoice['weapon']),
		"health": 100
	};
	let enemy = {
		"distance": enemyDistance(),
		"health" : 1000

	}





	
	let hitNumber = amountOfHits();
	
	let critNumber = critDetection();

	let distance = enemyDistance();

	let hitOrMiss = hitDetection(weaponChoice);
	
	let enemyData = enemy;

	let playerData = player;
	
	let totalDamage = calculateDamage(weaponChoice, hitNumber, critNumber, distance) * hitOrMiss;

	let enemyDamageTotal = enemyDamage(distance);


	
	hitDetection(weaponChoice);
	
	// console.log("weapon:", weaponChoice)
	
	// console.log(enemyData)

	// console.log(playerData)
	
	// console.log(totalDamage)

	// console.log(hitOrMiss)

	// console.log(enemyDamageTotal)


	runTurns(enemy, player, totalDamage, playerData, enemyData, enemyDamageTotal);
}


///functions//////functions//////functions//////functions//////functions//////functions//////functions//////functions//////functions//////functions//////functions//////functions///


function calculateDamage(weaponChoice, hitNumber, critNumber, distance){
	let totalDamage = weaponChoice['damage'] * hitNumber * critNumber / distance;
	// alert(totalDamage);
	return totalDamage;
}

function enemyDistance(){
	let distance = rollDie(10);
	return distance;
}

function enemyResistance(){
	let resistance = enemyDistance();
}



function weaponSelector(fists, knife, bat, sword, pistol, rifle, shotgun, assaultRifle, rocket, laser){
	// let selection = prompt("select your weapon");
	// for(var i =0; i< weaponArray.length; i++){
	// 	if(weaponArray[i]['weapon'] === selection){
	// 		alert("you selected fists");
	// 	}
	// }	
	let weaponArray = [fists, knife, bat, sword, pistol, rifle, shotgun, assaultRifle, rocket, laser];
	let weaponChoice = weaponArray[rollDie(10)];
	// console.log(weaponChoice);
	return weaponChoice;
	
}

function rollDie(die) {
	let rngCalculation = Math.floor (Math.random() * die);
	return rngCalculation;
}

function rollDieBetween1(die) {
	let rngCalculation = Math.floor (Math.random() * die) + 1;
	return rngCalculation;
}

function critDetection(){
	let critNumber = rollDieBetween1(5);
	return critNumber;
}

function amountOfHits(){
	let hitNumber = rollDie(15);
	return hitNumber;
}

function hitDetection(weaponChoice){
	let miss = 0;
	let hit = 1;
	let accuracy = weaponChoice['accuracy'];
	let accuracyNumber = rollDie(105);
	if (accuracyNumber > accuracy){
		return miss;
	}
	else {
		return hit;
	}
}


function enemyDamage(distance){
	let damage = rollDie(100) / distance;
	return damage;

}

function playerTurn(enemy, totalDamage, enemyDamageTotal){
	let playerChoice = prompt("Move in, retreat, or attack", "");
	
		if (playerChoice === "move in"){
			enemy['distance'] -= 1;
		}
		else if (playerChoice === "retreat"){
			enemy['distance'] += 1;
		}
		else if (playerChoice === "attack"){
			enemy['health'] -= totalDamage;
			// console.log(enemyData)
			if (totalDamage === 0){
				prompt("You missed, probably");
			}
		}
		else{
			alert("type a valid command");
			playerTurn(enemy, totalDamage);
		}

		return playerChoice;
	}
	
function enemyTurn(enemy, player, enemyDamageTotal){

		
		let enemyChoice = rollDieBetween1(3);
		if (enemyChoice === 1){
			enemy['distance'] -= 1;
			alert("Enemy is moving in");
		}
		else if (enemyChoice === 2){
			enemy['distance'] += 1;
			alert("Enemy is retreating")
		}
		else if (enemyChoice === 3){
			player['health'] -= enemyDamageTotal;
			alert("Enemy is attacking");
			//console.log(playerData)
		}
		return enemyChoice;
}

function runTurns(enemy, player, totalDamage, playerData, enemyData, enemyDamageTotal){
		// player attack phase
		playerTurn(enemy, totalDamage);
		console.log("your health:", playerData['health']);
		console.log("enemy data:",enemyData);
		// enemy attack phase 
		enemyTurn(enemy, player, enemyDamageTotal);
		console.log("your health:", playerData['health']);
		console.log("enemy data:",enemyData);

		if (playerData['health'] <= 0){
			alert("Game Over, you lose");
		}
		else if (enemyData['health'] <= 0){
			alert("Game Over, you win");
		}

		else runTurns(enemy, player, totalDamage, playerData, enemyData, enemyDamageTotal);
	}