var Gpio = require('onoff').Gpio,
    led = new Gpio(67, 'out'),    // Export GPIO #67 as an output.
    btn = new Gpio(44, 'in', 'falling'); // Export GPIO #44 as an interrupt

btn.watch(function (err, value) {
    if (err) throw err;

    console.log('Button pressed!, its value was ' + value);
    led.writeSync(led.readSync() === 0 ? 1 : 0); // 1 = on, 0 = off :)
    //btn.unexport(); // Unexport GPIO and free resources
});

