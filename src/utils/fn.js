const axios = require('axios')

function fetchMessageReceived(phone_number_id, token, from, msg_body) {
    //console.log(phone_number_id, token, from, msg_body)

    axios({
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
    })
        .catch(e => {
            /*
            if (e.response) {
                console.log(`https://graph.facebook.com/v12.0/${phone_number_id}/messages?access_token=${token}`)
                console.log(e.response)
            } else if (e.request) {
                console.log(e.request)
            } else if (e.message) {
                console.log(e.message) 
            }
            */
        })
}

module.exports = { fetchMessageReceived }