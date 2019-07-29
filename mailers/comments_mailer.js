const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('inside newComment mailer', comment);
    //calling renderTemplate method in nodemailer.js file
    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
       from: 'starktony3600@gmail.com',
       to: comment.user.email,
       subject: "New Comment Published!",
       html: htmlString 
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }
        //just to print on terminal
        console.log('Message sent', info);
        return;
    });
}