'use strict';

require('mocha');
var assert = require('assert');
var Prompt = require('..');
var prompt;
var unmute;

describe('.ask', function() {
  beforeEach(function() {
    prompt = new Prompt({name: 'fixture'});
    unmute = prompt.mute();
  });

  afterEach(function() {
    unmute();
  });

  it('should select a choice directly', function(cb) {
    prompt.choices = ['red', 'green', 'blue'];
    prompt.choices.check('blue');

    prompt.run()
      .then(function(answer) {
        assert.deepEqual(answer, 'blue');
        cb();
      })
      .catch(cb);

    setImmediate(function() {
      prompt.rl.emit('line');
    });
  });

  it('should select a choice with a "number" keypress event', function(cb) {
    prompt.choices = ['red', 'green', 'blue'];
    var events = [];

    prompt.only('keypress', function(name) {
      events.push(name);
    });

    prompt.run()
      .then(function(answer) {
        assert.equal(events.length, 2);
        assert.equal(events[0], 'number');
        assert.equal(events[1], 'enter');
        assert.deepEqual(answer, 'red');
        cb();
      })
      .catch(cb);

    setImmediate(function() {
      prompt.rl.input.emit('keypress', '1', {name: 'number'});
      prompt.rl.input.emit('keypress', '\n');
    });
  });

  it('should select a choice on "ask" event', function() {
    prompt.choices = ['red', 'green', 'blue'];

    prompt.once('ask', function() {
      prompt.choices.check('blue');
      prompt.rl.emit('line');
    });

    return prompt.run()
      .then(function(answer) {
        assert.deepEqual(answer, 'blue');
        return answer;
      });
  });

  it('should select a choice with space keypress', function(cb) {
    prompt.choices = ['red', 'green', 'blue'];

    prompt.run()
      .then(function(answer) {
        assert.deepEqual(answer, 'red');
        cb();
      })
      .catch(cb);

    setImmediate(function() {
      prompt.rl.input.emit('keypress', ' ', {name: 'space'});
      prompt.rl.emit('line');
    });
  });

  it('should select a choice with space keypress and down keypresses', function(cb) {
    prompt.choices = ['red', 'green', 'blue'];

    prompt.run()
      .then(function(answer) {
        assert.deepEqual(answer, 'blue');
        cb();
      })
      .catch(cb);

    setImmediate(function() {
      prompt.rl.input.emit('keypress', 'n', {name: 'down', ctrl: true});
      prompt.rl.input.emit('keypress', 'n', {name: 'down', ctrl: true});
      prompt.rl.input.emit('keypress', ' ', {name: 'space'});
      prompt.rl.emit('line');
    });
  });

  it('should select a choice with space keypress on "ask"', function() {
    prompt.choices = ['red', 'green', 'blue'];

    prompt.on('ask', function() {
      prompt.rl.input.emit('keypress', ' ', {name: 'space'});
      prompt.rl.emit('line');
    });

    return prompt.run()
      .then(function(answer) {
        assert.deepEqual(answer, 'red');
        return answer;
      });
  });

  it('should select choices around a disabled choice', function() {
    prompt.choices = ['red', {name: 'yellow', disabled: true}, 'green', 'blue'];

    prompt.on('ask', function() {
      prompt.rl.input.emit('keypress', '2');
      prompt.rl.input.emit('keypress', '\n');
    });

    return prompt.run()
      .then(function(answer) {
        assert.deepEqual(answer, 'green');
        return answer;
      });
  });
});
