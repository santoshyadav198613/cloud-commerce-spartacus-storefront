import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { CxNewIntegration } from './schema';

function replaceAllOldShellAppName(
  object: any,
  oldProjectName: string,
  newProjectName: string
) {
  const regex = new RegExp(oldProjectName, 'g');
  Object.keys(object).forEach(key => {
    if (object[key] !== null && typeof object === 'object') {
      replaceAllOldShellAppName(object[key], oldProjectName, newProjectName);
      return;
    }

    if (object[key].includes(oldProjectName)) {
      object[key] = object[key].replace(regex, oldProjectName, newProjectName);
    }
  });
}

export function addNewIntegration(options: CxNewIntegration): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const OLDSHELLAPP = 'storefrontapp';
    const NEWSHELLAPP = `${OLDSHELLAPP}-${options.newProject}`;

    const buffer = tree.read('angular.json');

    console.log('buffer1', buffer);

    if (buffer) {
      const angularJsonFileObject = JSON.parse(buffer.toString('utf-8'));
      console.log('inside angJsonObj', angularJsonFileObject);
      const oldProjectObject = angularJsonFileObject.projects[OLDSHELLAPP];
      console.log('inside2 oldProj', oldProjectObject);
      replaceAllOldShellAppName(oldProjectObject, OLDSHELLAPP, NEWSHELLAPP);

      tree.overwrite(
        'angular.json',
        JSON.stringify(angularJsonFileObject, null, 2)
      );
      context.logger.log(
        'info',
        `✅️ Modified build scripts in angular.json file.`
      );
    }

    return tree;
  };
}
