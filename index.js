const express = require('express')
const app = express()

app.use(express.static('static'))

app.get('/', (req, res) => {
	res.sendFile('./index.html', { root: __dirname })
})

app.listen(3000, () => {
	console.log('Remote soundboard listening on port 3000')
})