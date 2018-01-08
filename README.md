# Stitching React
A React module to use [Stitching](https://www.npmjs.com/package/stitching) in an easy way.

## Content

  - [Documentation](https://www.npmjs.com/package/stitching-react#documentation)
  - [Support](https://www.npmjs.com/package/stitching-react#support)
  - [Installation](https://www.npmjs.com/package/stitching-react#installation)
  - [Overview](https://www.npmjs.com/package/stitching-react#overview)
  - [Setting up MongoDB Stitch app](https://www.npmjs.com/package/stitching-react#setting-up-mongodb-stitch-app)
    - [Setting up Email/Password authentication](https://www.npmjs.com/package/stitching-react#setting-up-emailpassword-authentication)
    - [Creating optional metadata collection](https://www.npmjs.com/package/stitching-react#creating-optional-metadata-collection)
        - [Top-Level Document](https://www.npmjs.com/package/stitching-react#top-level-document)
  - [Usage](https://www.npmjs.com/package/stitching-react#usage)
    - [Connecting to MongoDB Stitch app using Stitching React](https://www.npmjs.com/package/stitching-react#connecting-to-mongodb-stitch-app-using-stitching)
  - [Stitching React Example Project](https://www.npmjs.com/package/stitching-react#stitching-react-example-project)

## Documentation

- [StitchingJS.com](http://stitchingjs.com/)
- [StitchingJS.com/react](http://stitchingjs.com/react)
- [MongoDB Stitch Documentation](https://docs.mongodb.com/stitch/)

## Support

  - [Bug Reports](https://github.com/waterkhair/stitching-react/issues/)
  - [MongoDB Support](https://docs.mongodb.org/manual/support/)

## Installation

```sh
$ npm install stitching-react
```

## Overview

`Stitching React` makes easier the usage of [Stitching](https://www.npmjs.com/package/stitching-react#documentation), a module running on top of `MongoDB Stitch`.

## Setting up MongoDB Stitch app

Before using Stitching, you need to setup a `MongoDB Stitch` app. To get started, you can visit [Getting Started](https://docs.mongodb.com/stitch/getting-started/) page and follow the instructions. After you finish setting up a `MongoDB Stitch` app, you can use your APP ID to handle `Authentication`.

### Setting up Email/Password authentication

Before registering an user, you need to enable email/password authentication in `MongoDB Stitch` (Authentication -> Providers -> Email/Password):

* Email Confirm URL: The URL included on the confirmation email. You will need to setup Stitching to receive a Token/Token ID pair in order to confirm an email.
* Password Reset URL: The URL included on the password reset email. You will need to setup Stitching to receive a Token/Token ID pair in order to reset a password.
* Reset Password Email Subject: Subject for the reset password email.
* Email Confirmation Subject: Subject for the confirmation email.

### Creating optional metadata collection

Inside MongoDB Stitch, go to your Atlas Cluster and create a new collection:

* Database: The database where your metadata collection will belong (I.E. example).
* Collection: The metadata collection name used to store our user metadata (I.E. metadata).

After you created your collection, you need to set the next `Field Rules`:

#### Top-Level Document

READ (Only the owner of a document can read it)
```json
{
  "owner_id": "%%user.id"
}
```
WRITE (Anyone can create a new document, but only the owner of a document can write to it)
```json
{
  "%or": [
    {
      "%%prevRoot.owner_id": "%%user.id"
    },
    {
      "%%prevRoot": {
        "%exists": false
      }
    }
  ]
}
```

#### owner_id

VALID
```json
"%%user.id"
```

**Note:** Email/Password authentication doesn't handle metadata out of the box. This means that after login to your MongoDB Stitch app, you don't have other information regarding the email. We need a collection to save user name, date of birth, address, etc. This is optional and we can skip this step.

## Usage

### Connecting to MongoDB Stitch app using Stitching React

If you don't want to use `Stitching` module on his own, you can use `Stitching React` to connect.

```js
const StitchingReact = require("stitching-react");

// Configuration
const APP_ID = "example-<random_value>";
const CLUSTER = "mongodb-atlas";
const DB = "example";
const ENDPOINT = "https://stitch.mongodb.com";
const METADATA = "metadata"; // Optional collection name to handle user metadata (I.E. name, dob, profile_image, etc)

// Connect to MongoDB Stitch app
StitchingReact.connect(APP_ID, ENDPOINT, CLUSTER, DB, METADATA);
```

After you connect your `Stitching React`, you can use all components to register users, confirm emails, login and update metadata.

**Note:** Stitching React internally uses Stitching. You only need to connect Stitching once (using Stitching directly or Stitching React).

### Stitching React Example Project

For a demo project, go to [Stitching React Example](https://www.npmjs.com/package/stitching-react-example)
