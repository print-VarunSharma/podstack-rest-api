import { UserRecord } from 'firebase-admin/auth';
import { SubscriptionInterface } from '../models/user.model';
import { PLAN_VALUE, TRIAL_PERIOD_IN_DAYS, PRE_STRIPE_CUTOFF_DATE } from '../constants/subscription.constants';
import { APP_ENV } from '../constants/app.constants';

export function getSubscription(user:UserRecord) : SubscriptionInterface {

    const stripeRole = user.customClaims?.stripeRole;
    const userCreationDate = new Date(user.metadata.creationTime);
    let tier;
    let isTrial;
    let validThrough = null;
    let daysRemaining = null;
    let isPreStripe = false;

    // * if user is a paying customer, then stripeRole will be populated with 'PREMIUM' value
    // * if it's not populated then we need to figure out if the user is grandfathered
    // * otherwise we will determine if it's a trial of the premium period or just on the free tier
    if (isPreStripeUser(userCreationDate)) {
        tier = PLAN_VALUE.PREMIUM;
        isPreStripe = true;
        isTrial = false;
    }
    else if (stripeRole == PLAN_VALUE.PREMIUM) {
        tier = stripeRole;
        isTrial = false;
    }
    else {
        const trialEndDate = getTrialEndDate(userCreationDate);
        daysRemaining = getDaysUntilDate(trialEndDate.toISOString());

        if (daysRemaining < 0) {
            tier = PLAN_VALUE.FREE;
            isTrial = false;
            daysRemaining = null;
        }
        else {
            tier = PLAN_VALUE.PREMIUM;
            isTrial = true;
            validThrough = trialEndDate.toISOString();
        }
    }   
            
    return {
        tier,
        isTrial,
        validThrough,
        daysRemaining,
        isPreStripe
    }
}

export function getTrialEndDate(userCreationDate:Date) : Date {

    let trialEndDate = new Date(userCreationDate);
    trialEndDate.setDate(trialEndDate.getDate() + TRIAL_PERIOD_IN_DAYS);

    return trialEndDate;
}

export const getDaysUntilDate = (dateString: string): number => {
    const date = new Date(dateString);
    const now = new Date();

    // To calculate the time difference of two dates
    var Difference_In_Time = date.getTime() - now.getTime();

    // To calculate the no. of days between two dates
    return Math.floor(Difference_In_Time / (1000 * 3600 * 24));
};

export const isPreStripeUser = (userCreationDate: Date): boolean  => {

    const currentEnv = process.env.APP_ENV || APP_ENV.production;
    const cutoffDateEnv = process.env.PRE_STRIPE_CUTOFF_DATE;

    let cutoff = PRE_STRIPE_CUTOFF_DATE;

    if (currentEnv != APP_ENV.production) {
        if (cutoffDateEnv) {
            cutoff = new Date(cutoffDateEnv);
        }
    }

    if (userCreationDate <= cutoff) {
        return true;
    }
    else {
        return false;
    }
}