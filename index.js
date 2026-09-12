require("dotenv").config();

const axios = require("axios");
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

// User statistics are kept in memory while the bot is running.
// Restarting the bot resets these values.
const userStats = {};

const COMMANDS = {
  fortune: "/greg-fortune",
  rps: "/greg-rps",
  excuses: "/greg-excuses",
  ping: "/greg-ping",
  catFact: "/greg-catfact",
  joke: "/greg-joke",
  eightBall: "/greg-8ball",
  space: "/greg-space",
  weather: "/greg-weather",
  roll: "/greg-roll",
  flip: "/greg-flip",
  achievements: "/greg-achievements",
  help: "/greg-help"
};

const RPS_CHOICES = ["rock", "paper", "scissors"];

const RPS_EMOJI = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️"
};


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

const excuses = [
  "My Wi-Fi developed a personal vendetta against me.",
  "My brain is still loading.",
  "I was distracted by a very important thought that I immediately forgot.",
  "My alarm clock and I are no longer on speaking terms.",
  "I accidentally entered sleep mode.",
  "My computer needed emotional support.",
  "I was waiting for inspiration. It never showed up.",
  "My internet connection chose violence.",
  "I had technical difficulties with reality.",
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
  "My mouse stopped believing in me. (I don't know why either.)",
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
  "I was distracted by a suspiciously interesting video. (It was probably a cat video.)",
  "My plans were eaten by the calendar. (I don't know what happened to them.)",
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
  "I was busy overthinking a simple decision. (Not sure what the decision was.)",
  "My plans were technically present, just not successful.",
  "I forgot where I put my focus. (I think it was in the fridge.)",
  "My attention span filed for independence.",
  "I was waiting for the motivation patch.",
  "I accidentally discovered a new rabbit hole.",
  "My brain needed maintenance.",
  "I was delayed by circumstances beyond my laziness. (Not even sure what that means.)",
  "My productivity encountered a critical error. (I don't know what that means either.)",
  "I was busy doing important things that I cannot disclose. (Not even to myself.)",
  "My brain clock was set to another timezone. (At this point I don't even know what timezone it is.)",
  "I got distracted by a notification from three hours ago. (I'm lonely, I don't even know what the notification was. T_T)",
  "My schedule entered beta testing.",
  "I was waiting for my brain to finish compiling.",
  "I had a severe case of 'I'll do it later.'",
  "My motivation was temporarily out of office.",
  "I was ambushed by free time.",
  "My brain rejected the assignment. (Just kidding, I don't even know what the assignment was.)",
  "I accidentally pressed snooze on reality. (Just kidding, I don't have a snooze button.)",
  "My productivity server went down. (Maybe I should call IT?)",
  "I was experiencing unexpected lore.",
  "My plans were delayed due to plot armor.",
  "Greg told me it was fine. (I don't know who Greg is, but he seems to be a very important person.)"
];

