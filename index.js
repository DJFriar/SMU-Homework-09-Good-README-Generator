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
      type: 'input',
      message: 'Describe your project:',
      name: 'description',
    },
  ]);

const generateText = (answers) =>
`
# ${answers.projectTitle}

## Table of Contents

## Description

${answers.description}

## Installation

## Usage

## Contributing

${answers.username}

## Tests

## Questions

- GitHub: 
- Email: ${answers.username}
`;

promptUser()
  .then((answers) => writeFileAsync('MYREADME.md', generateText(answers)))
  .then(() => console.log('Successfully wrote MYREADME'))
  .catch((err) => console.error(err));