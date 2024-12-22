const robot = require('robotjs');

export function handleACtion(actionMsg: string) {
    try {
        const splittedAction = actionMsg?.split(':');

        // Getting all needed parameters
        const actionType = splittedAction[0];
        const action = splittedAction[1];
        const actionReapeat = splittedAction[2];

        // Handle action type
        switch (actionType) {
            // Handle open file
            case 'open':
                require('child_process').exec(`start ${action}`);
                break;

            // Handle press key
            case 'press':
                for (let i = 0; i < Number(actionReapeat) + 1; i++) {
                    console.log(action);
                    robot.setKeyboardDelay(100);
                    robot.keyTap(action);
                }
                break;
        }
    }
    catch (e) {
        console.log(e);
    }
}