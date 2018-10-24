import fs from "fs";
import path from "path";

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const rootDirectory = fs.realpathSync(process.cwd());

// Resolve absolute path of file relative to `root` directory
export const resolvePath = (relativePath: string) =>
  path.resolve(rootDirectory, relativePath);
