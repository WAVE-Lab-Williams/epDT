/*
===============================================================
Defining Parameter Variables
===============================================================
*/
// FYI: currentType (typeDown = hands at bottom of frame, typeSide = hands at side) and
// currentStimFolder are resolved in startExperiment() (timeline.js) once the WAVE
// config is available, using the same asList/CONFIG_DEFAULTS pattern as the other
// config-driven factors below (see base_type).

// Basically, this is a one-time quirk of just epCD, and shouldn't be the norm for others
// this results in the real stimuli images being pulled from currentStimFolder, which is 
// stimFolder + currentType

var stimFolder = `src/assets/stimuli/cabinets/`
var currentType;
var currentStimFolder;
var generalFolder = 'src/assets/stimuli/other/'

var runIntro = true;
var runInstr = true;
var runExpt = true;
var runClose = true;
var runPreload = true;

/*
---------------------------------------------------------------
Live tunable experiment hyperparameters (Sets Defaults)
---------------------------------------------------------------
Sets DEFAULT values for adjustable experiment variables that may
later need to change while the experiment is still live.
These defaults are used when running locally, or when an
experiment has no backend config set. At runtime, the experiment pulls `config`
from the WAVE backend (if available) and merges it OVER these defaults
(see startExperiment() in timeline.js). A researcher can thus easily change
one of these variables (via the setup_experiment.ipynb notebook / API)
instead of having to edit the file and do PRs.
*/
var CONFIG_DEFAULTS = {
    number_of_repetitions: 2,
    base_fullness: ["Half"], // has "Full", "Half", "ExtraFull" or both
    base_hand_style: ["Fist", "PPR", "Reach"],
    base_type: ["typeDown", "typeSide"], // typeDown for hands positioned at the bottom of the frame, typeSide for hands positioned at the side
};

// Defining Core Variables that remain constant
var PRESTIM_DISP_TIME = 800;
var FIXATION_DISP_TIME = 500;
var MASK_DISP_TIME = 300;

// Variables for Participant Information
var estTotalRunTime = 5;
var estDollars = 0.90;
var participantType = 'prolific';
var completionCode = 'CFR2PRXS';
var prolific_url = 'https://app.prolific.co/submissions/complete?cc='+completionCode;

// WAVE Backend Configuration
var waveBackendUrl = 'https://wave-backend-production-8781.up.railway.app';
// var waveBackendUrl = 'http://localhost:8000';  // For local development

// initializing variables
var timelinebase = [];
var timelineintro = [];
var timelineinstr = [];
var timelineexpt = [];
var timelineclose = [];
var forPreload = [];
var full_check = false;
var w =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
var h =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

// setting display image width
var origWidth = 1920;
var origHeight = 1080;
var imgWidth = 800; // your desired display img width
var imgHeight = (imgWidth / origWidth) * origHeight;


