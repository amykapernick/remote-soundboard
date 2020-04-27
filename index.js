require('dotenv').config()

const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	Twilio = require('twilio'),
syncSid = process.env.TWILIO_SYNC_SERVICE_SID

const AccessToken = require('twilio').jwt.AccessToken,
SyncGrant = AccessToken.SyncGrant;


app.use(bodyParser.json())
app.use('/sounds', express.static('sounds'))
app.use(express.static('css'))
app.use(express.static('js'))


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

app.get('/sync-token', (req, res) => {
    const identity = 'only for testing';

    const syncGrant = new SyncGrant({
        serviceSid: process.env.TWILIO_SYNC_SERVICE_SID,
	}),
	token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
	);
	
    token.addGrant(syncGrant);
    token.identity = identity;

	res.send({
        identity: identity,
        token: token.toJwt()
    });
})


app.listen(process.env.PORT || 3000, () => {
	console.log(`Example app listening on port ${process.env.PORT || 3000}!`)
})
