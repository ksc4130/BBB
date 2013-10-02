var b = require('bonescript');

var idDeviceCnt = 0;
var idGroupCnt = 0;

var analogPins = [
    'P9_33',
    'P9_35',
    'P9_36',
    'P9_37',
    'P9_38',
    'P9_39',
    'P9_40',
]

var Group = function (args) {
    var self = this;

    args = args || {};

    self.id = idGroupCnt++;
    self.name = args.name;
    self.childGroups = args.childGroups || [];
    self.devices = args.devices || [];

    return self;
};

var Device = function (pin, args) {
    if(!pin || typeof pin !== 'string')
        return null;

    var self = this;

    args = args || {};

    self.id = idDeviceCnt++;
    self.actionType = args.actionType;
    self.type = args.type;
    self.pin = pin;
    self.name = args.name || 'untitled';
    self.state = args.state;
    self.controls = args.controls;
    self.freq = args.freq || 5;

    self.switchCheck = function () {
        b.digitalRead(self.pin, function (x) {
            var curState = x.value;
            if(curState < self.state) {
                self.toggle();
            }
            self.state = curState;
        });
    };

    self.sensorCheck = function () {
        if(analogPins.indexOf(self.pin) > -1) {
            b.analogRead(self.pin, function (x) {
                var curState = x.value;
                console.log(curState);
                self.state = curState;
            });
        } else {
            b.digitalRead(self.pin, function (x) {
                var curState = x.value;
                if(curState < self.state) {
                    self.toggle();
                }
                self.state = curState;
            });
        }
    };

    self.toggle = function (state) {
        if(self.actionType === 'onoff') {
            self.state = state || (1 - (self.state || 0))
            b.digitalWrite(self.pin, self.state);
        } else if(self.actionType === 'switch') {
            var controls = self.controls;
            if(typeof controls === 'string') {
                for (var d in devices) {
                    if(devices[d].pin === controls) {
                        controls = devices[d];
                    }
                }
            }
            controls.toggle();
        }
    };

    if(args.actionType && args.actionType === 'onoff') {
        b.pinMode(self.pin, 'out');
        b.digitalWrite(self.pin, (self.state || 0));
    } else if(args.actionType && args.actionType === 'switch') {
        b.pinMode(self.pin, 'in');

        setInterval(self.switchCheck, self.freq);
    } else if(args.actionType && args.actionType === 'sensor') {
        b.pinMode(self.pin, 'in');

        setInterval(self.sensorCheck, self.freq);
    }

    return self;
};


var devices = {};
var groups = {};

devices['1'] = new Device('P8_8', {
    name: 'led',
    actionType: 'onoff',
    type: 'light',
    state: 0
});

devices['2'] = new Device('P8_12', {
    name: 'led switch',
    actionType: 'switch',
    type: 'light',
    controls: 'P8_8'
});

devices['3'] = new Device('P8_10', {
    name: 'led 2',
    actionType: 'onoff',
    type: 'light',
    state: 0
});

devices['4'] = new Device('P8_14', {
    name: 'led 2 switch',
    actionType: 'switch',
    type: 'light',
    controls: 'P8_10'
});

devices['5'] = new Device('P9_36', {
    name: 'photo',
    actionType: 'sensor',
    type: 'motion'
});
