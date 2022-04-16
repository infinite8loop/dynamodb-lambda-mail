const AWS = require('aws-sdk');
const SES = new AWS.SES();
// const fs = require('fs');

exports.handler = async event => {
    // // console.log("DB ", event.Records[0].dynamodb.NewImage.key.S);
    // // console.log("DB-1", event.Records[0].dynamodb.NewImage.key);
    // // console.log("DB-2", event.Records[0].dynamodb.NewImage);
    // console.log("DB-3", event.Records[0].dynamodb);
    // return {
    //         statusCode: 200,
    //         body: 'Testing!'
    //     }
    // const { to, subject } = JSON.parse(event.body);
    // const body = fs.readFileSync('./body.html').toString()
    const body = `<div>User :${event.Records[0].dynamodb.NewImage.firstName.S + " " + event.Records[0].dynamodb.NewImage.lastName.S } <br> Email : ${event.Records[0].dynamodb.NewImage.emailAddress.S} <br> ${event.Records[0].dynamodb.NewImage.feedbackMessage.S} </div>` ;

    const params = {
        Destination: {
            ToAddresses: ["manumanojkumar27@gmail.com"],
        },
        Message: {
            Body: {
                Html: { Data: body }
            },
            Subject: {
                Data: "Trace Feedback from " + event.Records[0].dynamodb.NewImage.firstName.S
            },
        },
        Source: 'manoj@makoitlab.com'
    };

    try {
        await SES.sendEmail(params).promise();
        return {
            statusCode: 200,
            body: 'Email sent!'
        }
    } catch (e) {
        console.error(e);
        return {
            statusCode: 400,
            body: 'Sending failed'
        }
    }
};