const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () =>
  inquirer.prompt([
    {
      type: 'input',
      message: 'What is your GitHub username?',
      name: 'username',
    },
    {
      type: 'input',
      message: 'What is your email address?',
      name: 'email',
    },
    {
      type: 'input',
      message: 'What is your project\'s title?',
      name: 'projectTitle',
    },
    {
      type: 'list',
      name: 'license',
      message: 'How do you wish to license this project?',
      choices: ["Apache", "GPL", "ISC", "MIT", "Open"]
    },
    {
      type: 'input',
      message: 'Describe your project:',
      name: 'description',
    },
    {
      type: 'input',
      message: 'How do you install it?',
      name: 'install',
    },
    {
      type: 'input',
      message: 'How do you use it?',
      name: 'usage',
    },
    {
      type: 'input',
      message: 'How do you test it?',
      name: 'test',
    },
    {
      type: 'input',
      message: 'Any instructions for potential contributors?',
      name: 'contribute',
    },
  ]);

const generateText = (answers) =>
`
# ${answers.projectTitle}

![license](https://img.shields.io/badge/license-${answers.license}-brightgreen)

## Table of Contents

- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Contributing](#Contributing)
- [Tests](#Tests)
- [Questions](#Questions)

## Description

${answers.description}

## Installation

${answers.install}

## Usage

${answers.usage}

## Contributing

${answers.contribute}

## Tests

${answers.test}

## Questions

For any questions you can contact me via my [GitHub](https://www.github.com/${answers.username}) or directly via [email](mailto:${answers.email}).
`;

promptUser()
  .then((answers) => writeFileAsync('MYREADME.md', generateText(answers)))
  .then(() => console.log('Successfully wrote MYREADME'))
  .catch((err) => console.error(err));