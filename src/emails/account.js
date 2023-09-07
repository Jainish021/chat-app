const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "jainish1999@gmail.com",
        subject: "Thanks for joining in",
        text: `Welcome to the app, ${name}.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: "jainish1999@gmail.com",
        subject: "Goodbye",
        text: `Thanks for using the app, ${name}. Do let us know if there is something that we could improve.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}