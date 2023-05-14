export enum PLAN_VALUE {
    FREE = 'FREE',
    PREMIUM = 'PREMIUM'
}

// TODO - revisit where this should be stored either as env var or pulled from somewhere
export const TRIAL_PERIOD_IN_DAYS : number = 21;
export const PRE_STRIPE_CUTOFF_DATE = new Date('2022-12-01');