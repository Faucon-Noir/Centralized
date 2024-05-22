import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

export class NodeMailerSendEmail {
    public mailApp: string = "centralized2024@gmail.com";

    public transporter = nodemailer.createTransport({
        host: "mail.openjavascript.info",
        port: 465,
        secure: true,
        auth: {
            user: this.mailApp,
            pass: process.env.MAIL_KEY
        },
        tls: {
            rejectUnauthorized: false // ne pas vérifier le certificat du serveur SMTP
        }
    });

    public async sendMailTicket(email: string, subject: string, username: string) {
        const mailOptions = {
            from: this.mailApp,
            to: email,
            subject: subject,
            html: `<html>
                    <head>
                        <style>
                        </style>
                    </head>
                    <body>
                        <p>Bonjour ${username},</p>
                        <p>Nous sommes ravis de vous annoncer que votre Ticket Centralized a bien été créé ! Vous pouvez dès maintenant accéder à notre plateforme pour consulter et gérer votre Ticket.</p>
                        <br>
                        <br>
                        <p>Si vous n'êtes pas à l'origine de cette action, veuillez contacter notre support pour signaler toute activité suspecte.</p>
                        <br>
                        <br>
                        <p>Nous espérons que vous apprécierez votre expérience sur Centralized. N'hésitez pas à nous contacter si vous avez des questions ou des commentaires.</p>
                        <br>
                        <p>Cordialement,</p>
                        <p>L'équipe Centralized</p>
                    </body>
                    </html>`,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log("Message sent: %s", info.messageId);
            return { success: info.messageId };
        } catch (error) {
            console.error(error);
            return { error: error.message };
        }
    }
}