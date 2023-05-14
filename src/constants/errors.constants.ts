export const resourceDoesNotExist: string = 'RESOURCE DOES NOT EXIST';
export const contentDoesNotExist: string = 'CONTENT DOES NOT EXIST' || 'There is no user record corresponding to the provided identifier.';
export const userDoesNotExist: string = 'There is no user record corresponding to the provided identifier.';
export const genericDatabaseError: string = 'DATABASE ERROR';
export const invalidUpdateAttribute: string = 'CANNOT UPDATE ATTRIBUTE';
export const missingCreationAttribute: string = 'MISSING CREATE ATTRIBUTE';
export const resourceAlreadyExists: string = 'RESOURCE ALREADY EXISTS';
export const genericEmptyBody: string = 'EMPTY BODY';

export const httpStatusMap = {
    [resourceDoesNotExist]: 404,
    [contentDoesNotExist]: 204,
    [userDoesNotExist]: 204,
    [genericDatabaseError]: 503,
    [invalidUpdateAttribute]: 400,
    [missingCreationAttribute]: 400,
    [genericEmptyBody]: 400,
    [resourceAlreadyExists]: 400
};
