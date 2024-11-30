"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline"); // Import for interactive input
// Function to detect frustration in a conversation
function detectFrustration(conversation) {
    // List of frustration keywords
    var frustrationKeywords = [
        "angry", "furious", "hate", "stupid", "damn", "useless",
        "idiot", "terrible", "awful", "horrible", "sucks", "rage", "annoyed"
    ];
    // Check if conversation contains frustration keywords
    for (var _i = 0, frustrationKeywords_1 = frustrationKeywords; _i < frustrationKeywords_1.length; _i++) {
        var keyword = frustrationKeywords_1[_i];
        if (conversation.toLowerCase().indexOf(keyword) !== -1) { // indexOf() checks for presence
            return "Frustration detected due to keyword: \"".concat(keyword, "\"");
        }
    }
    // Check for capitalized words (a sign of yelling)
    var words = conversation.split(" ");
    for (var _a = 0, words_1 = words; _a < words_1.length; _a++) {
        var word = words_1[_a];
        if (word === word.toUpperCase() && word.length > 3) {
            return "Frustration detected (capitalized words): \"".concat(word, "\"");
        }
    }
    return "No frustration detected.";
}
// Interactive input via the terminal
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Ask for user input and process the conversation
rl.question("Enter the customer's message: ", function (input) {
    console.log(detectFrustration(input)); // Run the detection function
    rl.close();
});
