// Define an object to hold information about the scenes and directions
const gameData = {
    currentScene: "rail", // Default starting scene
    currentDirection: "north", // Default starting direction
    scenes: [
        "rail",
        "park",
        "a third room"
        // Define other scenes and their corresponding images for each direction
    ],
    clickableAreas: {
        "rail_east": [
            {
                coordinates: [0, 0, 100, 100], // [top-left-x, top-left-y, bottom-right-x, bottom-right-y]
                destinationScene: "park"
            }
            // Define other clickable areas in kitchen_north.png
        ],
        // Define clickable areas for other images
    }
    // Add more properties as needed
};

function look(directionChange) {
    // Get the current scene
    const currentScene = gameData.currentScene;

    // Define an array of directions in clockwise order
    const directions = ["north", "east", "south", "west"];

    // Find the index of the current direction
    let currentIndex = directions.indexOf(gameData.currentDirection);

    // Calculate the new index after applying the direction change
    let newIndex = (currentIndex + directionChange) % directions.length;
    // Ensure the index stays within bounds (positive modulo)
    newIndex = newIndex < 0 ? newIndex + directions.length : newIndex;

    // Update the current direction
    gameData.currentDirection = directions[newIndex];
    console.log(directions[newIndex]);

    // Construct the filename for the image in the new direction
    const newImage = `${currentScene}_${gameData.currentDirection}.png`;

    // Update the scene image
    document.getElementById("scene").src = newImage;
}

function move(x, y) {
    // Get the current scene
    const currentScene = gameData.currentScene + "_" + gameData.currentDirection;
    console.log("trying to look at " + x + " " + y + " ... in scene " + currentScene)
    
    // Check if there are clickable areas defined for the current scene
    if (gameData.clickableAreas[currentScene]) {
        // Iterate through each clickable area
        for (const area of gameData.clickableAreas[currentScene]) {
            // Extract coordinates of the clickable area
            const [x1, y1, x2, y2] = area.coordinates;
            console.log("looking!")
            // Check if the player's click falls within the clickable area
            if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
                console.log("found the clickable area!")
                // If it does, update the current scene to the destination scene
                gameData.currentScene = area.destinationScene;
                console.log(`Moved to ${area.destinationScene}`);
                // Update the scene image
                document.getElementById("scene").src = `${area.destinationScene}_${gameData.currentDirection}.png`;
                return; // Exit the function after the first match
            }
        }
    }
    // If the click doesn't fall within any clickable area, do nothing
}

// Function to display a pop-up with the current scene name
function showScenePopup() {
    const currentScene = gameData.currentScene;
    
    // Create a pop-up element
    const popup = document.createElement("div");
    popup.classList.add("popup");
    
    // Add content to the pop-up (current scene name)
    popup.textContent = "Current Scene: " + currentScene;
    
    // Append the pop-up to the game window
    document.getElementById("game-window").appendChild(popup);
    
    // Schedule the pop-up to be removed after a certain time (e.g., 5 seconds)
    setTimeout(function() {
        popup.remove();
    }, 2000); // 5000 milliseconds = 5 seconds
}

// Schedule the display of pop-ups every minute
setInterval(showScenePopup, 10000); // 60000 milliseconds = 1 minute


