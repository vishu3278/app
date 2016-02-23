function initdevice(){
    document.addEventListener("deviceready", onDeviceReady, false);
    window.addEventListener("batterystatus", onBatteryStatus, false);
}

function onDeviceReady() {
    $("#model").html(device.model);
    $("#platform").html("Platform = "+device.platform+"<br/>Cordova = "+device.cordova);
}

function onBatteryStatus(info) {
    // Handle the online event
    $("#batt").css({'width': info.level});
    if(info.isPlugged == true){
        $("#plug").css({'background-color':'red'});
    }else{
        $("#plug").css({'background-color':'green'});
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

//    alert('Connection type: ' + states[networkState]);
//    return(states[networkState]);
    $(this).html(states[networkState]);
}

