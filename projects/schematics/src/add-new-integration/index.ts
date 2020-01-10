import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { NewIntegrationSchema } from './schema';

function validateArguments(options: NewIntegrationSchema): void {
  if (options.projectName && !Boolean(options.projectName)) {
    throw new SchematicsException(
      'You have to specify the "projectName" option.'
    );
  }
}

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function addNewIntegration(options: NewIntegrationSchema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    validateArguments(options);

    return tree;
  };
}
