const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { orderId, userId, products, totalAmount } = JSON.parse(event.body);

    const params = {
        TableName: "Orders",
        Item: {
            orderId,
            userId,
            products,
            totalAmount,
            createdAt: new Date().toISOString(),
            status: "pending",
        },
    };

    try {
        await dynamoDB.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify({ message: "Pedido creado con éxito", data: params.Item }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error al crear el pedido", error: error.message }),
        };
    }
};
