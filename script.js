let currentAspect = 0;

const aspectTypes = [
    ["Knight", "Ninja", "Wizard", "Monk"], // Classes
    ["LOW", "MEDIUM", "HIGH", "EPIC", "DIVINE", "UNIVERSAL"], // Strength
    ["LOW", "MEDIUM", "HIGH", "EPIC", "DIVINE", "UNIVERSAL"], // Speed
    ["LOW", "MEDIUM", "HIGH", "EPIC", "DIVINE", "UNIVERSAL"], // Intelligence
    ["Super Strength", "Invisibility", "Teleportation", "Healing"], // Abilities
    ["Sword", "Potion", "Stick", "Bomb", "Compass", "Dirt", "Money", "Ice"] // Items
];

const aspectLabels = ["CLASS", "STRENGTH", "SPEED", "INTELLIGENCE", "ABILITY", "ITEM"];

let selectedAspects = [];

function cycleAspect() {
    let cycleCount = 0;
    const displayElement = document.getElementById('aspect-name');

    const interval = setInterval(() => {
        const aspectsArray = aspectTypes[currentAspect];
        const randomAspect = aspectsArray[Math.floor(Math.random() * aspectsArray.length)];

        displayElement.textContent = `${aspectLabels[currentAspect]}: ${randomAspect}`;
        cycleCount++;

        if (cycleCount >= 20) {
            clearInterval(interval);
            selectedAspects.push(randomAspect);
            currentAspect++;

            if (currentAspect >= aspectTypes.length) {
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
            }
        }
    }, 100);
}

function startGame() {
    window.location.href = 'character.html';
}