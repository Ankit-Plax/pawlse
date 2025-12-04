document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  // Demo dashboard logic
  const modeButtons = document.querySelectorAll(".mode-btn");
  const modeLabel = document.getElementById("mode-label");
  const tempValue = document.getElementById("temp-value");
  const tempHint = document.getElementById("temp-hint");
  const hrValue = document.getElementById("hr-value");
  const hrHint = document.getElementById("hr-hint");
  const actValue = document.getElementById("act-value");
  const actHint = document.getElementById("act-hint");
  const trendList = document.getElementById("trend-list");
  const timeline = document.getElementById("timeline");
  const alerts = document.getElementById("demo-alerts");

  const scenarios = {
    park: {
      label: "Park day",
      temp: "38.1°C",
      tempHint: "Warm from running, still safe.",
      hr: "↑ active",
      hrHint: "Strong spikes, smooth cool-down.",
      act: "High",
      actHint: "Lots of zoomies, great enrichment.",
      trends: [
        "Temp: Slightly above average after play, returns to baseline within 20 minutes.",
        "Heart trend: Clear peaks during ball chasing, no irregular jitter.",
        "Rest: Short recovery nap, then back to playful baseline."
      ],
      timeline: [
        "09:05 · Sniff walk to the park.",
        "09:40 · Ball time, strong activity spike.",
        "10:10 · Water break in shade.",
        "10:45 · Car ride home, rest markers rising."
      ],
      alerts: [
        {
          type: "warn",
          badge: "Heat",
          text: "Short warm-up alert after intense play. Suggest water + shade, not emergency."
        },
        {
          type: "info",
          badge: "Recovery",
          text: "Markers back to baseline in under 30 minutes."
        }
      ]
    },
    lazy: {
      label: "Lazy Sunday",
      temp: "37.4°C",
      tempHint: "Comfortable, no spikes.",
      hr: "steady",
      hrHint: "Gentle variation, mostly rest.",
      act: "Low",
      actHint: "Lots of naps, a few short bursts.",
      trends: [
        "Temp: Stable all day, tiny dip in the early morning.",
        "Heart trend: Mostly calm with soft rises around meals.",
        "Rest: Long, high-quality naps with normal movement."
      ],
      timeline: [
        "08:30 · Slow stretch, lazy breakfast.",
        "11:00 · Sunbathing near the window.",
        "14:20 · Short toy session, modest activity bump.",
        "19:45 · Couch cuddle, deep rest markers."
      ],
      alerts: [
        {
          type: "info",
          badge: "Chill",
          text: "Low-activity day flagged as “lazy day”. Not a concern by itself."
        }
      ]
    },
    storm: {
      label: "Storm stress",
      temp: "37.9°C",
      tempHint: "Normal, but paired with restlessness.",
      hr: "↑ jittery",
      hrHint: "Frequent small spikes from noise anxiety.",
      act: "Restless",
      actHint: "Pacing and startle movements logged.",
      trends: [
        "Temp: Mostly normal, stress showing more in movement than warmth.",
        "Heart trend: Repeated small spikes around thunder sounds.",
        "Rest: Fragmented sleep with frequent wake-ups."
      ],
      timeline: [
        "18:05 · First thunder, startle + pacing.",
        "18:20 · Hiding behaviour, jittery movement.",
        "19:10 · Calming routine (chew toy + music).",
        "20:00 · Heart and activity slowly settling."
      ],
      alerts: [
        {
          type: "warn",
          badge: "Stress",
          text: "Noise-related stress pattern detected. Suggest comfort routine, not emergency."
        },
        {
          type: "info",
          badge: "Follow-up",
          text: "If this pattern repeats often, consider vet or trainer advice."
        }
      ]
    }
  };

  function renderScenario(key) {
    if (!modeLabel || !tempValue) return;
    const s = scenarios[key];
    if (!s) return;
    modeLabel.textContent = s.label;
    tempValue.textContent = s.temp;
    tempHint.textContent = s.tempHint;
    hrValue.textContent = s.hr;
    hrHint.textContent = s.hrHint;
    actValue.textContent = s.act;
    actHint.textContent = s.actHint;

    trendList.innerHTML = "";
    s.trends.forEach(t => {
      const li = document.createElement("li");
      li.textContent = t;
      trendList.appendChild(li);
    });

    timeline.innerHTML = "";
    s.timeline.forEach(t => {
      const li = document.createElement("li");
      li.textContent = t;
      timeline.appendChild(li);
    });

    alerts.innerHTML = "";
    s.alerts.forEach(a => {
      const div = document.createElement("div");
      div.className = "demo-alert " + (a.type === "warn" ? "warn" : "info");
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = a.badge;
      div.appendChild(badge);
      const text = document.createTextNode(" " + a.text);
      div.appendChild(text);
      alerts.appendChild(div);
    });

    modeButtons.forEach(btn => {
      if (btn.dataset.mode === key) {
        btn.classList.add("primary");
        btn.classList.remove("ghost");
      } else {
        btn.classList.remove("primary");
        btn.classList.add("ghost");
      }
    });
  }

  if (modeButtons.length) {
    modeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const mode = btn.dataset.mode;
        renderScenario(mode);
      });
    });
    renderScenario("park");
  }

  // Light control logic
  const lightPreview = document.getElementById("light-preview");
  const colorButtons = document.querySelectorAll(".pill-btn.color");
  const lightModeButtons = document.querySelectorAll(".pill-btn.mode");
  const brightnessSlider = document.getElementById("brightness-slider");
  const brightnessValue = document.getElementById("brightness-value");
  const testLightBtn = document.getElementById("test-light");

  const colorMap = {
    amber: { bg: "var(--amber)", glow: "rgba(251, 175, 64, 0.9)" },
    coral: { bg: "var(--coral)", glow: "rgba(243, 111, 59, 0.9)" },
    teal: { bg: "var(--teal)", glow: "rgba(156, 196, 188, 0.9)" },
    green: { bg: "#6CCB5F", glow: "rgba(108, 203, 95, 0.9)" }
  };

  let currentColor = "amber";
  let currentMode = "solid";

  function updateLight() {
    if (!lightPreview) return;
    const c = colorMap[currentColor];
    const brightness = brightnessSlider ? brightnessSlider.value : 80;
    const glowSize = (brightness / 100) * 24;
    lightPreview.style.background = c.bg;
    lightPreview.style.boxShadow = `0 0 ${glowSize}px ${c.glow}`;

    lightPreview.style.animation = "";
    if (currentMode === "pulse") {
      lightPreview.style.animation = "light-pulse 1.6s infinite";
    } else if (currentMode === "bounce") {
      lightPreview.style.animation = "float-slow 2.2s ease-in-out infinite";
    } else {
      lightPreview.style.animation = "none";
    }
  }

  if (colorButtons.length && lightPreview) {
    colorButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        colorButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentColor = btn.dataset.color;
        updateLight();
      });
    });
    // set default
    colorButtons[0].classList.add("active");
  }

  if (lightModeButtons.length && lightPreview) {
    lightModeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        lightModeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentMode = btn.dataset.lightmode;
        updateLight();
      });
    });
  }

  if (brightnessSlider && brightnessValue) {
    brightnessSlider.addEventListener("input", () => {
      brightnessValue.textContent = brightnessSlider.value + "%";
      updateLight();
    });
  }

  if (testLightBtn && lightPreview) {
    testLightBtn.addEventListener("click", () => {
      lightPreview.style.transform = "scale(1.1) translateY(-3px)";
      setTimeout(() => {
        lightPreview.style.transform = "";
      }, 160);
    });
  }

  if (lightPreview) {
    updateLight();
  }
});
