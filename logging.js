var util = require('util'),
    winston = require('winston'),
    logger = new winston.Logger(),
    production = (process.env.NODE_ENV || '').toLowerCase() === 'production';

module.exports = {
  middleware: function(req, res, next){
    console.info(req.method, req.url, res.statusCode);
    next();
  },
  production: production
};

logger.add(winston.transports.Console, {
  colorize: true,
  timestamp: true,
  level: 'info'
});

// Override the built-in console methods with winston hooks
switch((process.env.NODE_ENV || '').toLowerCase()){
    case 'production':
      production = true;
      logger.add(winston.transports.File, {
        filename: __dirname + '/application.log',
        handleExceptions: true,
        exitOnError: false,
        level: 'warn'
      })
      break
    case 'test':
      // Don't set up the logger overrides
      break
    default:
      break
}

function formatArgs(args){
  return [util.format.apply(util.format, Array.prototype.slice.call(args))]
}

// br = require('bristol')
// br.addTarget('console')
//     .withFormatter('human')

tr = require('tracer').colorConsole({
		format: [
      "{{title}} {{message}} ({{file}}:{{line}})", //default format
      { error : "{{title}} {{message}} ({{file}}:{{line}})\nCall Stack:\n{{stack}}" } // error format
		],
		preprocess :  function(data){
			data.title = data.title.toUpperCase();
		}
})
log = tr.info
dbg = tr.debug

console.log = function(){
  logger.info.apply(logger, formatArgs(arguments));
}
console.info = function(){
  logger.info.apply(logger, formatArgs(arguments));
}
console.warn = function(){
  logger.warn.apply(logger, formatArgs(arguments));
}
console.error = function(){
  logger.error.apply(logger, formatArgs(arguments));
}
// console.debug = function(){
//   logger.debug.apply(logger, formatArgs(arguments));
// };
