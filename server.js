const admin = require('firebase-admin');
const express = require('express');
const app = express();
app.use(express.json());
const serviceAccount = require('./scrape-a30e1-firebase-adminsdk-2j7cs-88ec93c01d.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://scrape-a30e1-default-rtdb.firebaseio.com',
});

app.get('/', (req, res) => {
  res.send('Heroku...');
});
app.post('/send-notification', (req, res) => {
  console.log('====req.bodyyyyy', req.body);
  const message = {
    notification: {
      title: 'New pickup request',
      body: 'Click here to view',
    },
    token:
      'cLDfffrQQBiH7sexKTtvGU:APA91bHbvtT8oKLczHX1enLRkmEdJgdaASPIa6oHLPjvudWICzvLYcawLyX8XOo4YQpPnaOpi_4ft41KRc0NOo9iMxrrv1YHyajcVy-tq5_4zu44V5hPOadCHRaTLxa28ynIlCGJVAZu',
  };
  req.body &&
    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log('Successfully sent notification:', response);
      })
      .catch((error) => {
        console.log('Error sending notification:', error);
      });
});

app.listen(process.env.PORT || 3000, () =>
  console.log('server running...', process.env.PORT, 'or 3000')
);
