import { httpStatusMap } from '../constants/errors.constants';

export const formatError = (status: number, message: string) => {
    return {
        error: {
            status,
            message
        }
    };
};

export const getStatusFromError = (error: any) => {
    const message = error.message;
    if (message in httpStatusMap) {
        return httpStatusMap[message];
    }
    return 404;
};
