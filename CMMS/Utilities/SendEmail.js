// This for connection with the gmail and Authentication
// Create a transporter using SMTP
const nodemailer = require("nodemailer");
const sendEmail = async ({from=process.env.EMAIL,to,subject,text,html,attachments=[]}={}) => {


    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PaSSWORD,
        },
    });

    try {
        const info = await transporter.sendMail({
            from:`"CMMS" <${from}>`,//sender address
            to, //list of recievers
            subject, //subject line
            text, //plain text body
            html, //html body
            attachments
        });

        console.log("Message sent: %s", info.messageId);
    } catch (err) {
        console.error("Error while sending mail:", err);
    }
}
module.exports=sendEmail;