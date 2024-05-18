let imuDataDiv = document.getElementById('imuData');
let connectBtn = document.getElementById('connectBtn');
let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn');
let sendSignalBtn = document.getElementById('sendSignalBtn');
let bluetoothDevice;

// Check if Web Bluetooth is supported
if ('bluetooth' in navigator) {
    console.log('Web Bluetooth is supported.');
} else {
    console.log('Web Bluetooth is not supported.');
}

// Function to connect to Bluetooth device
async function connectToDevice() {
    try {
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ services: [/* Service UUIDs */] }],
        });

        // Save reference to the connected device
        bluetoothDevice = device;

        // Enable other buttons
        startBtn.disabled = false;
        sendSignalBtn.disabled = false;

        console.log('Connected to Bluetooth Device:', device.name);
    } catch (error) {
        console.error('Failed to connect to Bluetooth device:', error);
    }
}

connectBtn.addEventListener('click', connectToDevice);

startBtn.addEventListener('click', async function() {
    try {
        const service = await bluetoothDevice.gatt.connect();
        const characteristic = await service.getCharacteristic(/* Characteristic UUID */);

        characteristic.addEventListener('characteristicvaluechanged', handleData);

        await characteristic.startNotifications();
        console.log('Started receiving IMU data');
        stopBtn.disabled = false;
    } catch (error) {
        console.error('Error starting notifications:', error);
    }
});

stopBtn.addEventListener('click', async function() {
    try {
        const service = await bluetoothDevice.gatt.connect();
        const characteristic = await service.getCharacteristic(/* Characteristic UUID */);

        await characteristic.stopNotifications();
        console.log('Stopped receiving IMU data');
        stopBtn.disabled = true;
    } catch (error) {
        console.error('Error stopping notifications:', error);
    }
});

sendSignalBtn.addEventListener('click', async function() {
    try {
        const service = await bluetoothDevice.gatt.connect();
        const characteristic = await service.getCharacteristic(/* Characteristic UUID */);

        // Your code to send a signal to the device
        const signalData = new Uint8Array(/* Signal data */);
        await characteristic.writeValue(signalData);

        console.log('Signal sent to IMU device');
    } catch (error) {
        console.error('Error sending signal:', error);
    }
});

function handleData(event) {
    const value = event.target.value;
    // Process received data
    console.log('Received IMU data:', value);
}
