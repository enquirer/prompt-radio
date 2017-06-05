var strip = require('strip-color');
var colors = require('ansi-colors');
var Radio = require('..');
var radio = new Radio({
  name: 'color',
  message: 'What is your favorite color?',
  pointer: colors.red('♥♥♥'),
  choices: [
    'red',
    'blue',
    'yellow'
  ],
  validate: function() {
    var choice = this.choices.get(this.position);
    var name = (choice && choice.name) || 'white';
    var pointer = strip(this.question.pointer);
    this.question.pointer = colors[name](pointer);
    return true;
  }
});

radio.run()
  .then(function(answer) {
    console.log(answer)
  })
  .catch(function(err) {
    console.log(err)
  })
