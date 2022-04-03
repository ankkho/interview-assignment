interface IErrorName {
    [key: string]: string
}

interface IErrorTypeDetails {
    message: string
    statusCode: number
}

interface IErrorType {
    [key: string]: IErrorTypeDetails
}

interface IGetErrorMessageResp {
    message: string,
    statusCode: number
}

export {
    IErrorName,
    IErrorTypeDetails,
    IErrorType,
    IGetErrorMessageResp
}