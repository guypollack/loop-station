const gameState = {
	score: 0
}

function preload () {
	this.load.audio('drums', './resources/sounds/drum.wav');
	this.load.audio('drums2', './resources/sounds/drum2.wav');
	this.load.audio('bass', './resources/sounds/bass.wav');
	this.load.audio('bass2', './resources/sounds/bass2.wav');
	this.load.audio('guitar', './resources/sounds/guitar.wav');
	this.load.audio('guitar2', './resources/sounds/guitar2.wav');

}

function create () {
  this.bpm = 120;
  this.loopTime = 4000;

  this.instruments = ['Drums', 'Bass', 'Guitar']

  this.music = this.add.group();
  const drums = this.sound.add('drums', {volume: 0.2});
  drums.loopNumber = 0;
  drums.instrument = 'drums';
	this.music.add(drums);
  const drums2 = this.sound.add('drums2', {volume: 0.5});
  drums2.loopNumber = 1;
  drums2.instrument = 'drums';
	this.music.add(drums2);
	const bass = this.sound.add('bass', {volume: 1});
  bass.loopNumber = 2;
  bass.instrument = 'bass';
	this.music.add(bass);
	const bass2 = this.sound.add('bass2', {volume: 1});
  bass2.loopNumber = 3;
  bass2.instrument = 'bass';
	this.music.add(bass2);
	const guitar = this.sound.add('guitar', {volume: 0.5});
  guitar.loopNumber = 4;
  guitar.instrument = 'guitar';
	this.music.add(guitar);
	const guitar2 = this.sound.add('guitar2', {volume: 0.2});
  guitar2.loopNumber = 5;
  guitar2.instrument = 'guitar';
	this.music.add(guitar2);

  this.controllers = this.add.group();

  let index = 0
  for (let i = 0; i < this.instruments.length; i++) {
    const instrumentText = this.add.text(25, 125 + 75 * i, this.instruments[i], {fontSize: 24, color: "#000000"}).setOrigin(0);
    for (let j = 0; j < this.music.children.entries.filter(sound => sound.instrument === this.instruments[i].toLowerCase()).length; j++) {
      const controller = this.add.rectangle(150 + 100 * j, 125 + 75 * i, 25, 25, 0xD3D3D3).setOrigin(0);
      controller.strokeColor = 0x000000;
      controller.lineWidth = 2;
      controller.isStroked = true;
      controller.loopNumber = index;
      controller.topOutline = this.add.rectangle(151 + 100 * j, 124 + 75 * i, 0, 2, 0x00FF00).setOrigin(0);
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
      controller.rightOutline = this.add.rectangle(174 + 100 * j, 126 + 75 * i, 2, 0, 0x00FF00).setOrigin(0);


    //   controller.rightOutlineTween.pause();
      controller.bottomOutline = this.add.rectangle(174 + 100 * j, 151 + 75 * i, 0, 2, 0x00FF00).setOrigin(1);
      
    //   controller.bottomOutlineTween.pause();
      controller.leftOutline = this.add.rectangle(151 + 100 * j, 149 + 75 * i, 2, 0, 0x00FF00).setOrigin(1);

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
	height: 360,
	backgroundColor: "b9eaff",
  scene: {
		preload,
		create,
		update
	}
}

const game = new Phaser.Game(config)
