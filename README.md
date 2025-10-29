# Pokémon Team Analyzer

Pokémon Team Analyzer is a single-page web app that evaluates teams of two to six Pokémon, highlighting strengths, weaknesses, and squad synergy with a polished Trading Card Game-inspired presentation.

## Screenshot

![Pokémon Team Analyzer screenshot placeholder](docs/screenshot-placeholder.png)

> Replace `docs/screenshot-placeholder.png` with a landscape capture of the analyzer in action.

## Features

- Submit up to six Pokémon and receive overall scoring, grade, and narrative analysis.
- Animated lineup preview with dynamic team cards styled after the Pokémon TCG.
- Type coverage insights, stat breakdowns, and highlight callouts for clutch performers.
- Webhook-powered analysis pipeline ready for n8n or other automation backends.

## Getting Started

1. Clone the repository and switch into the project folder.
2. Copy `env.example.js` to `env.js`, then update `WEBHOOK_URL` with your analyzer webhook endpoint.
3. Launch a local server:
   - `python3 -m http.server 5173`
   - or `npx http-server .`
4. Visit `http://localhost:5173` in your browser and enable clipboard access if prompted.
5. Enter 2–6 Pokémon names, then click **Analyze Team** to trigger the webhook-driven analysis.

## Configuration

- Runtime configuration lives in `env.js`, which must define `window.pokemonTeamAnalyzerEnv.WEBHOOK_URL`. The repository includes `env.example.js`; copy it to `env.js` and set the value for your environment.
- Avoid committing personal or production webhook URLs. The `.gitignore` prevents `env.js` from being tracked—keep sensitive endpoints in that local file.
- If you want to load a differently named config, update the `data-env-script` attribute on the `<body>` element in `index.html` to point at the desired file before building.

## Manual Testing Checklist

- Empty submission displays a validation error.
- Submit valid teams with mixed types, mono-type rosters, and deliberately invalid names to verify scoring and error states.
- Confirm the loader, scorecard animations, and stat bars render correctly across desktop and mobile viewports.
- Inspect webhook requests in your browser dev tools and confirm responses arrive as expected.

## Tech Stack

- Static HTML powered by the Tailwind CSS CDN.
- Vanilla JavaScript for form handling, rendering helpers, and animation coordination.
- External webhook (n8n workflow by default) for team analysis logic.

## Project Structure

- `index.html` — complete application markup, styling, and scripting.
- `README.md` — project overview and onboarding guide (you are here).

Enjoy building dream Pokémon teams and fine-tuning your battle strategies!
