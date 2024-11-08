#!/usr/bin/env node

import { Runner } from './runner.js';

const runner = new Runner();

const results = await runner.collectFiles(process.cwd());
// console.log(runner.testFiles);
runner.runTests();
