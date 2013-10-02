//var Gpio = require('onoff').Gpio,
//    led = new Gpio(67, 'out'),    // Export GPIO #67 as an output.
//    btn = new Gpio(44, 'in', 'falling', {
//        persistentWatch: true
//    }); // Export GPIO #44 as an interrupt
//
//led.writeSync(0);
//
//btn.watch(function (err, value) {
//    if (err) throw err;
//
//    console.log('Button pressed!, its value was ' + value);
//    if(value === 0)
//        led.writeSync(led.readSync() === 0 ? 1 : 0); // 1 = on, 0 = off :)
//    //btn.unexport(); // Unexport GPIO and free resources
//});

var idDeviceCnt = 0;
var idGroupCnt = 0;

var ob = function (o) {
    var F = function () {};
    F.prototype = o || {};
    var f = new F();
    return f;
};

var group = function (args) {
    var self = ob();

    args = args || {};

    self.id = idGroupCnt++;
    self.name = args.name;
    self.childGroups = args.childGroups || [];
    self.devices = args.devices || [];

    return self;
};

var devicePrototype = {
    toggle: function (state) {
        var self = this;

        if(self.actionType === 'onoff') {
            if(state) {
                b.digitalWrite(self.pin, state);
            } else {
                b.digitalWrite(self.pin, (1 - self.state || 0));
            }
        }
    }
};

var device = function (pin, args) {
    if(!pin || typeof pin !== 'string')
        return null;

    var self = ob(devicePrototype);

    args = args || {};

    self.id = idDeviceCnt++;
    self.actionType = args.actionType;
    self.type = args.type;
    self.pin = pin;
    self.name = args.name || 'untitled';
    self.state = args.state;
    self.controls = args.controls;

    if(args.actionType && args.actionType === 'onoff') {
        b.pinMode(args.pin, 'out');
        b.digitalWrite(self.pin, (self.state || 0));
    }

    return self;
};

var devices = {};
var groups = {};

devices['1'] = device('P8_8', {
    name: 'led',
    actionType: 'onoff',
    type: 'light',
    state: 0
});



var b = require('bonescript');

//var led = 'P8_8',
//    photo = 'P9_36';

//b.pinMode(led, 'out');
//b.pinMode(photo, 'in');

setInterval(function () {
    devices['1'].toggle();
//    b.analogRead(photo, function (x) {
//        if(x.err)
//            console.log('error', x.err);
//        else
//            console.log(x.value);
//    });
}, 500);