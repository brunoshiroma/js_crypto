function onReady(){
    
    var encButton = document.querySelector('#encButton');
    encButton.addEventListener('click', encButtonClick);

    var dencButton = document.querySelector('#dencButton');
    dencButton.addEventListener('click', dencButtonClick);

    var dencButton = document.querySelector('#ivButton');
    dencButton.addEventListener('click', setupCrypt);
}

function setupCrypt(){
    
    var iv = document.querySelector('#iv');
    var key = document.querySelector('#key');
    
    initCrypt(key.value, iv.value);
}

function encButtonClick(){
    
    var data = document.querySelector('#data');

    crypt(data.value).then(
        (enc) => {
            document.querySelector('#result').value = arrayBufferToHex(enc) ;
        }
    );

}

function dencButtonClick(){
    
    var data = document.querySelector('#data');

    decrypt(data.value).then( (data) => {
        document.querySelector('#result').value = new TextDecoder().decode(data) ;
    }, (reason) => {
        console.log(reason);
    });

}