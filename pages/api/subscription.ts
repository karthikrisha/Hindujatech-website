import axios from 'axios';
import getConfig from 'next/config';
import mailchimp from '@mailchimp/mailchimp_marketing';

function getRequestParameters(email) {
    const API_KEY = 'a128f7e65b5c78e983da3003f66f561f-us20';'envAPI_KEY';
    const LIST_ID = 265641;//265573;
    const DATACENTER = API_KEY.split('-')[1];

    mailchimp.setConfig({
        apiKey: API_KEY,
        server: DATACENTER
    });
    

    // const url = `https://${DATACENTER}.api.mailchimp.com/3/0/lists/${LIST_ID}.members`;

    // const data = {
    //     email_address: email,
    //     status: 'subscribed'
    // }

    // const base64ApiKey = Buffer.from(`anystring:${API_KEY}`).toString("base64");
    // const headers = {
    //     "Content-Type": "application/json",
    //     Authorization: `Basic ${base64ApiKey}`
    // }

    // return {url, data, headers};
}

export default async (req, res) => {
    const { email } = req.body;
    
    if(!email || !email.length) {
        return res.status(400).json({
            error: "Kindly provide valid Email-Address"
        })
    }

    try {
        //const {url, data, headers } = getRequestParameters(email);
        //axios.post(url, data, {headers});

        //const response = await axios.post("/api/subscription", { email: data.email });
        //console.log(response, '========')
        const { serverRuntimeConfig } = getConfig();
        const API_KEY = serverRuntimeConfig.mailchimpApiToken;
        const listId = serverRuntimeConfig.mailchimpListId;//'e00bab724e';
        const DATACENTER = API_KEY.split('-')[1];
        const subscribingUser = {
            email: email
          };

        mailchimp.setConfig({
            apiKey: API_KEY,
            server: DATACENTER
        });

        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed"
        });

        return res.status(201).json({error: null})

    } catch(error) {
        console.log(error, '=============')
        return res.status(400).json({
            error: "OOps, Someting went wrong."
        })
    }
}