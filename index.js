'use strict';

var util = require('util');
var debug = require('debug')('prompt-radio');
var Prompt = require('prompt-base');

/**
 * Radio prompt
 */

function Radio(/*question, answers, rl*/) {
  debug('initializing from <%s>', __filename);
  Prompt.apply(this, arguments);

  this.choices.actions.number = function(pos, radio) {
    if (pos <= this.choices.length && pos >= 0) {
      this.position = pos - 1;
      this.choices.toggle(this.position, true);
    }
    return pos - 1;
  };

  this.choices.actions.space = function(pos) {
    this.choices.toggle(pos, true);
  };
}

/**
 * Inherit Prompt prompt
 */

Prompt.extend(Radio);

/**
 * Get selected choice
 */

Radio.prototype.getAnswer = function() {
  return this.choices.checked[0];
};

/**
 * Set the default value to use
 */

Radio.prototype.setDefault = function() {
  if (this.question.hasDefault) {
    this.choices.toggle(this.question.default, true);
  }
};

/**
 * Module exports
 */

module.exports = Radio;
