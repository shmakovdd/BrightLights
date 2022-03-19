require("../images/content/blind.mp3");


export default function audio() {
const sound = document.querySelector('.audio');
let playBtn = document.querySelector('.audiobar__play')
let x = new Audio('/src/images/content/blind.mp3');
function audioPlay() {
    x.play()
}

function audioPause() {
    audio.pause()
}

playBtn.addEventListener('click', ()=> {
    audioPlay()
})

}