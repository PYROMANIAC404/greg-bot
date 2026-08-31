# Greg 🤖

hes a fun little slack bot i make with vs code and node,js and slackbolt hes designed to set up ur mood and bring entertainment includes features like Rock Paper Scissors, weather reports, coin flips, dice rolls, jokes, fortunes, space-related commands, and an achievement system.

**[Try Greg!](https://hackclub.enterprise.slack.com/archives/C0BTKND8W0M)**

## What is this about?

Greg is a Slack bot built for the Hackclub Slack workspace. It started as a small project for Stardance and grew into a large project for learning backend development, APIs, Slack development, and interactive features.

The goal is to make Greg useful, entertaining, and fun to interact with(still improving).

## How does it work?

Greg runs using **Node.js** and **Slack Bolt**. Commands are triggered directly inside Slack using `/greg-...` commands.

Some example commands to use with him:

* `/greg-ping` — Check if Greg is alive
* `/greg-weather` — Get weather information
* `/greg-flip` — Flip a coin
* `/greg-roll` — Roll a die
* `/greg-rps` — Play Rock Paper Scissors
* `/greg-8ball` — Ask Greg a question
* `/greg-fortune` — Get a random fortune
* `/greg-space` — Get space-related information
* `/greg-achievement` — Check your Greg achievements

## How to run your own version

1. Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd greg-bot
npm install
```

2 .Create a `.env` file:

```env
SLACK_BOT_TOKEN=your_token
SLACK_APP_TOKEN=your_token
```

3.Then start Greg:

```bash
node index.js
```
make sure to add ur commands in the slack api work base so slack actually knows the command exist
**Never share your Slack tokens publicly or commit your `.env` file to GitHub.**

## What I learned from this project

Building Greg taught me about:

* Node.js and JavaScript
* Slack Bolt and Slack APIs
* External APIs
* Async requests and error handling
* Environment variables
* Backend development
* Git and GitHub
* Hosting a bot
* Building interactive Slack commands
* Designing an achievement system
* (### which majority i learned with the help of ai)

## Features & Commands

### 🎮 Games & Entertainment

* `/greg-flip` — Flip a coin
* `/greg-roll` — Roll a die
* `/greg-rps` — Play Rock Paper Scissors
* `/greg-8ball` — Get a random answer
* `/greg-fortune` — Get a random fortune
* `/greg-joke` — Get a random joke

### 🏆 Achievement System

Greg has a achievement system that rewards users for interacting with the bot.

Achievements can be unlocked by discovering  different Greg features and commands.

The system is designed to make exploring Greg more rewarding and encourage users to discover what he can do.

### 🌦️ Utilities

* `/greg-weather` — Get weather information

### 🪐 Random Stuff

* `/greg-space` — Space-related features
* More random features coming soon!

## What's next?

Greg is still under development!

Planned improvements include:

* 🏆 More & improved achievements
* 🎭 personalized responses
* 🌦️ Smarter weather reactions
* 🎲 More interactive games
* 🪐 More space features
* 🥚 Hidden Easter eggs
* 📈 Possible XP/level system

## Creator

Made by **pyromaniac404** 🚀

Built as part of my **Hack Club Stardance** project.
## credits 
CHATGPT __to help me with deploying a time based weather reporter with funfacts command for greg
and fixing the bugs with the rock paper scissor gamer

**Greg is watching. 👁️**
