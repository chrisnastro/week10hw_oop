import { colorList } from './colorList.js;'
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();
import inquirer from 'inquirer';
import { Triangle, Circle, Square } from './lib.shapes.js';

const width = 300;
const height = 200;

inquirer
    .prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Enter your three characters:',
            validate: (input) => input.length <= 3,
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Choose a color for your text (hexidecimal or by color name:',
            validate: (input) => {
                const checkColorName = colorList.includes(input.toLowerCase()),
                const checkHexCode = /^#[0-9A-F]{6}$/i.test(input);
            }
        }
    ])