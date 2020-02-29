function initdevice() {
    document.addEventListener("deviceready", onDeviceReady, false);
    // window.addEventListener("batterystatus", onBatteryStatus, false);

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

function getHtml (arguments) {
    $.get(arguments,function (data) {
        $("#page").html(data);
        rotate();
    })
}

var scanOptions = {
    "preferFrontCamera": true, // iOS and Android
    "showFlipCameraButton": true, // iOS and Android
    "prompt": "Place a barcode inside the scan area", // supported on Android only
    "formats": "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
    "orientation": "landscape"
};

function scanCard(arguments) {
    alert(cordova.plugins.barcodeScanner);
    cordova.plugins.barcodeScanner.scan(
        function(result) {
            alert(JSON.stringify(result));
            if (!result.cancelled) {
                // In this case we only want to process QR Codes
                if (result.format == "QR_CODE") {
                    var value = result.text;
                    // This is the retrieved content of the qr code
                    console.log(value);
                } else {
                    alert("Sorry, only qr codes this time ;)");
                }
            } else {
                alert("The user has dismissed the scan");
            }
        },
        function(error) {
            alert("Scanning failed: " + error);
        },
        scanOptions
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
