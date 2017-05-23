var strip = require('strip-color');
var colors = require('ansi-colors');
var Radio = require('..');
var radio = new Radio({
  name: 'color',
  message: 'What is your favorite color?',
  pointer: '♥♥♥',
  choices: [
    'red',
    'blue',
    'yellow'
  ],
  validate: function(input, key) {
    var color = (input || 'white').trim();
    var pointer = strip(this.question.pointer);
    this.question.pointer = colors[color](pointer);
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
