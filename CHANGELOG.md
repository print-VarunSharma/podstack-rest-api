# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Released]

## [1.0.0] - 2022-10-03

### Added

-   Project Setup
    -   Typscript Support
    -   Jest Testing Support
    -   Circle CI Support
    -   Docker Support
    -   eslint support
-   Integrated firebase-admin SDK support
    -   firestore DB connected
-   Project strcuture initalized (verbose)
    -   controllers
    -   daos
    -   models
    -   routes
    -   services
    -   utils
    -   config
    -   errors
-   _ROUTES_
    -   GET user by userID
    -   GET narration by narrationID
    -   GET all user narrations by user ID
    -   POST create a narration for a user
    -   default and verbose error handling
    -   GET podcast episode by episodeID
    -   POST create a podcast episode for a channel and narration
    -   PodcastChannels router to define podcast channel endpoints
    -   GET Podcast Channel by ID
    -   POST Podcast Channel for creating a Podcast Channel
    -   GET Podcast Channel by user ID (Firebase UID)
-   added to Project structure
    -   constants
    -   schema
    -   middleware
-   Added route validation of input with ajv on podcast channels
-   Documentation
    -   best practices & Ad Auris API guidelines

### Changed

-   Docker to deploy to Cloud Run prod + staging
    -   Technical Debt/Caveat to know howeever:
        -   https://adauris.atlassian.net/browse/TT-4198

## [1.1.0] - 2022-10-06

### Changed

-   Updated Narrations get all route to include limit and offset paramters
    -   Firestore documentation on vanilla noSQL offset and limit queries
        -   https://googleapis.dev/nodejs/firestore/latest/Query.html#offset
    -   updated Narrrations routes to refect new add ons of the queries
    -   udpate Narrations DAO, services, and controller.
-   Updated all the routes to return 204 responses (and empty) rather than 404 resource not found. 404s return when routes are incorrectly typed.

### Fixed

-   Test issues with Jest
    -   ignore nodmodules and dist folders now

## [1.2.0] - 2022-10-10

### Changed

-   now using default firestore vanila createTime
-   now using default firestore vanila updateTime
-   narrations now directly attached to a podcastChannelId

### Added

-   get all narrations by podcastChannelId
-   patch Narrations by ID

## [1.3.0] - 2022-10-10

### Changed

-   reverted
    -   using default firestore vanila createTime
    -   using default firestore vanila updateTime
    -   Logic:
        Upon creation modifiedDate, and creationDate have the same time.
    -   Deviation is when:
        -   A PUT or PATCH is made to the document and serverTimestamp is called on modifiedDate (edited)
    -   createTime, and updateTime keywords should be reserved fro the document.metadata default fields

### Added

-   All documents now using
    -   items:
        -   creationDate
        -   ModifiedDate
        -   all saved directly into firestore document
-   Narrations Get all route now leverages firestore indexing to retrieve narrations by descending creation Date

## [1.4.0] - 2022-10-12

### Changed

-   user route now returns a minified user document, returning only essentials
-   enhanced type defs for the user

## [1.4.1] - 2022-10-18

### Fixed

-   narration index ordering and timestamp issue fixed
    Context:
    We figured out why ordering is not working correctly
    Originally:
    export const DEFAULT_NARRATION_VALUES: any = {
    creationDate: firestore.Timestamp.now(),
    modifiedDate: firestore.Timestamp.now(),
    version: 1
    };
    This resulted in Griffins, and my narrations having the same timestamp for a few narrations made consecutively, and rounding does happen as well, if the index by creationDate has more than one of the exact same value, it breaks ordering
    Updated:
    export const DEFAULT_NARRATION_VALUES: any = {
    creationDate: firestore.FieldValue.serverTimestamp(),
    modifiedDate: firestore.FieldValue.serverTimestamp(),
    version: 1
    };
    Why is this crucial in terms of difference?
    Timestamp.now() generates the timestamp using the client machine's clock, which could be wrong, even drastically wrong.
    FieldValue.serverTimestamp() encodes a token into the document field that gets translated into a timestamp using the clock on Google's servers whenever the write operation is received (not at the time it was issued from the client). The clock time on all Google services are meticulously guaranteed to be correct, no matter what a malicious user does.
    If you absolutely need a correct time, especially one that needs to get checked by security rules using request.time, you should use the server timestamp. If you need the client's clock time, use Timestamp.now(). It's almost always the case that a server timestamp is preferred.
    https://stackoverflow.com/a/60243513/20096124
    So to be clear, ALWAYS use serverTimestamp

## [1.5.0] - 2022-10-21

### Changed

-   Return 204 rather than 404 if no user
    -   this was breaking expected error failure the Play App Podcast API

## [1.6.0] - 2022-11-25

### Changed

