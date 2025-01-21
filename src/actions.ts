import downloadFile from "./download_file";

const robot = require('robotjs');
const { launchProcess, closeProcess } = require('./child_worker');
const { execFile } = require('child_process');

export function handleACtion(actionMsg: string) {
    try {
        const splittedAction = actionMsg?.split('|||');

        // Getting all needed parameters
        const actionType = splittedAction[0];
        const action = splittedAction[1];
        const additionalParams = splittedAction[2];

        // Handle action type
        switch (actionType) {
            // Handle open file
            case 'open':
                execFile(action);
                break;

            // Handle press key
            case 'press':
                const actionReapeat = additionalParams;
                for (let i = 0; i < Number(actionReapeat) + 1; i++) {
                    console.log(action);
                    robot.setKeyboardDelay(100);
                    robot.keyTap(action);
                }
                break;

            // Handle start process
            case 'start':
                {
                    const presetName = action;
                    const filePath = additionalParams;

                    launchProcess({ presetName: presetName, filePath: filePath });
                }
                break;

            // Handle stop process
            case 'stop':
                const presetName = action;
                closeProcess(presetName);
                break;

            case 'download':
                const fileName = action;
                downloadFile(fileName);
                break;
        }
    }
    catch (e) {
        console.log(e);
    }
}