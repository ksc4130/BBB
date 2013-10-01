var Gpio = require('onoff').Gpio,
    led = new Gpio(67, 'out'),    // Export GPIO #67 as an output.
    btn = new Gpio(44, 'in', 'both'), // Export GPIO #18 as an interrupt
    iv;

btn.watch(function (err, value) {
    if (err) throw err;

    console.log('Button pressed!, its value was ' + value);

    btn.unexport(); // Unexport GPIO and free resources
});

// Toggle the state of the LED on GPIO #17 every 200ms.
// Here synchronous methods are used. Asynchronous methods are also available.
iv = setInterval(function() {
    led.writeSync(led.readSync() === 0 ? 1 : 0); // 1 = on, 0 = off :)
}, 200);

// Stop blinking the LED and turn it off after 5 seconds.
setTimeout(function() {
    clearInterval(iv); // Stop blinking
    led.writeSync(0);  // Turn LED off.
    led.unexport();    // Unexport GPIO and free resources
}, 5000);