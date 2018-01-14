function onReady(){
    
    initCrypt();

    var encButton = document.querySelector('#encButton');
    encButton.addEventListener('click', encButtonClick);

    var dencButton = document.querySelector('#dencButton');
    dencButton.addEventListener('click', dencButtonClick);

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