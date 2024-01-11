import { Command } from "commander";
import { VERSION, NAME, DESCRIPTION } from "./constant";

const program = new Command();

program.name(NAME).description(DESCRIPTION).version(VERSION);

program.option("-v, --version", "output the version number");

program.parse();

const options = program.opts();
