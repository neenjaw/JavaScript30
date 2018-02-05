const video = document.querySelector(".player__video.viewer"),
      progress = document.querySelector(".progress"),
      progressFill = document.querySelector(".progress__filled"),
      volume = document.querySelector('.player__slider[name="volume"]'),
      rate = document.querySelector('.player__slider[name="playbackRate"]'),
      playButton = document.querySelector(".toggle"),
      skipButton = document.querySelectorAll(".player__button[data-skip]");

const controls = {
    play: "►",
    pause: "❚❚"
};

video.ontimeupdate = function () { updateProgress(); };

function updateProgress() {
    let duration = video.duration,
        currentTime = video.currentTime,
        percentComplete = Math.floor((currentTime / duration * 100) * 100) / 100;
    
    console.log(`> ${duration} | ${currentTime} | ${percentComplete}%`);

    progressFill.style['flex-basis'] = `${percentComplete}%`;
} 

video.onplay = function () {
    playButton.innerHTML = controls.pause;
};

video.onpause = function () {
    playButton.innerHTML = controls.play;
};

(function startup() {
    let mousedown = false;

    //event listener for the click to play/pause the video
    playButton.addEventListener("click", handlePlay);
    video.addEventListener("click", handlePlay);

    //play/pause handler
    function handlePlay(event) {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    // add event listener and handler function to skip in the video
    skipButton.forEach((button) => {
        button.addEventListener("click", function (event) {
            let skipTime = parseInt(this.dataset.skip);
            
            video.currentTime = video.currentTime + skipTime;
        });
    });

    // add the event listener to scrub
    progress.addEventListener("click", handleScrub);
    progress.addEventListener("mousemove", (e) => mousedown && handleScrub(e));
    progress.addEventListener("mousedown", () => mousedown = true);
    progress.addEventListener("mouseup", () => mousedown = false);
    
    function handleScrub(event) {
        // My solution, but didn't know about the offset inbuilt values
        // let xOffset = progress.getBoundingClientRect().left,
        //     x = event.clientX - xOffset,
        //     width = progress.clientWidth,
        //     seekPercent = Math.floor(x / width * 10000) / 10000,
        //     seekTime = video.duration * seekPercent;

        let seekPercent = Math.floor(event.offsetX / progress.offsetWidth * 10000) / 10000,
            seekTime = video.duration * seekPercent;

        video.currentTime = seekTime;
    }

    // add event listeners for the range input to handle the volume
    volume.addEventListener("input", handleVolume);
    volume.addEventListener("change", handleVolume);

    function handleVolume(event) {
        video.volume = volume.value;
    }

    // add event listeners for the range input to handle the rate
    rate.addEventListener("input", handleRate);
    rate.addEventListener("change", handleRate);

    function handleRate(event) {
        video.playbackRate = rate.value;
    }
})();