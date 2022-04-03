import {
    IErrorName,
    IErrorType,
    IGetErrorMessageResp
} from './interfaces/errors'

const errorName:IErrorName = {
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    ITEM_NOT_FOUND: 'ITEM_NOT_FOUND',
    RESTAURANT_NOT_FOUND: 'RESTAURANT_NOT_FOUND',
    INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
}

const errorType: IErrorType = {
    USER_NOT_FOUND: {
        message: 'Sorry, no such user exists!',
        statusCode: 404
    },
    ITEM_NOT_FOUND: {
        message: 'Please provide valid menu item ids which belongs to this restaurant!',
        statusCode: 404
    },
    RESTAURANT_NOT_FOUND: {
        message: 'Sorry, no such restaurant exists!',
        statusCode: 404
    },
    INSUFFICIENT_BALANCE: {
        message: 'Sorry, Insufficient Balance!',
        statusCode: 412
    },
    INTERNAL_SERVER_ERROR: {
        message: 'Something went wrong',
        statusCode: 500
    }
}  

const getErrorMessage = (errorName: string):IGetErrorMessageResp => errorType[errorName]

export {
    getErrorMessage,
    errorName,
    errorType,
}