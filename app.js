function initdevice(){
    document.addEventListener("deviceready", onDeviceReady, false);
    window.addEventListener("batterystatus", onBatteryStatus, false);
}

function onDeviceReady() {
    $("#model").html(device.model);
    $("#platform").html("Platform = "+device.platform+"-"+device.version+"<br/>Cordova = "+device.cordova);
}

function onBatteryStatus(info) {
    // Handle the online event
    $("#batt").css({'width':info.level+'%'}).children("#percent").html(info.level);
    
    if(info.isPlugged == true){
        $("#plug").css({'background-color':'red'}).html('charging...');
    }else{
        $("#plug").css({'background-color':'green'}.html('unplugged.'));
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

    /*$(this).html(states[networkState]);*/
    alert('Connection type: ' + states[networkState]);
    return(states[networkState]);
}

function notic(){
    var conn = checkConnection();
<<<<<<< HEAD
    
=======
    $('#conn').html(conn);
>>>>>>> f5568f24a57db60710d7084b46627abc368f2709
}