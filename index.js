import readline from "readline";
import { unionOverlappingItems } from "./unionOverlappingItems.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askForInput = () => {
  rl.question(
    'Enter array of ranges (Ex: [{"startPx": 10, "endPx": 30}, {"startPx": 20, "endPx": 40}]):\n',
    (answer) => {
      try {
        const parsed = JSON.parse(answer);
        const result = unionOverlappingItems(parsed);
        console.log("Non overlapping items:\n", result);
      } catch (err) {
        console.error("Invalid JSON input. Please try again.");
      } finally {
        rl.close();
      }
    }
  );
};

askForInput();