const eightBallAnswers = [
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

const weatherDescriptions = {
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

const achievementRules = [
  {
    stat: "flips",
    required: 10,
    message: "🪙 *Coin Collector* — Flipped 10 coins"
  },
  {
    stat: "rpsWins",
    required: 5,
    message: "🎮 *Greg Destroyer* — Beat Greg 5 times"
  },
  {
    stat: "fortunes",
    required: 10,
    message: "🔮 *Chosen One* — Received 10 fortunes"
  },
  {
    stat: "catfacts",
    required: 10,
    message: "🐱 *Cat Scholar* — Collected 10 cat facts"
  },
  {
    stat: "jokes",
    required: 10,
    message: "😂 *Comedy Researcher* — Collected 10 jokes"
  },
  {
    stat: "excuses",
    required: 10,
    message: "🧑‍⚖️ *Professional Excuse Maker* — Generated 10 excuses"
  },
  {
    stat: "space",
    required: 10,
    message: "🚀 *Space Cadet* — Discovered 10 space facts"
  },
  {
    stat: "weather",
    required: 10,
    message: "🌦️ *Atmospheric Analyst* — Checked 10 forecasts"
  }
];


function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getUserStats(userId) {
  if (!userStats[userId]) {
    userStats[userId] = {
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

  return userStats[userId];
}

function incrementStat(userId, statName) {
  const stats = getUserStats(userId);

  if (Object.prototype.hasOwnProperty.call(stats, statName)) {
    stats[statName]++;
  }
}

function getGregWeatherComment(temperature, weatherCode) {
  if (weatherCode >= 95) {
    return "⛈️ Zeus appears to be having a bad day.";
  }

  if (weatherCode >= 80) {
    return "🌧️ The sky is throwing water at everyone.";
  }

  if (weatherCode >= 51 && weatherCode <= 65) {
    return "🌧️ The sky appears to have emotional problems.";
  }

  if (weatherCode === 45 || weatherCode === 48) {
    return "🌫️ Visibility: Greg has no idea.";
  }

  if (weatherCode === 0 && temperature >= 35) {
    return "🔥 The giant nuclear fusion reactor is doing overtime.";
  }

  if (temperature >= 40) {
    return "🔥 This isn't weather. This is a boss fight.";
  }

  if (temperature >= 35) {
    return "🥵 The sun has chosen violence.";
  }

  if (temperature >= 30) {
    return "☀️ Hydration is no longer optional.";
  }

  if (temperature >= 20) {
    return "😎 Greg approves of this weather.";
  }

  if (temperature >= 10) {
    return "🧥 Greg says: acquire jacket.";
  }

  return "🥶 Greg has legally declared this too cold.";
}

function getRpsResult(playerChoice, gregChoice) {
  if (playerChoice === gregChoice) {
    return {
      won: false,
      text: "🤝 It's a draw!"
    };
  }

  const playerWins =
    (playerChoice === "rock" && gregChoice === "scissors") ||
    (playerChoice === "paper" && gregChoice === "rock") ||
    (playerChoice === "scissors" && gregChoice === "paper");

  if (playerWins) {
    return {
      won: true,
      text: "🏆 YOU WIN! Greg has been defeated!"
    };
  }

  return {
    won: false,
    text: "💀 GREG WINS. Skill issue."
  };
}


function buildRpsMessage() {
  return {
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
        elements: RPS_CHOICES.map((choice) => ({
          type: "button",
          text: {
            type: "plain_text",
            text: `${RPS_EMOJI[choice]} ${choice[0].toUpperCase()}${choice.slice(1)}`
          },
          action_id: `rps_${choice}`,
          value: choice
        }))
      }
    ]
  };
}

function buildHelpMessage() {
  return `*Available Commands*

${COMMANDS.ping} - Check the bot's latency
${COMMANDS.flip} - Flip a coin
${COMMANDS.rps} - Play rock-paper-scissors with Greg
${COMMANDS.excuses} - Get an official-sounding excuse
${COMMANDS.catFact} - Get a random cat fact
${COMMANDS.joke} - Get a random joke
${COMMANDS.eightBall} - Ask the magic 8-ball
${COMMANDS.space} - Get a random space fact
${COMMANDS.weather} [location] - Get the current weather
${COMMANDS.fortune} - Get a random fortune
${COMMANDS.achievements} - Check your Greg achievements
${COMMANDS.roll} - Roll a six-sided die
${COMMANDS.help} - Show this help message`;
}


app.command(COMMANDS.fortune, async ({ ack, respond, command }) => {
  await ack();

  incrementStat(command.user_id, "fortunes");

  const fortune = randomItem(fortunes);

  await respond({
    text: `🔮 Greg's Fortune:\n> ${fortune}`
  });
});

app.command(COMMANDS.rps, async ({ ack, respond }) => {
  await ack();
  await respond(buildRpsMessage());
});

app.action(/^rps_(rock|paper|scissors)$/, async ({ ack, respond, action, body }) => {
  await ack();

  const playerChoice = action.value;
  const gregChoice = randomItem(RPS_CHOICES);
  const result = getRpsResult(playerChoice, gregChoice);

  if (result.won) {
    incrementStat(body.user.id, "rpsWins");
  }

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
            `You chose: ${RPS_EMOJI[playerChoice]} *${playerChoice}*\n` +
            `Greg chose: ${RPS_EMOJI[gregChoice]} *${gregChoice}*\n\n` +
            `*${result.text}*`
        }
      }
    ]
  });
});

app.command(COMMANDS.excuses, async ({ ack, respond, command }) => {
  await ack();

  incrementStat(command.user_id, "excuses");

  const excuse = randomItem(excuses);

  await respond({
    text: `🧑‍⚖️ Greg's Official Excuse:\n> ${excuse}`
  });
});

app.command(COMMANDS.eightBall, async ({ ack, respond }) => {
  await ack();

  const answer = randomItem(eightBallAnswers);

  await respond({
    text: `🎱 ${answer}`
  });
});

