import {readConfig} from "../lib/config";
import {execSync} from "child_process";
import fs from "node:fs";
import path from "node:path";


const compile = () => {
    console.log("Compiling the circuit");
    const conf = readConfig();

    if (!fs.existsSync(conf.ptau)) {
        throw new Error('Missing ptau file. Please download it from the snarkjs repository.');
    }

    const artifactDir = conf.circuits.outDir;
    if (fs.existsSync(artifactDir)) {
        fs.rmSync(artifactDir, { recursive: true, force: true });
    }
    fs.mkdirSync(artifactDir, { recursive: true });

    // もしconf.artifacts.wasm, zkey, vkeyのディレクトリが存在しない場合、ディレクトリを作成する
    if (!fs.existsSync(conf.artifacts.wasm)) {
        fs.mkdirSync(path.posix.dirname(conf.artifacts.wasm), { recursive: true });
    }
    if (!fs.existsSync(conf.artifacts.zkey)) {
        fs.mkdirSync(path.posix.dirname(conf.artifacts.zkey), { recursive: true });
    }
    if (!fs.existsSync(conf.artifacts.vkey)) {
        fs.mkdirSync(path.posix.dirname(conf.artifacts.vkey), { recursive: true });
    }

    const compileCommand = `circom -l ${conf.circuits.buildDependencies.join(' -l ')} ${conf.circuits.main} --r1cs --wasm --sym -o ${artifactDir}`;
    const compileResult = execSync(compileCommand);
    console.log(compileResult.toString());

    const keyCommand = `snarkjs ${conf.circuits.provingScheme} setup ${artifactDir}/main.r1cs ${conf.ptau} ${conf.artifacts.zkey}`;
    const keyResult = execSync(keyCommand);
    console.log(keyResult.toString());

    const exportCommand = `snarkjs zkey export verificationkey ${conf.artifacts.zkey} ${conf.artifacts.vkey}`;
    const exportResult = execSync(exportCommand);
    console.log(exportResult.toString());
    fs.copyFileSync(`${artifactDir}/main_js/main.wasm`, conf.artifacts.wasm);

    if (conf.circuits.afterCompile) {
        console.log("Running afterCompile script:", conf.circuits.afterCompile);
        execSync(conf.circuits.afterCompile);
    }
}

export default compile;