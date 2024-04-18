import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_LOGIN || '',
        pass: process.env.GMAIL_PASSWORD || ''
    }
})

export const sendEmail = async (email: string, confirmationCode: string) => {
    const mailOptions = {
        from: '"New app" <vladislavincubatorfortests@gmail.com>',
        to: email,
        subject: "Email Confirmation",
        html: `<a href=\'https://somesite.com/confirm-email?code=${confirmationCode}\'>complete registration</a>`
    }
    return await transporter.sendMail(mailOptions)
}
