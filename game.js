const gameState = {
	score: 0
}

function preload () {
	this.load.audio('drums', './resources/sounds/drum.wav');
	this.load.audio('drums2', './resources/sounds/drum2.wav');
	this.load.audio('drums3', './resources/sounds/drum3.wav');
	this.load.audio('drums4', './resources/sounds/drum4.wav');
	this.load.audio('drums5', './resources/sounds/drum5.wav');
	this.load.audio('bass', './resources/sounds/bass.wav');
	this.load.audio('bass2', './resources/sounds/bass2.wav');
	this.load.audio('bass3', './resources/sounds/bass3.wav');
	this.load.audio('bass4', './resources/sounds/bass4.wav');
	this.load.audio('guitar', './resources/sounds/guitar.wav');
	this.load.audio('guitar2', './resources/sounds/guitar2.wav');
	this.load.audio('guitar3', './resources/sounds/guitar3.wav');
	this.load.audio('guitar4', './resources/sounds/guitar4.wav');
	this.load.audio('synth1', './resources/sounds/synth1.wav');
	this.load.audio('synth2', './resources/sounds/synth2.wav');
	this.load.audio('synth3', './resources/sounds/synth3.wav');
	this.load.audio('synth4', './resources/sounds/synth4.wav');

}

function create () {
  this.bpm = 120;
  this.loopTime = 4000;

  this.instruments = ['Drums', 'Bass', 'Guitar', 'Synth'];

  this.music = this.add.group();
  const drums = this.sound.add('drums', {volume: 0.2});
  drums.loopNumber = 0;
  drums.instrument = 'drums';
	this.music.add(drums);
  const drums2 = this.sound.add('drums2', {volume: 0.5});
  drums2.loopNumber = 1;
  drums2.instrument = 'drums';
	this.music.add(drums2);
  const drums3 = this.sound.add('drums3', {volume: 0.5});
  drums3.loopNumber = 2;
  drums3.instrument = 'drums';
	this.music.add(drums3);
  const drums4 = this.sound.add('drums5', {volume: 0.5}); // using loop 5 instead of 4, for more variety
  drums4.loopNumber = 3;
  drums4.instrument = 'drums';
	this.music.add(drums4);
	const bass = this.sound.add('bass', {volume: 1});
  bass.loopNumber = 4;
  bass.instrument = 'bass';
	this.music.add(bass);
	const bass2 = this.sound.add('bass2', {volume: 1});
  bass2.loopNumber = 5;
  bass2.instrument = 'bass';
	this.music.add(bass2);
	const bass3 = this.sound.add('bass3', {volume: 1});
  bass3.loopNumber = 6;
  bass3.instrument = 'bass';
	this.music.add(bass3);
	const bass4 = this.sound.add('bass4', {volume: 1});
  bass4.loopNumber = 7;
  bass4.instrument = 'bass';
	this.music.add(bass4);
	const guitar = this.sound.add('guitar', {volume: 0.5});
  guitar.loopNumber = 8;
  guitar.instrument = 'guitar';
	this.music.add(guitar);
	const guitar2 = this.sound.add('guitar2', {volume: 0.2});
  guitar2.loopNumber = 9;
  guitar2.instrument = 'guitar';
	this.music.add(guitar2);
	const guitar3 = this.sound.add('guitar3', {volume: 0.2});
  guitar3.loopNumber = 10;
  guitar3.instrument = 'guitar';
	this.music.add(guitar3);
	const guitar4 = this.sound.add('guitar4', {volume: 0.2});
  guitar4.loopNumber = 11;
  guitar4.instrument = 'guitar';
	this.music.add(guitar4);
  const synth = this.sound.add('synth1', {volume: 0.5});
  synth.loopNumber = 12;
  synth.instrument = 'synth';
	this.music.add(synth);
	const synth2 = this.sound.add('synth2', {volume: 0.2});
  synth2.loopNumber = 13;
  synth2.instrument = 'synth';
	this.music.add(synth2);
	const synth3 = this.sound.add('synth3', {volume: 0.2});
  synth3.loopNumber = 14;
  synth3.instrument = 'synth';
	this.music.add(synth3);
	const synth4 = this.sound.add('synth4', {volume: 0.2});
  synth4.loopNumber = 15;
  synth4.instrument = 'synth';
	this.music.add(synth4);
  

  this.controllers = this.add.group();

  let index = 0
  for (let i = 0; i < this.instruments.length; i++) {
    const instrumentText = this.add.text(25, 125 + 75 * i, this.instruments[i], {fontSize: 24, color: "#000000"}).setOrigin(0);
    for (let j = 0; j < this.music.children.entries.filter(sound => sound.instrument === this.instruments[i].toLowerCase()).length; j++) {
      const controller = this.add.rectangle(150 + 75 * j, 125 + 75 * i, 25, 25, 0xD3D3D3).setOrigin(0);
      controller.strokeColor = 0x000000;
      controller.lineWidth = 2;
      controller.isStroked = true;
      controller.loopNumber = index;
      controller.topOutline = this.add.rectangle(151 + 75 * j, 124 + 75 * i, 0, 2, 0x00FF00).setOrigin(0);
      // controller.topOutlineTween = this.tweens.add({
      //   targets: controller.topOutline,
      //   duration: this.loopTime / 4,
      //   delay: 1, // needed otherwise width does not reset between end of tween and start of next
      //   width: 25,
      //   completeDelay: 3 * this.loopTime / 4,
      //   onComplete: () => {
      //     // controller.topOutline.width = 0;
      //   }
      // });
    //   controller.topOutlineTween.pause();
      controller.rightOutline = this.add.rectangle(174 + 75 * j, 126 + 75 * i, 2, 0, 0x00FF00).setOrigin(0);


    //   controller.rightOutlineTween.pause();
      controller.bottomOutline = this.add.rectangle(174 + 75 * j, 151 + 75 * i, 0, 2, 0x00FF00).setOrigin(1);
      
    //   controller.bottomOutlineTween.pause();
      controller.leftOutline = this.add.rectangle(151 + 75 * j, 149 + 75 * i, 2, 0, 0x00FF00).setOrigin(1);

    //   controller.leftOutlineTween.pause();
      controller.setInteractive();
      controller.on('pointerup', () => {
        toggleMusic(controller.loopNumber);
      });
      this.controllers.add(controller);
      index++;
    }

  }
  
  const toggleMusic = loopNum => {
    // console.log(loopNum);
    if (this.music.children.entries[loopNum].queued) {
      this.music.children.entries[loopNum].stop();
      this.music.children.entries[loopNum].queued = false;
      this.controllers.children.entries[loopNum].fillColor = 0xD3D3D3;
      if (this.controllers.children.entries[loopNum].topOutlineTween) {
        this.controllers.children.entries[loopNum].topOutlineTween.stop();
        this.controllers.children.entries[loopNum].topOutline.width = 0;
      }
      if (this.controllers.children.entries[loopNum].rightOutlineTween) {
        this.controllers.children.entries[loopNum].rightOutlineTween.stop();
        this.controllers.children.entries[loopNum].rightOutline.height = 0;
      }
      if (this.controllers.children.entries[loopNum].bottomOutlineTween) {
        this.controllers.children.entries[loopNum].bottomOutlineTween.stop();
        this.controllers.children.entries[loopNum].bottomOutline.width = 0;
        this.controllers.children.entries[loopNum].bottomOutline.x = this.controllers.children.entries[loopNum].rightOutline.x;
      }
      if (this.controllers.children.entries[loopNum].leftOutlineTween) {
        this.controllers.children.entries[loopNum].leftOutlineTween.stop();
        this.controllers.children.entries[loopNum].leftOutline.height = 0;
        this.controllers.children.entries[loopNum].leftOutline.y = this.controllers.children.entries[loopNum].topOutline.y + 25;
      }
      
      // this.controllers.children.entries[loopNum].topOutline.width = 0;
      // this.controllers.children.entries[loopNum].rightOutlineTween.pause();
      // this.controllers.children.entries[loopNum].bottomOutlineTween.pause();
      // this.controllers.children.entries[loopNum].leftOutlineTween.pause();
      
      // this.controllers.children.entries[loopNum].rightOutline.height = 0;
      // this.controllers.children.entries[loopNum].bottomOutline.width = 0;
      // this.controllers.children.entries[loopNum].bottomOutline.x = this.controllers.children.entries[loopNum].rightOutline.x;
      // this.controllers.children.entries[loopNum].leftOutline.height = 0;
      // this.controllers.children.entries[loopNum].leftOutline.y = this.controllers.children.entries[loopNum].topOutline.y + 25;
    } else {
      this.music.children.entries[loopNum].queued = true;
      this.controllers.children.entries[loopNum].fillColor = 0xFFFFFF;
    }
  }
  
  this.counterBackground = this.add.rectangle(50, 50, 404, 24, 0xFFFFFF, 1.0).setOrigin(0);
  this.counterBackground.strokeColor = 0x000000;
  this.counterBackground.lineWidth = 2;
  this.counterBackground.isStroked = true;

  this.counter = this.add.rectangle(52, 52, 0, 20, 0x000000, 1.0).setOrigin(0);

  this.tweens.add({
    targets: this.counter,
    width: 400,
    duration: this.loopTime,
    repeat: -1,
    // onComplete: () => {
    //   this.counter.width = 0;
    // }
  })

  const barTimer = () => {
    // console.log("A");    
    this.music.children.entries.forEach(loop => {
      if (loop.queued) {
        loop.play();

        if (this.controllers.children.entries[loop.loopNumber].topOutlineTween) {
          this.controllers.children.entries[loop.loopNumber].topOutlineTween.stop();
          this.controllers.children.entries[loop.loopNumber].topOutline.width = 0;
        }
        this.controllers.children.entries[loop.loopNumber].topOutlineTween = this.tweens.add({
          targets: this.controllers.children.entries[loop.loopNumber].topOutline,
          duration: this.loopTime / 4,
          delay: 1, // needed otherwise width does not reset between end of tween and start of next
          width: 25,
          completeDelay: 3 * this.loopTime / 4,
          onComplete: () => {
            this.controllers.children.entries[loop.loopNumber].topOutline.width = 0;
          }
        });
        
        if (this.controllers.children.entries[loop.loopNumber].rightOutlineTween) {
          this.controllers.children.entries[loop.loopNumber].rightOutlineTween.stop();
          this.controllers.children.entries[loop.loopNumber].rightOutline.height = 0;
        }
        this.controllers.children.entries[loop.loopNumber].rightOutlineTween = this.tweens.add({
          targets: this.controllers.children.entries[loop.loopNumber].rightOutline,
          duration: this.loopTime / 4,
          delay: this.loopTime / 4,
          height: 25,
          completeDelay: 2 * this.loopTime / 4,
          onComplete: () => {
            this.controllers.children.entries[loop.loopNumber].rightOutline.height = 0;
          }
        });

        if (this.controllers.children.entries[loop.loopNumber].bottomOutlineTween) {
          this.controllers.children.entries[loop.loopNumber].bottomOutlineTween.stop();
          this.controllers.children.entries[loop.loopNumber].bottomOutline.width = 0;
          this.controllers.children.entries[loop.loopNumber].bottomOutline.x = this.controllers.children.entries[loop.loopNumber].rightOutline.x;
        }
        this.controllers.children.entries[loop.loopNumber].bottomOutlineTween = this.tweens.add({
          targets: this.controllers.children.entries[loop.loopNumber].bottomOutline,
          duration: this.loopTime / 4,
          delay: 2 * this.loopTime / 4,
          width: 25,
          x: "-=25",
          completeDelay: this.loopTime / 4,
          onComplete: () => {
            this.controllers.children.entries[loop.loopNumber].bottomOutline.width = 0;
            this.controllers.children.entries[loop.loopNumber].bottomOutline.x = this.controllers.children.entries[loop.loopNumber].rightOutline.x;
          }
        });

        if (this.controllers.children.entries[loop.loopNumber].leftOutlineTween) {
          this.controllers.children.entries[loop.loopNumber].leftOutlineTween.stop();
          this.controllers.children.entries[loop.loopNumber].leftOutline.height = 0;
          this.controllers.children.entries[loop.loopNumber].leftOutline.y = this.controllers.children.entries[loop.loopNumber].topOutline.y + 25;
        }
        this.controllers.children.entries[loop.loopNumber].leftOutlineTween = this.tweens.add({
          targets: this.controllers.children.entries[loop.loopNumber].leftOutline,
          duration: this.loopTime / 4,
          delay: 3 * this.loopTime / 4,
          height: 25,
          y: "-=25",
          onComplete: () => {
            this.controllers.children.entries[loop.loopNumber].leftOutline.height = 0;
            this.controllers.children.entries[loop.loopNumber].leftOutline.y = this.controllers.children.entries[loop.loopNumber].topOutline.y + 25;
          }
        });


        // this.controllers.children.entries[loop.loopNumber].rightOutlineTween.restart();
        // this.controllers.children.entries[loop.loopNumber].bottomOutlineTween.restart();
        // this.controllers.children.entries[loop.loopNumber].leftOutlineTween.restart();
      }
    })
    // this.music.drums.play();
  }

  const barLoop = this.time.addEvent({
    delay: this.loopTime,
    callback: barTimer,
    callbackScope: this,
    loop: true,
  });

}

function update (time, delta) {
  // this.music.children.entries.filter(loop => loop.queued && !loop.isPlaying).forEach(filteredLoop => {
  // this.music.children.entries.forEach(loop => {
    // if (loop.queued && !loop.isPlaying) {
      // console.log(this.controllers);
      // console.log(loop);
      // console.log(this.controllers.children.entries[0]);
      // console.log(this.controllers.children.entries[loop.loopNumber]);
      // this.controllers.children.entries[loop.loopNumber].setAlpha(1 - (time % this.loopTime) / this.loopTime);
      // console.log(1 - (time % this.loopTime) / this.loopTime);
    // }
    // console.log(filteredLoop);
    // this.controllers.children.entries[filteredLoop.loopNumber].setAlpha(0);
  // this.counter.width = 400 * ((time % this.loopTime) / this.loopTime);
  // if (time % this.barTime <= 20) {
    // console.log("Bar")
  // }
  // console.log(time % this.barTime)
}

const config = {
  type: Phaser.AUTO,
  width: 640,
	height: 460,
	backgroundColor: "b9eaff",
  scene: {
		preload,
		create,
		update
	}
}

const game = new Phaser.Game(config)
