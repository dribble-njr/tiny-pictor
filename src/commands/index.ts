import { Command } from 'commander';
import { resizeCommand } from './resize';

export function registerCommands(program: Command) {
  resizeCommand(program);
}
