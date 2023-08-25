/* eslint-disable no-undef */
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
const hardware = [TJBot.HARDWARE.LED_NEOPIXEL];


// set up TJBot's configuration
const tjConfig = {
    log: {
        level: 'info', // change to 'verbose' or 'silly' for more detail about what TJBot is doing
    }
};
    
 const tj = new TJBot(tjConfig);
tj.initialize(hardware);
console.log('The program started up');

tj.pulse('cyan');
        tj.pulse('cyan');
        tj.pulse('cyan');
        tj.pulse('cyan');
        tj.pulse('cyan');
