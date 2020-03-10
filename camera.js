function cameraGo() {
    
    var options = {
        sourceType: Camera.PictureSourceType.CAMERA,
        // EncodingType: 'jpeg',
        allowEdit: true,
        targetWidth: 400,
        targetHeight: 300,
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        saveToPhotoAlbum: true
    };
    alert(navigator.camera);
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
