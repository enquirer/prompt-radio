# enquirer-prompt-radio [![NPM version](https://img.shields.io/npm/v/enquirer-prompt-radio.svg?style=flat)](https://www.npmjs.com/package/enquirer-prompt-radio) [![NPM downloads](https://img.shields.io/npm/dm/enquirer-prompt-radio.svg?style=flat)](https://npmjs.org/package/enquirer-prompt-radio)

> Adds `radio` prompt support to Enquirer. This prompt behaves like other radio-button interfaces, where only one choice is enabled whilst all others are disabled.

![radio prompt example](https://raw.githubusercontent.com/enquirer/enquirer-prompt-radio/master/example.gif)

## Usage

```js
var Enquirer = require('enquirer');
var enquirer = new Enquirer();

enquirer.register('radio', require('enquirer-prompt-radio'));
```

## Example

[Enquirer](https://github.com/jonschlinkert/enquirer) supports both the declarative inquirer-style question format and a functional format using the `.question` method:

**.question**

Functional style questions.

```js
var Enquirer = require('enquirer');
var enquirer = new Enquirer();

enquirer.register('radio', require('enquirer-prompt-radio'));
enquirer.question('color', 'What is your favorite color?', {
  type: 'radio',
  default: 'blue',
  choices: ['red', 'yellow', 'blue']
});

enquirer.ask('color')
  .then(function(answers) {
    console.log(answers)
  });
```

**Inquirer-style questions**

Declarative questions format.

```js
var Enquirer = require('enquirer');
var enquirer = new Enquirer();

enquirer.register('radio', require('enquirer-prompt-radio'));

var questions = [
  {
    name: 'color',
    message: 'What is your favorite color?',
    type: 'radio',
    default: 'blue',
    choices: ['red', 'yellow', 'blue']
  }
];

enquirer.ask(questions)
  .then(function(answers) {
    console.log(answers)
  });
```

## Attribution

Partially based on the `checkbox` prompt in inquirer.

## About

### Related projects

* [enquirer-prompt-checkbox](https://www.npmjs.com/package/enquirer-prompt-checkbox): Adds checkbox prompt support to Enquirer. | [homepage](https://github.com/enquirer/enquirer-prompt-checkbox "Adds checkbox prompt support to Enquirer.")
* [enquirer-prompt](https://www.npmjs.com/package/enquirer-prompt): Base prompt module used for creating custom prompt types for Enquirer. | [homepage](https://github.com/enquirer/enquirer-prompt "Base prompt module used for creating custom prompt types for Enquirer.")
* [enquirer-question](https://www.npmjs.com/package/enquirer-question): Question object, used by Enquirer and prompt plugins. | [homepage](https://github.com/enquirer/enquirer-question "Question object, used by Enquirer and prompt plugins.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

### License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/enquirer/enquirer-prompt-radio/blob/master/LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.1.30, on August 30, 2016._