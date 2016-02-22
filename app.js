function initdevice(){
    document.addEventListener("deviceready", onDeviceReady, false);
    window.addEventListener("batterystatus", onBatteryStatus, false);
}

function onDeviceReady() {
    $("#model").html(device.model);
    $("#platform").html("Platform = "+device.platform+" + Cordova = "+device.cordova);
}

function onBatteryStatus(info) {
    // Handle the online event
    $("#batt").html("Battery level = "+info.level);
}