import { getDaysUntilDate, getSubscription } from '../subscription.utils';
import { UserRecord } from 'firebase-admin/auth';
import { PLAN_VALUE, TRIAL_PERIOD_IN_DAYS, PRE_STRIPE_CUTOFF_DATE } from '../../constants/subscription.constants';
import { SubscriptionInterface } from '../../models/user.model';
import { APP_ENV } from '../../constants/app.constants';

describe('subscription utils test suite', () => {

    describe('premium user test cases', () => {

        it('should return a premium user who has a valid subscription from Stripe set by firestore-Stripe extension', () => {
            const mockUser : UserRecord = {
                uid: "abc123",
                emailVerified: false,
                disabled: false,
                metadata: {
                    creationTime: new Date().toISOString(),
                    lastSignInTime: new Date().toISOString(),
                    toJSON: jest.fn(),
                },
                providerData: [],
                toJSON: jest.fn(),
                customClaims: {
                    ['stripeRole']: PLAN_VALUE.PREMIUM
                }
            };
            
            const expected : SubscriptionInterface = {
                tier: PLAN_VALUE.PREMIUM,
                isTrial: false,
                validThrough: null,
                daysRemaining: null,
                isPreStripe: false
            };

            const result = getSubscription(mockUser);
            expect(result).toEqual(expected);
        });

        it('should return a premium user on a trial period', () => {

            const startDate = new Date('2022-12-05');
            jest.useFakeTimers().setSystemTime(startDate);
            const expectedValidThroughDate =  startDate;

            expectedValidThroughDate.setDate(startDate.getDate() + TRIAL_PERIOD_IN_DAYS);

            const mockUser : UserRecord = {
                uid: "abc123",
                emailVerified: false,
                disabled: false,
                metadata: {
                    creationTime: new Date().toISOString(),
                    lastSignInTime: new Date().toISOString(),
                    toJSON: jest.fn(),
                },
                providerData: [],
                toJSON: jest.fn()
            };
            
            const expected : SubscriptionInterface = {
                tier: PLAN_VALUE.PREMIUM,
                isTrial: true,
                validThrough: expectedValidThroughDate.toISOString(),
                daysRemaining: 21,
                isPreStripe: false
            };

            const result = getSubscription(mockUser);
            expect(result).toEqual(expected);
        });

        it('should return a premium user who has not provided payment but is premium because they are grandfathered (business decision for users created before pricing introduced)', () => {
            const currentDate = new Date('2022-12-01');

            jest.useFakeTimers().setSystemTime(currentDate);
            
            const mockUser: UserRecord = {
                uid: "abc123",
                emailVerified: false,
                disabled: false,
                metadata: {
                    creationTime: new Date().toISOString(),
                    lastSignInTime: new Date().toISOString(),
                    toJSON: jest.fn(),
                },
                providerData: [],
                toJSON: jest.fn()
            }
            
            const expected : SubscriptionInterface = {
                tier: PLAN_VALUE.PREMIUM,
                isTrial: false,
                validThrough: null,
                daysRemaining: null,
                isPreStripe: true
            };

            const result = getSubscription(mockUser);
            expect(result).toEqual(expected);
        });

        it('should return a premium user who is grandfathered using env var as cutoff date as APP_ENV is non-prod', () => {
            const currentDate = new Date('2023-02-01');
            const originalStripeCutoffDate = process.env.PRE_STRIPE_CUTOFF_DATE;
            const originalAppEnv = process.env.APP_ENV;

            process.env.PRE_STRIPE_CUTOFF_DATE = '2023-03-01';
            process.env.APP_ENV=APP_ENV.development;

            jest.useFakeTimers().setSystemTime(currentDate);
            
            const mockUser: UserRecord = {
                uid: "abc123",
                emailVerified: false,
                disabled: false,
                metadata: {
                    creationTime: new Date().toISOString(),
                    lastSignInTime: new Date().toISOString(),
                    toJSON: jest.fn(),
                },
                providerData: [],
                toJSON: jest.fn()
            }
            
            const expected : SubscriptionInterface = {
                tier: PLAN_VALUE.PREMIUM,
                isTrial: false,
                validThrough: null,
                daysRemaining: null,
                isPreStripe: true
            };

            const result = getSubscription(mockUser);
            expect(result).toEqual(expected);

            process.env.PRE_STRIPE_CUTOFF_DATE = originalStripeCutoffDate;
            process.env.APP_ENV = originalAppEnv;
        });

        it.each(['free', PLAN_VALUE.FREE])('should return a premium user who is grandfathered even if firestore-Stripe extension returns non PREMIUM role', (role) => {

            const currentDate = new Date('2023-02-01');
            const originalStripeCutoffDate = process.env.PRE_STRIPE_CUTOFF_DATE;
            const originalAppEnv = process.env.APP_ENV;

            process.env.PRE_STRIPE_CUTOFF_DATE = '2023-03-01';
            process.env.APP_ENV=APP_ENV.development;

            jest.useFakeTimers().setSystemTime(currentDate);

            const mockUser : UserRecord = {
                uid: "abc123",
                emailVerified: false,
                disabled: false,
                metadata: {
                    creationTime: new Date().toISOString(),
                    lastSignInTime: new Date().toISOString(),
                    toJSON: jest.fn(),
                },
                providerData: [],
                toJSON: jest.fn(),
                customClaims: {
                    ['stripeRole']: role
                }
            };
            
            const expected : SubscriptionInterface = {
                tier: PLAN_VALUE.PREMIUM,
                isTrial: false,
                validThrough: null,
                daysRemaining: null,
                isPreStripe: true
            };

            const result = getSubscription(mockUser);
            expect(result).toEqual(expected);

            process.env.PRE_STRIPE_CUTOFF_DATE = originalStripeCutoffDate;
            process.env.APP_ENV = originalAppEnv;
        });
    });

    describe('free user test cases', () => {

        it('should return a user on the free tier having not subscribed, not a grandfathered user and outside the trial period', () => {

            jest.useFakeTimers().setSystemTime(new Date('2023-01-05'));

            const mockUser : UserRecord = {
                uid: "abc123",
                emailVerified: false,
                disabled: false,
                metadata: {
                    creationTime: new Date('2022-12-02').toISOString(),
                    lastSignInTime: new Date('2022-12-02').toISOString(),
                    toJSON: jest.fn(),
                },
                providerData: [],
                toJSON: jest.fn()
            };
            
            const expected : SubscriptionInterface = {
                tier: PLAN_VALUE.FREE,
                isTrial: false,
                validThrough: null,
                daysRemaining: null,
                isPreStripe: false
            };

            const result = getSubscription(mockUser);
            expect(result).toEqual(expected);
        });

        it('should return a user on the free tier having not subscribed, not a grandfathered user and outside the trial period using env vars', () => {

            const originalStripeCutoffDate = process.env.PRE_STRIPE_CUTOFF_DATE;
            const originalAppEnv = process.env.APP_ENV;

            process.env.PRE_STRIPE_CUTOFF_DATE = '2023-10-01';
            process.env.APP_ENV=APP_ENV.development;
            jest.useFakeTimers().setSystemTime(new Date('2023-11-05'));

            const mockUser : UserRecord = {
                uid: "abc123",
                emailVerified: false,
                disabled: false,
                metadata: {
                    creationTime: new Date('2023-10-02').toISOString(),
                    lastSignInTime: new Date('2023-10-02').toISOString(),
                    toJSON: jest.fn(),
                },
                providerData: [],
                toJSON: jest.fn()
            };
            
            const expected : SubscriptionInterface = {
                tier: PLAN_VALUE.FREE,
                isTrial: false,
                validThrough: null,
                daysRemaining: null,
                isPreStripe: false
            };

            const result = getSubscription(mockUser);
            expect(result).toEqual(expected);

            process.env.PRE_STRIPE_CUTOFF_DATE = originalStripeCutoffDate;
            process.env.APP_ENV = originalAppEnv;
        });
    });

    describe('getDaysUntilDate', () => {
        beforeEach(() => {
            jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));
        });
        afterAll(() => {
            jest.useRealTimers();
        });
        it('returns proper amount of days', () => {
            const days = getDaysUntilDate('2023-02-01');
            expect(days).toEqual(31);
        });
    });
});