import * as readline from "readline";
import * as nodemailer from "nodemailer";

// Set up readline interface to get user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// List of frustrated keywords to check
const frustratedKeywords = [
  "WTH",
  "OMG",
  "PLS",
  "HELP",
  "ASAP",
  "NOW",
  "FIX",
  "ERROR",
  "FAIL",
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

// Function to detect frustration in a message
function detectFrustration(message: string): string[] {
  const words = message.split(/\s+/); // Split message into words
  const frustratedWords: string[] = [];

  // Check for capitalized words with length > 2 and frustrated keywords
  for (const word of words) {
    if (
      (word === word.toUpperCase() && word.length > 2) ||
      frustratedKeywords.includes(word.toUpperCase())
    ) {
      frustratedWords.push(word);
    }
  }

  return frustratedWords;
}

// Email sending function
async function sendAlertEmail(frustratedWords: string[]) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "realrev123@gmail.com", // Your Gmail address
      pass: "kszv ertz rttc yfnh", // The 16-character App Password from Google
    },
  });

  try {
    await transporter.sendMail({
      from: '"Frustration Detector" realrev123@gmail.com', // Sender
      to: "amrithakpoojary262@gmail.com", // Receiver (replace with recipient email)
      subject: "Customer Frustration Alert 🚨",
      text: `A customer is frustrated! Frustrated words detected: ${frustratedWords.join(
        ", "
      )}`,
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Main function
function main() {
  rl.question("Enter the customer's message: ", async (message: string) => {
    const frustratedWords = detectFrustration(message);

    if (frustratedWords.length > 0) {
      console.log(
        `Frustration detected (words): "${frustratedWords.join(", ")}"`
      );

      // Attempt to send the email
      await sendAlertEmail(frustratedWords);
    } else {
      console.log("No frustration detected in the message.");
    }

    // Close the readline interface
    rl.close();
  });
}

// Run the program
main();
