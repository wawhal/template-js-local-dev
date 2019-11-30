const { codegen } = require('@graphql-codegen/core');
const typescriptPlugin = require('@graphql-codegen/typescript');
const { parse } = require('graphql');

const routeTemplate = (mutationSdl, typesSdl) => {
  const mutationAst = parse(mutationSdl);
  const actionName = mutationAst.definitions[0].fields[0].name.value;
  return `
router.post('/${actionName.toLowerCase()}', (req: Request, res: Response) => {
    const response = require('./${actionName}').default(req)
    return res.json(response);
});
`;
}

const FILE_EXTENSION = 'ts';

const handlerTemplate = (
  mutationSdl,
  typesSdl
) => {
  const types = parse(`${typesSdl}\n${mutationSdl}`);
  const codegenConfig = {
    schema: types,
    plugins: [ // Each plugin should be an object
      {
        typescript: {}, // Here you can pass configuration to the plugin
      },
    ],
    pluginMap: {
      typescript: typescriptPlugin
    }
  }

  const actionDefinition = types.definitions.find(t => t.name.value === 'Mutation').fields[0];
  const actionName = actionDefinition.name.value;

  const requestInputTypename = `Mutation${actionName[0].toUpperCase() + actionName.substring(1)}Args`;

  return codegen(codegenConfig)
    .then(typesCodegen => {

      return `
import { Request } from 'express'

${typesCodegen}

function requestHandler(request: Request) {

  const input: ${requestInputTypename} = request.body.input

  // your logic

  const response = {
    data: {

    }
  };

  return response;

};

export default requestHandler;


`
    })
    .catch(error => {
      throw error;
    })

}

handlerTemplate(
  `type Mutation {
  makePayment (
    id: String
  ): PaymentInfo
}`,
`type PaymentInfo {
  payment_id : String
}

`
).then(c => {
  console.log(c)
});