-   Updated User routes with following
    -   Added new subscription object to User routes that will return subscription status on Play App. See [this ADR for more details](https://adauris.notion.site/ADR-Play-App-Stripe-Data-Structure-in-Firestore-fa2035ab348e4e99adeedec074604831)
    -   When a user subscribes to Play App, they will be redirected to Stripe which will automatically add a custom claim in the User object indicating that the user is a paying premium user
    -   When we pull the user object from firestore database, we'll have access to this customClaim and perform additional logic to determine if the user is actually on a free trial of premium
    -   or if they are on the free tier. [As noted in this ADR, this logic is being housed here and not within Stripe](https://adauris.notion.site/ADR-Stripe-Free-Tier-vs-Paid-Tiers-ea888b06eca0461bbc6e1e8db6d12939)

## [1.7.0] - 2022-11-29

### Changed

-   Updated subcription object returned in User routes with new isPreStripe property
    -   [See this ADR for more details](https://adauris.notion.site/ADR-Play-App-Stripe-Data-Structure-in-Firestore-Grandfathered-Users-Update-27668f723aac4e51a9df49714a1df875)
    -   users who created their account prior to 2022-12-01 will be considered grandfathered and automatically assigned to PREMIUM tier with no payment details recorded in Stripe

## [1.7.1] - 2022-11-29

### Fixed

-   Added support to allow the isPreStripe date in the subscription check to be manipulated via env vars only in non-prod environments
    -   To use: set new env vars as listed below
        -   APP_ENV - must be one of 'development', 'test','staging' or 'production'
        -   PRE_STRIPE_CUTOFF_DATE - must be in ccYY-MM-DD format e.g. 2022-11-30.
    -   If both env vars are set and APP_ENV is not production then the check for grandfathered users will use the date in the PRE_STRIPE_CUTOFF_DATE env var
    -   If the variables are not set, it will always default to production as a safety mechanism. This way it's not possible to manipulate in production accidentally

## [1.8.0] - 2022-12-05

### Added

-   Added a new route to fetch campaign content based on a given campaign name. This is currently only being used for the splash page.

## [1.8.1] - 2022-12-07

### Fixed

-   Some users who had accounts before PRE_STRIPE_CUTOFF_DATE are returning 'free' as customRole from Firestore-Stripe extension which is causing them to be reported as out of trial and requesting payment. Potential bug in extension as Stripe and Firestore are configured to only return 'PREMIUM' on an actual subscription. To address this:
    -   Changed test conditions to check if the user is pre Stripe and if so, assign as Premium user right away
    -   Updated check on the Stripe role to only verify that the user is premium if they have the 'PREMIUM' stripeRole set
    -   Added additional test case against this scenario & rebuilt dist

## [1.8.2] - 2022-01-10

### Updated

-   Model for campaigns type to include textinputPlaceholder and buttonText

## [Unreleased]

## [1.9.0] - 2023-01-18

### Changed

-   updated narartion documents to allow for metadata, and an optional sub object of google or diffbot.
    -   Diffbot metadata is associated with sourceType articleUrls, and everything else google (text, etc)

## [1.9.1] - 2023-02-07

### Changed

-   updated narartion documents to allow for externalAppData
    -   This object is used for extra data from our other apps. For now it is used by the slackbot to store user and workspace info.

## [1.10.0] - 2023-02-09

### Added

-   route to get narrations by WhatsApp phone number
    -   https://www.notion.so/play-auris/ADR-Narration-Document-Update-for-WhatsApp-274661fd651a4d05bdf72164cdaac7c9

## [1.10.1] - 2023-02-16

### Fixed

-   the narration patch route now does not modify creationDate or publishDate and sets modifiedDate with a firestoreTimestamp
    -   Github issue for reasoning here: https://github.com/Ad-Auris/play_slack_app/issues/32

## [1.11.0] - 2023-03-24

### Added

-   New errorCode property to Narration document
-   New stats property to Narration document

## [1.12.0] - 2023-04-13

#### Added

-   Updates to Narration document to allow for duration
    -   https://www.notion.so/play-auris/ADR-Narration-Document-Update-for-Audio-Duration-94215762d01e4ef3a9a6c4fce0903cd3
-   Updated tests to reflect changes to Narration document schema

## [2.0.0] - 2023-05-12

### Changed

-   Cloned Play App REST API, including it's .git for historical refernce of development, and created B2B Operations REST API.
    -   The vast majority of endpoints, resources, and previous development remains the same, hence we continue code versioning here.

## [2.1.0] - 2023-05-12

### Changed

-   Updated core tests (where some became outdated/incompatible with new database) to reflect new B2B Oeprations REST API

## [2.2.0] - 2023-05-12

### Added
<<<<<<< HEAD
- Added new collection called Projects, as well as core CRUD routes:
    - .get('/:projectId');
    - .patch('/:projectId');
    - .delete('/:projectId');
    - .get('/groups/:groupId');
    - .post('/groups/:groupId');

## [2.3.0] - 2023-05-12

### Added 
-   Added new collection called CmsIntegrationSettings, as well as core CRUD routes:
    -   get('/:cmsIntegrationSettingsId');
    -   .patch('/:cmsIntegrationSettingsId');
    -   .delete('/:cmsIntegrationSettingsId');
    -   .get('/projects/:projectId');
    -   .post('/projects/:projectId');
    - Core Route tests 
=======

-   Added new collection called Projects, as well as core CRUD routes:
    -   .get('/:projectId');
    -   .patch('/:projectId');
    -   .delete('/:projectId');
    -   .get('/groups/:groupId');
    -   .post('/groups/:groupId');
-   New collection called Groups as well as CRUD routes:
    -   get('/:groupId')
    -   get('/') all groups
        -post('/')
>>>>>>> b476cbbed1d4a5836ef4cdd2093298089d574a2f
