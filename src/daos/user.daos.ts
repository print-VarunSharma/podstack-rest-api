import { auth } from '../config/firebase/firebase';
import { UserRecord } from 'firebase-admin/auth';
import { UserInterface, SubscriptionInterface } from '../models/user.model';
import { getSubscription } from '../utils/subscription.utils';

export const getById = async (id: string): Promise<UserInterface> => {
    try {
        const user: UserRecord = await auth.getUser(id);
        // See the UserRecord reference doc for the contents of userRecord.
        console.log(`Successfully fetched user data`);

        const subscription: SubscriptionInterface = getSubscription(user);

        const reducedUserData: UserInterface = {
            uid: user.uid,
            email: user.email as string,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            metadata: user.metadata,
            subscription,
        };

        return reducedUserData;
    } catch (error) {
        console.log('Error fetching user data:', error);
        throw error;
    }
};
