const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

//processing the queue which was created in comments conroller file
queue.process('emails', function(job, done){
    console.log('emails worker is processing a job ', job.data);
    //job.data contains whole info of the comment
    commentsMailer.newComment(job.data);

    done();
});