app.command(COMMANDS.space, async ({ ack, respond, command }) => {
  await ack();

  incrementStat(command.user_id, "space");

  const fact = randomItem(spaceFacts);

  await respond({
    text:
      `🚀 *GREG SPACE™*\n\n` +
      `${fact}\n\n` +
      `🗿 *Greg's Aerospace Department has spoken.*`
  });
});

app.command(COMMANDS.roll, async ({ ack, respond }) => {
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

app.command(COMMANDS.flip, async ({ ack, respond, command }) => {
  await ack();

  incrementStat(command.user_id, "flips");

  const result = Math.random() < 0.5 ? "HEADS 🪙" : "TAILS 🪙";

  await respond({
    text: `GREG flipped a coin...\n*${result}*`
  });
});

// --------------------------------------------------
// API commands
// --------------------------------------------------

app.command(COMMANDS.catFact, async ({ ack, respond, command }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");

    incrementStat(command.user_id, "catfacts");

    await respond({
      text: `🐱 *Cat Fact*\n${response.data.fact}`
    });
  } catch (error) {
    console.error("Cat fact request failed:", error.message);

    await respond({
      text: "🐱 Greg couldn't reach the cat department."
    });
  }
});

app.command(COMMANDS.joke, async ({ ack, respond, command }) => {
  await ack();

  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke"
    );

    incrementStat(command.user_id, "jokes");

    await respond({
      text:
        `😂 *Greg's Joke*\n\n` +
        `${response.data.setup}\n\n` +
        `${response.data.punchline}`
    });
  } catch (error) {
    console.error("Joke request failed:", error.message);

    await respond({
      text: "😂 Greg's comedy department is currently unavailable."
    });
  }
});

async function getWeather(location) {
  const geoResponse = await axios.get(
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

  if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
    return null;
  }

  const place = geoResponse.data.results[0];

  const weatherResponse = await axios.get(
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

  return {
    place,
    temperature: weatherResponse.data.current.temperature_2m,
    weatherCode: weatherResponse.data.current.weather_code
  };
}

app.command(COMMANDS.weather, async ({ ack, respond, command }) => {
  await ack();

  const location = command.text.trim();

  if (!location) {
    await respond({
      text: `🌦️ Greg needs a location, genius.\nTry: \`${COMMANDS.weather} Bahrain\``
    });
    return;
  }

  try {
    const weather = await getWeather(location);

    if (!weather) {
      await respond({
        text: `❌ Greg couldn't find "${location}".`
      });
      return;
    }

    incrementStat(command.user_id, "weather");

    const { place, temperature, weatherCode } = weather;

    const condition =
      weatherDescriptions[weatherCode] ||
      "🌍 Greg has no idea what the sky is doing.";

    const comment = getGregWeatherComment(
      temperature,
      weatherCode
    );

    await respond({
      text:
        `🌦️ *GREG WEATHER™*\n\n` +
        `📍 ${place.name}, ${place.country}\n` +
        `🌡️ ${temperature}°C\n` +
        `${condition}\n\n` +
        `🗿 *Greg says:* ${comment}`
    });
  } catch (error) {
    console.error("Weather request failed:", error.message);

    await respond({
      text: "💀 Greg's Weather Department has collapsed."
    });
  }
});

app.command(COMMANDS.achievements, async ({ ack, respond, command }) => {
  await ack();

  const stats = getUserStats(command.user_id);

  const unlocked = achievementRules
    .filter((achievement) => {
      return stats[achievement.stat] >= achievement.required;
    })
    .map((achievement) => achievement.message);

  if (unlocked.length === 0) {
    unlocked.push(
      "🗿 No achievements yet. Greg is disappointed."
    );
  }

  await respond({
    text:
      `🏆 *GREG ACHIEVEMENTS™*\n\n` +
      unlocked.join("\n")
  });
});

app.command(COMMANDS.ping, async ({ ack, respond }) => {
  const start = Date.now();

  await ack();

  const latency = Date.now() - start;

  await respond({
    text: `🏓 Pong!\nLatency: ${latency}ms`
  });
});

app.command(COMMANDS.help, async ({ ack, respond }) => {
  await ack();

  await respond({
    text: buildHelpMessage()
  });
});


async function startBot() {
  try {
    await app.start();
    console.log("Greg bot is running.");
  } catch (error) {
    console.error("Failed to start Greg bot:", error);
    process.exit(1);
  }
}

startBot();