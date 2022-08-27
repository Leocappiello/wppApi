const express = require('express')
const app = express.Router()
const axios = require('axios')
const fetch = require('node-fetch');
const messageSchema = require('../models/messages')

//
const token = process.env.VERIFY_TOKEN;

// Accepts POST requests at /webhook endpoint
app.post("/", async (req, res) => {
    // Parse the request body from the POST
    try {
        // Check the Incoming webhook message
        let from = req.body.entry[0].changes[0].value.messages[0].from
        let id = req.body.entry[0].changes[0].value.messages[0].id
        let type = req.body.entry[0].changes[0].value.messages[0].type
        let timestamp = req.body.entry[0].changes[0].value.messages[0].timestamp
        let message = (req.body.entry[0].changes[0].value.messages[0].text.body)

        const msg = new messageSchema({
            from,
            id,
            type,
            timestamp,
            message
        });
        await msg.save();

        // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
        if (req.body.object) {
            if (
                req.body.entry &&
                req.body.entry[0].changes &&
                req.body.entry[0].changes[0] &&
                req.body.entry[0].changes[0].value.messages &&
                req.body.entry[0].changes[0].value.messages[0]
            ) {
                let phone_number_id =
                    req.body.entry[0].changes[0].value.metadata.phone_number_id;
                let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
                let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload

                console.log(`phone_number_id: ${phone_number_id}`)
                console.log(`from: ${from}`)
                console.log(`msg_body: ${msg_body}`)
                
                fetch({
                    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
                    url:
                        "https://graph.facebook.com/v12.0/" +
                        phone_number_id +
                        "/messages?access_token=" +
                        token,
                    data: {
                        messaging_product: "whatsapp",
                        to: from,
                        text: { body: "Ack: " + msg_body },
                    },
                    headers: { "Content-Type": "application/json" },
                }
                )
                    .then((response) => {
                        //console.log(response);
                    }, (error) => {
                        //console.log(error);
                    });
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
    /**
     * UPDATE YOUR VERIFY TOKEN
     *This will be the Verify Token value when you set up webhook
    **/
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