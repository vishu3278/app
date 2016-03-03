function initdevice(){
    document.addEventListener("deviceready", onDeviceReady, false);
    window.addEventListener("batterystatus", onBatteryStatus, false);
    alert("Body loaded");
}

function onDeviceReady() {
    alert("device ready");
    $("#model").html(device.model);
    $("#platform").html("Platform = "+device.platform+"-"+device.version+"<br/>Cordova = "+device.cordova);    
}

function onBatteryStatus(info) {
    // Handle the online event
    $("#batt").prop('data-percent',info.level).children("#percent").html(info.level+"%");
    
    if(info.isPlugged == false){
        $("#plug").html('Device is unplugged.');
    }else{
        $("#plug").html('Device is charging...');
    }
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    $(this).html(states[networkState]);
//    alert('Connection type: ' + states[networkState]);
    return(states[networkState]);
}

function notic(elem){
    var conn = checkConnection(),
        elem = $(elem);
    
    elem.html(conn);
}

function cameraGo(elem){
    var options = {
//        sourceType:Camera.PictureSourceType.CAMERA,
        sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
//        quality:50,
        destinationType:Camera.DestinationType.FILE_URI
    };
    
    navigator.camera.getPicture(successCallback, errorCallback, options);

    function successCallback(imageURI){
        $("#capturi").html(imageURI);
        $("#capture").attr('src',imageURI);
    };
    function errorCallback (message) {
        alert(message);
    }
}

function cameraClean(){
    navigator.camera.cleanup(onSuccess, onFail);
 
    function onSuccess() {
        console.log("Camera cleanup success.")
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
}