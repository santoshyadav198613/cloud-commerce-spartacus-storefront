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
  return (tree: Tree, _context: SchematicContext) => {
    const OLDSHELLAPP = 'storefrontapp';
    const NEWSHELLAPP = `${OLDSHELLAPP}-${options.newProject}`;

    const buffer = tree.read('angular.json');

    if (buffer) {
      const angularJsonFileObject = JSON.parse(buffer.toString('utf-8'));
      const oldProjectObject = angularJsonFileObject.projects[OLDSHELLAPP];

      replaceAllOldShellAppName(oldProjectObject, OLDSHELLAPP, NEWSHELLAPP);
    }

    return tree;
  };
}
