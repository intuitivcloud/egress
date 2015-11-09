'use strict';

var CLEAN_EXIT_CODE = 0;
var ABNORMAL_EXIT_CODE = 17;

exports.addHook = function (cleanUpHandler) {

  function shutdownHook(cause, err) {
    // re-entry protection
    if (process._shuttingDown) return;
    process._shuttingDown = true;

    cleanUpHandler(cause, err, function () {
      switch (cause) {
        case 'nodemon':
          return process.kill(process.pid, 'SIGUSR2');
        case 'error':
          return process.exit(ABNORMAL_EXIT_CODE);
        default:
          return process.exit(CLEAN_EXIT_CODE);
      }
    });
  }

  [
    { name: 'exit', cause: 'exit' },
    { name: 'SIGINT', cause: 'user' },
    { name: 'SIGTERM', cause: 'terminate' },
    { name: 'SIGUSR2', cause: 'nodemon' },
    { name: 'uncaughtException', cause: 'uncaughtException' }
  ].forEach(function (event) {
    process.once(event.name, shutdownHook.bind(null, event.cause));
  });

};
