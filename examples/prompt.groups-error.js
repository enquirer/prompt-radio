var Radio = require('..');
var radio = new Radio({
  name: 'favorite',
  message: 'Favorite?',
  choices: {
    color: ['red', 'blue', 'yellow'],
    flavor: ['chocolate', 'strawberry', 'vanilla']
  }
});

radio.run()
  .then(function(answers) {
    console.log(answers)
  })
  .catch(function(err) {
    console.log(err)
  })
