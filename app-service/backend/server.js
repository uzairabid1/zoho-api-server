require("dotenv").config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const GRANT_TYPE = process.env.GRANT_TYPE

const app = express();
const port = process.env.SERVER_PORT;

app.use(bodyParser.json());
app.use(cors());

app.get('/api/ping', async (req, res) => {

    res.json({'message': 'pong'});

});

app.post('/api/insert_deal', async (req, res) => {
    const postData = {
        data: [{
            'Deal_Name': req.body.clientName,
            'Stage': 'Prequal-Started',
            'Email': req.body.email,
            'First_Name': req.body.firstName,
            'Last_Name': req.body.lastName,
            'Phone': req.body.phone.toString(),
            'ReferralSource': req.body.referralSource,
            'ReferralURL': req.body.refereallURL,
            'S1_Q1_Selfemployed': req.body.s1Q1.toString(),
            'S1_Q2_Filed1040_tax': req.body.s1Q2.toString(),
            'S1_Q3_Affected': req.body.s1Q3.toString()            
        }],
        trigger: ['approval', 'workflow', 'blueprint']
    }

    const dealsUrl = "https://www.zohoapis.com/crm/v2/Deals";
    
    const tokenData = {
        refresh_token: REFRESH_TOKEN,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: GRANT_TYPE
    };

    try {
        const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', new URLSearchParams(tokenData), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
        const accessToken = response.data.access_token;
        
        try {
            const response = await axios.post(dealsUrl, postData, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            res.json(response.data);
        } catch (error) {
            console.error('Error:', error);
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/update_stage/:id', async (req, res) => {
    const postData = {
        data: [{
            'Stage': req.body.stage            
        }]
    }
    
    const id = req.params.id;

    const dealsUrl = `https://www.zohoapis.com/crm/v2/Deals/${id}`;
    
    const tokenData = {
        refresh_token: REFRESH_TOKEN,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: GRANT_TYPE
    };

    try {
        const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', new URLSearchParams(tokenData), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
        const accessToken = response.data.access_token;
        
        try {
            const response = await axios.put(dealsUrl, postData, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            res.json(response.data);
        } catch (error) {
            console.error('Error:', error);
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post('/api/update_record/:id', async (req,res) => {

    const postData = {
        data: [{
            'Stage': req.body.stage,
            'Deal_Name': req.body.clientName,
            'City': req.body.city,
            'Claim_Dependent': req.body.claimDependent,
            'Effective_Date': req.body.effectiveDate.toString(),
            'Email': req.body.email,
            'First_Name': req.body.firstName,
            'Last_Name': req.body.lastName,
            'Phone': req.body.phone.toString(),
            'State': req.body.state,
            'Street_Address': req.body.streetAddress,
            'Zip_Code': req.body.zipCode,
            'ReferralSource': req.body.referralSource,
            'ReferralURL': req.body.refereallURL,
            'S1_Q1_Selfemployed': req.body.s1Q1.toString(),
            'S1_Q2_Filed1040_tax': req.body.s1Q2.toString(),
            'S1_Q3_Affected': req.body.s1Q3.toString(),
            'S3_Q1': req.body.s3Q1.toString(),
            'S3_Q2': req.body.s3Q2.toString(),
            'S4_Q1': req.body.s4Q1.toString(),
            'S4_Q2': req.body.s4Q2.toString(),
            'S4_Q3': req.body.s4Q3.toString(),
            'S5_Q1': req.body.s5Q1.toString(),
            "S3_Q1_D1": req.body.S3_Q1_D1 || "",
            "S3_Q1_D2": req.body.S3_Q1_D2 || "",
            "S3_Q1_D3": req.body.S3_Q1_D3 || "",
            "S3_Q1_D4": req.body.S3_Q1_D4 || "",
            "S3_Q1_D5": req.body.S3_Q1_D5 || "",
            "S3_Q1_D6": req.body.S3_Q1_D6 || "",
            "S3_Q1_D7": req.body.S3_Q1_D7 || "",
            "S3_Q1_D8": req.body.S3_Q1_D8 || "",
            "S3_Q1_D9": req.body.S3_Q1_D9 || "",
            "S3_Q1_D10": req.body.S3_Q1_D10 || "",
            "S3_Q2_D1": req.body.S3_Q2_D1 || "",
            "S3_Q2_D2": req.body.S3_Q2_D2 || "",
            "S3_Q2_D3": req.body.S3_Q2_D3 || "",
            "S3_Q2_D4": req.body.S3_Q2_D4 || "",
            "S3_Q2_D5": req.body.S3_Q2_D5 || "",
            "S3_Q2_D6": req.body.S3_Q2_D6 || "",
            "S3_Q2_D7": req.body.S3_Q2_D7 || "",
            "S3_Q2_D8": req.body.S3_Q2_D8 || "",
            "S3_Q2_D9": req.body.S3_Q2_D9 || "",
            "S3_Q2_D10": req.body.S3_Q2_D10 || "",        
            "S4_Q2_D1": req.body.S4_Q2_D1 || "",
            "S4_Q2_D2": req.body.S4_Q2_D2 || "",
            "S4_Q2_D3": req.body.S4_Q2_D3 || "",
            "S4_Q2_D4": req.body.S4_Q2_D4 || "",
            "S4_Q2_D5": req.body.S4_Q2_D5 || "",
            "S4_Q2_D6": req.body.S4_Q2_D6 || "",
            "S4_Q2_D7": req.body.S4_Q2_D7 || "",
            "S4_Q2_D8": req.body.S4_Q2_D8 || "",
            "S4_Q2_D9": req.body.S4_Q2_D9 || "",
            "S4_Q2_D10": req.body.S4_Q2_D10 || "",
            "S4_Q3_D1": req.body.S4_Q3_D1 || "",
            "S4_Q3_D2": req.body.S4_Q3_D2 || "",
            "S4_Q3_D3": req.body.S4_Q3_D3 || "",
            "S4_Q3_D4": req.body.S4_Q3_D4 || "",
            "S4_Q3_D5": req.body.S4_Q3_D5 || "",
            "S4_Q3_D6": req.body.S4_Q3_D6 || "",
            "S4_Q3_D7": req.body.S4_Q3_D7 || "",
            "S4_Q3_D8": req.body.S4_Q3_D8 || "",
            "S4_Q3_D9": req.body.S4_Q3_D9 || "",
            "S4_Q3_D10": req.body.S4_Q3_D10 || ""                    
        }]
    }

    const id = req.params.id;

    const dealsUrl = `https://www.zohoapis.com/crm/v2/Deals/${id}`;
    
    const tokenData = {
        refresh_token: REFRESH_TOKEN,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: GRANT_TYPE
    };

    try {
        const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', new URLSearchParams(tokenData), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
        const accessToken = response.data.access_token;
        
        try {
            const response = await axios.put(dealsUrl, postData, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            res.json(response.data);
        } catch (error) {
            console.error('Error:', error);
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

app.listen(port, () => {
});
