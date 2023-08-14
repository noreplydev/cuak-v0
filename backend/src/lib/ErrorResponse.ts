const ErrorResponse = (error, response) => {
    let statusCode;
    switch(error){
        case "Not found":
            statusCode = 404
            break
        case "Duplicated key":
            statusCode = 409
            break
        case "Unauthorized":
            statusCode = 401
            break
        case "Server error":
            statusCode = 501
            break
        default:
            statusCode = 501
            break
    }
    response.status(statusCode).send(error)
}

export default ErrorResponse;