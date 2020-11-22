const express = require('express');
const router = express.Router();

router.post('/email', (req, res) => {

    const outputHTML = `
<h2>Mail Details</h2>
<ul>
<li>Name: ${req.body.name}</li>
<li>Email: ${req.body.email}</li>
<li>Phone: ${req.body.phone}</li>
</ul>
<h3>Message</h3>
<p>${req.body.message}</p>
`;

    const nodemailer = require('nodemailer');

    async function main() {
        let testAccount = nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'user',
                pass: 'pass'
            }
        });

        let info = await transporter.sendMail({
            from: 'Hakan',
            to: 'to@email.com',
            subject: 'Subject',
            html: outputHTML
        });

        req.session.sessionFlash = {
            type: 'alert alert-success',
            message: 'Mesajınız başarıyla gönderildi.'
        };

        res.redirect('/contact');
    }

});


module.exports = router;