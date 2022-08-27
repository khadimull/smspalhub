var larvitsmpp = require('larvitsmpp');

// This should of course be replaced with your preferred auth system
// function checkuserpass(username, password, callback) {
   //  if (username === 'foo' && password === 'bar') {
        // The last parameter is just user meta data that will be attached to the session as "userData" and is optional
      //   callback(null, true, { 'username': 'foo', 'userId': 123 });
    // } else {
   //      callback(null, false);
   //  }
// }

// larvitsmpp.server({
   //  'checkuserpass': checkuserpass
// }, function (err, serverSession) {
  //   if (err) {
  //       throw err;
  //   }

  larvitsmpp.server(function(err, serverSession) {
    if (err) {
        throw err;
    }

    serverSession.on('data', function(data) {
        console.log('command: ' + data.command);
    });


    // Incoming SMS!
    serverSession.on('sms', function (sms) {
        // It is important to run the sms.resp() since this is a part of the protocol
        sms.sendResp(
            // Status code
            // Default is ESME_ROK == no error
            // See SMPP spec for all available status codes
            // For example: ESME_RINVDSTADR == "Invalid destination address".
            'ESME_ROK'
        );

        // Oh, the sms sender wants a dlr (delivery report), send it!
        if (sms.dlr === true) {
            sms.sendDlr('RECEIVED');
        }
    });
});
