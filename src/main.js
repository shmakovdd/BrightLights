import "./styles/main.pcss";
import slider from "./scripts/slider.js"
import audio from "./scripts/audio.js"
import burger from "./scripts/burger.js"
// require("./images/content/blind.mp3");
import mp3 from './images/content/blind.mp3';
import { log } from "signale/types";
let audioElement = new Audio(mp3);


slider()
burger()



function audioPlayer() {
    let playBtn = document.querySelector('.audiobar__play')
    let isPlaying;
    let progressbar = document.querySelector(".audiobar__container");
    let progressInner = document.querySelector('.audiobar__progressbar-inner')
    let thumbnail = document.querySelector('.audiobar__progress-bar-thumbnail')
    audioElement.addEventListener('loadedmetadata', (e)=> {
        console.log(audioElement.duration);
        let {duration} = audioElement
        let songDuration = document.querySelector('.audiobar__song-duration');
        let minutes = Math.round(duration / 60)
        if (String(minutes).length <= 1) {
            minutes = `0${minutes}`
        }
        if (String(seconds).length <= 1) {
            seconds = `0${seconds}`
        }
        let seconds = Math.round(duration) - (minutes * 60)
        songDuration.innerHTML = `${minutes}:${seconds}`
    })
    function audioPlay() {
        audioElement.play();
        isPlaying = true;
    }

    function audioPause() {
        audioElement.pause();
        isPlaying = false;
    }
    

    playBtn.addEventListener('click', ()=> {
        if (isPlaying) {
            audioPause();
        } else if (!isPlaying) {
            audioPlay();
        }

    })

    function setProgress(e) {
        let width = this.clientWidth;
        let clickCords = e.offsetX;
        let percent = Math.round((clickCords / width) * 100);
        let {duration} = audioElement;
        let coef = (duration / 100) * percent;
        audioElement.currentTime = coef;
    }

    function updateProgress(e) {

        let {duration, currentTime} = e.srcElement;
        let percents = (currentTime / duration) * 100
        progressInner.style.width = percents + "%"
        thumbnail.style.left = percents + "%"
        let songcurrentTime = document.querySelector('.audiobar__current-time');
        let seconds,
            minutes;
        
        if (currentTime < 60) {
            minutes = 0;
            seconds = Math.round(currentTime)
        }

        if (currentTime >= 60) {
            minutes = Math.floor(currentTime / 60);
            seconds = Math.round(currentTime - (60 * minutes))
        }
        seconds = seconds == 60 ? 0 : seconds;
        if (String(seconds).length <= 1) {
            seconds = `0${seconds}`
        }
        if (String(minutes).length <= 1) {
            minutes = `0${minutes}`
        }

        songcurrentTime.innerHTML = `${minutes}:${seconds}`
    }
    progressbar.addEventListener('click', setProgress)
    audioElement.addEventListener('timeupdate', updateProgress)
    }

    audioPlayer()