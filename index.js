const axios = require("axios");
require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});
// =========================
// 🏆 GREG ACHIEVEMENTS
// =========================

const achievements = {};

function getUserStats(userId) {
  if (!achievements[userId]) {
    achievements[userId] = {
      flips: 0,
      rpsWins: 0,
      fortunes: 0,
      excuses: 0,
      catfacts: 0,
      jokes: 0,
      space: 0,
      weather: 0
    };
  }

  return achievements[userId];
}
app.command("/greg-fortune", async ({ ack, respond }) => {
  await ack();

  const fortunes = [
    "🔮 Something unexpectedly good is coming your way.",
    "🍀 Luck is on your side today.",
    "🧠 Trust your instincts. They're smarter than you think.",
    "🚀 A bold decision may lead somewhere interesting.",
    "👀 Someone is about to surprise you.",
    "💰 Your future contains money. Probably.",
    "🌌 The universe has plans for you. It forgot to send the calendar invite.",
    "⚡ Today is a good day to try something new.",
    "🎯 Your next big opportunity is closer than you think.",
    "🗿 Greg has spoken. You will have a surprisingly decent day."
  ];

  const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];

  await respond({ text: `🔮 Greg's Fortune:\n> ${fortune}` });
});

app.command("/greg-rps", async ({ ack, respond }) => {
  await ack();

  await respond({
    text: "🎮 Greg challenges you to Rock Paper Scissors!",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*🎮 GREG'S ROCK PAPER SCISSORS*\n\nChoose your weapon:"
        }
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "🪨 Rock"
            },
            action_id: "rps_rock",
            value: "rock"
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "📄 Paper"
            },
            action_id: "rps_paper",
            value: "paper"
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "✂️ Scissors"
            },
            action_id: "rps_scissors",
            value: "scissors"
          }
        ]
      }
    ]
  });
});


// Handle the buttons
app.action(/^rps_(rock|paper|scissors)$/, async ({ ack, body, respond, action }) => {
  await ack();

  const userChoice = action.value;

  const choices = ["rock", "paper", "scissors"];
  const gregChoice = choices[Math.floor(Math.random() * choices.length)];

  let result;

  if (userChoice === gregChoice) {
    result = "🤝 It's a draw!";
  } else if (
    (userChoice === "rock" && gregChoice === "scissors") ||
    (userChoice === "paper" && gregChoice === "rock") ||
    (userChoice === "scissors" && gregChoice === "paper")
  ) {
    result = "🏆 YOU WIN! Greg has been defeated!";
  } else {
    result = "💀 GREG WINS. Skill issue.";
  }

  const emoji = {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️"
  };

  await respond({
    replace_original: true,
    text: "🎮 Greg's Rock Paper Scissors",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            `*🎮 GREG'S ROCK PAPER SCISSORS*\n\n` +
            `You chose: ${emoji[userChoice]} *${userChoice}*\n` +
            `Greg chose: ${emoji[gregChoice]} *${gregChoice}*\n\n` +
            `*${result}*`
        }
      }
    ]
  });
});

