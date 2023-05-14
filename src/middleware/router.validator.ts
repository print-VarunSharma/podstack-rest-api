import { ajvInstance } from '../utils/ajv.instance';
import { Request, Response, NextFunction } from 'express';
import { SCHEMA_NAMES } from '../types/schema/schema.constants';

const validateSchema = (name: SCHEMA_NAMES) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const validate = ajvInstance.getSchema(name);

        if (validate !== undefined && !validate(req.body)) {
            if (validate?.errors) {
                console.log('validateSchema|errors in validation');
                console.warn(validate?.errors);

                const errors = validate.errors.map(({ instancePath, params, message }) => ({
                    instancePath,
                    params,
                    message
                }));

                // ? We can use standard error response here to pack in errors in validations
                return res.status(400).json(errors);
            }
            return res.status(400).json({ error: 'unable to validate' });
        }

        return next();
    };
};

export default validateSchema;
