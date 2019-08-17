const fs = require("fs");
const path = require("path");

const glob = require("glob");
const rimraf = require("rimraf");

// ----------------------------------------------------------------------------
// Options

const OPTIONS = {
  outputDir: "./components",
  svgDir: "./node_modules/feather-icons/dist/icons/",
};

// ----------------------------------------------------------------------------
// Helper functions

const pascalCase = destPath => {
  const splitregex = new RegExp(`[${path.sep}-]+`);
  let parts = destPath.split(splitregex);
  parts = parts.map(part => {
    return part.charAt(0).toUpperCase() + part.substring(1);
  });
  return parts.join("");
};

const replaceExt = (destPath, newExt) => {
  return path.parse(destPath).base.replace(/.svg$/, newExt);
};

// ----------------------------------------------------------------------------
// Build components

const processFile = svgPath => {
  const destPath = replaceExt(svgPath, ".js").replace(/_/g, "-");

  const outputFileDirJs = path.dirname(path.join(OPTIONS.outputDir, destPath));
  if (!fs.existsSync(outputFileDirJs)) {
    fs.mkdirSync(outputFileDirJs, { recursive: true });
  }

  const absDestPathJs = path.join(OPTIONS.outputDir, pascalCase(destPath));
  const svgData = loadSvgData(svgPath);

  const fileString =
    'const m = require("mithril");\nmodule.exports = m(\n  ".icon",\n' +
    `  m.trust(\n    '${svgData}',\n  ),\n);\n`;
  fs.writeFileSync(absDestPathJs, fileString);
};

const loadSvgData = svgPath => {
  return fs
    .readFileSync(svgPath, { encoding: "utf8" })
    .replace(/<!--.*-->/g, "")
    .replace(/<!DOCTYPE.*?>/, "")
    .replace(/<\?xml .*?>/, "")
    .replace(/\n|\r|\t/g, " ")
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .replace(/\s+$/, "")
    .replace(/^\s+/, "");
};

// ----------------------------------------------------------------------------
// Build index

const buildIndex = files => {
  const content = files
    .map(svgPath => {
      const className = pascalCase(replaceExt(svgPath, ""));
      return `  ${className}: require("./components/${className}"),\n`;
    })
    .join("");

  const fileString = `module.exports = {\n${content}};\n`;
  fs.writeFileSync("./index.js", fileString);
};

// ----------------------------------------------------------------------------
// Main

const main = () => {
  // 1. Clean the output directory / ensure it exists.
  rimraf.sync(OPTIONS.outputDir);
  fs.mkdirSync(OPTIONS.outputDir, { recursive: true });

  // 2. Build a list of all files with the matching extension from the SVG
  //    directory.
  const files = glob.sync(path.join(OPTIONS.svgDir, "/**/*.svg"));

  // 3. Construct a Mithril component from each SVG file, writing out the
  //    results to the filesystem.
  files.forEach(svgPath => processFile(svgPath));

  // 4. Build the index, exporting all components for external use.
  buildIndex(files);
};

if (require.main === module) {
  main();
}
