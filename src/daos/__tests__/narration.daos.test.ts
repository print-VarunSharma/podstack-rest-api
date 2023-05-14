import * as NarrationDaos from '../narration.daos';

describe('Narration Daos', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getById()', () => {
        const expectedNarration = {
            sourceMetadataId: 'KYusAROfQ2wE7PNpa03v',
            userId: 'HYgool82YrXTF2mekDlqow23hQV2',
            creationDate: '2022-09-24T08:34:28Z',
            title: 'Ukraine war: Putin not bluffing about nuclear weapons, EU says',
            audioSource: 'https://storage.googleapis.com/ad-auris-mvp-bucket/data-dashboard-narrations/water-markets-jennifer-oldham.mp3',
            narrationMethod: 'play app',
            routeIdentifier: 'Ukraine-war-Putin-not-bluffing-about-nuclear-weapons-EU-says'
        };

        const testNarrationId = '4bPwN4VCXAIdOx8MofRe';
        xit('should return a narration given the correct document ID', () => {
            // TODO: Create a more elegant solution for jest mocking firestore admin DB calls
            // https://stackoverflow.com/questions/62026238/testing-typescript-with-jest-no-overload-matches-this-call
            // const spy = jest
            //     // @ts-expect-error
            //     .spyOn(NarrationDaos.getById, "firestoreDatabase.collection('Narrations').doc(id).get()")
            //     // @ts-expect-error
            //     .mockReturnValue(expectedNarration);
            // expect(NarrationDaos.getById).toHaveBeenCalledTimes(1);
            // expect(NarrationDaos.getById).toHaveBeenCalledWith(testNarrationId);
            // expect(result).toStrictEqual(expectedNarration);
            // spy.mockRestore();
        });
    });
});
