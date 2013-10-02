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

var b = require('bonescript');

var led = 'P9_8',
    photo = 'P8_36';

pinMode(led, 'out');
pinMode(photo, 'in');

setInterval(function (x) {
    if(x.err)
        console.log('error', x.err);
    else
        console.log(x.value);
}, 500);