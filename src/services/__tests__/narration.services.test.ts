import { firestore } from 'firebase-admin';
import { NarrationInterface } from 'src/models/narration.model';
import * as daos from '../../daos/narration.daos';
import { update } from '../narration.services';

jest.mock('../../daos/narration.daos');

describe('narration services test suite', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete creationDate and publishDate, and add modifiedDate, from/to the patch payload', async () => {
        const payload = {
            title: 'test title',
            creationDate: {
                _seconds: 123456777,
                _milliseconds: 12345553345
            },
            publishDate: {
                _seconds: 123456777,
                _milliseconds: 12345553345
            }
        };
        const testId = 'asdfljalksdj';

        const expectedEntry = {
            title: 'test title',
            modifiedDate: firestore.FieldValue.serverTimestamp()
        };

        const expectedReturnId = '123abc';

        const mock = (daos.updateById as jest.MockedFunction<any>).mockResolvedValue(expectedReturnId);
        await update(testId, payload);

        expect(daos.updateById).toBeCalledTimes(1);
        expect(daos.updateById).toBeCalledWith(testId, expectedEntry);
    });

    it('should delete creationDate and add modifiedDate, from/to the patch payload', async () => {
        const payload = {
            title: 'test title',
            creationDate: {
                _seconds: 123456777,
                _milliseconds: 12345553345
            }
        };
        const testId = 'asdfljalksdj';

        const expectedEntry = {
            title: 'test title',
            modifiedDate: firestore.FieldValue.serverTimestamp()
        };

        const expectedReturnId = '123abc';

        const mock = (daos.updateById as jest.MockedFunction<any>).mockResolvedValue(expectedReturnId);
        await update(testId, payload);

        expect(daos.updateById).toBeCalledTimes(1);
        expect(daos.updateById).toBeCalledWith(testId, expectedEntry);
    });

    it('should delete publishDate and add modifiedDate, from/to the patch payload', async () => {
        const payload = {
            title: 'test title',
            publishDate: {
                _seconds: 123456777,
                _milliseconds: 12345553345
            }
        };
        const testId = 'asdfljalksdj';

        const expectedEntry = {
            title: 'test title',
            modifiedDate: firestore.FieldValue.serverTimestamp()
        };

        const expectedReturnId = '123abc';

        const mock = (daos.updateById as jest.MockedFunction<any>).mockResolvedValue(expectedReturnId);
        await update(testId, payload);

        expect(daos.updateById).toBeCalledTimes(1);
        expect(daos.updateById).toBeCalledWith(testId, expectedEntry);
    });

    it('should add modifiedDate, from/to the patch payload', async () => {
        const payload = {
            title: 'test title'
        };
        const testId = 'asdfljalksdj';

        const expectedEntry = {
            title: 'test title',
            modifiedDate: firestore.FieldValue.serverTimestamp()
        };

        const expectedReturnId = '123abc';

        const mock = (daos.updateById as jest.MockedFunction<any>).mockResolvedValue(expectedReturnId);
        await update(testId, payload);

        expect(daos.updateById).toBeCalledTimes(1);
        expect(daos.updateById).toBeCalledWith(testId, expectedEntry);
    });
});