app.command("/greg-excuses", async ({ ack, respond }) => {
  await ack();

  const excuses = [
    "My Wi-Fi developed a personal vendetta against me.",
    "My brain is still loading.",
    "I was distracted by a very important thought that I immediately forgot.",
    "My alarm clock and I are no longer on speaking terms.",
    "I accidentally entered sleep mode.",
    "My computer needed emotional support.",
    "I was waiting for inspiration. It never showed up.",
    "My internet connection  violence.",
    "I had technical difficultieschose with reality.",
    "I forgot what I was doing halfway through doing it.",
    "My cat looked at me weirdly and I lost focus.",
    "I was busy doing absolutely nothing, professionally.",
    "My brain installed an update at the worst possible time.",
    "I got trapped in a YouTube rabbit hole.",
    "I was five minutes late because I underestimated five minutes.",
    "My charger disappeared into another dimension.",
    "I was buffering.",
    "My motivation took the day off.",
    "I accidentally procrastinated too efficiently.",
    "I was conducting extremely important research on memes.",
    "My keyboard stopped cooperating.",
    "I had a sudden philosophical crisis.",
    "I forgot the password to my own brain.",
    "My chair was unusually comfortable today.",
    "I was waiting for the right moment. The moment never came.",
    "My schedule and reality had conflicting opinions.",
    "I opened one tab and somehow ended up with 47.",
    "My brain said 'later' and never followed up.",
    "I was busy staring at the wall and thinking about the universe.",
    "My mouse stopped believing in me.(I don't know why either)",
    "I needed a strategic recharge.",
    "I accidentally took a tactical nap.",
    "My phone demanded my attention.",
    "I was attacked by an unexpected side quest.",
    "I forgot to remember.",
    "My brain went offline temporarily.",
    "I was experiencing a severe shortage of motivation.",
    "I got distracted by literally everything.",
    "My internet had commitment issues.",
    "I was waiting for my brain cells to form a quorum.",
    "My computer decided it needed a vacation.",
    "I was busy fighting the final boss of procrastination.",
    "I lost track of time while doing something completely unnecessary.",
    "My plans encountered unexpected plot development.",
    "I accidentally entered airplane mode mentally.",
    "I was running on 2% brain battery.",
    "My attention span escaped.",
    "I was interrupted by a thought.",
    "My brain.exe stopped responding.",
    "I was waiting for the loading screen to finish.",
    "I had an appointment with procrastination.",
    "My motivation got stuck in traffic.",
    "I was temporarily unavailable due to mysterious circumstances.",
    "My schedule was attacked by chaos.",
    "I forgot that today was today.",
    "I was busy preventing myself from being even more productive.",
    "My brain needed to restart.",
    "I encountered an unexpected error.",
    "I was distracted by a suspiciously interesting video.(it was probably a cat video)",
    "My plans were eaten by the calendar.(I don't know what happened to them)",
    "I was waiting for my productivity subscription to renew.",
    "My brain refused the terms and conditions.",
    "I accidentally became a spectator in my own life.",
    "My task list looked at me first.",
    "I was negotiating with my motivation.",
    "My keyboard needed a moment of silence.",
    "I got caught in a procrastination loop.",
    "I was doing research. The research got out of hand.",
    "My brain was running background processes.",
    "I experienced a temporary shortage of functioning.",
    "I was distracted by the concept of being distracted.",
    "My productivity went on an unscheduled vacation.",
    "I had to investigate something completely irrelevant.",
    "My brain decided today was a weekend.",
    "I was busy overthinking a simple decision.(not sure what the decision was)",
    "My plans were technically present, just not successful.",
    "I forgot where I put my focus.(I think it was in the fridge)",
    "My attention span filed for independence.",
    "I was waiting for the motivation patch.",
    "I accidentally discovered a new rabbit hole.",
    "My brain needed maintenance.",
    "I was delayed by circumstances beyond my laziness.(not even sure what that means)",
    "My productivity encountered a critical error.(I don't know what that means either)",
    "I was busy doing important things that I cannot disclose.(not even to myself)",
    "My brain clock was set to another timezone.(at this point I don't even know what timezone it is)",
    "I got distracted by a notification from three hours ago.(im lonely, I don't even know what the notification was T_T)",
    "My schedule entered beta testing.",
    "I was waiting for my brain to finish compiling.",
    "I had a severe case of 'I'll do it later.'",
    "My motivation was temporarily out of office.",
    "I was ambushed by free time.",
    "My brain rejected the assignment.(just kidding, I don't even know what the assignment was)",
    "I accidentally pressed snooze on reality.(just kidding, I don't have a snooze button)",
    "My productivity server went down.(maybe I should call IT?)",
    "I was experiencing unexpected lore.",
    "My plans were delayed due to plot armor.",
    "Greg told me it was fine.(I don't know who Greg is but he seems to be a very important person)"
  ];

  const excuse = excuses[Math.floor(Math.random() * excuses.length)];

  await respond({
    text: `🧑‍⚖️ Greg's Official Excuse:\n> ${excuse}`
  });
});

app.command("/greg-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/greg-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/greg-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup} 

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});
app.command("/greg-8ball", async ({ ack, respond }) => {
  await ack();  

  const answers = [
    "Absolutely!",
    "Probably not.",
    "Ask me again later.",
    "I wouldn't count on it.",
    "Yes. Obviously.",
    "No. Next question.",
    "The odds are... questionable.",
    "Greg has no idea.",
    "My sources say: maybe.",
    "That's above my pay grade."
      ];

  const answer = answers[Math.floor(Math.random() * answers.length)];

   await respond({
    text: `🎱 ${answer}`
  });
});

