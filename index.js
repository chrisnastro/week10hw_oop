import { colorList } from './colorList.js;';
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
                const checkColorName = colorList.includes(input.toLowerCase());
                const checkHexCode = /^#[0-9A-F]{6}$/i.test(input);
                return checkColorName || checkHexCode;
            },
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose your shape:',
            choices: ['Triangle', 'Circle', 'Square']
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: "Choose your shape color (hexidecimal or by color name):",
            validate: (input) => {
                const checkColorName = colorList.includes(input.toLowerCase());
                const checkHexCode = /^#[0-9A-F]{6}$/i.test(input);
                return checkColorName || checkHexCode;
            },
        },
    ])

    .then((answers) => {
        let shape;
        const text = {
            _attributes: {
                x: width / 2,
                y: height / 1.35,
                'text-anchor': 'middle',
                fill: answers.textColor,
            },

            _text: answers.text.toUpperCase(),

            render: function () {
                return `
                <text x="${this._attributes.x}" y="${this._attributes.y}"
                text-anchor="${this._attributes['text-anchor']}"
                fill="${this._attributes.fill}" font-size="${fontSize}">
                ${this._text}
                </text>`;
            },
        };

        let fontSize;
        switch (answers.shape) {
            case 'Circle':
                const circleRadius = Math.min(width, height) * 0.45;
                shape = new Circle(width / 2, height / 2, circleRadius);
                text._attributes.y = height / 1.65;
                fontSize = 58;
                break;
            case 'Triangle':
                const triSize = Math.min(width, height) * 1.1;
                shape = new Triangle(width / 2, height / 2, triSize);
                fontSize = 52;
                break;
            case 'Square':
                const sqSize = Math.min(width, height) * 0.8;
                shape = new Square(width / 2, height / 2, sqSize);
                text._attributes.y = height / 1.65;
                fontSize = 62;
                break;
        }

        const svgData = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        ${shape.render(answers.shapeColor)}
        ${text.render()}
        </svg>`;

        fs.writeFileSync(`${__dirname}/logo.svg`, svgData.toString());

        console.log('Congrats! Generated logo.svg!');

    })
    .catch((error) => {
        console.error(error);
    });