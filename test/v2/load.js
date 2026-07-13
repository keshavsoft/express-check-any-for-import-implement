import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import load, { version } from '../../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.join(__dirname, 'app.js');

(async () => {
    try {
        console.log("=== Load Analyzer Test ===");
        console.log("Exposed Version: ", version);

        const jsFileContent = fs.readFileSync(appPath, 'utf8');
        const testVars = ['express', 'routerFromapi', 'dotenv', 'nonexistent'];

        for (const v of testVars) {
            console.log(`\n--- Analyzing variable: "${v}" ---`);
            const result = await load({ jsFileContent, inCheckLines: v, showLog: true });
            console.log("Returned result:", JSON.stringify(result, null, 2));
        }
    } catch (error) {
        console.error("Error running test:", error.message);
    }
})();
