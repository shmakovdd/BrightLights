import "./styles/main.pcss";
import slider from "./scripts/slider.js"
import audio from "./scripts/audio.js"
import burger from "./scripts/burger.js"
// require("./images/content/blind.mp3");
import blind from './images/content/blind.mp3';
import starboy from './images/content/starboy.mp3'
import face from './images/content/face.mp3'
import night from './images/content/night.mp3'
import sia from './images/content/sia.mp3'
import daft from './images/content/daft.mp3'

import { log } from "signale/types";
import { find } from "lodash";
let audioElement = new Audio(blind);
let audioElement2 = new Audio(night)


slider()
burger()



function audioPlayer() {
    let playBtn = document.querySelector('.audiobar__play')
    let isPlaying;
    let progressbar = document.querySelector(".audiobar__container");
    let progressInner = document.querySelector('.audiobar__progressbar-inner')
    let thumbnail = document.querySelector('.audiobar__progress-bar-thumbnail')
    let songDuration = document.querySelector('.audiobar__song-duration');


   

    function setDuration(element) {
        audioElement.addEventListener('loadedmetadata', (e)=> {
            let {duration} = audioElement
            let minutes = Math.floor(duration / 60)
            if (String(minutes).length <= 1) {
                minutes = `0${minutes}`
            }
            if (String(seconds).length <= 1) {
                seconds = `0${seconds}`
            }
            let seconds = Math.round(duration) - (minutes * 60)
            element.innerHTML = `${minutes}:${seconds}`
        })
    }

    setDuration(songDuration)

    function audioPlay() {
        audioElement.play();
        isPlaying = true;
        playBtn.innerHTML = `<span class="material-icons">pause</span>`
    }


   

    function audioPause() {
        audioElement.pause();
        isPlaying = false;
        playBtn.innerHTML = `<span class="material-icons">play_arrow</span>`
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





    function playlist() {
        let playlist = document.querySelector('.tracks__playlist');
        let songs = [night, sia, daft, face, starboy, blind]
        let playBtn = document.querySelector("[data-player='btn']")
        let isPlaying;
        let progressbar = document.querySelector("[data-player='container']");
        let progressInner = document.querySelector("[data-player='inner']")
        let thumbnail = document.querySelector("[data-player='nail']")
        let songDuration = document.querySelector("[data-player='duration']");
        let tracks = document.querySelectorAll('.tracks__track')



        playlist.addEventListener('click', e => {
            if (e.target.classList.contains('tracks__trackname')) {
                let track = e.target.parentNode;
                changeClass(track)
                loadSong(songs[findActiveSong()])
                if (isPlaying) {
                    audioPause();
                } else if (!isPlaying) {
                    audioPlay();
                }
            }
        })

        function changeClass(e) {
            e.classList.add('tracks__track--active')

            for (let i = 0; i < tracks.length; i++) {
                if (tracks[i].classList.contains('tracks__track--active') && tracks[i] !== e) {
                    tracks[i].classList.remove('tracks__track--active')
                }
            }
        }

        function setDuration(element) {
            audioElement2.addEventListener('loadedmetadata', (e)=> {
                let {duration} = audioElement
                let minutes = Math.floor(duration / 60)
                if (String(minutes).length <= 1) {
                    minutes = `0${minutes}`
                }
                if (String(seconds).length <= 1) {
                    seconds = `0${seconds}`
                }
                let seconds = Math.round(duration) - (minutes * 60)
                element.innerHTML = `${minutes}:${seconds}`
            })
        }

        setDuration(songDuration)


        function audioPlay() {
            audioElement2.play();

            isPlaying = true;
        }

        function findActiveSong() {
            let active;
            for (let i = 0; i < tracks.length; i++) {
                if (tracks[i].classList.contains('tracks__track--active')) {
                    active = i
                }
            }
            return active
        }

        function audioPause() {
            audioElement2.pause();
            isPlaying = false;
        }

        function loadSong(song) {
            audioElement2.src = song
        }

        function updateProgress(e) {

            let {duration, currentTime} = e.srcElement;
            console.log(audioElement2.duration);
            let percents = (currentTime / duration) * 100
            progressInner.style.width = percents + "%"
            thumbnail.style.left = percents + "%"
            let songcurrentTime = document.querySelector("[data-player='current']");
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

        function setProgress(e) {
            let width = this.clientWidth;
            let clickCords = e.offsetX;
            let percent = Math.round((clickCords / width) * 100);
            let {duration} = audioElement;
            let coef = (duration / 100) * percent;
            audioElement2.currentTime = coef;
        }


        playBtn.addEventListener('click', ()=> {
            if (isPlaying) {
                audioPause();
            } else if (!isPlaying) {
                audioPlay();
            }
        })
        progressbar.addEventListener('click', setProgress)
        audioElement2.addEventListener('timeupdate', updateProgress)
    }

    playlist()