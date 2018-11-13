# Plough 🚜

Plough is a command line tool for downloading card sets & images from the Artifact API. Using this tool you can cache or webpack all API assets locally to speed up load times, instead of making mutliple requests to the API client/server side.

## Install
```
npm i -g plough
```

## Examples
Download set 0 & 1 and output to `./assets/`.
```
plough -s 0 1 -o ./assets/
```
Download set 0 & 1 and all images
```bash
plough -s 0 1 -p -o ./folder/
```

## Commands
You can type **--help** or **[command] --help** to get help information & examples.

| Command      | Aliases | Options                       | Description                      |
| :----------: | :-----: | :---------------------------: | :------------------------------: |
| **download** | d       | -h, f, -p, -s, -r, -o, --wipe | Downloads the give sets numbers. |

## Options
| Options | Aliases      | Commands | Type     | Description                                                                                          |
| :-----: | :----------: | :------: | :------: | :--------------------------------------------------------------------------------------------------: |
| -h      | --help       | any      |          | Get information about this program or any command.                                                   |
| -s      | --sets       | download | number[] | Card sets to modify or download                                                                      |
| -f      | --fragment   | download | boolean  | Fragment each card from a set into its card folder.                                                  |
| -p      | --pictures   | download | boolean  | If true, pictures will be downloaded from the api and written to the output folder.                  |
| -o      | --output     | download | string   | The output folder for downloading sets.                                                              |
| -r      | --redownload | download | boolean  | If true, pictures will be redownloaded from the api even if they already exist in the output folder. |
| --wipe  |              | download | boolean  | If true, the output folder will be removed before downloading and saving to that location.           |

