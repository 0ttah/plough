import shell from "shelljs";
export function removeFolder(filePath: string) {
  if (filePath !== "/") {
    shell.rm("-rf", filePath);
  }
}
