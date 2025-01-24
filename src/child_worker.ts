import { spawn, ChildProcess } from 'child_process';
import { ProcessData, ProcessDto } from './interfaces/process';
import terminate from 'terminate';

let proccesses: ProcessData[] = [];

export async function launchProcess(data: ProcessDto) {
  try {
    // Close previous opened processes
    proccesses.forEach(el => {
      try{
      terminate(el.process.pid);
      }
      catch(e){
        console.log(e);
      }
    });
    // Clear processes array
    proccesses = [];
    
    // Open a child process
    const child: ChildProcess = spawn(data.filePath, {
      stdio: 'inherit', // Inherit I/O streams (optional)
    });

    // Listen for errors
    child.on('error', (error: Error) => {
      console.error('Failed to start child process:', error);
    });

    // Detect when the process ends
    child.on('close', (code) => {
      console.log(`Child process exited with code ${code}`);
    });

    // Save process to array
    // for work with it in future
    proccesses.push(
      {
        name: data.presetName,
        process: child
      }
    );
  }
  catch (e) {
    console.log(`Error starting file: ${data.filePath}`);
    console.log(e);
  }
}

export async function closeProcess(presetName: string) {
  try{
    // Searchng needed process
    let processPid: number | null | undefined = null;
    proccesses.forEach(el =>{
      if(el.name == presetName) processPid = el.process.pid;
    });

    // If process founded => close it
    if(processPid) terminate(processPid);
    else console.log(`Process for preset(${presetName}) not founded`);
  }
  catch(e){
    console.log(`Error closing: ${presetName}`);
    console.log(e);
  }
}