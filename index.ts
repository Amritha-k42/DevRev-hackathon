import * as readline from "readline"; // Import for interactive input

// Function to detect frustration in a conversation
function detectFrustration(conversation: string): string {
    // List of frustration keywords
    const frustrationKeywords = [
        "angry", "furious", "hate", "stupid", "damn", "useless",
        "idiot", "terrible", "awful", "horrible", "sucks", "rage", "annoyed"
    ];

    // Check if conversation contains frustration keywords
    for (let keyword of frustrationKeywords) {
        if (conversation.toLowerCase().indexOf(keyword) !== -1) {  // indexOf() checks for presence
            return `Frustration detected due to keyword: "${keyword}"`;
        }
    }

    // Check for capitalized words (a sign of yelling)
    const words = conversation.split(" ");
    for (let word of words) {
        if (word === word.toUpperCase() && word.length > 3) {
            return `Frustration detected (capitalized words): "${word}"`;
        }
    }

    return "No frustration detected.";
}

// Interactive input via the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Ask for user input and process the conversation
rl.question("Enter the customer's message: ", (input) => {
    console.log(detectFrustration(input)); // Run the detection function
    rl.close();
});
