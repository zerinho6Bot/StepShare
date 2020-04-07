# StepShare
Find modded charts ported to SM5 in Discord

## How to use (In Discord)

### Find charts

There are 5 commands to find charts: ``chart``, ``author``, ``pack``, ``allcharts`` and ``version``
Example: ``sh!chart The`` will return all the charts that includes The on their name, if you want charts that only includes ``The``, you should include a ``--l`` flag, example: ``sh!chart The --l``.

After that, the bot will show a list of the charts that he found with the search, and a number will be close to the chart name, you should type the number of the chart you want and he'll give you the
chart results.

![](https://cdn.discordapp.com/attachments/688182781263609868/693856983530471574/unknown.png)

Official Discord Server: https://discord.gg/VKSevNk

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

1. [Node.js](https://nodejs.org/en/) atleast 12.x.x version.
2. [Git](https://git-scm.com/)
3. [A Discord Account](https://discordapp.com)
4. [A Discord Application](https://discordapp.com/developers/applications/)
  1. Log in with your Discord account
  2. Go to Applications
  3. Hit _New Application_
  4. Give the bot a name then save the changes.
  5. Then on the menu, click on Bot then click on _Add Bot_ and confirm.
  6. You should see a _Copy Token_, click on it and store it somewhere, you'll need it.

### Installing

1. Download and extract the files or create a folder on your desktop and inside it do ``git clone https://github.com/moruzerinho6/StepShare``.

2. After downloading the content, enter the created file and open a prompt command window(CMD/Bash) inside the folder.

3. Type ``npm i``, if it doesn't work then something might have gonne wrong with your node.js installation.

4. Inside the .env file there should be 2 keys each with a value:

```
TOKEN=The bot token here
PREFIX=The bot prefix here
OWNER=Your Discord ID here
GOOGLE_SERVICE_ACCOUNT_EMAIL="The google service e-mail here"
GOOGLE_PRIVATE_KEY="The google service private key here"
SHEET_ID="The spreadsheet id here"
```

Remember to rename .envExampe to .env

If you're unfamiliar, prefix means what the message should start with so the bot takes and tries to do something with it.

### Coding style

StepShare uses [Standard](https://github.com/standard/standard) so you should too, click on Stardard to check it's repository and how to install it, I recommend you to do this before trying to work on the code since the eslint'll pretty much not work without you installing it in the global.

If unsure of your coding style you can run ``standard --fix`` outside the src folder so it'll fix everything it can for you.

## Deployment

It is recommended to host custom version on [Glitch.com](https://glitch.com/)

It supports Discord Bots and is where the official StepShare is hosted.

## Built With

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

* [Node.js](https://nodejs.org/en/) - The JavaScript framework used
* [Discord.js](https://discord.js.org/) - Dependency Management

## Authors

* **Jorge Luiz** - *Initial work* - [moruzerinho6](https://github.com/moruzerinho6)

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/moruzerinho6/StepShare/blob/master/LICENSE) file for details.

## Acknowledgments

* [MrThatKid](https://www.youtube.com/user/MrThatKid4) for porting all those modded files to SM5, without him this would even exist, thanks him for giving me the permission to launch this bot.

* [Team Rizu](https://twitter.com/teamrizu) the team working behind Stepmania 5.3, the amount of work going on with them is insane.
