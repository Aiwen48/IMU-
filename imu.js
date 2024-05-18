let lastUpdate=0;
let lastGyroUpdate=0;
const accelUpdateInterva=50;
const hyroupdateInterval=50;//1000ms(1s)/20 samples per second

// Request permission to access device orientation and motion data
if (DeviceMotionEvent.requestPermission && DeviceOrientationEvent.requestPermission) {
    Promise.all([
        DeviceMotionEvent.requestPermission(),
        DeviceOrientationEvent.requestPermission()
    ]).then(results => {
        if (results[0] === 'granted' && results[1] === 'granted') {
            startUpdating();
        }
    }).catch(console.error);
} else {
    // Handle old browsers that do not support DeviceMotionEvent.requestPermission
    // or DeviceOrientationEvent.requestPermission
    startUpdating();
}

// Function to start the update loop
function startUpdating() {
    window.addEventListener('devicemotion', handleAccelEvent);
    window.addEventListener('deviceorientation', handleGyroEvent);
    setInterval(updateAcceleration, accelUpdateInterval);
    setInterval(updateGyroscope, gyroUpdateInterval);
}

// Function to handle acceleration events and get acceleration data
function handleAccelEvent(event) {
    // Do nothing here since we are using setInterval for updates
}

// Function to handle gyroscope events and get gyroscope data
function handleGyroEvent(event) {
    // Do nothing here since we are using setInterval for updates
}

// Function to update acceleration data
function updateAcceleration() {
    // Get acceleration data
    const acceleration = getCurrentAcceleration();

    // Update UI with acceleration data
    updateAccelerationUI(acceleration);
}

// Function to update gyroscope data
function updateGyroscope() {
    // Get gyroscope data
    const gyroscope = getCurrentGyroscope();

    // Update UI with gyroscope data
    updateGyroscopeUI(gyroscope);
}

// Function to get current acceleration
function getCurrentAcceleration() {
    const acceleration = {
        x: 0,
        y: 0,
        z: 0
    };

    if (window.DeviceMotionEvent) {
        acceleration.x = event.accelerationIncludingGravity.x;
        acceleration.y = event.accelerationIncludingGravity.y;
        acceleration.z = event.accelerationIncludingGravity.z;
    }

    return acceleration;
}

// Function to get current gyroscope data
function getCurrentGyroscope() {
    const gyroscope = {
        alpha: 0,
        beta: 0,
        gamma: 0
    };

    if (window.DeviceOrientationEvent) {
        gyroscope.alpha = event.alpha;
        gyroscope.beta = event.beta;
        gyroscope.gamma = event.gamma;
    }

    return gyroscope;
}

// Function to update the UI with acceleration data
function updateAccelerationUI(acceleration) {
    const accelerationDiv = document.getElementById('acceleration');
    accelerationDiv.innerHTML = `Acceleration:<br>
        X: ${acceleration.x.toFixed(2)} m/s<sup>2</sup><br>
        Y: ${acceleration.y.toFixed(2)} m/s<sup>2</sup><br>
        Z: ${acceleration.z.toFixed(2)} m/s<sup>2</sup>`;
}

// Function to update the UI with gyroscope data
function updateGyroscopeUI(gyroscope) {
    const gyroscopeDiv = document.getElementById('gyroscope');
    gyroscopeDiv.innerHTML = `Gyroscope:<br>
        Alpha: ${gyroscope.alpha.toFixed(2)}<br>
        Beta: ${gyroscope.beta.toFixed(2)}<br>
        Gamma: ${gyroscope.gamma.toFixed(2)}`;
}