import axios from 'axios';
import getConfig from 'next/config';
const nodemailer = require("nodemailer");
const formidable = require('formidable');

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
    try 
    {
        const promise = new Promise( (resolve, reject) => {
            const form = new formidable.IncomingForm();
            form.keepExtensions = true;
            form.parse(req, async (err, fields, files) => {
            
                if(err) reject(err);

                const { email } = fields;

                //validate all fields over here
                if(!email || !email.length) {
                    reject({error: "Kindly provide valid Email-Address"})
                }

                const { serverRuntimeConfig } = getConfig();

                axios.post(
                    `https://www.google.com/recaptcha/api/siteverify`,
                    `secret=${serverRuntimeConfig.captchaSecretToken}&response=${fields["g-recaptcha-response"]}`,
                    {
                        headers: {
                            Accept: "application/json",
                            "Content-Type":
                            "application/x-www-form-urlencoded; charset=utf-8",
                        },
                    }
                )
                .then(async (response) => {
                    let transporter = nodemailer.createTransport({
                        host: "smtp-mail.outlook.com",
                        port: 587,
                        secureConnection: false, // true for 465, false for other ports
                        auth: {
                            user: serverRuntimeConfig.emailAuthUsername, // generated ethereal user
                            pass: serverRuntimeConfig.emailAuthPassword, // generated ethereal password
                        },
                        tls: {
                            ciphers:'SSLv3'
                        }
                    });

                    let userInfo = `<table class="content" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                            <tr>
                                <td class="padded">
                                <h1>${fields['subject']}</h1>                                
                                <p>New Contact us request received</p>
                                <table style="width:100%">
                                    <tr>
                                        <td><strong>Firstname</strong></td>
                                        <td>${fields['firstname']}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Lastname<strong></td>
                                        <td>${fields['lastname']}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Email</strong></td>
                                        <td>${fields['email']}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Company</strong></td>
                                        <td>${fields['company']}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Country</strong></td>
                                        <td>${fields['country']}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Page</strong></td>
                                        <td>${fields['url']}</td>
                                    </tr>
                                </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>`;
                
                    // send mail with defined transport object
                    let info = await transporter.sendMail({
                        from: '"From info" <info@hindujatech.com>', // sender address
                        to: 'ananthsoftcare@gmail.com',//fields['email'], // list of receivers
                        subject: `${fields['subject']}`, // Subject line
                        //text: "Hello world?", // plain text body
                        html: `<table class="main center" width="602" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                <tr>
                                    <td class="column">
                                        <div class="column-top">&nbsp;</div>
                                        ${userInfo}
                                        <div class="column-bottom">&nbsp;</div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>`
                    });

                    resolve({fields, files})
                })
                .catch((err) => {
                    reject(err)
                });
            });
        })

        return promise.then(({fields, files}) => {
            res.status(201).json({error: null})
        })

    } catch(error) {
        console.log(error, '=============')
        return res.status(400).json({
            error: "OOps, Someting went wrong."
        })
    }

}






// return axios.post(
//   `${process.env.NEXT_PUBLIC_API_URL}/contact-requests`,
//   req.body
// ).then((response) => {
//   if (response && response.data) {
//     if (response.data.success) {
//       //Validated successfully
//       return res.status(201).json({error: null})
//     } else {
//         return res.status(400).json({
//             isValid: false,
//             error: (response.data["error-codes"] && response.data["error-codes"][0]) || "Something went wrong"
//         })
//     }
//   }
// }).catch((err) => {
//     console.log("AXIOS ERROR: ", err);          
//     return res.status(400).json({
//         isValid: false,
//         error: "axios error"
//     })
// });