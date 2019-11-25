const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(`${__dirname}/../build`));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'));
});
const port = 8897
app.listen(port, () => {
  console.log(`Nothin can stop me im All the wayyyy upppp: ${port}`);
});
