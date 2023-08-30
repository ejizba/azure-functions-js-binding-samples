const { app, output } = require('@azure/functions');

const cosmosOutput = output.cosmosDB({
    databaseName: 'MyDatabase',
    collectionName: 'MyCollection',
    createIfNotExists: true,
    connectionStringSetting: 'MyAccount_COSMOSDB',
});

app.storageQueue('storageQueueTrigger1', {
    queueName: 'inputqueue',
    connection: 'MyStorageConnectionAppSetting',
    extraOutputs: [cosmosOutput],
    handler: (queueItem, context) => {
        context.extraOutputs.set(cosmosOutput, {
            id: `${queueItem.name}-${queueItem.employeeId}`,
            name: queueItem.name,
            employeeId: queueItem.employeeId,
            address: queueItem.address,
        });
    },
});
