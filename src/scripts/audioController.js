import $ from 'zepto';

const audioController = {
  init() {
    this.$audio = $('#audio');
    this.$audioTimer = $('#audioTimer');
    this.$timerWrapper = $('#timerWrapper');
    this.isPlaying = false;
    this.currentTime = 0;
    this.isLocked = false;

    this.handleTimeupdate = this.handleTimeupdate.bind(this);
    this.handleDurationchange = this.handleDurationchange.bind(this);
    this.handlePlaying = this.handlePlaying.bind(this);
    this.handleEnded = this.handleEnded.bind(this);

    this.toggle = this.toggle.bind(this);

    this.$audio.on('timeupdate', this.handleTimeupdate);
    this.$audio.on('durationchange', this.handleDurationchange);
    this.$audio.on('playing', this.handlePlaying);
    this.$audio.on('ended', this.handleEnded);
    this.$audio.on('pause', this.handleEnded);

    this.$timerWrapper.on('click', this.toggle);

    this.sync();
  },
  toggle() {
    if (this.isLocked) {
      return;
    }

    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  },
  handlePlaying() {
    this.isPlaying = true;

    if (this.onPlay) {
      this.onPlay();
    }

    this.sync();
  },
  handleEnded() {
    this.isPlaying = false;

    this.sync();
  },
  handleTimeupdate() {
    this.currentTime = this.$audio[0].currentTime;

    this.sync();
  },
  handleDurationchange() {
    this.duration = this.$audio[0].duration;
    this.currentTime = 0;

    this.sync();
  },
  switchAudio(nextSrc) {
    this.$audio.attr('src', nextSrc);
    this.$audio.currentTime = 0;
    this.isPlaying = false;
    this.isLocked = false;
    this.handleDurationchange();

    this.sync();
  },
  play() {
    this.$audio[0].play();
  },
  pause() {
    this.$audio[0].pause();
  },
  sync() {
    this.$timerWrapper[this.isPlaying ? 'removeClass' : 'addClass']('paused');

    this.$audioTimer.text(Math.floor(this.duration - this.currentTime));
  },
};

export default audioController;
