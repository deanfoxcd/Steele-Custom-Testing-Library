import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { JSDOM } from 'jsdom';
import { render } from './render.js';

const forbiddenDirs = ['node_modules'];

export class Runner {
  constructor() {
    this.testFiles = [];
  }

  async runTests() {
    for (let file of this.testFiles) {
      console.log(chalk.grey(`---> ${file.shortName}`));
      const beforeEaches = [];

      global.render = render;

      global.beforeEach = (fn) => {
        beforeEaches.push(fn);
      };

      global.it = async (desc, fn) => {
        beforeEaches.forEach((func) => func());
        try {
          await fn();
          console.log(chalk.green(`\tOK - ${desc}`));
        } catch (err) {
          const message = err.message.replace(/\n/g, '\n\t\t');
          console.log(chalk.red(`\tX - ${desc}`));
          console.log(chalk.red('\t', message));
        }
      };
      try {
        await import(file.name);
      } catch (err) {
        console.log(chalk.red(err));
      }
    }
  }

  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);

    for (let file of files) {
      const filePath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filePath);

      if (stats.isFile() && file.includes('.test.js')) {
        this.testFiles.push({ name: filePath, shortName: file });
      } else if (stats.isDirectory() && !forbiddenDirs.includes(file)) {
        const childFiles = await fs.promises.readdir(filePath);
        files.push(...childFiles.map((f) => path.join(file, f)));
      }
    }
  }
}
