import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import load, { version } from '../../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.join(__dirname, 'app.js');

(async () => {
    try {
        const jsFileContent = fs.readFileSync(appPath, 'utf8');

        const result = await load({
            jsFileContent, inCheckLines: "express",
            showLog: true
        });

        console.error("result : ", result);

    } catch (error) {

    }
})();
