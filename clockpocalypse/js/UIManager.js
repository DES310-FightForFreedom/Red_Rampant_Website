const mySounds = new sound_effects();
let modernChallenge;

let holdTimer = null;
const HOLD_DURATION = 1500; // Time in milliseconds (1.5 seconds)
let isHoldTrigger = false;
let triviaCountry;
let triviaCounter = 0;
let noise = new sound_effects();

// Track which event card is currently playing sound
let activePlayingEventId = null;

import { difficultyFlags } from "./DifficultySettings.js";
import { scenarios } from "./scenario.js";
import { isScenarioCompleted, isCountryCompleted, isScenarioTierCompleted } from "./ProgressTracker.js";
import { currentScenario, GameManager, scenarioChallenges } from "./GameManager.js";
import { sound_effects, stopActiveSirenAudio, refreshSoundEffectsInstance } from "./sound_effects.js";
import { userScenario } from "./GameManager.js";
import { Events, getActiveEvents } from "./Events.js";
import { loadSoundSettings, setSoundSetting } from "./SoundManager.js";
import { currentGameInstance } from "./GameManager.js";
import { selectCountry } from "./Main.js";
import { trivia } from "./Trivia.js";

const app = document.getElementById("app");

export function showMenu() {
    app.innerHTML = `
    <div class="menu-screen">
        <h1 id="header-text">Clockpocalypse</h1>
        <div class="menu-buttons">
            <button id="start">Start</button>
            <button id="settings">Settings</button>
            <button id="tutorial">Tutorial</button>
        </div>
    </div>
    `;

    document.getElementById("start").onclick = () => { showScenario(); };
    document.getElementById("settings").onclick = () => { showSettings(); };
    document.getElementById("tutorial").onclick = () => { showTutorial(); };
}

export function showSettings() { app.innerHTML = '<h1>Settings</h1>'; }
export function showScenario() { app.innerHTML = '<h1>Select Clockpocalypse</h1>'; }
export function showTutorial() { app.innerHTML = '<h1>Tutorial</h1>'; }

