/* eslint-disable import/extensions */
/**
 * Copyright 2016-2020 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import TJBot from 'tjbot';
import config from './config.js';

// these are the hardware capabilities that TJ needs for this recipe
const hardware = [TJBot.HARDWARE.MICROPHONE, TJBot.HARDWARE.SPEAKER, TJBot.HARDWARE.LED_NEOPIXEL, TJBot.HARDWARE.SERVO];
if (config.hasCamera) {
    hardware.push(TJBot.HARDWARE.CAMERA);
}

// set up TJBot's configuration
const tjConfig = {
    log: {
        level: 'info', // change to 'verbose' or 'silly' for more detail about what TJBot is doing
    },
    converse: {
        assistantId: config.assistantId,
    }
};

// uncomment to change the pins for the LED
// tjConfig.shine = {
//     neopixel: {
//         gpioPin: 18
//     },
//     commonAnode: {
//         redPin: 19,
//         greenPin: 13,
//         bluePin: 12
//     }
// };

// uncomment to change the pin for the servo
// tjConfig.wave = {
//     servoPin: 7
// };

// instantiate our TJBot!
const tj = new TJBot(tjConfig);
tj.initialize(hardware);

console.log('This version listens to you and detects sarcasm or otherwise. That is all, there should be no response from me.');
console.log(`Try saying something sarcastic and I will try to determine if you are or not.`);
//console.log(`You can also say, "${config.robotName}, tell me a joke!"`);
console.log("Say 'stop' or press ctrl-c to exit this recipe.");
tj.pulse('cyan');
tj.pulse('cyan');
tj.pulse('cyan');
tj.pulse('cyan');
tj.pulse('cyan');

function shineForEmotion(emotion) {
    console.log(`Current emotion around ${config.sentimentKeyword} is ${emotion}`);

    switch (emotion) {
    case 'anger':
        //tj.shine('red');
        tj.pulse('red');
        tj.pulse('red');
        tj.pulse('red');
        tj.pulse('red');
         tj.pulse('red');
        break;
    case 'fear':
        //tj.shine('magenta');
        tj.pulse('magenta');
     tj.pulse('magenta');
     tj.pulse('magenta');
     tj.pulse('magenta');
     tj.pulse('magenta');
        break;
    case 'joy':
        //tj.shine('yellow');
        tj.pulse('yellow');
        tj.pulse('yellow');
        tj.pulse('yellow');
        tj.pulse('yellow');
        tj.pulse('yellow');
        break;
    case 'sadness':
        //tj.shine('blue');
        tj.pulse('blue');
        tj.pulse('blue');
        tj.pulse('blue');
        tj.pulse('blue');
        tj.pulse('blue');
        break;
    default:
        break;
    }
}

//Start light at off
tj.shine('off');
const CONFIDENCE_THRESHOLD = 0.5;

// listen for utterances with our attentionWord and send the result to
// the Assistant service
while (true) {
    const msg = await tj.listen();

    if (msg === 'quit') {
        console.log('Goodbye!');
        tj.pulse('orange');
        tj.pulse('orange');
        tj.pulse('orange');
        tj.pulse('orange');
        tj.pulse('orange');
        process.exit(0);
    }
   
    
const CONFIDENCE_THRESHOLD = 0.5;
    
    
     const utterance = msg.toLowerCase();
     
        // send to the assistant service
        const response = await tj.converse(utterance);
        let spoken = false;

        // check if an intent to control the bot was found
        if (response.object.intents !== undefined) {
            //if(utterance != '%hesitation %hesitation %hesitation' || utterance != '%HESITATION %HESITATION %HESITATION'){
         
            
                //}
                //END OF IF HESITATION
                
                const tone = await tj.analyzeTone(utterance);
         const emotionalTones = tone.document_tone.tones.filter((t) => t.tone_id === 'anger' || t.tone_id === 'fear' || t.tone_id === 'joy' || t.tone_id === 'sadness');
         console.log(utterance);
         console.log('the tone is: ' + tone);
          console.log(`found intent(s): ${JSON.stringify(response.object.intents)}`);

            // choose the most confident intent
            const intent = response.object.intents.reduce((max, i) => {
                return (i.confidence > max.confidence) ? i : max;
            }, {intent: '', confidence: 0.0});
            
             //const intent1 = response.object.intents.reduce((max, i) => {
              //  return (i.confidence > max.confidence) ? i : max;
            //}, {intent: '', confidence: 0.0});

            console.log(`selecting intent with maximum confidence: ${JSON.stringify(intent)}`);         
            console.log('the intent is' + JSON.stringify(intent.confidence));
         
          if (emotionalTones.length > 0) {
            //var num = 0;
            const maxTone = emotionalTones.reduce((a, b) => ((a.score > b.score) ? a : b));

            // make sure we really are confident
            if (maxTone.score >= CONFIDENCE_THRESHOLD) {
                if(intent.intent == 'sarcastic' && JSON.stringify(intent.confidence) > 0.9)
                {
                    if(maxTone.tone_id === 'joy')
                    {
                        console.log('Sarcastic happy');
                            await tj.pulse('green');
                            await tj.pulse('green');
                            await tj.pulse('green');
                            await tj.pulse('green');
                            await tj.pulse('green');
                    }
                    else if (maxTone.tone_id === 'anger')
                    {
                        console.log('Sarcastic angry');
                        await tj.pulse('green');
                        await tj.pulse('green');
                        await tj.pulse('green');
                        await tj.pulse('green');
                        await tj.pulse('green');
                    }
                }
                
            else if (intent.intent == 'genhappy' && maxTone.tone_id === 'joy' && utterance !== '%hesitation %hesitation %hesitation')
            {
                console.log('genuine happy');
                await tj.pulse('yellow');
                await tj.pulse('yellow');
                await tj.pulse('yellow');
                await tj.pulse('yellow');
                await tj.pulse('yellow');
            }
            
            else if (intent.intent !== 'sarcastic' && utterance !== '%hesitation %hesitation %hesitation')
            {
                shineForEmotion(maxTone.tone_id);
            }
            }
       
            //END OF EMOTIONAL TONE RESPONSE
            
            
        }
             else if (intent.intent == 'sarcastic' && JSON.stringify(intent.confidence) > 0.9)
            {
                console.log('sarcastic');
                    await tj.pulse('green');
                    await tj.pulse('green');
                    await tj.pulse('green');
                    await tj.pulse('green');
                    await tj.pulse('green');
            }
         //   else
          //  {
            //  await tj.speak (response.description);
             // spoken = true;  
             //}   
       // else if (intent.intent == 'sarcastic' && utterance !== '%hesitation %hesitation %hesitation')
                //{
                  // console.log('Sarcastic');
                   //         await tj.pulse('green');
                   //         await tj.pulse('green');
                    //        await tj.pulse('green');
                     //       await tj.pulse('green');
                     //       await tj.pulse('green');
               // }
}
//END OF IF RESPONSE IS NOT UNDEFINED
}
//END OF WHILE TRUE
