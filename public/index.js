
function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}



if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
};



navigator.serviceWorker.ready.then((registration) => { // ServiceWorker 대기

    registration.pushManager.getSubscription().then((subscription) => { //구독여부 확인

        if (subscription) {
            document.querySelector("input.endpoint").value = subscription.endpoint;
            document.querySelector("input.p256dh").value = _arrayBufferToBase64(subscription.getKey("p256dh"))
            document.querySelector("input.auth").value = _arrayBufferToBase64(subscription.getKey("auth"))
        }
        else{
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: "BKey8i5zEzeRcUy4KjC7OlnMMhcJiZGHW_tPDv4GvHOJ-FXU33dGhrVoWm8Soj2dVkTagK3zozfKkqTBiFj_odk"
            })
            .then((subscription) => {
                document.querySelector("input.endpoint").value = subscription.endpoint;
                document.querySelector("input.p256dh").value = _arrayBufferToBase64(subscription.getKey("p256dh"))
                document.querySelector("input.auth").value = _arrayBufferToBase64(subscription.getKey("auth"))
            });
        }

    });
});

