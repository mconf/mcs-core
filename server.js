var config = require('config');
var mcs = require('./lib/media/MCSApiStub.js');

function stopAndExit(error) {
  var exitTime = config.get('kurento.exitTimeout');

  setTimeout( function() { process.exit(1); }, exitTime );
}

process.stdin.resume();

process.on('SIGTERM', stopAndExit);
process.on('SIGINT', stopAndExit);

process.on('uncaughtException', function(e)
{
    console.log('[uncaughtException] app should be terminated: ', e.stack);
    //stopAndExit(e);
});
