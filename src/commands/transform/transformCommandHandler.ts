import yargs from "yargs";
import { TransformPlugin } from "../../Plugins";

export default function transformCommandHandler(argv: yargs.Arguments) {
  const script: TransformPlugin = require(argv.script);
  const test = {
    a: 2,
  };
  const x = script.transformCard(test);

  console.log(x);
}
