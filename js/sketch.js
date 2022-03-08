//Andrew Ellender
let photoback, running, jumping, dude,filter, effect1,  effect2, mysteryblock, block, state, blockaction, synth;
let dudeimagejump = []; 
let dudeimagerun = [];
let sequence1, simpSynth;
let melody = ["C4", "E4", "D4", "E4", "G3", "A4", "G4"];

function preload(){
  mysteryblock = loadImage("media/2dmys.png");
  photoback = loadImage("media/background.jpg");
  dudeimagerun[0] = loadImage("media/run1.png");
  dudeimagerun[1] = loadImage("media/run2.png");
  dudeimagerun[2] = loadImage("media/run3.png");
  dudeimagerun[3] = loadImage("media/run4.png");
  dudeimagerun[4] = loadImage("media/run5.png");
  dudeimagerun[5] = loadImage("media/run6.png");
  dudeimagejump[0] = loadImage("media/jump1.png");
  dudeimagejump[1] = loadImage("media/jump2.png");
  dudeimagejump[2] = loadImage("media/jump3.png");
  dudeimagejump[3] = loadImage("media/jump4.png");
  dudeimagejump[4] = loadImage("media/jump5.png");
  dudeimagejump[5] = loadImage("media/jump6.png");
  dudeimagejump[6] = loadImage("media/jump7.png");
  dudeimagejump[7] = loadImage("media/jump8.png");
  dudeimagejump[8] = loadImage("media/jump9.png");
  dudeimagejump[9] = loadImage("media/jump10.png");
  dudeimagejump[10] = loadImage("media/jump11.png");
  dudeimagejump[11] = loadImage("media/jump12.png");
  dudeimagejump[12] = loadImage("media/jump13.png");
}


function setup(){
  createCanvas(1200,800);
state = "start";

  photoback.resize(1200,800);
  dude = createSprite(600,600,50,50);
  block = createSprite(600,325,100,100);
  blockaction = block.addAnimation("block", mysteryblock);
  running = dude.addAnimation("run", dudeimagerun[5],dudeimagerun[4],dudeimagerun[3],dudeimagerun[2],dudeimagerun[1],dudeimagerun[0]);
  jumping = dude.addAnimation("jump", dudeimagejump[0], dudeimagejump[1], dudeimagejump[2], dudeimagejump[3], dudeimagejump[4], dudeimagejump[5], dudeimagejump[6], dudeimagejump[7], dudeimagejump[8], dudeimagejump[9], dudeimagejump[10], dudeimagejump[11], dudeimagejump[12]);
 
  var effect2 = new Tone.FeedbackDelay();
  effect3JSON = {
      "delayTime" : "16n", 
      "feedback" : 0.3,
      "wet": 0.4
  };

  var effect1 = new Tone.JCReverb();
  effect1JSON = {
      "roomSize" : 0.6,
      "wet": 0.4
  };

  filter = new Tone.AutoFilter().start();
  

  const comp = new Tone.Compressor(-30, 3);
  const vol = new Tone.Volume(-50);

  synth = new Tone.MembraneSynth({ 
    "volume": -16,
    "harmonicity": 0.5,
    "modulationIndex" : 1.2,
  "oscillator": {
    "type": "square" 
  },
  "envelope": { 
    "attack": 0.07,
    "decay": 0.7,
    "sustain": 1,
    "release": 5
  },
  "modulation" : {
    "volume": 0,
    "type" : "square"
  },
  "modulationEnvelope" : {
    "attack": 0.9,
    "decay": 0.5,
    "sustain": 1,
    "release": 0.05
}
}).toDestination();

synth.chain(filter, effect1, effect2, comp, Tone.Destination);

  


}

function draw(){
  
  background(photoback);
  if(state === "start"){
    textSize(64);
   text("click to start", 400, 400);
   if(mouseIsPressed){
     state = "play";
   }
  }
   else if(state === "play"){
    drawSprites();
  if(block.position.y == 325){
    block.velocity.y = 0;
  }
  if(dude.position.y == 550){
    dude.velocity.y = 1;
    block.velocity.y = -1;
  }
  if(dude.position.y == 600){
    dude.velocity.y = 0;
    dude.changeAnimation("run");
  }
  if(block.position.y == 305){
    block.velocity.y = 1;
  }
  textSize(64);
  text("HOLD Mouse", 420, 70);
}
}

function melodystart(){
  sequence1.start();
}


function mousePressed(){
  sequence1 = new Tone.Sequence(function(time, note) { 
    synth.triggerAttackRelease(note, 0.5);
  }, melody, '4n');

  Tone.Transport.bpm.value = 160; 
  Tone.Transport.loop = true; 
  Tone.Transport.loopStart = 0; 
  Tone.Transport.loopEnd = '2:0:0';
  Tone.Transport.start(); 
  melodystart();
    if(dude.position.y == 600){
    dude.changeAnimation("jump");
    synth.triggerAttackRelease("C2", "8n");
    dude.velocity.y = -5;
  }
}

function mouseReleased(){
  state = "start";
  sequence1.stop();
  Tone.Transport.stop();
  Tone.Transport.loopStart = 0;
  Tone.Transport.loopEnd = '2:0:0';
  velocitypos();
}

function velocitypos(){
  dude.velocity.y = 0;
  dude.position.y = 600;
  block.velocity.y = 0;
  block.position.y = 325;
}
