const { app, output } = require('@azure/functions');

const eventGridOutput = output.eventGrid({
    topicEndpointUri: 'MyEventGridTopicUriSetting',
    topicKeySetting: 'MyEventGridTopicKeySetting',
});

app.timer('timerTrigger1', {
    schedule: '0 */5 * * * *',
    extraOutputs: [eventGridOutput],
    handler: (myTimer, context) => {
        const timeStamp = new Date().toISOString();
        context.extraOutputs.set(eventGridOutput, [
            {
                id: 'message-id',
                subject: 'subject-name',
                dataVersion: '1.0',
                eventType: 'event-type',
                data: 'event-data',
                eventTime: timeStamp,
            },
            {
                id: 'message-id-2',
                subject: 'subject-name',
                dataVersion: '1.0',
                eventType: 'event-type',
                data: 'event-data',
                eventTime: timeStamp,
            },
        ]);
    },
});
