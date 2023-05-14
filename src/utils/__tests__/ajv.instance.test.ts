import { SCHEMA_NAMES } from '../../types/schema/schema.constants';
import { ajvInstance } from '../ajv.instance';

describe('ajv instance test suite', () => {

    it.each(Object.values(SCHEMA_NAMES))(`should have schema for %s`, (schema) => {
        expect(ajvInstance.getSchema(schema)).not.toBe(undefined);
    });
});
