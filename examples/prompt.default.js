var Prompt = require('..');
var prompt = new Prompt({
  name: 'colors',
  message: 'What are your favorite colors?',
  default: 'blue',
  choices: [
    'red',
    'blue',
    'yellow'
  ]
});

prompt.run()
  .then(function(answers) {
    console.log(answers)
  })
  .catch(function(err) {
    console.log(err)
  })
