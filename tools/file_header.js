const fs = require("fs-extra");
const path = require("path");
const recursive = require("recursive-readdir");

const DIR = "../rest_server/src";
const HEADER = `// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
`;

const insertHeader = (filePath, header) => {
  fs.readFile(filePath, "utf8", (error, data) => {
    if (error) {
      console.log(error);
    }
    if (data.startsWith(header)) {
      console.log(`${filePath} already has header!`);
    } else {
      // TODO: remove old header
      const newContent = header.concat(data);
      fs.writeFile(filePath, newContent, err => {
        if (err) {
          console.log(err);
        } else {
          console.log(`write ${filePath} finished`);
        }
      });
    }
  });
};

recursive(DIR, function(err, files) {
  if (err) {
    console.log(err);
  }
  files.forEach(file => {
    console.log(`processing ${file}...`);
    if (path.extname(file) === ".js" || path.extname === '.jsx') {
      insertHeader(file, HEADER);
    } else {
      console.log("not js file");
    }
  });
});