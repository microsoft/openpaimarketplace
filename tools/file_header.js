const fs = require("fs-extra");
const path = require("path");

const DIR = "./test";
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

fs.readdir(DIR, (err, files) => {
  if (err) {
    console.log(err);
  }
  files.forEach(file => {
    const filePath = path.join(DIR, file);
    console.log(filePath);
    if (path.extname(filePath) === ".js") {
      insertHeader(filePath, HEADER);
    } else {
      console.log("not js file");
    }
  });
});
