const fs = require('fs');
const fse = require('fs-extra');
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));

const srcDirectory = './projects/storefrontapp';
const newDirectory = `./projects/${args['projectName']}`;

if (!args['projectName']) {
  console.error('please pass a project name --projectName=[here]');
  process.exit(1);
}

if (!fs.existsSync(newDirectory)) {
  fs.mkdirSync(newDirectory, { recursive: true });
  console.log(`You have created a directory: ${args['projectName']}`);
} else {
  console.log(`Directory: ${args['projectName']} already exists`);
  process.exit(0);
}

fse.copy(srcDirectory, newDirectory, function(e) {
  if (e) {
    console.log(e);
    process.exit(1);
  } else {
    console.log(
      `You have successfully created new shellapp: ${args['projectName']}. It can be found in ${newDirectory}`
    );
  }
});
