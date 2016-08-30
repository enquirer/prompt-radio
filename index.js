'use strict';

var util = require('util');
var Paginator = require('terminal-paginator');
var Prompt = require('enquirer-prompt');
var radio = require('radio-symbol');
var cursor = require('cli-cursor');
var log = require('log-utils');

/**
 * Radio prompt
 */

function Radio(/*question, answers, rl*/) {
  Prompt.apply(this, arguments);
  if (!this.choices) {
    throw new Error('expected "options.choices" to be an array');
  }
  this.setDefault();
  this.pointer = this.question.choices.getIndex(this.question.default) || 0;
  this.question.default = null;
  this.paginator = new Paginator();
}

/**
 * Inherit Prompt
 */

util.inherits(Radio, Prompt);

/**
 * Start the prompt session
 * @param  {Function} `cb` Callback when prompt is finished
 * @return {Object} Returns the `Radio` instance
 */

Radio.prototype.ask = function(cb) {
  this.callback = cb;

  this.ui.on('up', this.onUpKey.bind(this));
  this.ui.on('down', this.onDownKey.bind(this));
  this.ui.on('space', this.onSpaceKey.bind(this));
  this.ui.on('number', this.onNumberKey.bind(this));

  this.ui.once('line', this.onSubmit.bind(this));
  this.ui.once('error', this.onError.bind(this));

  // Init the prompt
  cursor.hide();
  this.render();
  return this;
};

/**
 * Render the prompt to the terminal
 */

Radio.prototype.render = function(error) {
  // Render question
  var message = this.message;
  var append = '';

  if (!this.spaceKeyPressed) {
    message += '(Press <space> to select) ';
  }

  // Render choices or answer depending on the state
  if (this.status === 'answered') {
    message += log.cyan(this.selection.join(', '));
  } else {
    var choicesStr = renderChoices(this.choices, this.pointer, this.options);
    var idx = this.choices.indexOf(this.choices.getChoice(this.pointer));
    message += '\n' + this.paginator.paginate(choicesStr, idx, this.question.pageSize);
  }

  if (error) {
    append = log.red('>> ') + error;
  }
  this.ui.render(message, append);
};

/**
 * When an error event is emitted
 */

Radio.prototype.onError = function(answer) {
  this.render(answer.isValid);
};

/**
 * When user presses the `enter` key
 */

Radio.prototype.onSubmit = function(line) {
  this.answer = this.getSelectedValues(line);
  this.status = 'answered';
  this.render();
  this.ui.write();
  cursor.show();
  this.callback(this.answer);
};

/**
 * When user presses the `up` key
 */

Radio.prototype.onUpKey = function() {
  var len = this.choices.realLength;
  this.pointer = (this.pointer > 0) ? this.pointer - 1 : len - 1;
  this.render();
};

/**
 * When user presses the `down` key
 */

Radio.prototype.onDownKey = function() {
  var len = this.choices.realLength;
  this.pointer = (this.pointer < len - 1) ? this.pointer + 1 : 0;
  this.render();
};

/**
 * When user presses a number key
 */

Radio.prototype.onNumberKey = function(event) {
  var num = Number(event.value);
  if (num <= this.choices.realLength) {
    this.pointer = num - 1;
    this.question.toggleChoices(this.pointer);
  }
  this.render();
};

/**
 * When user presses the `space` bar
 */

Radio.prototype.onSpaceKey = function() {
  this.spaceKeyPressed = true;
  this.question.toggleChoices(this.pointer);
  this.render();
};

/**
 * Set the default value to use
 */

Radio.prototype.setDefault = function() {
  if (Array.isArray(this.question.choices)) {
    var len = this.choices.length;
    var idx = -1;
    while (++idx < len) {
      var choice = this.choices[idx];
      if (contains(this.question.default, choice.value)) {
        choice.checked = true;
      }
    }
  }
};

/**
 * Get the currently selected value
 */

Radio.prototype.getSelectedValues = function() {
  var choices = this.choices.filter(function(choice) {
    return Boolean(choice.checked) && !choice.disabled;
  });
  this.selection = choices.map(function(choice) {
    return choice.short;
  });
  return choices.map(function(choice) {
    return choice.value;
  });
};

/**
 * Render the checkbox based on state.
 * @param  {Boolean} `checked` If enabled, adds an X to the checkbox
 * @return {String} returns the rendered radio-button string
 */

function renderChoice(choice) {
  return choice.checked ? log.green(radio.on) : radio.off;
}

/**
 * Function for rendering checkbox choices
 * @param  {Number} pointer Position of the pointer
 * @return {String} Rendered choices string
 */

function renderChoices(choices, pointer, options) {
  var offset = 0;
  var output = '';

  choices.forEach(function(choice, i) {
    if (choice.type === 'separator') {
      offset++;
      output += inactive(choice);

    } else if (choice.disabled) {
      offset++;
      output += disabled(choice);

    } else if (i - offset === pointer) {
      output += active(choice, renderChoice(choice), options);

    } else {
      output += inactive(choice, renderChoice(choice));
    }
    output += ' \n';
  });

  return output.replace(/\n$/, '');
}

/**
 * Utils
 */

function disabled(choice) {
  var symbol = process.platform === 'win32' ? ' (×) ' : ' ⓧ ';
  return log.dim(symbol + choice.name + ' (' + (choice.disabled || 'Disabled') + ')');
}

function inactive(choice, prefix) {
  return ' ' + (prefix || '') + ' ' + choice.name;
}

function active(choice, prefix, options) {
  if (prefix && typeof prefix === 'object') {
    options = prefix;
    prefix = null;
  }
  return log.cyan(pointer(options) + (prefix || '') + ' ' + choice.name);
}

function pointer(options) {
  if (options && typeof options.pointer === 'string') {
    return options.pointer.trim() + ' ';
  }
  switch(process.platform) {
    case 'win32':
      return '>';
    case 'linux':
      return '‣';
    default: {
      return '❯';
    }
  }
}

/**
 * Return true if `arr` contains the given `element`
 */

function contains(val, ele) {
  return arrayify(val).indexOf(ele) !== -1;
}

/**
 * Cast `val` to an array.
 */

function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}

/**
 * Module exports
 */

module.exports = Radio;
