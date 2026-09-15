# Greg

Greg is a little Slack bot I made using VS Code, Node.js, and Slack Bolt.

The idea was pretty simple at first: make a bot that could do random fun stuff in Slack. I started it as a small Stardance project, but then I kept getting ideas for new commands and it kind of... grew.

Now Greg can play Rock Paper Scissors, tell jokes, check the weather, flip coins, roll dice, give random fortunes, show space stuff, and keep track of achievements.

**[Try Greg!](https://hackclub.enterprise.slack.com/archives/C0BTKND8W0M)**

## What is Greg?

Greg is a Slack bot for the Hack Club Slack workspace.

I originally made him because I wanted to learn more about backend stuff and APIs. I started with a few simple commands, then added buttons, APIs, scheduled tasks, and other random things whenever I thought of something.

So basically, the idea is:

**Make Greg do stuff. Add more stuff when I get bored.**

He's still a work in progress, so yeah, there will probably be bugs. :)

## What can Greg do?

You can use Greg directly in Slack with `/greg-...` commands.

Some of them are:

* `/greg-ping` — Check if Greg is alive
* `/greg-weather` — Check the weather
* `/greg-flip` — Flip a coin
* `/greg-rps` — Play Rock Paper Scissors
* `/greg-roll` — Roll a dice
* `/greg-8ball` — Ask the magic 8-ball
* `/greg-fortune` — Get a random fortune
* `/greg-space` — Get some space-related stuff
* `/greg-achievements` — Check your achievements
* `/greg-help` — See the available commands

There are also a few random things hidden in Greg.

Good luck finding them. 👀

## How does it work?

Greg is built with **Node.js** and **Slack Bolt**.

Most of the stuff happens through Slack slash commands. Some commands also use external APIs, like the weather command.

I also added scheduled stuff, including a daily weather reporter. Getting that working took way longer than I expected lol.

Greg currently keeps some stats in memory, so some things reset if the bot restarts.

## Running your own Greg

If you want to run your own version of Greg, you'll need:

* Node.js
* A Slack workspace where you can install apps
* A Slack app
* The Slack app's bot token and app token

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd greg-bot
```

### 2. Install the dependencies

```bash
npm install
```

### 3. Create your Slack app

Go to the Slack API website and create a new app.

You'll need to enable the features Greg uses, including:

* Slash commands
* Interactivity
* Socket Mode

You'll also need to give the bot the permissions it needs.

### 4. Get your tokens

Enable **Socket Mode** and create an app-level token.

Then install the app into your Slack workspace and get the bot token.

You should end up with the tokens needed for the bot to connect to Slack.

**Don't put these tokens directly into your code or upload them to GitHub.**

### 5. Add your environment variables

Create a `.env` file in the project folder and add your Slack credentials:

```env
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-token
```

If Greg uses other API keys in your version, add those here too.

### 6. Start Greg

Run:

```bash
node index.js
```

If everything is set up correctly, you should see something like:

```text
bot is running!
```

Greg should now be connected to Slack.

### 7. Test it

Go into your Slack workspace and try:

```text
/greg-ping
```

If Greg responds, congratulations. You have successfully summoned Greg. :)

### Running Greg continuously

If you're running Greg on a server, you probably don't want to leave a terminal open forever.

You can use something like **systemd**, Docker, or another process manager to keep Greg running and automatically restart him if something goes wrong.

For example, on a Linux server, Greg can be run as a systemd service.

---

That's basically it. The annoying part is mostly setting up the Slack app and getting all the permissions/tokens right.

Then set up your Slack app credentials and run the bot.

That's pretty much it.

Have fun with Greg :)
