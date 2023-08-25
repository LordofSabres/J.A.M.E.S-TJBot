import TJBot from 'tjbot';
const hardware = [TJBot.HARDWARE.MICROPHONE, TJBot.HARDWARE.LED_NEOPIXEL];
const tjConfig = {
    log: {
        level: 'info', // change to 'verbose' or 'silly' for more detail about what TJBot is doing
    },
};

const tj = new TJBot(tjConfig);
tj.initialize(hardware);

console.log('Say anything and I will analyze the tone of what you said');


function processText(text) {
  console.log(text);
  
  tj.analyzeTone(text).then(response => {
    console.log(response);
    
    var emotions = response.document_tone.tone_categories[0].tones;
    var top = emotions[Object.keys(emotions).reduce((a, b) => {
        return emotions[a].score > emotions[b].score ? a : b
    })];
    console.log(top);
    
    var colors = {
      "anger": "red",
      "disgust": "green",
      "fear": "magenta",
      "joy": "yellow",
      "sadness": "blue"  
    };
    
    tj.shine(colors[top.tone_id]);
  });
}

while (true) {

const msg = await tj.listen();
const txt = processText(msg);
    if (msg === 'stop') {
        console.log('Goodbye!');
        process.exit(0);
    }
    
}
