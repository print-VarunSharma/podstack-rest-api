export interface UserInterface {
    /**
     * The user's `uid`.
     */
    readonly uid: string;
    /**
     * The user's primary email, if set.
     */
    readonly email: string;
    /**
     * Whether or not the user's primary email is verified.
     *
     * * Firebase defaul is optional, but for Ad Auris needs, this is required.
     */
    readonly emailVerified: boolean;
    /**
     * The user's display name.
     */
    readonly displayName?: string;

    readonly metadata: UserMetadataInterface;
    /**
     * An array of providers (for example, Google, Facebook) linked to the user.
     */
    readonly subscription: SubscriptionInterface;
}

export interface SubscriptionInterface {
    readonly tier: string;
    readonly isTrial: boolean;
    readonly validThrough: string | null;
    readonly daysRemaining: number | null;
    readonly isPreStripe: boolean;
}

/**
 * Represents a user's metadata.
 */
export interface UserMetadataInterface {
    /**
     * The date the user was created, formatted as a UTC string.
     */
    readonly creationTime: string;
    /**
     * The date the user last signed in, formatted as a UTC string.
     */
    readonly lastSignInTime: string;
    /**
     * The time at which the user was last active (ID token refreshed),
     * formatted as a UTC Date string (eg 'Sat, 03 Feb 2001 04:05:06 GMT').
     * Returns null if the user was never active.
     */
    readonly lastRefreshTime?: string | null;
}
