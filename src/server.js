require("express-async-errors");
const express = require("express");
const routes = require("./routes");
const AppError = require("./utils/AppError");

const app = express();
const PORT = 3333;

app.use(express.json());//Faz o express conseguir receber um body com json
app.use(routes);

app.use((error, request, response, next) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));