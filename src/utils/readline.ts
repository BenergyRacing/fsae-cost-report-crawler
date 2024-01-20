import readline from 'readline';

const rl = readline.createInterface(process.stdin, process.stdout);

export function question(text: string): Promise<string> {
  return new Promise(resolve => rl.question(text, resolve));
}
