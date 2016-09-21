# prompt-radio [![NPM version](https://img.shields.io/npm/v/prompt-radio.svg?style=flat)](https://www.npmjs.com/package/prompt-radio) [![NPM downloads](https://img.shields.io/npm/dm/prompt-radio.svg?style=flat)](https://npmjs.org/package/prompt-radio)

> Radio prompt. This prompt behaves like other radio-button interfaces, where only one choice is enabled whilst all others are disabled. Can be used as a standalone prompt, or with a prompt system like [Enquirer](https://github.com/enquirer/enquirer).

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save prompt-radio
```

## Usage

```js
var Enquirer = require('enquirer');
var enquirer = new Enquirer();

enquirer.register('radio', require('prompt-radio'));
```

## Example

[Enquirer](https://github.com/enquirer/enquirer) supports both the declarative inquirer-style question format and a functional format using the `.question` method:

**.question**

Functional style questions.

```js
var Enquirer = require('enquirer');
var enquirer = new Enquirer();

enquirer.register('radio', require('prompt-radio'));
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

enquirer.register('radio', require('prompt-radio'));

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

* [enquirer-prompt](https://www.npmjs.com/package/enquirer-prompt): Base prompt module used for creating custom prompt types for Enquirer. | [homepage](https://github.com/jonschlinkert/enquirer-prompt "Base prompt module used for creating custom prompt types for Enquirer.")
* [enquirer-question](https://www.npmjs.com/package/enquirer-question): Question object, used by Enquirer and prompt plugins. | [homepage](https://github.com/enquirer/enquirer-question "Question object, used by Enquirer and prompt plugins.")
* [prompt-checkbox](https://www.npmjs.com/package/prompt-checkbox): Multiple-choice/checkbox prompt. Can be used standalone or with a prompt system like [Enquirer](https://github.com/enquirer/enquirer). | [homepage](https://github.com/enquirer/prompt-checkbox "Multiple-choice/checkbox prompt. Can be used standalone or with a prompt system like [Enquirer].")

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
Released under the [MIT license](https://github.com/enquirer/prompt-radio/blob/master/LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.1.31, on September 21, 2016._