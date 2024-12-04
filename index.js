"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const readline = require("readline"); // For interactive input
const nodemailer = require("nodemailer"); // For sending emails

// Function to detect frustration in a conversation
function detectFrustration(conversation) {
  const frustrationKeywords = [
    "angry",
    "furious",
    "hate",
    "stupid",
    "damn",
    "useless",
    "idiot",
    "terrible",
    "awful",
    "horrible",
    "sucks",
    "rage",
    "annoyed",
  ];

  const words = conversation.split(/\s+/);
  const frustratedWords = [];

  for (const word of words) {
    if (
      (word === word.toUpperCase() && word.length > 3) || // Capitalized words
      frustrationKeywords.includes(word.toLowerCase()) // Keywords match
    ) {
      frustratedWords.push(word);
    }
  }

  return frustratedWords;
}

// Function to send an alert email
async function sendAlertEmail(frustratedWords, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "realrev123@gmail.com", // Sender's Gmail address
      pass: "kszv ertz rttc yfnh", // App Password generated for Gmail
    },
  });

  await transporter.sendMail({
    from: '"Frustration Detector" realrev123@gmail.com', // Sender
    to: "amrithakpoojary262@example.com", // Receiver
    subject: "Customer Frustration Alert 🚨",
    text: `A customer sent the following message:\n\n"${message}"\n\nFrustrated words detected: ${frustratedWords.join(
      ", "
    )}.\n\nPlease address their concerns as soon as possible.`,
  });
  console.log("Alert email sent successfully!");
}

// Interactive input via the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Main function to handle input and process frustration detection
rl.question("Enter the customer's message: ", async (message) => {
  if (!message.trim()) {
    console.log("No message entered. Please try again.");
    rl.close();
    return;
  }

  const frustratedWords = detectFrustration(message);

  if (frustratedWords.length > 0) {
    console.log(
      `Frustration detected (words): "${frustratedWords.join(", ")}"`
    );
    try {
      await sendAlertEmail(frustratedWords, message);
    } catch (error) {
      console.error("Error sending email:", error.message);
    }
  } else {
    console.log("No frustration detected in the message.");
  }

  rl.close();
});
