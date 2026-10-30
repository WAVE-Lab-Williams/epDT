/*
===============================================================
PUSHING/RUNNING A CUSTOM SINGLE TRIAL (*singleTrial)
===============================================================
*/
function runSingleTrial(
    picType,
    effortType,
    trueTrialCounter,
    timelineTrialsToPush,
    trialType,
) {

    /*--------------------------- General Utility ---------------------------*/
    var checkScreen = {
        type: jsPsychFullscreen,
        message:
            '<p>Unfortunately, it appears you are no longer in fullscreen mode. Please make sure to remain in fullscreen mode. <br>Click on the button to fullscreen the experiment again and proceed.</p>',
        fullscreen_mode: true,
        button_label: 'Resume',
    };

    var if_notFull = {
        timeline: [checkScreen],
        conditional_function: function () {
            if (full_check == false) {
                return true;
            } else {
                return false;
            }
        },
    };

    var cursor_off = {
        type: jsPsychCallFunction,
        func: function () {
            document.body.style.cursor = 'none';
        },
    };

    var cursor_on = {
        type: jsPsychCallFunction,
        func: function () {
            document.body.style.cursor = 'auto';
        },
    };

    /*--------------------------- Experiment specific variables ---------------------------*/
    var currentStim = `${currentStimFolder}${picType}_${effortType}`
    var persistent_prompt = `<div style="position: fixed; top: 25px; left: 50%; transform: translateX(-50%); text-align: center;">Press the spacebar when you're ready to move to the next image.</div>`;

    var random_y_pos = randomIntFromRange(100, h-imgHeight); // generate a random number that will fall within the screen region (taking into account the image size)

    function dispImage(useStim){
        var actualImage = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus:  function(){
                w =
                    window.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.body.clientWidth;
                var x_pos = (w/2)-(imgWidth/2)
                var display = `<div style="position: absolute; top: ${random_y_pos}px; left: ${x_pos}px;">`+
                `<img src="${useStim}.png" style="width:${imgWidth}px; height:${imgHeight}px" />` + 
                `</div>`;
                return display},
            choices: " ",
            trial_duration: MAX_IMAGE_TIME,
            prompt: `${persistent_prompt}`,
            data: {
                trial_category: "answer" + trialType,
                trial_stimulus: useStim,
                picType: picType,
                effortType: effortType,
                dispImage_duration: MAX_IMAGE_TIME, // this is to see what the dispImg duration was, otherwise trial_duration would just be null for this answer trial
                y_position: random_y_pos,
                trueTrialCounter: trueTrialCounter,
            }, // data end
            on_finish: function(){
                console.log(useStim, random_y_pos)
            }
        }; // dispCircle end
        return actualImage
    };
    

    // var prestim = {
    //     type: jsPsychHtmlKeyboardResponse,
    //     stimulus: `${persistent_prompt}`,
    //     choices: "NO_KEYS",
    //     trial_duration: PRESTIM_DISP_TIME,
    //     data: {
    //         trial_category: 'prestim_ISI' + trialType,
    //     }
    // };

    // var fixation = {
    //     type: jsPsychHtmlKeyboardResponse,
    //     stimulus: `<div style="font-size:60px;">+</div>`,
    //     prompt:`${persistent_prompt}`,
    //     choices: "NO_KEYS",
    //     trial_duration: FIXATION_DISP_TIME,
    //     data: {
    //         trial_category: 'fixation' + trialType,
    //     }
    // };

    // var mask = {
    //     type: jsPsychHtmlKeyboardResponse,
    //     stimulus: function(){
    //         w =
    //             window.innerWidth ||
    //             document.documentElement.clientWidth ||
    //             document.body.clientWidth;
    //         var x_pos = (w/2)-(imgWidth/2)
    //         var display = `${persistent_prompt}<div style="position: absolute; top: ${random_y_pos}px; left: ${x_pos}px;">`+
    //         `<img src="${generalFolder}mask.png" style="width:${imgWidth}px; height:${imgHeight}px" />` + 
    //         `</div>`
    //         return display
    //     },
    //     choices: "NO_KEYS",
    //     trial_duration: MASK_DISP_TIME,
    //     data: {
    //         trial_category: 'mask' + trialType,
    //     }
    // };



    /*--------------------------- push single trial sequence ---------------------------*/

    timelineTrialsToPush.push(if_notFull);
    timelineTrialsToPush.push(cursor_off);
    // timelineTrialsToPush.push(prestim);
    // timelineTrialsToPush.push(fixation);
    timelineTrialsToPush.push(dispImage(currentStim));
    timelineTrialsToPush.push(cursor_on);

}