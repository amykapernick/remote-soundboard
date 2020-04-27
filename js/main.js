fetch('/sync-token').then(result => {
	result.json().then(data => {
		const client = new Twilio.Sync.Client(data.token)

		client.document('sound').then(doc => {
			doc.on('updated', e => {
				const sound = e.value.sound

				const audioContext = new AudioContext(),
					audio = document.querySelector(`audio[data-sound="${sound}"]`),
					track = audioContext.createMediaElementSource(audio)

				track.connect(audioContext.destination)

				audio.play()
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