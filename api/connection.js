const mongoose = require('mongoose')

mongoose
  .connect(
    process.env.MONGODB_URI ||
    'mongodb://heroku_j82n80fd:j8g2vu9kqidl746vnq418ju1p1@ds049104.mlab.com:49104/heroku_j82n80fd',
    { useNewUrlParser: true }
  )
  .then(
    connection => console.log('[MongoDB Connection] success'),
    console.error.bind(console, '[MongoDB Connection] error:')
  )
