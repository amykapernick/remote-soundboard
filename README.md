# Remote Soundboard

A soundboard for use in remote presentations, that allows remote attendees to react to a presenter, with sounds playing for any user that has the page open.

## Demo
<https://vimeo.com/413798818>


## To Use
- Download repository
- Run `npm install` or `yarn install`
- Run `cp .env.example .env` to create new `.env` file
- Fill in env variables in `.env` file from your Twilio account
- Use `npm start` to run locally
- Use [ngrok](https://ngrok.com) to expose the page for other users


## Env Variables
- `TWILIO_ACCOUNT_SID` - Account SID, found in Twilio Console
- `TWILIO_API_KEY` & `TWILIO_API_SECRET` - Generate API key and API secret [here in Twilio Console](https://www.twilio.com/console/project/api-keys)
- `TWILIO_SYNC_SERVICE_SID` - Get the default service SID, or create a new service [here in the [Twilio Console]()
