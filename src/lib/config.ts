import fs from "node:fs";
import {Config} from "../types/config";

const readConfig = () => {
    const configPath = './hotcirc.json';

    if (!fs.existsSync(configPath)) {
        throw new Error('Configuration file hotcirc.json does not exist. First run `hotcirc init` to create it.');
    }

    const configFile = fs.readFileSync(configPath, 'utf-8');
    const config: Config = JSON.parse(configFile);

    return config;
}

export { readConfig}
