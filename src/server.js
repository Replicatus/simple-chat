const express = require('express');

const app = express();
const PORT = 3000;

// app.use(express.static(`${__dirname}./dist/`));
app.use('*', (req, res) => {
  res.status(200).sendFile(`${__dirname}/dist/index.html`);
});
app.listen(PORT, (err) => {
  if (err) {
    // console.error('error', err);
  }
  // console.log('express');
});
