class HttpError extends Error {
    constructor(message, errorCode) {
        super(message); // Add a message property to the instances
                        // we created based on this class
        this.code = errorCode;  // Add a code property to the instance 
                                // based on this class
        
    }
} 
module.exports = HttpError;