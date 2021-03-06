const fs = require('fs-extra');
const path = require('path');
const rollup = require('rollup');
const cp = require('child_process');
const transpile = require('./transpile');


const TRANSPILED_DIR = path.join(__dirname, '..', 'dist', 'transpiled-compiler');
const ENTRY_FILE = path.join(TRANSPILED_DIR, 'compiler', 'index.js');
const DEST_DIR = path.join(__dirname, '..', 'dist', 'compiler');
const DEST_FILE = path.join(DEST_DIR, 'index.js');
const DECLARATIONS_SRC_DIR = path.join(TRANSPILED_DIR, 'declarations');
const DECLARATIONS_DST_DIR = path.join(__dirname, '..', 'dist', 'declarations');

let buildId = process.argv.find(a => a.startsWith('--build-id='));
buildId = buildId.replace('--build-id=', '');

const success = transpile(path.join('..', 'src', 'compiler', 'tsconfig.json'));

if (success) {

  function bundleCompiler() {
    rollup.rollup({
      input: ENTRY_FILE,
      external: [
        'fs',
        'path',
        'rollup',
        'rollup-plugin-commonjs',
        'rollup-plugin-node-resolve',
        'rollup-plugin-node-builtins',
        'rollup-plugin-node-globals',
        'rollup-pluginutils',
        'typescript',
        'util'
      ],
      onwarn: (message) => {
        if (/top level of an ES module/.test(message)) return;
        console.error( message );
      }

    }).then(bundle => {

      // copy over all the .d.ts file too
      fs.copySync(path.dirname(ENTRY_FILE), DEST_DIR, {
        filter: (src) => {
          return src.indexOf('.js') === -1 && src.indexOf('.spec.') === -1;
        }
      });

      fs.copySync(DECLARATIONS_SRC_DIR, DECLARATIONS_DST_DIR, {
        filter: (src) => {
          return src.indexOf('.js') === -1 && src.indexOf('.spec.') === -1;
        }
      });

      // bundle up the compiler into one js file
      return bundle.generate({
        format: 'cjs',
        file: DEST_FILE

      }).then(output => {
        try {
          let outputText = output.code;
          outputText = outputText.replace(/__BUILDID__/g, buildId);
          fs.ensureDirSync(path.dirname(DEST_FILE));
          fs.writeFileSync(DEST_FILE, outputText);

        } catch (e) {
          console.error(`build compiler error: ${e}`);
        }

      }).then(() => {
        console.log(`✅ compiler: ${DEST_FILE}`);

      }).catch(err => {
        console.error(`build compiler error: ${err}`);
        process.exit(1);
      });

    }).catch(err => {
      console.error(`build compiler error: ${err}`);
      process.exit(1);
    });
  }


  bundleCompiler();


  process.on('exit', (code) => {
    fs.removeSync(TRANSPILED_DIR);
  });

}