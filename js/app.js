function initdevice() {
    document.addEventListener("deviceready", onDeviceReady, false);
    window.addEventListener("batterystatus", onBatteryStatus, false);
    //    alert("Body loaded");

}

function onDeviceReady() {
    alert("device ready");
    checkConnection();
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    $("#networkError").html(states[networkState]);
    alert('Connection type: ' + states[networkState]);
    return (states[networkState]);
}

function scanCard(arguments) {
    cordova.plugins.barcodeScanner.scan(
        function(result) {
            alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
        },
        function(error) {
            alert("Scanning failed: " + error);
        }, {
            preferFrontCamera: true, // iOS and Android
            showFlipCameraButton: true, // iOS and Android
            showTorchButton: true, // iOS and Android
            torchOn: true, // Android, launch with the torch switched on (if available)
            saveHistory: true, // Android, save scan history (default false)
            prompt: "Place a barcode inside the scan area", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            orientation: "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
        }
    );
}

function cameraGo(elem) {
    var options = {
        sourceType: Camera.PictureSourceType.CAMERA,
        //        sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
        //        quality:50,
        destinationType: Camera.DestinationType.FILE_URI
    };

    navigator.camera.getPicture(successCallback, errorCallback, options);

    function successCallback(imageURI) {
        $("#capturi").html(imageURI);
        $("#capture").attr('src', imageURI);
    };

    function errorCallback(message) {
        alert(message);
    }
}

function cameraClean() {
    navigator.camera.cleanup(onSuccess, onFail);

    function onSuccess() {
        console.log("Camera cleanup success.")
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}

function rotate() {
    //    navigator.compass.getCurrentHeading(compassSuccess, compassError);

    var options = {
        frequency: 1000
    };

    function onSuccess(heading) {
        /*var element = document.getElementById('heading');
        element.innerHTML = 'Heading: ' + heading.magneticHeading;*/
        $("#magnet").html(heading.magneticHeading);
        $("#compass").css({ 'transform': 'rotate(' + heading.magneticHeading + 'deg)' });
    };

    function onError(compassError) {
        alert('Compass error: ' + compassError.code);
    };

    var watchID = navigator.compass.watchHeading(onSuccess, onError, options);
}