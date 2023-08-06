const AWS = require('aws-sdk');
const SES = new AWS.SES();
// const fs = require('fs');

exports.handler = async event => {
    const body = `<div>User :${event.Records[0].dynamodb.NewImage.firstName.S + " " + event.Records[0].dynamodb.NewImage.lastName.S } <br> Email : ${event.Records[0].dynamodb.NewImage.emailAddress.S} <br> ${event.Records[0].dynamodb.NewImage.feedbackMessage.S} </div>` ;

    const params = {
        Destination: {
            ToAddresses: ["<email-address>"],
        },
        Message: {
            Body: {
                Html: { Data: body }
            },
            Subject: {
                Data: "Feedback from " + event.Records[0].dynamodb.NewImage.firstName.S
            },
        },
        Source: '<email-address>'
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