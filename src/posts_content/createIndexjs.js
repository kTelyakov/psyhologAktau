const fs = require('fs')
const path = require('path')


function createIndex () {
  fs.readdir('./', (err, files) => {
    let filesArr = []
    let resStr = ''
    files.forEach(file => {
      if (file === 'createIndexjs.js') return
      fs.readFile(file, function read(err, data) {
        if (err) {
          throw err;
        }
        // const content = data;
        fs.appendFileSync(
          'index.js',
          data + ', '
        );

      });
    });

    // const allFileNames = []
    // filesArr.forEach(fileName => {
    //   if (fileName === 'createIndexjs.js') return
    //   const importName = fileName.split('.')[0].replace(/\-/g, '_')
    //   allFileNames.push(importName)
    //   fs.appendFileSync(
    //     'index.js',
    //     `import ${importName} from '${fileName}';\n`
    //   );
    // })
    //
    // fs.appendFileSync(
    //   'index.js',
    //   `export default {
    //     ${ allFileNames.join(',') }
    //    }`
    // );
  });
}


createIndex()
