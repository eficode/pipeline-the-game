Pipeline: CONTRIBUTING
===


## :office: Project Structure
The project follows the [lerna monorepo structure](https://github.com/lerna/lerna).      
This is the general folder structure:
```
pipeline-the-game               <- The root folder
    ├── README.md        
    ├── package.json            <- 'root' lerna package.json
    └── packages
       ├── common               <- code shared among packages
       ├── database             <- real-time firebase database rules
       ├── firestore            <- firebase firestore rules
       ├── functions            <- firebase cloud functions
       └── game-app             <- front-end application
```
You can have more details by looking inside the README of each package

## :art: Commit Messages
We adopt the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for our commit messages.
[Here](./commitlint.config.js) you can find the list of the scopes defined for this project, while [here](./package.json) you can find the [husky hooks](https://www.npmjs.com/package/husky) used. We enforce the use of this convention by using [Commitlint](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional).


## :test_tube: Run e2e Tests
The e2e tests require the complete setup of the project as described in the main [README](./README.md).

We ues Cypress as e2e test framework. Go into the game-app package and run 
```shell
npm run e2e:open
```
If you want to open a browser instance and see the e2e tests while running.
or just run 
```shell
npm run e2e:run
```
to run all e2e tests in headless mode.


## :triangular_flag_on_post: Create a release
Using the conventional commit standard for the messages allows to exploit lerna version integration
that is able to auto-determine the next version number of the project. It is done by analyzing
the commit history. 

Moreover, lerna is able to create github release automatically, including also the auto-generated
CHANGELOG. 

To increase the version number of the project, update the changelog, push the new tag and chreate
a github release just run 
```shell
npm run version-and-release
```
having set up the `GH_TOKEN` env variable to interact with github api.

## :chart_with_upwards_trend: Scale up
The application scalability is driven by real time database sharding.
If you notice poor performances on the database you can create a new instances,
and the system will balance the load among all the available databases.
* create a new rtb instance
* add the id and the region inside the firestore doc
* redeploy the application using the github action

###### tags: `Pipeline` `Documentation` `CONTRIBUTING` `Eficode` `xtream`
