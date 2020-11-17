import { getConnectionString } from 'App/utils/marketplace_api';

export async function generateJobProtocol(item, user) {
  const connectionString = await getConnectionString();  // can add user as key to get connection string
  console.log(connectionString);
  const protocolHeaderArray = [
    'curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh',
    'bash nodesource_setup.sh',
    'apt update',
    'apt install -y nodejs',
    'npm config set @swordfaith:registry https://npm.pkg.github.com/',
    'echo "//npm.pkg.github.com/:_authToken=e21af186e35f1999545782759d15722656d1271b" >> ~/.npmrc',
    'npm install -g @swordfaith/pai_copy',
    `export STORAGE_CONNECTION_STRING="${connectionString}"`,
  ];
  // pai_copy upload [filePath] [containerName] [blobFolder]
  const protocolFooterArray = [
    'if [ -z ${OUTPUT_DIR+x}]; then',
    '\techo "Not found OUTPUT_DIR environ"',
    'else',
    '\tpai_copy upload ${OUTPUT_DIR} paiuploadtest ${PAI_USER_NAME}/${PAI_JOB_NAME}/',
    'fi',
  ];
  item.protocol.taskRoles.taskrole.commands = protocolHeaderArray.concat(
    item.protocol.taskRoles.taskrole.commands,
    protocolFooterArray,
  );
  console.log(item.protocol);
  return item.protocol;
}
