/* ---- QDRANT-LIKE MEMORY CORE ---- */
let qdrantMemory = [];

function embed(text) {
  return text.toLowerCase().split("").map(c => c.charCodeAt(0) % 10);
}

function storeMemory(text, type) {
  qdrantMemory.push({
    text,
    type,
    vector: embed(text),
    time: new Date().toISOString()
  });
}

/* ---- ANALYTICS ---- */
let analytics = { total: 0, correct: 0 };
let trendData = [];

/* ---- CAREGIVER ---- */
function saveObservation() {
  const text = document.getElementById("noteInput").value;
  if (!text) return alert("Enter observation");
  storeMemory(text, "caregiver");
  alert("Observation saved to Qdrant memory");
  document.getElementById("noteInput").value = "";
}

/* ---- QUIZ ---- */
function startQuiz() {
  const q = "Who is your daughter?";
  const a = prompt(q);
  const correct = a && a.length > 2;
  storeMemory("Quiz: " + q + " Answer: " + a, "quiz");
  updateAnalytics(correct);
}

/* ---- IMAGE MATCH ---- */
function startImageMatch() {
  const correct = confirm("Is this your home?");
  storeMemory("Image recognition attempt", "image");
  updateAnalytics(correct);
}

/* ---- FAMILY ---- */
function showFamily() {
  alert("Showing family photos (demo)");
  updateAnalytics(true);
}

/* ---- DAILY TASK ---- */
function dailyTask() {
  alert("Brush teeth reminder completed");
  updateAnalytics(true);
}

/* ---- ANALYTICS + GRAPH ---- */
function updateAnalytics(correct) {
  analytics.total++;
  if (correct) analytics.correct++;

  const score = Math.round((analytics.correct / analytics.total) * 100);
  document.getElementById("engagementScore").innerText = score + "%";

  let trend = "Stable";
  if (score > 70) trend = "Improving 🟢";
  if (score < 40) trend = "Declining 🔴";
  document.getElementById("cognitiveTrend").innerText = trend;

  trendData.push(score / 2);
  drawChart();
}

function drawChart() {
  const canvas = document.getElementById("trendChart");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(10, 100);
  trendData.forEach((v, i) => ctx.lineTo(10 + i * 30, 100 - v));
  ctx.strokeStyle = "#4f46e5";
  ctx.lineWidth = 2;
  ctx.stroke();
}

/* ---- DOCTOR REPORT ---- */
function generateReport() {
  let report = "SmritiCare – Doctor Report\n\n";
  qdrantMemory.forEach(m => {
    report += `[${m.type}] ${m.text}\n`;
  });
  alert(report);
}

/* ---- VOICE INPUT ---- */
function startVoice() {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Voice not supported");
    return;
  }
  const rec = new webkitSpeechRecognition();
  rec.lang = "en-IN";
  rec.onresult = e => {
    document.getElementById("noteInput").value =
      e.results[0][0].transcript;
  };
  rec.start();
}
