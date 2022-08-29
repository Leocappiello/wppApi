const express = require('express')
const app = express.Router()
const messageSchema = require('../models/messages')
const { fetchMessageReceived } = require('../utils/fn')

//token
const token = process.env.WHATSAPP_TOKEN;

// Accepts POST requests at /webhook endpoint
app.post("/", async (req, res) => {
    try {
        let {from, id, type, timestamp} = req.body.entry[0].changes[0].value.messages[0]
        let message = req.body.entry[0].changes[0].value.messages[0].text.body

        const msg = new messageSchema({
            from,
            id,
            type,
            timestamp,
            message
        });
        await msg.save();

        if (req.body.object) {
            if (
                req.body.entry &&
                req.body.entry[0].changes &&
                req.body.entry[0].changes[0] &&
                req.body.entry[0].changes[0].value.messages &&
                req.body.entry[0].changes[0].value.messages[0]
            ) {
                let {phone_number_id, from} = req.body.entry[0].changes[0].value.messages[0]
                let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload

                /*
                console.log(`phone_number_id: ${phone_number_id}`)
                console.log(`from: ${from}`)
                console.log(`msg_body: ${msg_body}`)
                */

                //POST message received
                fetchMessageReceived(phone_number_id, token, from, msg_body)
            }
            res.sendStatus(200);
        } else {
            res.sendStatus(404); // Return a '404 Not Found' if event is not from a WhatsApp API
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(404);
    }
});

// Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests 
app.get("/", (req, res) => {
    const verify_token = process.env.VERIFY_TOKEN;

    // Parse params from the webhook verification request
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode were sent
    if (mode && token) {
        // Check the mode and token sent are correct
        if (mode === "subscribe" && token === verify_token) {
            // Respond with 200 OK and challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});


module.exports = app