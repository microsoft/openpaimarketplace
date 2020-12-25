import { getConnectionString } from 'App/utils/marketplace_api';

export async function generateJobProtocol(item, user, useBlob) {
  if (useBlob === true) {
    const connectionString = await getConnectionString(); // can add user as key to get connection string
    const npmInstallToken = process.env.NPM_INSTALL_TOKEN;
    const protocolHeaderArray = [
      'curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh',
      'bash nodesource_setup.sh',
      'apt update',
      'apt install -y nodejs',
      'npm config set @swordfaith:registry https://npm.pkg.github.com/',
      `echo "//npm.pkg.github.com/:_authToken=${npmInstallToken}" >> ~/.npmrc`,
      'npm install -g @swordfaith/pai_copy',
      `export STORAGE_CONNECTION_STRING="${connectionString}"`,
    ];
    // pai_copy upload [filePath] [containerName] [blobFolder]
    const protocolFooterArray = [
      'if [ -z ${OUTPUT_DIR+x}]; then', // eslint-disable-line no-template-curly-in-string
      '\techo "Not found OUTPUT_DIR environ"',
      'else',
      '\tpai_copy upload ${OUTPUT_DIR} paiuploadtest ${PAI_USER_NAME}/${PAI_JOB_NAME}/', // eslint-disable-line no-template-curly-in-string
      'fi',
    ];
    const taskRoleName = Object.keys(item.protocol.taskRoles)[0];
    item.protocol.taskRoles[taskRoleName].commands = protocolHeaderArray.concat(
      item.protocol.taskRoles[taskRoleName].commands,
      protocolFooterArray,
    );
  }
  return item.protocol;
}
