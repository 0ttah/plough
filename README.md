# Plough 🚜
Plough is a command line tool for downloading card sets & images from the Artifact API. Using this tool you can cache or webpack all API assets locally to speed up load times, instead of making mutliple requests to the API client/server side.

It is also possible to write plugins to transform the data from the API into another format or add new information from other files.

## Install
```
npm i -g @open-artifact/plough
```

## Usage
```
plough download
```

## Examples
Download set 0 & 1 and output to `./assets/`.
```
plough download -s 0 1 -o ./assets/
```
Download set 0 & 1 and all images
```bash
plough download -s 0 1 -p -o ./folder/
```

## Output (based on options/plugins):
```
assets/ #
│
└───sets
    └───set-0
        │   set.json # card set
        │   cardmap.json  # map of cardnames-id
        └───cards
            └───1000
            |   |   card.json   # individual card
            |   |   ingame.png
            |   |   large.png
            |   |   mini.png
            └───1001
            └───...
```

## Plugins
*This is a new feature so this section may be out of date.*

### Transforms 
Transform plugins can be loaded in with the -t flag on the download command. To create a plugin you must extend the TransformPlugin class in the `src/plugins/` folder. There are 2 methods which can be implemented that allow you for format the output JSON data for a CardSet and a Card fragment if the -fragment flag is used.


## Commands
You can type **--help** or **[command] --help** to get help information & examples.

|   Command    | Aliases |                Options                |           Description            |
| :----------: | :-----: | :-----------------------------------: | :------------------------------: |
| **download** |    d    | -h, f, -p, -s, -r, -o, -t, -l, --wipe | Downloads the give sets numbers. |

## Options
| Options |   Aliases    | Commands |   Type   |                                             Description                                              |
| :-----: | :----------: | :------: | :------: | :--------------------------------------------------------------------------------------------------: |
|   -h    |    --help    |   any    |          |                          Get information about this program or any command.                          |
|   -s    |    --sets    | download | number[] |                                   Card sets to modify or download                                    |
|   -f    |  --fragment  | download | boolean  |                         Fragment each card from a set into its card folder.                          |
|   -p    |  --pictures  | download | boolean  |         If true, pictures will be downloaded from the api and written to the output folder.          |
|   -o    |   --output   | download |  string  |                               The output folder for downloading sets.                                |
|   -r    | --redownload | download | boolean  | If true, pictures will be redownloaded from the api even if they already exist in the output folder. |
|   -t    | --transform  | download |   path   |                                      Path to transform plugin.                                       |
|   -l    |  --language  | download |   path   |                                   Language to download images in.                                    |
| --wipe  |              | download | boolean  |      If true, the output folder will be removed before downloading and saving to that location.      |
