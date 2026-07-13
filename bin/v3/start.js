import { getImportVariablesDetails } from "express-check-any-for-import";

/**
 * Main start entrypoint. Checks if the variable is imported,
 * and searches the code for usages after the import statements.
 */
export default async function start({ jsFileContent, inCheckLines, showLog }) {
    // 1. Get details of all imported variables using the library
    const details = getImportVariablesDetails(jsFileContent);
    const variableInfo = details.variables.find(v => v.name === inCheckLines);

    if (!variableInfo) {
        if (showLog) {
            console.log(`Variable "${inCheckLines}" is NOT imported.`);
        }
        return {
            imported: false
        };
    }

    const { startLine, endLine } = variableInfo;
    const lines = jsFileContent.split('\n');
    const usages = [];

    // 2. Search for references in lines following the import block
    for (let i = 0; i < lines.length; i++) {
        const lineNumber = i + 1;
        if (lineNumber > endLine) {
            const lineContent = lines[i];
            const regex = new RegExp(`\\b${inCheckLines}\\b`);
            if (regex.test(lineContent)) {
                usages.push({
                    lineNumber,
                    lineContent: lineContent.trim()
                });
            }
        }
    }

    if (showLog) {
        console.log(`Variable "${inCheckLines}" is imported (Lines ${startLine}-${endLine}).`);
        console.log(`Usages found:`, usages);
    }

    return {
        imported: true,
        startLine,
        endLine,
        usages
    };
}
