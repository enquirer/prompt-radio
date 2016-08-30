var Enquirer = require('enquirer');
var enquirer = new Enquirer();

enquirer.register('radio', require('./'));
enquirer.question('color', 'What is your favorite color?', {
  type: 'radio',
  default: 'blue',
  choices: [
    'red',
    'blue',
    'yellow'
  ]
});

enquirer.ask('color')
  .then(function(answers) {
    console.log(answers)
  });
