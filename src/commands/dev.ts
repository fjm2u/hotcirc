import fs from "node:fs";
import { exec } from 'child_process';
import {readConfig} from "../lib/config";
import path from "node:path";


const dev = () => {
    console.log("Starting the development server");
    const conf = readConfig();
    const watchPaths = [path.dirname(conf.circuits.main), "hotcirc.json"];

    watchPaths.forEach((watchPath) => {
        fs.watch(watchPath, { recursive: true }, (eventType: string, filename: string | Buffer) => {
            if (!filename) return;
            const ext = path.extname(filename.toString())
            if (ext === '.circom' || ext === '.wasm' || ext === '.zkey' || ext === '.vkey' || ext === '.json') {
                exec('hotcirc compile', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                });
            }
        });
    });
}

export default dev;