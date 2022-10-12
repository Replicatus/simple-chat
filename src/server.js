const express = require('express');
const fallback = require('express-history-api-fallback');
const app = express();
const PORT = 3000;
const root = `${__dirname}/dist`;
app.use(express.static(root))
app.use(fallback('index.html', { root: root }))

// app.use('*', (req, res) => {
//   res.status(200).sendFile(path.resolve(__dirname, '../dist/index.html'));
// });
app.listen(process.env.PORT || PORT, (err) => {
  if (err) {
    // console.error('error', err);
  }
  // console.log('express');
});
