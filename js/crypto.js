var subCrypto = crypto.subtle;

function initCrypt(jwk, iv){

    var callbacksuccess = function(cryptoKey){
        subCrypto.key = cryptoKey;
        var ivText = document.querySelector('#iv');
        var keyText = document.querySelector('#key');
        
        subCrypto.exportKey('jwk', cryptoKey).then(
            (key) => {
                ivText.value = arrayBufferToHex(subCrypto.initBuffer);
                keyText.value = JSON.stringify(key);
            }, (reason) => {
                console.log(reason);
            });
    }

    if(jwk){
        var jsonJwk = JSON.parse(jwk);
        subCrypto.initBuffer = toByteArray(iv);
        subCrypto.importKey('jwk', jsonJwk, { name : 'AES-CBC', length : 256}, true, ['encrypt', 'decrypt']).then(
            callbacksuccess,
            (reason) => {

            }
        );
    }
    else if(!subCrypto.initialized){
        var buffer = new Uint8Array(16);
        crypto.getRandomValues(buffer);
        subCrypto.initBuffer = buffer;
        subCrypto.initialized = true;

        subCrypto.generateKey({ name : 'AES-CBC', length : 256}, true, ['encrypt', 'decrypt']).
        then( 
            callbacksuccess, 
            (reason) => {
            console.log(reason);
        } );
    }
}

function crypt(data){
    var dataEncoded = stringToByteArray(data);
    return subCrypto.encrypt({"name": "AES-CBC",  iv: subCrypto.initBuffer}, subCrypto.key, dataEncoded);
}

function decrypt(data){
    var byteArray = toByteArray(data);
    return subCrypto.decrypt({"name": "AES-CBC",  iv: subCrypto.initBuffer}, subCrypto.key, byteArray);
}

function arrayBufferToHex (arrayBuffer) {
    if (typeof arrayBuffer !== 'object' || arrayBuffer === null || typeof arrayBuffer.byteLength !== 'number') {
      throw new TypeError('Expected input to be an ArrayBuffer');
    }
  
    var view = new Uint8Array(arrayBuffer);
    var result = '';
    var value;
  
    for (var i = 0; i < view.length; i++) {
      value = view[i].toString(16);
      result += (value.length === 1 ? '0' + value : value);
    }
  
    return result;
  }

function toByteArray(hexString) {
    var result = [];
    while (hexString.length >= 2) {
        result.push(parseInt(hexString.substring(0, 2), 16));
        hexString = hexString.substring(2, hexString.length);
    }
    return new Uint8Array(result);
}

function stringToByteArray(string){
    var array = [];
    for(var i = 0; i < string.length; i++){
        array.push(string.charCodeAt(i));
    }

    return new Uint8Array(array);
}

function byteArrayToString(array){
    var string = '';

    var byteArray;

    if(!array.forEach){
        byteArray = new Uint8Array(array);
    }

    byteArray.forEach((item) =>{
        string += String.fromCharCode(item);
    });

    return string;
}