app.command("/greg-space", async ({ ack, respond }) => {
  await ack();

  const spaceFacts = [
    "🌌 There are more stars in the observable universe than grains of sand on all of Earth's beaches.",
    "🪐 Saturn is less dense than water. Technically, it could float in a gigantic bathtub.",
    "🌑 A day on Venus is longer than its year.",
    "☀️ The Sun contains about 99.8% of the mass of our Solar System.",
    "🚀 In space, there is no air for sound to travel through. So explosions don't go BOOM.",
    "🌍 Earth is moving around the Sun at roughly 30 km/s. We're all moving and nobody even noticed.",
    "🛰️ The International Space Station travels around Earth roughly once every 90 minutes.",
    "🌕 The Moon is slowly moving away from Earth by about 3.8 cm every year.",
    "🔴 A day on Mars is only about 40 minutes longer than an Earth day.",
    "🕳️ A black hole isn't literally a cosmic vacuum cleaner. You can orbit one without immediately falling in.",
    "🌌 Light from some distant galaxies has been traveling for billions of years before reaching us.",
    "⭐ A neutron star can pack more mass than the Sun into a sphere roughly the size of a city.",
    "☄️ Comets spend most of their time extremely far from the Sun before returning on their orbits.",
    "🪐 Jupiter is so massive that it contains more than twice the mass of all the other planets combined.",
    "🌍 Earth is the only planet currently known to support life."
  ];

  const fact =
    spaceFacts[Math.floor(Math.random() * spaceFacts.length)];

  await respond({
    text:
      `🚀 *GREG SPACE™*\n\n` +
      `${fact}\n\n` +
      `🗿 *Greg's Aerospace Department has spoken.*`
  });
});

// =========================
// 🌦️ GREG WEATHER
// =========================

app.command("/greg-weather", async ({ ack, respond, command }) => {
  await ack();

  const location = command.text.trim();

  if (!location) {
    await respond({
      text: "🌦️ Greg needs a location, genius.\nTry: `/greg-weather Bahrain`"
    });
    return;
  }

  try {
    // Find the location
    const geo = await axios.get(
      "https://geocoding-api.open-meteo.com/v1/search",
      {
        params: {
          name: location,
          count: 1,
          language: "en",
          format: "json"
        }
      }
    );

    if (!geo.data.results || geo.data.results.length === 0) {
      await respond({
        text: `❌ Greg couldn't find "${location}".`
      });
      return;
    }

    const place = geo.data.results[0];

    // Get current weather
    const weather = await axios.get(
      "https://api.open-meteo.com/v1/forecast",
      {
        params: {
          latitude: place.latitude,
          longitude: place.longitude,
          current: "temperature_2m,weather_code",
          timezone: "auto"
        }
      }
    );

    const temperature = weather.data.current.temperature_2m;
    const code = weather.data.current.weather_code;

    // Convert weather code into a description
    const conditions = {
      0: "☀️ Clear sky",
      1: "🌤️ Mainly clear",
      2: "⛅ Partly cloudy",
      3: "☁️ Overcast",
      45: "🌫️ Foggy",
      48: "🌫️ Foggy",
      51: "🌦️ Light drizzle",
      53: "🌦️ Drizzle",
      55: "🌧️ Heavy drizzle",
      61: "🌧️ Light rain",
      63: "🌧️ Rain",
      65: "🌧️ Heavy rain",
      71: "🌨️ Light snow",
      73: "🌨️ Snow",
      75: "❄️ Heavy snow",
      80: "🌦️ Rain showers",
      81: "🌧️ Rain showers",
      82: "⛈️ Heavy rain showers",
      95: "⛈️ Thunderstorm",
      96: "⛈️ Thunderstorm with hail",
      99: "⛈️ Thunderstorm with hail"
    };

    const condition =
      conditions[code] ||
      "🌍 Greg has no idea what the sky is doing.";

    // =========================
    // 🗿 GREG'S WEATHER BRAIN
    // =========================

    let gregComment;

    // Temperature reactions
    if (temperature >= 40) {
      gregComment = "🔥 This isn't weather. This is a boss fight.";
    } else if (temperature >= 35) {
      gregComment = "🥵 The sun has chosen violence.";
    } else if (temperature >= 30) {
      gregComment = "☀️ Hydration is no longer optional.";
    } else if (temperature >= 20) {
      gregComment = "😎 Greg approves of this weather.";
    } else if (temperature >= 10) {
      gregComment = "🧥 Greg says: acquire jacket.";
    } else {
      gregComment = "🥶 Greg has legally declared this too cold.";
    }

    // Weather-specific reactions
    if (code >= 95) {
      gregComment = "⛈️ Zeus appears to be having a bad day.";
    } else if (code >= 80) {
      gregComment = "🌧️ The sky is throwing water at everyone.";
    } else if (code >= 51 && code <= 65) {
      gregComment = "🌧️ The sky appears to have emotional problems.";
    } else if (code === 45 || code === 48) {
      gregComment = "🌫️ Visibility: Greg has no idea.";
    } else if (code === 0 && temperature >= 35) {
      gregComment = "🔥 The giant nuclear fusion reactor is doing overtime.";
    }

    await respond({
      text:
        `🌦️ *GREG WEATHER™*\n\n` +
        `📍 ${place.name}, ${place.country}\n` +
        `🌡️ ${temperature}°C\n` +
        `${condition}\n\n` +
        `🗿 *Greg says:* ${gregComment}`
    });

  } catch (err) {
    console.error(err);

    await respond({
      text: "💀 Greg's Weather Department has collapsed."
    });
  }
});

