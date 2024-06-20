
## Circom development tools
Hot reload for circom development.

## Usage

### Create a new project
To start a new project, run the following command:
```shell
npx hotcirc init
```

This will create a `hotcirc.json` file in the root directory of your project. The file will look like this:
```json
{
  "version": "0.1.0",
  "ptau": "",
  "circuits": {
    "main": "circuits/main.circom",
    "provingScheme": "plonk",
    "outDir": "circom-artifacts",
    "buildDependencies": [
      "node_modules"
    ],
    "afterCompile": ""
  },
  "artifacts": {
    "wasm": "./out/circuit.wasm",
    "zkey": "./out/circuit_final.zkey",
    "vkey": "./out/circuit_final.vkey"
  }
}
```
<details open>
<summary>Params</summary>
<br>

- `version`: The version of the project.
- `ptau`: The path to the ptau file.
- `circuits`: The configuration for the circuit.
  - `main`: The path to the main circuit file.
  - `provingScheme`: The proving scheme to use. Currently, only `plonk` is tested.
  - `outDir`: The output directory for the artifacts.
  - `buildDependencies`: The dependencies to build the circuit. `-l <dependency>` flag will be added to the circom command.
  - `afterCompile`: The command to run after compiling the circuit. This is a optional field.
- `artifacts`: The paths to output the artifacts.
  - `wasm`: The path to the wasm file.
  - `zkey`: The path to the zkey file.
  - `vkey`: The path to the vkey file.
</details>

### Compile the circuit
To compile the circuit, run the following command:
```shell
npx hotcirc compile
```

### Start hot reload
To start the hot reload, run the following command:
```shell
npx hotcirc dev
```

We will implement vite plugin in the future to make it easier to use.