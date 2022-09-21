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

                const { email, subject } = fields;

                //validate all fields over here
                if(!email || !email.length) {
                    reject({error: "Kindly provide valid Email-Address"})
                }

                if(!subject || !subject.length) {
                    reject({error: "Kindly enter mandatory fields"})
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
                                        <td><strong>Mobile</strong></td>
                                        <td>${fields['mobile']}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Email</strong></td>
                                        <td>${fields['email']}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>City</strong></td>
                                        <td>${fields['city']}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Education</strong></td>
                                        <td>${fields['education']}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Linkedin</strong></td>
                                        <td>${fields['linkedin']}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Hear</strong></td>
                                        <td>${fields['hear']}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Agree</strong></td>
                                        <td>${fields['agree']}</td>
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

                    if(fields['subject'] === 'REQUEST FOR SOLUTIONS') {
                        userInfo = `<table class="content" border="0" cellspacing="0" cellpadding="0">
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
                                        <td><strong>Relationship</strong></td>
                                        <td>${fields['relationship']}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Comment</strong></td>
                                        <td>${fields['comment']}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Receive Alerts</strong></td>
                                        <td>${fields['alerts']}</td>
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
                    }

                    if(fields['subject'] === 'QUERIES') {
                        userInfo = `<table class="content" border="0" cellspacing="0" cellpadding="0">
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
                                        <td><strong>Comment</strong></td>
                                        <td>${fields['comment']}</td>
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
                        
                    }
                
                    // send mail with defined transport object
                    let info = await transporter.sendMail({
                        from: '"From info" <info@hindujatech.com>', // sender address
                        to: 'ananthsoftcare@gmail.com',//fields['email'], // list of receivers
                        subject: `Contactus Request - ${fields['subject']}`, // Subject line
                        //text: "Hello world?", // plain text body
                        html: `<table class="top-panel center" width="602" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                <tr>
                                    <td class="border" colspan="2">&nbsp;</td>
                                </tr>
                                </tbody>
                            </table>
                        
                            <div class="spacer">&nbsp;</div>
                        
                            <table class="main center" width="602" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                <tr>
                                    <td class="column">
                                        <div class="column-top">&nbsp;</div>
                                        ${userInfo}
                                        <div class="column-bottom">&nbsp;</div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>`, // html body
                        ...(files.resume && {attachments:[{
                        filename:files.resume.name,
                        path: files.resume.path
                        }]})
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