app.command("/greg-roll", async ({ ack, respond, command }) => {
  await ack();

  const result = Math.floor(Math.random() * 6) + 1;

  const reactions = {
    1: "💀 Greg rolled a 1. That's rough.",
    2: "😐 Greg rolled a 2. Could've been worse.",
    3: "🗿 Greg rolled a 3. Perfectly average.",
    4: "😎 Greg rolled a 4. Not bad.",
    5: "🔥 Greg rolled a 5. NICE.",
    6: "🏆 GREG ROLLED A 6!!! ABSOLUTE CINEMA."
  };

  await respond({
    text:
      `🎲 *GREG'S DICE ROLLER*\n\n` +
      `You rolled: *${result}*\n` +
      `${reactions[result]}`
  });
});

app.command("/greg-flip", async ({ ack, respond, command }) => {
  await ack();

  const stats = getUserStats(command.user_id);

  stats.flips++;

  const result =
    Math.random() < 0.5
      ? "HEADS 🪙"
      : "TAILS 🪙";

  await respond({
    text: `GREG flipped a coin...\n*${result}*`
  });
});

// =========================
// 🏆 GREG ACHIEVEMENTS COMMAND
// =========================

app.command("/greg-achievements", async ({ ack, respond, command }) => {
  await ack();

  const stats = getUserStats(command.user_id);

  const unlocked = [];

  if (stats.flips >= 10) {
    unlocked.push("🪙 *Coin Collector* — Flipped 10 coins");
  }

  if (stats.rpsWins >= 5) {
    unlocked.push("🎮 *Greg Destroyer* — Beat Greg 5 times");
  }

  if (stats.fortunes >= 10) {
    unlocked.push("🔮 *Chosen One* — Received 10 fortunes");
  }

  if (stats.catfacts >= 10) {
    unlocked.push("🐱 *Cat Scholar* — Collected 10 cat facts");
  }

  if (stats.space >= 10) {
    unlocked.push("🚀 *Space Cadet* — Discovered 10 space facts");
  }

  if (stats.weather >= 10) {
    unlocked.push("🌦️ *Atmospheric Analyst* — Checked 10 forecasts");
  }

  if (unlocked.length === 0) {
    unlocked.push("🗿 No achievements yet. Greg is disappointed.");
  }

  await respond({
    text:
      `🏆 *GREG ACHIEVEMENTS™*\n\n` +
      unlocked.join("\n")
  });
});

app.command("/greg-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/greg-ping - Check the bots latency
/greg-flip - Flips a coin
/greg-rps - Plays rock-paper-scissors with you <3
/greg-excuses - Get a random excuse but makes it sound official(maybe not)
/greg-catfact - Get a cat fact(s)
/greg-joke - Get a random joke(s)
/greg-8ball - Ask the magic 8-ball a question (greg decides your fate)
/greg-space - Get a random space fact(s)
/greg-weather [location] - Get the current weather for a location 
/greg-fortune - Get a random fortune from greg(greg is a psychic)
/greg-achievements - Check your achievements(*drumroll* tropies against greg)
/greg-roll - rolls a six-sided die
/greg-help - Show this help message(idk why you would need it but ok)`
  });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();