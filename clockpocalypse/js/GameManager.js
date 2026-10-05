import { TimerSettings } from "./TimerSettings.js";
import { Events } from "./Events.js";
import {
    showScenario, showEvents, showGameScreen, addCompletedMiniChallenge,
    resetMiniChallenges
} from "./UIManager.js";
import { SoundManager } from "./SoundManager.js";
import { sound_effects } from "./sound_effects.js";
import { markCompleted } from "./ProgressTracker.js";

import { stopGlobalAudio } from "./UIManager.js";

export let userScenario = null;
export let currentChallenge;
export let scenarioChallenges;
export let currentScenario;
export let currentGameInstance = null;

function explodeTimer(onFail) {
    const timerDisplay = document.getElementById("timer");

    if (!timerDisplay) {
        if (onFail) onFail();
        return;
    }

    const text = timerDisplay.textContent.trim();
    timerDisplay.innerHTML = "";

    const letterSpans = text.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.classList.add("char");
        timerDisplay.appendChild(span);
        return span;
    });

    letterSpans.forEach((span) => {
        const x = (Math.random() - 0.5) * 250 + "px";
        const y = (Math.random() - 0.5) * 250 + "px";
        const rotate = (Math.random() - 0.5) * 540 + "deg";
        const scale = 1.2 + Math.random() * 0.8;

        span.style.setProperty("--x", x);
        span.style.setProperty("--y", y);
        span.style.setProperty("--rotate", rotate);
        span.style.setProperty("--scale", scale);

        void span.offsetWidth;
        span.classList.add("explode-letter");
    });

    setTimeout(() => {
        if (onFail) onFail();
    }, 450);
}

function rainTimer(onComplete) {
    const timerDisplay = document.getElementById("timer");

    if (!timerDisplay) {
        if (onComplete) onComplete();
        return;
    }

    const text = timerDisplay.textContent.trim();
    timerDisplay.innerHTML = "";

    const letterSpans = text.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.classList.add("char");
        timerDisplay.appendChild(span);
        return span;
    });

    letterSpans.forEach((span) => {
        const x = (Math.random() - 0.5) * 550 + "px";
        const y = (Math.random() - 0.01) * 1900 + "px";
        const rotate = (Math.random() - 0.5) * 340 + "deg";
        const scale = 1.2 + Math.random() * 0.8;

        span.style.setProperty("--x", x);
        span.style.setProperty("--y", y);
        span.style.setProperty("--rotate", rotate);
        span.style.setProperty("--scale", scale);

        void span.offsetWidth;
        span.classList.add("rain-letter");
    });

    setTimeout(() => {
        if (onComplete) onComplete();
    }, 450);
}

function typeWriterEffect(elementId, text, speed = 80) {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.textContent = "";
    let index = 0;

    function typeNextChar() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(typeNextChar, speed);
        }
    }

    typeNextChar();
}

export class GameManager {

    constructor(
        scenario,
        difficulty,
        country,
        scenarioKey
    ) {

        this.scenario = scenario
        this.difficulty = difficulty
        this.country = country
        this.sound = new SoundManager();
        this.noise = new sound_effects();
        this.siren = null
        this.gameOver = false
        this.events = new Events(scenario.events);
        scenarioChallenges = this.events.pool;
        this.spawnTimer = null;
        this.scenarioKey = scenarioKey;

        currentChallenge = null;
        currentScenario = this.scenario;
        currentGameInstance = this;
        window.debugGame = this;

        userScenario = this.scenario.name

        this.timer = new TimerSettings(
            difficulty.startTime,
            this.sound,
            (time) => {
                const timerDisplay = document.getElementById("timer");

                if (!timerDisplay) {
                    return;
                }
                timerDisplay.classList.remove(
                    "timer-tick",
                    "timer-warning",
                    "timer-critical"
                );
                void timerDisplay.offsetWidth;

                if (time <= 10) {
                    timerDisplay.classList.add(
                        "timer-critical"
                    );
                }
                else if (time <= 30) {
                    timerDisplay.classList.add(
                        "timer-warning"
                    );
                }
                else {
                    timerDisplay.classList.add(
                        "timer-tick"
                    );
                }
            });

    }

    start() {
        console.log(
            "Begin the Clockpocalypse",
            this.scenario.name
        );

        resetMiniChallenges();

        showGameScreen(() => { /* placeholder */ });
    }
}
