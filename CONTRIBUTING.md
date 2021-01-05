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
       ├── database             <- real-time firebase database
       ├── firestore            <- firebase firestore
       ├── functions            <- firebase cloud functions
       └── game-app             <- front-end react application
```
Let's describe more in detail the structure of the different packages:

### Front-end React application - Project Structure
This code has been scaffolded using the <code>npx create-react-app game-app --template typescript</code>.     
This is the folder structure:
```
game-app
    ├── package.json            <- react application package.json   │
    ├── cypress                 <- code for e2e testing
    └── src
       ├── TODO               
       ├── TODO             
       ├── TODO    
       ├── TODO         
       └── TODO            
```
## :construction_worker: Architectural choices

The [React](https://reactjs.org/) framework is used, using TypeScript rather than Javascript. We adopt [Redux Toolkit](https://redux-toolkit.js.org/) for state management, employing [Redux-Saga](https://redux-saga.js.org/) as the middleware.

## :art: Commit Messages
We adopt the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for our commit messages.
[Here](./commitlint.config.js) you can find the list of the scopes defined for this project, while [here](./package.json) you can find the [husky hooks](https://www.npmjs.com/package/husky) used. We enforce the use of this convention by using [Commitlint](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional).


## :white_check_mark: Testing



###### tags: `Pipeline` `Documentation` `CONTRIBUTING` `Eficode` `xtream`
