export function getFileName(url) {
  const result = url
    .split('/')
    .pop()
    .split('?')[0];
  return result;
}
