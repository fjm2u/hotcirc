

interface Config {
    version: string;
    ptau: string;
    circuits: {
        main: string;
        provingScheme: string;
        outDir: string;
        buildDependencies: string[];
        afterCompile?: string;
    };
    artifacts: {
        wasm: string;
        zkey: string;
        vkey: string;
    };
}

export {Config}