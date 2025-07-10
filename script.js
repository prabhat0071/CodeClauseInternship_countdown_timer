/**
 * Project Name: Countdown Timer
 * Developed by: Prabhat singh
 * Date: July 2025
 * Description: This script handles the countdown logic
 */
function addEvent() {
  const name = document.getElementById("eventName").value;
  const timeInput = document.getElementById("eventTime").value;

  if (!name || !timeInput) {
    alert("Please enter both event name and time.");
    return;
  }

  const time = new Date(timeInput).getTime();
  const eventId = `event-${Date.now()}`;
  const eventList = document.getElementById("eventList");

  const eventBox = document.createElement("div");
  eventBox.className = "eventBox";
  eventBox.id = eventId;

  eventBox.innerHTML = `
        <h3>${name}</h3>
        <div class="countdown-grid">
          <div class="box"><span id="${eventId}-days">00</span><p>Days</p></div>
          <div class="box"><span id="${eventId}-hours">00</span><p>Hours</p></div>
          <div class="box"><span id="${eventId}-minutes">00</span><p>Minutes</p></div>
          <div class="box"><span id="${eventId}-seconds">00</span><p>Seconds</p></div>
        </div>
        <p id="${eventId}-status"></p>
        <hr>
      `;

  eventList.appendChild(eventBox);
  startCountdown(eventId, time);
}

function startCountdown(id, targetTime) {
  const alarm = document.getElementById("alarmSound");
  const tick = document.getElementById("tickSound");

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const left = targetTime - now;

    if (left <= 0) {
      clearInterval(interval);
      document.getElementById(`${id}-status`).innerText = "🎉 Event Started!";
      alarm.play().catch((e) => console.log("Alarm play error:", e));
      return;
    }

    // 🔊 Play tick sound every second
    tick.currentTime = 0;
    tick.volume = 0.3; // optional: lower the tick volume
    tick.play().catch((e) => console.log("Tick play error:", e));

    const d = Math.floor(left / (1000 * 60 * 60 * 24));
    const h = Math.floor((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((left % (1000 * 60)) / 1000);

    document.getElementById(`${id}-days`).textContent = d;
    document.getElementById(`${id}-hours`).textContent = h;
    document.getElementById(`${id}-minutes`).textContent = m;
    document.getElementById(`${id}-seconds`).textContent = s;
  }, 1000);
}
