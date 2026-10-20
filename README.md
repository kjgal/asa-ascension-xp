# ASA Ascension XP Calculator

A responsive ARK: Survival Ascended player XP calculator, with a pixel-art landscape, animated mist, a passing wyvern, and a pulsing obelisk.

Enter a current and target level (1–245), then choose **Calculate** to see the cumulative XP difference and animated breakdown. Inputs are saved locally in your browser; **Start over** clears them. Calculations begin at the start of the current level.

## Run or host

This is a static site with no build step or dependencies. Serve the repository root with any static web server, for example `python3 -m http.server 8000`, then open http://localhost:8000. For static hosting, publish the repository root.

Current hosted preview: https://asa-ascension-xp.kaitlyn-mccaul.chatgpt.site

## Data

The embedded 245-level multiplayer XP lookup is a published community table from Wikily. It has not been independently verified against game files. Custom XP ramps and single-player settings may differ; extra levels must be unlocked in game. XP earned within the current level reduces the actual remaining amount.

## Files

- `index.html`: application, styles, cumulative XP lookup, and animation logic.
- `assets/`: artwork, mist shapes, and locally hosted Chakra Petch fonts.
- `assets/fonts/OFL.txt`: font license.

Copied from saved Sites source commit `46ff5981c52046ea9075af3b34facb873b38a410`, preserving the deployed application and assets.
