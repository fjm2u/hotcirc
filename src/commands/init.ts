import path from "node:path";
import fs from "node:fs";
import {execSync} from "child_process";
import {Config} from "../types/config";

const init = () => {
    // 開発用のptauファイルのダウンロード
    const currentDir = process.cwd();
    const circuitsDir = './circuits';
    const mainFileName = path.posix.join(circuitsDir, 'main.circom');
    const initConfig: Config = {
        version: "0.1.0",
        ptau: "",
        circuits: {
            main: mainFileName,
            provingScheme: "plonk",
            outDir: "circom-artifacts",
            buildDependencies: [
                "node_modules"
            ],
            afterCompile: "mocha 'test/**/*.js'"
        },
        artifacts: {
            wasm: './out/circuit.wasm',
            zkey: './out/circuit_final.zkey',
            vkey: './out/circuit_final.vkey'
        },
    };

    if (!fs.existsSync(path.posix.join(currentDir, 'package.json'))) {
        execSync('npm init -y');
    }

    if (!fs.existsSync('./hotcirc.json')) {
        fs.writeFileSync('./hotcirc.json', JSON.stringify(initConfig, null, 2));
    }
    if (!fs.existsSync(mainFileName)) {
        fs.mkdirSync(circuitsDir);
        fs.writeFileSync(mainFileName, '');
    }
}

export default init;