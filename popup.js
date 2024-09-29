


window.recordStart =false;




const lamp = document.getElementById(`lamp`);
const  btn =document.getElementById('startBtn');



btn.addEventListener('click', () => {

   
    const selector = document.getElementById('canvasSelector').value;


 



    if(window.recordStart){

        lamp.style.background='#151542'
        btn.value='Start Record'
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'stopRecording' });
        });


    }else{

       
           
     
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'startRecording', canvasSelector: selector });
                btn.value='Stop Record'
                lamp.style.background='#ff0000'     
        });

    
    }

  

    window.recordStart =!window.recordStart;
    
    


});
/*

document.getElementById('stopBtn').addEventListener('click', () => {
     lamp.style.background='tan'
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'stopRecording' });
    })

});
*/
