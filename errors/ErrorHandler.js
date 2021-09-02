class ErrorHandler {
    constructor(status,msg) {
        this.status = status;
        this.msg = msg;
    }

    static validationError(message = 'All fields are required'){
        return new ErrorHandler(422,message);
    }

    static notFoundError(message = 'Not found error'){
        return new ErrorHandler(404,message);
    }

    static forbiddenToken(message="not allowed") {
        return new ErrorHandler(403,message);
    }
}

module.exports = ErrorHandler;
