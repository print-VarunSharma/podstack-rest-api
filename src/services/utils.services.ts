import * as errorMessages from '../constants/errors.constants';

/*
 * asserts object key set is equivalent to attributes set
 */
const _assertContainsAllAttributes = (attributes: Iterable<unknown> | null | undefined, obj: {}, error: Error) => {
    const keySet = new Set(Object.keys(obj));
    const attributeSet = new Set(attributes);

    if (!_eqSet(keySet, attributeSet)) {
        throw error;
    }
};

// https://stackoverflow.com/questions/31128855/comparing-ecma6-sets-for-equality
const _eqSet = (aSet: Set<string>, bSet: Set<unknown>) => {
    if (aSet.size !== bSet.size) return false;
    for (const a of aSet) {
        if (!bSet.has(a)) {
            return false;
        }
    }
    return true;
};

/*
 * Assert object has all values and nothing more in creationAttributes
 */
export const assertAttributesAll = (creationAttributes: any, obj: any) => {
    console.log(creationAttributes);
    const errorToThrow = new Error(errorMessages.missingCreationAttribute);
    _assertContainsAllAttributes(creationAttributes, obj, errorToThrow);
};
