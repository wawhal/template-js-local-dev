## End to end  workflow

### STEP 2. Fork the `hasura/scaffolds` repo

Put this repo as environment variable:

```
export SCAFFOLDS_REPO="hasura/scaffolds"
```

Also put the branch as env variable (default master):

```
export SCAFFOLDS_REPO_BRANCH="typescript"
```


### STEP 2. Write an action template for your language/framework.

Your action template should have three variables in the top level scope:

1. FILE_EXTENSION: Extension of the file of your language.

2. `routeTemplate`: This is a function that takes in two arguments: 1) `mutationSdl` and `typesSdl`. You can parse this `SDL` into a document using the `parse` function from `graphql`. Based on these two documents, you should generate code for a route that will be appended to the route file specified in the `config.yaml` of your project.

3. `handlerTemplate`: This is a function that takes in two arguments: 1) `mutationSdl` and `typesSdl`. You can parse this `SDL` into a document using the `parse` function from `graphql`. Based on these two documents you should generate code for a function that accepts action payload, does some logic and returns a response. This function will be created in a file and be put up as `<actionName>.<FILE_EXTENSION>.


### STEP 3. Clone the scaffolder server

```
git clone git@github.com:hasura/actions-scaffolder
```

```
npm ci
npm run dev
```

### Use the CLI

Use the CLI with the environment variable `SCAFFOLD_ORIGIN=http://localhost:8080` (wherever the scaffolder server is running).