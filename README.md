# egress
Shut your node.js apps more gracefully.

[![Circle CI](https://circleci.com/gh/intuitivcloud/egress.svg?style=svg&circle-token=75e21e88bdc5496bd8be734f3948e272890d7575)](https://circleci.com/gh/intuitivcloud/egress)

`egress` allows you to add required shutd-down hooks to your node.js application so that you can perform
any cleanup.

## Example

``` javascript
var egress = require('egress');

// ... once your application has started
egress.addHook(function (cause, err, done) {
  switch (cause) {
    case 'exit':
      // do cleanup for graceful exit
      break;
    case 'user':
      // do cleanup for user interrupt
      break;
    case 'terminate':
      // do cleanup for OS terminate signal
      break;
    case 'nodemon':
      // do cleanup when exit signal received from tools like nodemon (SIGUSR2)
      break;
    case 'error':
      // do cleanup when process is about to crash due to an unhandled execption
      // here the err parameter is set
      console.error('Unexpected error', err);
      break;
  }

  return done();
});
```

## License

Copyright (c) 2015, intuitivcloud Systems <engineering@intuitivcloud.com> All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

Neither the name of signalman nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
