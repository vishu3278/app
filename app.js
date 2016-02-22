function initdevice(){
    document.addEventListener("deviceready", onDeviceReady, false);
    window.addEventListener("batterystatus", onBatteryStatus, false);        
}

function onDeviceReady() {
//                alert(device.model);
    $("#model").html(device.model);
    $("#platform").html(device.platform);
}

function onBatteryStatus(info) {
    // Handle the online event
    // console.log("Level: " + info.level + " isPlugged: " + info.isPlugged);
    $("#batt").html(info.level)
}