const audioContext = new AudioContext()
const gainNode = audioContext.createGain()

const playSound = (sound) => {
	const audio = document.querySelector(`audio[data-sound="${sound}"]`)

	console.log(audioContext)

	const track = audioContext.createMediaElementSource(audio)

	track.connect(gainNode)
	gainNode.gain.value = 1
	gainNode.connect(audioContext.destination)
	audio.currentTime = 0

	audio.play()

	const checkTime = setInterval(() => {
		if(audio.duration - audio.currentTime == 0) {
			clearSource()
		}
	}, 100)
	
	const clearSource = () => {
		gainNode.disconnect()
		track.disconnect()
		clearInterval(checkTime)
	}
}


document.querySelectorAll('#sounds button').forEach(btn => {
	btn.addEventListener('click', e => {
		playSound(e.target.attributes['data-sound'].value)
	})
})