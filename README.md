# PodStack-REST-API

## Connected Epic

https://adauris.atlassian.net/browse/TT-3796

### Description

Play App REST API to access Ad Auris Play Resources.
Currently, connects to firestoreDB (soon to be Play App Central Source of truth)

#### Route Validation

Project leverages [Ajv](https://ajv.js.org/guide/why-ajv.html) for route validations.
Schemas are used to define the runtime validations that Ajv provides for us on the inputs to our API routes.
src/schemas is where we store all of the schemas for the routes and follow the [Ajv format](https://ajv.js.org/json-schema.html).

#### Firebase Documentaion

-   Rest API:
    -   https://firebase.google.com/docs/firestore/use-rest-api
    -   https://firebase.google.com/docs/firestore/reference/rest/v1/projects.databases.documents
-   RPC API:
    -   https://firebase.google.com/docs/firestore/reference/rpc/
-   Admin Auth API:
    -   https://firebase.google.com/docs/auth/admin

### Data Modelling

#### FirestoreDB (Play-App-Operational Database) Live Schema:

-   https://app.creately.com/d/UO7NunVYn2J/edit

### Databases

##### Production Database: play-app-auris, play-app-auris

##### DevelopmentDatabase: play-app-dev, play-app-4ac5d

## Firebase Migration

### Warning :warning:

BE VERY CAREFUL WHEN DOING THIS! :hot_face:

AVOID Doing this:

```bash
npm install -g firebase-tools
firebase auth:export AllUsers.json --project projectId
firebase auth:import AllUsers.json --project projectId
```

When you export to import firebase users, any SSO signin (google, MS etc) use an "offsite" auth system so no change to how auth is done for users.
HOWEVER, for any "email" signins, firebase uses onsite auth meaning that when you import the exported firebase base file, you have to import it with a very specific set of crypto hash config, otherwise, any email signins will be forced to reset their passwords upon next login
Hash config:

```bash
hash_config {
algorithm: SCRYPT,
base64_signer_key: ffzCUTEjxWBYpGikdkbhd3Sv8qspeg63k8vzsFzcsQCN5m/c/I+UydLYnc5enN1yxqnDVgsA0izVZa0RWpbqhQ==,
base64_salt_separator: Bw==,
rounds: 8,
mem_cost: 14,
}
```

### Firebase Import Caveats:

firebase auth:export AllUsers.json --project ad-auris-tts-app(B2B firebase)
you should not do this for import =>
firebase auth:import AllUsers.json --project play-app-auris (D2C Firebase)
rather do this =>

This is OK for import:

```bash
firebase auth:import AllUsers.json --hash-algo=SCRYPT --hash-key=aKWVGdM5SU+/+AvdbnfmLr5ZkF4kTnqd/43t9wsyMSYu1ed1NwjTgiMOeMm+8Uemw7qIql9lvDLtP/npA5DojQ== --salt-separator=Bw== --rounds=8 --mem-cost=14 --project play-app-staging-fd1f9
```

:raised_hands: :skin-tone-4:

PS: some parts of Firebase documentation sucks, especially something so critical they should tell clearly you that if you don't specify the hash algs that onsites AUth accounts get nuked :bomb: .

## Installation

Use the package manager [npm](https://npmjs.com) to install packages.

```bash
npm ci
```

## Run the app

### Development

    npm run dev

### Production

(ensure to build the app first)

npm run ts-build
npm run start

#### Testing - CI/CD Pipeline

This project is hooked up to (CircleCI)[https://circleci.com].

To setup CircleCI locally and validate the config.yml see this (CircleCI documentation)[https://github.com/CircleCI-Public/circleci-cli]

CircleCI Local Dev Token:

```bash
play_app_local_token=686137bad49613623330f84e76341d12fb7a5dac
```

Use this command to check if your config.yml is correct locally

```bash
circleci config validate
```

for running tests on Circle CI it's key we use theses flags for a plethora of reasons:

```bash
--maxWorkers=2 --ci
```

Reasons:
https://vgpena.github.io/jest-circleci/

This changed my outcome from 8min+ of timeouts to 1.28 minutes of jest execution.

# TODO

-

# API:

## Introduction

This document is a specification of how we are doing (and should do) our internal REST API’s at Ad Auris.

If you’re in one of the development departments, consider this to be your personal API bible. If you are ever in doubt about a response code or how to format a URL, look to this document. If it’s not described in here, feel free to make a pull request or reach out to any of the backend developers at Ad Auris.

We all know that not all projects are the same. So at some point, you might have to bend the rules, use a different convention or even an "incorrect" response code. This is okay, just make sure to go over it with your backend colleagues and inform who is implementing the API of your change.

## Endpoints

Endpoints with literal and readable URLs is what makes an API awesome. So to make everything easy and convenient for you, we have specified how you should do it. No more thinking about if it should be plural or where you should put your slug.

### Anatomy of an endpoint

The anatomy of an endpoint should look like this:

```
/api/{objects}/{slug}/{action}?[filters]&[sorting]&[limit]&[...]
```

Below is a breakdown of the different pieces in the endpoint:

1. All our API’s are prefixed with `/api/`. Along with semantic versioning i.e => `/api/v1/`
2. `{objects}` is the name of the object(s) you are returning. Let’s say you’re retrieving a collection of posts. Then `{objects}` should be `posts`.
3. `{slug}` can theoretically be anything you’d like. It’s just used as an identifier, usually a unique one. A `{slug}` is used to retrieve a specific item in a collection of objects.
4. `{action}` is used when we want to perform a certain action. This could be, for example, `like`, `follow` or `comment`. The purpose of the action usually depends on the request method.
5. `[filters]` is mostly used when we’re retrieving a collection of objects. There’s no limit to how many filters you can use. All that is required is that they are specified as query parameters.
6. `[sorting]` is exactly like filters. No limit to how many you can use. Just make sure they’re specified as query parameters.
7. `[limit]` is where we specify how many items in a collection we want returned.
8. `[...]` is basically there to tell you that all custom stuff for an endpoint should be specified as parameters.

### Request methods

The request method is the way we distinguish what kind of action our endpoint is being "asked" to perform. For example, `GET` pretty much gives itself. But we also have a few other methods that we use quite often.

| Method   | Description                                                              |
| -------- | ------------------------------------------------------------------------ |
| `GET`    | Used to retrieve a single item or a collection of items.                 |
| `POST`   | Used when creating new items e.g. a new user, post, comment etc.         |
| `PATCH`  | Used to update one or more fields on an item e.g. update e-mail of user. |
| `PUT`    | Used to replace a whole item (all fields) with new data.                 |
| `DELETE` | Used to delete an item.                                                  |

### Examples

Now that we’ve learned about the anatomy of our endpoints and the different request methods that we should use, it’s time for some examples:

| Method   | URL                                          | Description                                    |
| -------- | -------------------------------------------- | ---------------------------------------------- |
| `GET`    | `/api/v1/users/:userId/narrations`           | Retrieve all narrations.                       |
| `POST`   | `/api/v1/users/:userId/narrations`           | Create a new narration.                        |
| `GET`    | `/api/v1/users/:userId/:narrationId`         | Retrieve a narration #28.                      |
| `PATCH`  | `/api/v1/users/:userId/narrations`           | Update data for narration #28.                 |
| `POST`   | `/api/v1/users/:userId/podcast-channel`      | create podcast channel #28.                    |
| `GET`    | `/api/v1/users/:userId/narrations/&limit=50` | Retrieve with pagination => 50 user narrations |
| `DELETE` | `/api/v1/users/:userId/:narrationId`         | Delete a narration                             |

#### Tips on what NOT to do

Hopefully you’re already aware of this. But not at any given time should your endpoint end with `.json`, `.xml` or `.something`. If in doubt, reach out to one of the backend developers at Nodes.

## Headers

We love headers! And we have a few that we use pretty much in every one of our endpoints. It’s also a very nice way to send information along with your request without "parameter bombing" your endpoint, e.g. with language or 3rd party tokens.

Below is a list of our most used headers. You might end up working on a project where you have to integrate with this weird 3rd party API, which requires you to make a custom header that is not listed below. Go for it, Batman. No requirements here.

| Header key        | Description                                                                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Accept`          | This header is **required by all endpoints**. It’s used to identify the request as our own and for versioning our endpoints. **Default value**: `application/vnd.nodes.v1+json`. |
| `Accept-Language` | The [ISO 639](http://www.loc.gov/standards/iso639-2/php/code_list.php) code of language translations should be returned in.                                                      |
| `Authorization`   | The authorized user’s token. This is used to gain access to protected endpoint.                                                                                                  |
| `firebase-token`  | Firebase auth token.                                                                                                                                                             |

## Authentication (IGNORE FOR NOW)

One of the most essential parts of an API is authentication. This is why authentication is also one of the most important parts - security wise - when you’re making an API. Therefore we’ve set up a few guidelines, which you should follow at any time. Most of them are pretty obvious, but nonetheless it’s better to be safe than sorry.

-   **Always** use a SSL-encrypted connection when trying to authenticate an user.
-   **Always** save passwords hashed/encrypted. Never save passwords as plain text.
-   **Never** save 3rd party tokens (i.e. Facebook, Twitter or Instagram).
-   The **only time** you should ever return an user’s API token is when a user either is **successfully created** or **successfully authenticated**.

## HTTP Response Status Codes

One of the most important things in an API is how it returns response codes. Each response code means a different thing and consumers of your API rely heavily on these codes.

| Code  | Title                   | Description                                                                                                                                                     |
| ----- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `200` | `OK`                    | When a request was successfully processed (e.g. when using `GET`, `PATCH`, `PUT` or `DELETE`).                                                                  |
| `201` | `Created`               | Every time a record has been added to the database (e.g. when creating a new user or post).                                                                     |
| `304` | `Not modified`          | When returning a cached response.                                                                                                                               |
| `400` | `Bad request`           | When the request could not be understood (e.g. invalid syntax).                                                                                                 |
| `401` | `Unauthorized`          | When authentication failed.                                                                                                                                     |
| `403` | `Forbidden`             | When an authenticated user is trying to perform an action, which he/she does not have permission to.                                                            |
| `404` | `Not found`             | When URL or entity is not found.                                                                                                                                |
| `440` | `No accept header`      | When the required "Accept" header is missing from the request.                                                                                                  |
| `422` | `Unprocessable entity`  | Whenever there is something wrong with the request (e.g. missing parameters, validation errors) even though the syntax is correct (ie. `400` is not warranted). |
| `500` | `Internal server error` | When an internal error has happened (e.g. when trying to add/update records in the database fails).                                                             |
| `502` | `Bad Gateway`           | When a necessary third party service is down.                                                                                                                   |

The response codes often have very precise definition and are easily misunderstood when just looking at their names. For example, `Bad Request` refers to malformed requests and not, as often interpreted, when there is something semantically wrong with the reuquest. Often `Unprocessable entity` is a better choice in those cases.
Another one that is often used incorrectly is `Precondition Failed`. The precondition this status code refers to are those defined in headers like `If-Match` and `If-Modified-Since`. Again, `Unprocessable entity` is usually the more appropriate choice if the request somehow isn't valid in the current state of the server.
When in doubt, refer to [this overview](https://httpstatuses.com) and see if the description of an status code matches your situation.

## Response

Generally we have a few rules the response has to follow:

-   Root should always be returned as an object.
-   Keys should always be returned as camelCase.
-   When we don’t have any data, we need to return in the following way:
    -   Collection: Return empty array.
    -   Empty key: Return null or unset the key.
-   Consistency of key types. e.g. always return IDs as an integer in all endpoints.
-   Date/timestamps should always be returned with a time zone.
-   Content (being a single object or a collection) should be returned in a key (e.g. `data`).
-   Pagination data should be returned in a `meta` key.
-   Endpoints should always return a JSON payload.
    -   When an endpoint doesn't have meaningful data to return (e.g. when deleting something), use a `status` key to communicate the status of the endpoint.

### Errors

When errors occur the consumer will get a JSON payload verifying that an error occurred together with a reason for why the error occurred.

Error handling has changed from Vapor 1 through 3, these are the keys to expect from the different versions.

| Endpoint  | Description                                                                                                                            |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `error`   | A boolean confirming an error occurred.                                                                                                |
| `message` | A description/reason of the error that occurred. For some errors this value provides extra information on non-production environments. |

## Routes

### User Routes

| Method   | URL                     | Description            | Status |
| -------- | ----------------------- | ---------------------- | ------ |
| `GET`    | `/api/v1/users/:userId` | Retrieve a user.       | ✅     |
| `POST`   | `/api/v1/users/:userId` | Create a new user.     | ⛔     |
| `GET`    | `/api/v1/users/:userId` | Retrieve a narration   | ⛔     |
| `PATCH`  | `/api/v1/users/:userId` | Update data for a user | ⛔     |
| `DELETE` | `/api/v1/users/:userId` | Delete a user          | ⛔     |

### Narration Routes

| Method   | URL                                  | Description                   | Status |
| -------- | ------------------------------------ | ----------------------------- | ------ |
| `GET`    | `/api/v1/users/:userId/narrations`   | Retrieve all user narrations. | ✅     |
| `POST`   | `/api/v1/users/:userId/narrations`   | Create a new narration.       | ✅     |
| `GET`    | `/api/v1/:narrationId`               | Retrieve a narration          | ✅     |
| `PATCH`  | `/api/v1/:narrations`                | Update data for narration     | ⛔     |
| `DELETE` | `/api/v1/users/:userId/:narrationId` | Delete a narration            | ⛔     |

### Podcast Channel Routes

| Method   | URL                                                      | Description                             | Status |
| -------- | -------------------------------------------------------- | --------------------------------------- | ------ |
| `GET`    | `/api/v1/podcasts/channels/users/:userId`                | Retrieve all user podcast channels.     | ⛔     |
| `POST`   | `/api/v1/podcasts/channels/`                             | Create a new podcast-channel.           | ✅     |
| `GET`    | `/api/v1/podcasts/channels/:podcastChannelId`            | Retrieve a podcast-channel              | ✅     |
| `GET`    | `/api/v1/podcasts/channels/:podcastChannelId/episodes`   | Retrieve all podcast-channe episodes    | ✅     |
| `GET`    | `/api/v1/podcasts/channels/:podcastChannelId/narrations` | Retrieve all podcast-channel narrations | ✅     |
| `PATCH`  | `/api/v1/podcasts/channels/:podcastChannelId`            | Update data for podcast channel         | ⛔     |
| `DELETE` | `/api/v1/podcasts/channels/:podcastChannelId`            | Delete a podcast channel                | ⛔     |

### Podcast Episode Routes

Below Follows: `/api/v1/users/:userId`

| Method   | URL                                    | Description                         | Status |
| -------- | -------------------------------------- | ----------------------------------- | ------ |
| `GET`    | `/podcast-episodes/:podcastChannelId`  | Retrieve all user podcast episodes. | ⛔     |
| `POST`   | `/podcasts/episodes/`                  | Create a new podcast-episode.       | ✅     |
| `GET`    | `/podcasts/episodes/:podcastEpisodeId` | Retrieve a podcast-episode          | ✅     |
| `PATCH`  | `/podcast-episodes/:podcastEpisodeId`  | Update data for podcast episode     | ⛔     |
| `DELETE` | `/podcast-episodes/:podcastEpisodeId`  | Delete a podcast episode            | ⛔     |

### Groups

| Method   | URL                       | Description             | Status |
| -------- | ------------------------- | ----------------------- | ------ |
| `GET`    | `/api/v1/groups/:groupId` | Retrieve a group.       | ✅     |
| `POST`   | `/api/v1/groups`          | Create a new group      | ✅     |
| `GET`    | `/api/v1/groups`          | Retrieve a narration    | ✅     |
| `PATCH`  | `/api/v1/groups/:groupId` | Update data for a group | ⛔     |
| `DELETE` | `/api/v1/groups/:groupId` | Delete a group          | ⛔     |

## Client Side Data Contracts 📝

### Play App 📱

-   Permission Level: Read/Write

Needs:

-   Get User Data (firestore Admin SKD handles this)
-   Create User (firestore Admin SKD handles this)
-   Get all user's narrations
    -   underlying audio data and source meta data
-   Create a narration (Will talk to Narration Creation Service)
-   Create a Podcast Channel (Podcasting Creation Service)
-   Get info about a user's Podcast Channel
-   Get info about a user's Podcast Episodes

### Podcasting Hosting API 🎧

Needs only GETS to retrieve a podcast channel for a user, the associated episodes, and as well as the underlying narration data.

-   Permission Level: Read

Needs:

-   Get Podcast Channel
-   Get Podcast Episodes
-   Get Data

### Podcasting Creation Service 🎧

-   Permission Level: Read/Write

Needs:

-   Get User Data
-   Create Podcast Channel
-   Create Podcast Episodes

### Narration Creation Service

-   Permission Level: Read/Write
-   Create a narration
