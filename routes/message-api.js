/*
 * All routes for Item-listings are defined here
 * Since this file is loaded in server.js into /f,
 *   these routes are mounted onto /f
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const msgs = require('../db/queries/messages');

router.post('/new', (req, res) => {
  const fromUserId = req.session.userId ? req.session.userId : 1;
  const toUserId = req.body.toUserId;
  const itemId = req.body.itemId;
  const content = req.body.content;
  const pid = req.body.pid ? req.body.pid : 0;

  const message = {
    fromUserId: fromUserId,
    toUserId: toUserId,
    itemId: itemId,
    content: content,
    pid: pid
  };

  msgs.addMessage(message)
    .then(() => {
      console.log('Message sending successfully! ');
      res.send({ message: 1 });
    })
    .catch(error => {
      console.error("Error sending the message. ", error);
    });
});

router.post('/reply', (req, res) => {
  const fromUserId = req.session.userId ? req.session.userId : 1;
  const toUserId = Number(req.body.toUserId);
  const itemId = Number(req.body.itemId);
  const pid = Number(req.body.pid);
  const content = req.body.content;

  msgs.addMessage({
    fromUserId: fromUserId,
    toUserId: toUserId,
    itemId: itemId,
    pid:  pid,
    content:  content
  })
    .then(() => {
      console.log('Message sending successfully! ');
      res.send({ message: 1 });
    })
    .catch(error => {
      console.error("Error sending the message. ", error);
    });
});

router.post('/sms', (req, res) => {
  const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
  const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
  const twilioPhoneNumber = 'YOUR_TWILIO_PHONE_NUMBER';

  const client = require('twilio')(accountSid, authToken);

  const recipientPhoneNumber = req.body.userPhoneNumber;
  const msgContent = req.body.content;

  client.messages.create({
    body: msgContent,
    from: twilioPhoneNumber,
    to: recipientPhoneNumber
  })
    .then(message => res.send({ message: `Message SID: ${message.sid}` }))
    .catch(error => console.error(error));
});

module.exports = router;
