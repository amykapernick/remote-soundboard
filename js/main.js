const audioContext = new AudioContext(),
gainNode = audioContext.createGain()

fetch('/sync-token').then(result => {
	result.json().then(data => {
		const client = new Twilio.Sync.Client(data.token)

		client.document('sound').then(doc => {
			doc.on('updated', e => {
				const sound = e.value.sound

				console.log(audioContext)

				const audio = document.querySelector(`audio[data-sound="${sound}"]`),
					track = audioContext.createMediaElementSource(audio)

				track.connect(gainNode)
				gainNode.gain.value = document.querySelector('#volume').value
				gainNode.connect(audioContext.destination)

				audio.play()

				const checkTime = setInterval(() => {
					console.log(audio.duration - audio.currentTime)

					if(audio.duration - audio.currentTime == 0) {
						clearSource()
					} 

				}, 100),
				clearSource = () => {
					gainNode.disconnect()
					track.disconnect()
					clearInterval(checkTime)
				}
			})
		})
	})
})

document.querySelectorAll('.sounds button').forEach(btn => {
	btn.addEventListener('click', e => {
		fetch('/sync', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ sound: e.target.dataset.sound })
		})
	})
})

const volume = (e) => {
	gainNode.gain.value = e.value
}