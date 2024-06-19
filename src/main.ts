import { Command } from 'commander';
const program = new Command();
import init from "./commands/init";
import add from "./commands/add";
import dev from "./commands/dev";
import compile from "./commands/compile";

program.version('0.0.1', "-v, --version");




program
    .command('init')
    .description('initialize a new repository')
    .action(init);


program
    .command('compile')
    .description('compile the circuit')
    .action(compile);


program
    .command('add <npm package name>')
    .description('add a new package to the repository')
    .action(add);


program
    .command('dev')
    .description('Start the development server')
    .action(dev);



program.parse()

