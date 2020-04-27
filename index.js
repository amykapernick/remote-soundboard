require('dotenv').config()

const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	Twilio = require('twilio'),
syncSid = process.env.TWILIO_SYNC_SERVICE_SID

app.use(bodyParser.json())
app.use('/sounds', express.static('sounds'))

app.get('/', (req, res) => {	
	res.sendFile('./index.html', { root: __dirname })
})

app.post('/sync', (req, res) => {
	const client = new Twilio(
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET,
        {accountSid: process.env.TWILIO_ACCOUNT_SID}
	),
	service = client.sync.services(syncSid),
	sound = req.body.sound

	service.documents('sound').update({
		data: {
			sound
		}
	})

	res.end()
})


app.listen(process.env.PORT || 3000, () => {
	console.log(`Example app listening on port ${process.env.PORT || 3000}!`)
})
