import { Card, LanguageOptionText } from "@open-artifact/api-types";
import yargs from "yargs";
// import ArtifactDBTransform from "../../exampleScript";
import { TransformPlugin } from "../../plugins";

export default function transformCommandHandler(argv: yargs.Arguments) {
  import(argv.s)
    .then((plugin) => {
      const { transformSet, transformFragment, Test } = plugin;

      console.log("Scripted loaded");
      transformFragment({ card_name: "Hello" });
      console.log(new Test().age);
      console.log("default", plugin.default);
    })
    .catch((err) => {
      console.error(err);
    });
}
