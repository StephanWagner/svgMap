import fs from 'fs';

const green = '\x1b[32m';
const red = '\x1b[31m';
const reset = '\x1b[0m';

const files = [
  'dist/index.js',
  'dist/index.cjs',
  'dist/svg-map.umd.js'
];

files.forEach(file => {
  try {
    fs.accessSync(file);
    console.log(`${green}✔ Found:${reset} ${file}`);
  } catch {
    console.error(`${red}✖ Missing:${reset} ${file}`);
    process.exit(1);
  }
});

console.log(`${green}✔ All build artifacts present. Ready to publish.${reset}`);