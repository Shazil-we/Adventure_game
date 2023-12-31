import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimatioin from "chalk-animation";
function RandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
let normal_mobs = ["Skeleton", "Zombie", "Goblin", "Vampire", "Warrior", "Assasin"];
let boss_mobs = ["Dragon", "Executioner", "Wither"];
let user_health = 100;
let normal_mobs_health;
let boss_mobs_health;
let user_attack;
let normal_mobs_attack;
let health_potion;
let health_potion_count = 5;
let boss_mobs_attack = RandomNumber(25, 55);
let i = 0;
let mobs_killed = [];
function healthdrop(mob) {
    let health_potion_droprate = RandomNumber(1, 25);
    if (health_potion_droprate == 5) {
        console.log(`The ${mob} dropped a health potion!\n You now have ${health_potion_count + 1} potions`);
        return health_potion_count += 1;
    }
    else {
        return 'garbage';
    }
}
async function continueornot() {
    let yesorno = await inquirer.prompt({
        type: "list",
        name: "option",
        message: "would you like to continue in the dungeon?",
        choices: ["yes", "no"]
    });
    if (yesorno.option == "no") {
        console.log(chalk.cyanBright(`exiting the dungeon............ with ${mobs_killed.length} mob(s) killed`));
        process.exit();
    }
    else {
    }
}
const intro = chalkAnimatioin.rainbow("\t   Welcome to the dungeon", 0.3);
setTimeout(() => {
    intro.start();
}, 100);
setTimeout(() => {
    intro.stop();
}, 5000);
async function wholegame() {
    while (user_health > 0) {
        console.log(chalk.bgGray("##########################################"));
        let mob_spawn_chance = RandomNumber(1, 100); // percentage
        if (mob_spawn_chance < 86) {
            let normal_mobs_spawn = normal_mobs[RandomNumber(0, 5)];
            normal_mobs_health = RandomNumber(15, 55);
            i = 0;
            console.log(chalk.yellowBright(`\n \n \t A ${normal_mobs_spawn} has appeared!`));
            while (i == 0 && user_health > 0) {
                console.log(chalk.greenBright(`\n\t Your HP: ${user_health}`));
                console.log(chalk.yellowBright(`\t ${normal_mobs_spawn}'s HP: ${normal_mobs_health} \n`));
                let choice = await inquirer.prompt({
                    type: "list",
                    name: "game",
                    message: "What would you like to do?",
                    choices: ["1. Attack", "2. Drink Health Potion", "3. Run!"]
                });
                if (choice.game == "1. Attack") {
                    user_attack = RandomNumber(10, 20);
                    normal_mobs_health -= user_attack;
                    normal_mobs_attack = RandomNumber(5, 25);
                    user_health -= normal_mobs_attack;
                    console.log(`\n \t Your strike the ${normal_mobs_spawn} for ${chalk.yellowBright(user_attack)}!`);
                    console.log(`\n \t You recieve ${chalk.greenBright(normal_mobs_attack)} in retaliation!`);
                    if (user_health <= 0) {
                        break;
                    }
                    if (normal_mobs_health <= 0) {
                        console.log(`You have defeated the ${normal_mobs_spawn}`);
                        mobs_killed.push(normal_mobs_spawn);
                        healthdrop(normal_mobs_spawn);
                        i++;
                        await continueornot();
                    }
                    else { }
                }
                else if (choice.game == "2. Drink Health Potion") {
                    if (health_potion_count > 0) {
                        health_potion = RandomNumber(35, 75);
                        user_health += health_potion;
                        health_potion_count -= 1;
                        console.log(`\n \t You drink a health potion healing yourself for ${health_potion}`);
                        console.log(`\t You now have ${user_health}`);
                        console.log(`\t You have ${health_potion_count} potions left`);
                    }
                    else {
                        console.log("you have run out of health potions! Defeat some mobs to get more");
                    }
                }
                else if (choice.game == "3. Run!") {
                    console.log(`You ran away from the ${normal_mobs_spawn}`);
                    i++;
                    await continueornot();
                }
            }
        }
        else {
            let boss_mobs_spawn = boss_mobs[RandomNumber(0, 2)];
            boss_mobs_health = RandomNumber(65, 125);
            console.log(chalk.yellowBright(`\t A ${boss_mobs_spawn} has appeared!`));
            while (i == 0 && user_health > 0) {
                console.log(chalk.greenBright(`\n\t Your HP: ${user_health}`));
                console.log(chalk.yellowBright(`\t ${boss_mobs_spawn}'s HP: ${boss_mobs_health} \n`));
                let choice = await inquirer.prompt({
                    type: "list",
                    name: "game",
                    message: "What would you like to do?",
                    choices: ["1. Attack", "2. Drink Health Potion", "3.Run!"]
                });
                if (choice.game == "1. Attack") {
                    user_attack = RandomNumber(10, 20);
                    boss_mobs_health -= user_attack;
                    boss_mobs_attack = RandomNumber(25, 55);
                    user_health -= boss_mobs_attack;
                    console.log(`\n \t Your strike the ${boss_mobs_spawn} for ${chalk.yellowBright(user_attack)}!`);
                    console.log(`\n \t You recieve ${chalk.greenBright(boss_mobs_attack)} in retaliation!`);
                    if (user_health <= 0) {
                        break;
                    }
                    if (boss_mobs_health <= 0) {
                        console.log(`You have defeated the ${boss_mobs_spawn}`);
                        mobs_killed.push(boss_mobs_spawn);
                        healthdrop(boss_mobs_spawn);
                        i++;
                        await continueornot();
                    }
                    else { }
                }
                else if (choice.game == "2. Drink Health Potion") {
                    if (health_potion_count > 0) {
                        health_potion = RandomNumber(35, 75);
                        user_health += health_potion;
                        health_potion_count -= 1;
                        console.log(`\t You drink a health potion healing yourself for ${health_potion}`);
                        console.log(`\t You now have ${user_health}`);
                        console.log(`\t You have ${health_potion_count} potions left`);
                    }
                    else {
                        console.log("you have run out of health potions! Defeat some mobs to get more");
                    }
                }
                else if (choice.game == "3. Run!") {
                    console.log(`\t You ran away from the ${boss_mobs_spawn}`);
                    i++;
                    await continueornot();
                }
            }
        }
    }
    if (user_health <= 0) {
        console.log(chalk.greenBright(" \n \t You limp out of the dungeon wounded"));
        let outro = chalkAnimatioin.rainbow(`
    ##########################################
    \t \t Thanks For Playing
    ##########################################`, 0.35);
        setTimeout(() => {
            outro.start();
        }, 100);
        setTimeout(() => {
            outro.stop();
        }, 10000);
    }
}
setTimeout(() => {
    wholegame();
}, 5100);
