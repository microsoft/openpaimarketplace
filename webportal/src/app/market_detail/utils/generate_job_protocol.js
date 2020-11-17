import { getConnectionString } from 'App/utils/marketplace_api';

export async function generateJobProtocol(item, user) {
  // TODO: add connection string
  console.log(user);
  const connectionString = await getConnectionString(user);
  console.log(connectionString);
  const protocolHeader = `export STORAGE_CONNECTION_STRING${connectionString}`
  const protocolFooter = `pai_copy upload $PAI_`
  console.log(item.protocol)
  return item.protocol;
}
