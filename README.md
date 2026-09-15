# Greg 

Greg is a little Slack bot I made using VS Code, Node.js and Slack Bolt.

The original idea was pretty simple: make a bot that could do random fun stuff in Slack and hopefully make people's day a little more interesting. It started as a small Stardance project and slowly turned into a much bigger project than I expected.

Greg can play Rock Paper Scissors, tell jokes, check the weather, flip coins, roll dice, give fortunes, show space-related stuff, and keep track of achievements.

**[Try Greg!](https://hackclub.enterprise.slack.com/archives/C0BTKND8W0M)**

## What is Greg?

Greg is a Slack bot made for the Hack Club Slack workspace.

I originally started building him as a way to learn more about backend development and APIs. As I kept adding features, it turned into a project where I could experiment with Slack commands, interactive buttons, APIs, scheduled tasks, and a bunch of other things.

The main goal is basically:

**Make Greg useful, make him entertaining, and add random things whenever I get an idea.**

He's still being improved, so expect things to break occasionally. :)

## What can Greg do?

Greg uses `/greg-...` commands directly inside Slack.

Some of the commands include:

- `/greg-ping` — See if Greg is alive
- `/greg-weather` — Get weather information
- `/greg-flip` — Flip a coin
- `/greg-rps` — Play Rock Paper Scissors
- `/greg-8ball` — Ask Greg a question
- `/greg-fortune` — Get a random fortune
- `/greg-space` — Get space-related information
- `/greg-achievement` — Check your achievements

There are also some smaller features hidden around Greg. You might find them. 👀

## How does it work?

Greg is built with **Node.js** and **Slack Bolt**.

Most of the interaction happens through Slack slash commands. Some features also use external APIs to get information such as weather and space data.

I also added scheduled functionality, including a daily weather reporter, which was honestly one of the more annoying parts to get working.

## Running your own Greg

If you want to run your own version, you'll need Node.js and a Slack app.

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd greg-bot
npm install
