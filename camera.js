function cameraGo() {
    alert("camera ready");
    var options = {
        sourceType: Camera.PictureSourceType.CAMERA,
        //  sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
    };

    navigator.camera.getPicture(successCallback, errorCallback, options);

    function successCallback(imageURI) {
        document.getElementById("imgPreview").src = imageURI;
        navigator.notification.alert("success");
        cameraClean();
    };

    function errorCallback(error) {
        navigator.notification.alert(error);
    }
}

function cameraClean() {
    navigator.camera.cleanup(onSuccess, onFail);

    function onSuccess() {
        console.log("Camera cleanup success.")
    }

    function onFail(message) {
        navigator.notification.alert('Failed because: ' + message);
    }
}