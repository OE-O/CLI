const colors = require('colors')

colors.setTheme({
  prefix: 'magenta',
  info: 'blue',
  help: 'cyan',
  warn: 'yellow',
  success: 'green',
  error: 'red'
});

const emoji = {
  tick: '✅',
  cross: '❌',
  info: 'ℹ️',
  warning: '⚠️'
};

module.exports.emoji = emoji;

module.exports.colors = colors;
