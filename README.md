# Pipeline: the game that delivers

Pipeline game app is developed by [Eficode](https://eficode.com) and [Xtreamers.io](https://xtreamers.io)

### Table of Content

1. [Introduction](#pencil2-introduction)
2. [System Requirements](#memo-system-requirements)
3. [Setup Firebase project](#setup-firebase-project)
4. [How to run](#scroll-how-to-run)  
   a. [Run locally](#run-locally)  
   b. [Run with Firebase](#run-with-firebase)
5. [How to make a production-ready build](#building_construction-how-to-make-a-production-ready-build)
6. [How to deploy to Firebase](#rocket-how-to-deploy-to-firebase)
7. [General project structure](#office-general-project-structure)

## :pencil2: Introduction

_Introduction taken from
[Eficode's Pipeline page](https://www.eficode.com/pipeline-game)._

"What testing steps should you include in your
**Continuous Delivery** pipeline? Don’t just
string together existing manual processes - use
simple, collaborative tools to design something
better!

Creating a Continuous Delivery (**CD**) pipeline
is a key development in an organization’s
transformation to DevOps. A CD Pipeline covers all
the activities needed to transform a code change
made by a developer into updated software bringing
value to users. Steps in the pipeline include
building a new version of the software as well as
testing and deploying it. Exactly what kinds of
build, test and deployment steps will depend on
many factors and there is no ‘one perfect
pipeline’ which will suit all situations.

I created the card game ‘Pipeline’ as a quick and
fun way to explore alternatives for a CD pipeline
without actually building anything. The goal of
the game is to design a pipeline for a given
scenario and optimize the deployment lead time.
You work in a small group and get to discuss what
steps are needed and which order you want to do
them in. You will run into design tradeoff
decisions and may discover people have different
risk tolerances. If you play the game a second
time with a different scenario, or compare notes
with another group, you can learn more about how
different scenarios drive different decisions.

Playing the game should help you to build a real
pipeline for the real software system you are
working on. Building a CD pipeline needs
specialist knowledge of particular tools and could
be many weeks of work. Playing this game should
help you to avoid some costly misunderstandings.
It’s also a fun way to engage a small group for an
hour or two while you think through the issues
you’re facing."

Well, this repository is just the **digital
version** of this card game!

## :memo: System Requirements

You need to have Node 12. This is because, at the
time of writing, the highest stable Node version
[supported by Cloud Functions](https://firebase.google.com/docs/functions/manage-functions)
is Node 12. Please check your node version using
<code>node -v</code>. If you have a different
version of Node, we recommend using
[nvm](https://github.com/nvm-sh/nvm) (or the
corresponding
[windows implementation](https://github.com/coreybutler/nvm-windows))
to manage your Node versions.

## :gear: Setup Firebase project

To run against your own Firebase project you have to

* create a new firebase project
* update .firebaserc file with your project id

[Firebase doc](https://firebase.google.com/docs/web/setup) contains a great set-up guide to start with the web sdk from
scratch.

This project uses firestore and realtime database, so create both!

## :scroll: How to run

After cloning this repository, move into the
**root** folder and execute the following two
scripts, which have been defined in the
_[package.json](./package.json)_:

```shell
npm run bootstrap
npm run build
```

The first command will install all the
dependencies needed to run the project, while the
second command builds each package contained in
the lerna monorepo.

#### Firebase and Environment variables setup

At the moment of writing, it is not possible to
run the firebase emulators without configuring a
whole firebase project through the firebase
console. Thus, even if you want to only run the
project locally, you still need to create a
firebase project.

Once you have done that, please create a _.env_
file and put it into the
[game-app](./packages/game-app) folder. This .env
file should contain and define values for the
environment variables shown in
[this template file](./packages/game-app/.env.template).
Therefore, feel free to copy this template, rename
it, and fill the values of the variables defined
in it. Many of these variables can be filled with
values from your firebase project console. For the
remaining variables, please keep on reading the
following sections.

### Run Locally

First of all, make sure you have followed the
instructions for the
[setup of Firebase and the environment variables](#firebase-and-environment-variables-setup).  
We use
[Firebase Emulators](https://firebase.google.com/docs/emulator-suite)
to use the Firebase services locally.

#### Firebase Emulators

To start the emulators, move into the **root**
folder and run

```shell
npm run start:emulators
```

Again, this script is defined in the root
[package.json](./package.json).  
Make sure you have port 5000, 5001, 5555, 8080,
9000 and 9090 available. Then, go to the _.env_
file created in the previous step (the one in the
[game-app](./packages/game-app) folder) and fill
in the following variables as follows:

```dotenv
REACT_APP_FIREBASE_USE_EMULATORS=true
FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
FIRESTORE_EMULATOR_HOST=localhost:8080
```

Note: If you need these ports and cannot make them
available, you can always configure the firebase
emulators by modifying the
[firebase.json](./firebase.json). If you do so,
please remember to modify any reference to such
ports in the environment variables.

#### Root Environment variables

Before running the project, you will need to
create a _.env_ file also in the **root** folder
containing the following **environment
variables**:

```dotenv
FIRESTORE_EMULATOR_HOST=localhost:8080
FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
FIREBASE_DATABASE_EMULATOR_HOST=localhost:9000
GCLOUD_PROJECT=pipeline-game-development
```

If you want to skip signup and email verification
you can add

```dotenv
CREATE_TEST_USER=true
```

This will create a test user with email
test@test.com and password Test1234

#### Running

Run the following script in the **root** folder to
initialize the local emulators:

```shell
npm run scripts:load-initial-data:local
```

This will fill the emulators with some initial
data needed to load the application.

And now the last step: move into the
[game-app](./packages/game-app) folder and run:

```shell
npm run start
```

and your Pipeline react app will be available for
you to use.

### Run with Firebase

First of all, make sure you have followed the
instructions for the
[setup of Firebase and the environment variables](#firebase-and-environment-variables-setup).  
Make sure you have your firebase project up and
running. Then, go to the _.env_ file **you** have
created (the one in the
[game-app](./packages/game-app) folder) and fill
in the following variables as follows:

```dotenv
REACT_APP_FIREBASE_USE_EMULATORS=false
```

The other environment variables concerning the
emulators can be left undefined, since we are not
using the emulators in this section. If you want
to run locally using the emulators, please refer
to [this section](#run-locally).  
Finally, you just have to move into the
[game-app](./packages/game-app) folder and run:

```shell
npm run start
```

and your Pipeline react app will be available for
you to use.

## :building_construction: How to make a production-ready build

This step is also included in the
[How to run](#how-to-run) section, but we rewrite
it here for completeness.

Just go to the **root** folder and execute the
following scripts:

```shell
npm run bootstrap
npm run build
```

This will create a production-ready build of the
packages for which it is possible to do so.

## :rocket: How to deploy to Firebase

After
[building the project](#building_construction-how-to-make-a-production-ready-build),
you can easily deploy to your Firebase project
running:

```shell
npx firebase deploy --project <FIREBASE_PROJECT_ID>
```

This command will automatically deploy the
following projects to firebase:

- Firestore rules and indexes
- RealTime Database rules
- Cloud functions
- Hosting (game-app)

Please, refer to
[the Firebase documentation](https://firebase.google.com/docs/cli#deployment)
for details about how to use the <code>firebase
deploy</code> command.

### Initialize remote database

To load initial data into the firestore remote
database change your root env file, removing the
firebase emulator variable and adding the
reference to your admin credentials json file

```dotenv
GCLOUD_PROJECT=
GOOGLE_APPLICATION_CREDENTIALS=
```

and then run again


```shell
npm run scripts:load-initial-data:local
```

###### tags: `Pipeline` `Documentation` `README` `Eficode` `xtream`

