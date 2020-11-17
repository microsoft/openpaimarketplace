import { getConnectionString } from 'App/utils/marketplace_api';

export async function generateJobProtocol(item, user) {
  const connectionString = await getConnectionString();  // can add user as key to get connection string
  console.log(connectionString);
  const protocolHeaderArray = [
    `curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh`,
    `bash nodesource_setup.sh`,
    `apt update`,
    `apt install -y nodejs`,
    `npm config set @swordfaith:registry https://npm.pkg.github.com/`,
    `echo "//npm.pkg.github.com/:_authToken=af5ce230873670f68580b591397e68939026b6c7" >> ~/.npmrc`,
    `npm install -g @swordfaith/pai_copy`,
    `export STORAGE_CONNECTION_STRING=${connectionString}`,
  ];
  // pai_copy upload [filePath] [containerName] [blobFolder]
  const protocolFooterArray = [
    `if [ ! -z "$OUTPUT_DIR"]; then`,
    `\tpai_copy upload $OUTPUT_DIR pai_upload_test $PAI_USER_NAME/$PAI_JOB_NAME/`,
    `fi\n`,
  ];
  item.protocol.taskRoles.taskrole.commands = protocolHeaderArray.concat(
    item.protocol.taskRoles.taskrole.commands,
    protocolFooterArray,
  );
  console.log(item.protocol);
  return item.protocol;
}
