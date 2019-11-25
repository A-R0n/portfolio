const express = require('express');
const path = require('path');
const app = express();

<<<<<<< HEAD

=======
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

>>>>>>> a88f8cd75eb6b7a89429af2685683151a164ac01
app.use( express.static( `${__dirname}/../build/` ) );
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

<<<<<<< HEAD
app.listen(8997)
=======

app.listen(9000)
>>>>>>> a88f8cd75eb6b7a89429af2685683151a164ac01
