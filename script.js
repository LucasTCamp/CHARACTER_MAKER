let currentAspect = 0;

const aspectTypes = [
    ["Knight", "Ninja", "Wizard", "Monk"], // Classes
    ["LOW", "MEDIUM", "HIGH", "EPIC", "DIVINE", "UNIVERSAL"], // Strength
    ["LOW", "MEDIUM", "HIGH", "EPIC", "DIVINE", "UNIVERSAL"], // Speed
    ["LOW", "MEDIUM", "HIGH", "EPIC", "DIVINE", "UNIVERSAL"], // Intelligence
    ["Super Strength", "Invisibility", "Teleportation", "Healing"], // Abilities
    ["Basic Sword", "Speed Potion", "Long Sword", "Jordans", "Thinking Hat", "JS textbook"] // Items
];

class Person {
    constructor() {
        this.class = ''
        this.strength = ''
        this.speed = ''
        this.intelligence = ''
        this.ability = ''
        this.item = ''
    }
}

//BOSS 1
const chikawa = new Person();
chikawa.class = "Ninja"; 
chikawa.strength = "LOW";
chikawa.speed = "MEDIUM";
chikawa.intelligence = "LOW";
chikawa.ability = "Teleportation";
chikawa.item = "Basic Sword";

//BOSS 2
const shaggy = new Person();
chikawa.class = "Monk"; 
chikawa.strength = "LOW";
chikawa.speed = "MEDIUM";
chikawa.intelligence = "LOW";
chikawa.ability = "Teleportation";
chikawa.item = "Basic Sword";

//BOSS 3
const christopher = new Person();
chikawa.class = "Wizard"; 
chikawa.strength = "MEDIUM";
chikawa.speed = "MEDIUM";
chikawa.intelligence = "MEDIUM";
chikawa.ability = "Teleportation";
chikawa.item = "Basic Sword";

const aspectLabels = ["CLASS", "STRENGTH", "SPEED", "INTELLIGENCE", "ABILITY", "ITEM"];
let hero = new Person();
let villain = new Person();

let selectedAspects = [];

function cycleAspect() {
    let cycleCount = 0;
    const displayElement = document.getElementById('aspect-name');

    const interval = setInterval(() => {
        const aspectsArray = aspectTypes[currentAspect];
        if(!aspectsArray) {
            clearInterval(interval);
            return;
        }

        const randomAspect = aspectsArray[Math.floor(Math.random() * aspectsArray.length)];

        displayElement.textContent = `${aspectLabels[currentAspect]}: ${randomAspect}`;
        cycleCount++;

        if (cycleCount >= 20) {
            clearInterval(interval);
            selectedAspects.push(randomAspect);
            currentAspect++;

            if (currentAspect >= aspectTypes.length) {
                hero.class = selectedAspects[0];
                hero.strength = selectedAspects[1];
                hero.speed = selectedAspects[2];
                hero.intelligence = selectedAspects[3];
                hero.ability = selectedAspects[4];
                hero.item = selectedAspects[5];

                displayElement.innerHTML = `
                <strong>CHARACTER ASPECTS:</strong><br>
                CLASS: ${selectedAspects[0]}<br>
                STRENGTH: ${selectedAspects[1]}<br>
                SPEED: ${selectedAspects[2]}<br>
                INTELLIGENCE: ${selectedAspects[3]}<br>
                ABILITY: ${selectedAspects[4]}<br>
                ITEM: ${selectedAspects[5]}`;

                document.querySelector('.moon-button').disabled = true;

                const classImage = document.getElementById('class-image');
                classImage.src = `${selectedAspects[0].toLowerCase()}-image.png`;
                classImage.style.display = "block";

                document.querySelector('.nextPage1').style.display = 'inline-block';
            }
        }
    }, 100);
}




//reutrns true if hero wins
//returns false if villain wins
function bossFight(hero, villain) {
    let heroValue = calcualteFightValue(hero);
    let villainValue = calcualteFightValue(villain);

    return heroValue > villainValue;
}
//Just make 2 more of these for the next boss fights
function startBossFight() { 
    const resultDisplay = document.getElementById('battle-result');

    const heroObjString = localStorage.getItem('hero');
    const villainObjString = localStorage.getItem('villain');

    hero = JSON.parse(heroObjString);
    villain = JSON.parse(villainObjString);

    const didWin = bossFight(hero, villain);

    if (didWin) {
        resultDisplay.innerHTML = "<strong>You beat Chikawa.</strong>";
        document.querySelector('.nextPage2').style.display = 'inline-block';
    } else {
        resultDisplay.innerHTML = "<strong>You were defeated by Chikawa. HAHA! LOSER!</strong>";
    }

}






function calcualteFightValue(person) {
    let fightSum = 0;

    let strength = 1;
    let speed = 1;
    let intelligence = 1;

    strength += findAspectValue(aspectTypes[1], person.strength);
    speed += findAspectValue(aspectTypes[2], person.speed);
    intelligence += findAspectValue(aspectTypes[3], person.intelligence);

    switch (person.ability) {
        case "Super Strength":
            strength += strength * 1.5;
            break;

        case "Invisibility":
        case "Teleportation":
            speed += speed * 1.5;
            intelligence += intelligence * 1.2;
            break;

        case "Invisibility":
            intelligence += intelligence * 1.5;
            break;
    }

    switch (person.item) {
        case "Basic Sword":
            strength += strength * 1.5;
            break;

        case "Speed Potion":
            speed += speed * 2;
            break;

        case "Long Sword":
            strength += strength * 2;
            break;

        case "Jordans":
            speed += speed * 3;
            break;

        case "Thinking Hat":
            intelligence += intelligence * 3;
            break;

        case "JS textbook":
            intelligence += intelligence * 4;
            break;
    }

    switch(person.class) {
        case "Knight":
            strength += strength * 2;
            break;

        case "Ninja":
            speed += speed * 2;
            break;

        case "Wizard":
            intelligence += intelligence * 2;
            break;

        case "Monk":
            strength += strength * 1.5;
            intelligence += intelligence * 1.5;
            break;
    }

    return strength + speed + intelligence;
}

function findAspectValue(aspects, value) {
    const index = aspects.indexOf(value); // index will be 1

    if (index >= 0) {
        return index;
    } else {
        return 0;
    }
}

function nextPage1() {
    localStorage.setItem('hero', JSON.stringify(hero));
    localStorage.setItem('villain', JSON.stringify(chikawa));

    window.location.href = 'boss1.html';
}

function nextPage2() {
    localStorage.setItem('hero', JSON.stringify(hero));
    localStorage.setItem('villain', JSON.stringify(shaggy));

    window.location.href = 'boss2.html';
}

function startGame() {
    window.location.href = 'character.html';
}

function restartGame() {
    window.location.href = 'index.html'
}