function openFeatures() {
  var allElems = document.querySelectorAll(".elem");
  var fullElemPage = document.querySelectorAll(".fullElem");
  var fullElemPageBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemPage[elem.id].style.display = "block";

      document.querySelector(".fullElem[style*='block']")?.scrollTo(0, 0);
      window.scrollTo(0, 0);
    });
  });
  fullElemPageBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemPage[back.id].style.display = "none";
    });
  });
}
openFeatures();

// localStorage.clear();

function todoList() {
  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("empty");
  }

  function randerTask() {
    var allTask = document.querySelector(".allTask");

    let sum = "";

    currentTask.forEach(function (elem, idx) {
      sum =
        sum +
        ` <div class="task">
    <h5>${elem.task}  <span class=${elem.imp}>imp</span></h5>
    <button id=${idx}>Mark as Completed</button>
</div>`;
    });
    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        randerTask();
        // location.reload();
      });
    });
  }

  randerTask();

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });
    randerTask();

    taskCheckbox.checked = false;
    taskInput.value = "";
    taskDetailsInput.value = "";
  });
}
todoList();

function dailyPlanner() {
  var dayPlanner = document.querySelector(".day-planner");

  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  var hours = Array.from(
    { length: 20 },
    (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`,
  );

  var wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    var savedData = dayPlanData[idx] || "";

    wholeDaySum =
      wholeDaySum +
      ` <div class="day-planner-time">
                <p>${elem}</p>
                <input id=${idx} type="text" placeholder="..." value=${savedData}>
            </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  var dayPlannerInput = document.querySelectorAll(".day-planner input");
  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();

function motivationalQuote() {
  var motivationQuoteContent = document.querySelector(".motivation-2 h1");
  var motivationAuthor = document.querySelector(".motivation-3 h2");

  async function fetchQuote() {
    let response = await fetch("https://dummyjson.com/quotes/random");
    let data = await response.json();

    motivationQuoteContent.innerHTML = data.quote;
    motivationAuthor.innerHTML = data.author;
  }

  fetchQuote();
}
motivationalQuote();

function pomodoroTimer() {
  let timer = document.querySelector(".pomo-timer h1");
  var startBtn = document.querySelector(".pomo-timer .start-timer");
  var pauseBtn = document.querySelector(".pomo-timer .pause-timer");
  var resetBtn = document.querySelector(".pomo-timer .reset-timer");
  var session = document.querySelector(".Pomodoro-fullpage .session");
  var isWorkSession = true;

  let totalSeconds = 25 * 60;
  let timerInterval = null;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")}`;
  }

  function startTimer() {
    clearInterval(timerInterval);

    if (isWorkSession) {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "Take a Break";
          totalSeconds = 5 * 60;
        }
      }, 1000);
    } else {
      timerInterval = setInterval(function () {
        if (totalSeconds > 0) {
          totalSeconds--;
          updateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "Work Session";
          totalSeconds = 25 * 60;
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }
  function resetTimer() {
    totalSeconds = 25 * 60;
    clearInterval(timerInterval);
    updateTimer();
  }
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}
pomodoroTimer();

function dailyGoals() {
  let goals = JSON.parse(localStorage.getItem("Goals")) || [];

  let goalForm = document.querySelector(".goal-form");
  let goalInput = document.querySelector(".goal-input");
  let allGoals = document.querySelector(".allGoals");

  function renderGoals() {
    let clutter = "";
    goals.forEach(function (goal, index) {
      clutter += `
            <div class="goal">
                <h3>${goal}</h3>
                <button id="${index}">
                    Completed
                </button>
            </div>
            `;
    });
    allGoals.innerHTML = clutter;
    localStorage.setItem("Goals", JSON.stringify(goals));
    document.querySelectorAll(".goal button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        goals.splice(btn.id, 1);
        renderGoals();
      });
    });
  }
  renderGoals();

  goalForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (goalInput.value.trim() == "") return;
    goals.push(goalInput.value);
    goalInput.value = "";
    renderGoals();
  });
}
dailyGoals();

function weatherFunctionality() {
  var apiKey = "8ed7052f45214b61968122538261807";
  var city = "Basti";
  //api key is generated from is website www.weatherapi.com and id and pass is available in my endrajay209@gmail.com.

  var header1Time = document.querySelector(".header1 h1");
  var header1Date = document.querySelector(".header1 h2");
  var header2Temp = document.querySelector(".header2 h2");
  var header2Condition = document.querySelector(".header2 h4");
  var precipitation = document.querySelector(".header2 .precipitation");
  var humidity = document.querySelector(".header2 .humidity");
  var wind = document.querySelector(".header2 .wind");
  var weatherHeader = document.querySelector(".allElems header");

  var data = null;

  async function weatherAPICall() {
    var response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`,
    );
    data = await response.json();

    header2Temp.innerHTML = `${data.current.temp_c}°C`;
    header2Condition.innerHTML = `${data.current.condition.text}`;
    wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
    humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
    precipitation.innerHTML = `Heat Index : ${data.current.heatindex_c}%`;
  }

  weatherAPICall();

  function timeDate() {
    var date = new Date();
    var hours = date.getHours();

    if (hours >= 4 && hours < 8) {
      //5am-8am
      weatherHeader.style.backgroundImage =
        "url(https://images.unsplash.com/photo-1525951398455-075a6b58b5d8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)";
      weatherHeader.querySelectorAll("*").forEach((elem) => {
        elem.style.color = "#020000";
      });
    } else if (hours >= 8 && hours < 17) {
      //8am-5pm
      weatherHeader.style.backgroundImage =
        "url(https://images.unsplash.com/photo-1593448450897-164ce1b9a4d5?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1643639847832-91707b48c4d3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)";
      weatherHeader.querySelectorAll("*").forEach((elem) => {
        elem.style.color = "#070000";
      });
    } else if (hours >= 17 && hours < 20) {
      //5pm -6pm
      weatherHeader.style.backgroundImage =
        "url(https://images.unsplash.com/photo-1501418611786-e29f9929fe03?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)";
      weatherHeader.querySelectorAll("*").forEach((elem) => {
        elem.style.color = "#ffffff";
      });
    } else {
      weatherHeader.style.backgroundImage =
        "url(https://images.unsplash.com/photo-1508402476522-c77c2fa4479d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)";
      weatherHeader.querySelectorAll("*").forEach((elem) => {
        elem.style.color = "#fff";
      });
    }

    const totalDaysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var date = new Date();
    var dayOfWeek = totalDaysOfWeek[date.getDay()];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var tarik = date.getDate();
    var month = monthNames[date.getMonth()];
    var year = date.getFullYear();

    header1Date.innerHTML = `${tarik} ${month}, ${year}`;

    if (hours > 12) {
      header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart("2", "0")}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")} PM`;
    } else {
      header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart("2", "0")}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")} AM`;
    }
  }
  setInterval(() => {
    timeDate();
  }, 1000);
}

weatherFunctionality();


function theme(){
  
var theme = document.querySelector(".theme");
var rootElement = document.documentElement;
var flag = 0;

theme.addEventListener("click", function () {
  if (flag == 0) {
    rootElement.style.setProperty("--LightW0", "#fdfdfd"); //done
    rootElement.style.setProperty("--RED", "#eb742a"); //done
    rootElement.style.setProperty("--BLUE", "#1c7dfb"); //done

    rootElement.style.setProperty("--pre", "#d0c11d"); //done
    rootElement.style.setProperty("--pre2", "#d7e8ee"); //done
    rootElement.style.setProperty("--pre3", "#151518"); //done

    rootElement.style.setProperty("--sec", "#2e2c2c"); //done
    rootElement.style.setProperty("--sec2", "#0a0a0e"); //done

    rootElement.style.setProperty("--tri1", "#0c0303"); //done
    rootElement.style.setProperty("--tri2", "#050000"); //done
    rootElement.style.setProperty("--tri", "#030000"); //done

    rootElement.style.setProperty("--dark", "#eef3f5"); //done
    rootElement.style.setProperty("--dark1", "#000000"); //done
    rootElement.style.setProperty("--dark2", "#938e8e"); //done
    rootElement.style.setProperty("--dark3", "#666363"); //done

    rootElement.style.setProperty("--light0", "#2e2c2c"); //done
    rootElement.style.setProperty("--light1", "#3c3a3a"); //done
    rootElement.style.setProperty("--light2", "#000000"); //done
    rootElement.style.setProperty("--light3", "#090000"); //done

    rootElement.style.setProperty("--additional0", "#fcf9f9"); //done
    rootElement.style.setProperty("--MAIN", "#445050"); //done
    rootElement.style.setProperty("--PomoBTNC", "#000000"); //done
    flag = 1;
  } else if (flag == 1) {
    rootElement.style.setProperty("--LightW0", "rgb(237, 237, 237)");
    rootElement.style.setProperty("--RED", "red");
    rootElement.style.setProperty("--BLUE", "gb(137, 153, 225)");

    rootElement.style.setProperty("--pre", "#dab212");
    rootElement.style.setProperty("--pre2", "#e5cb90");
    rootElement.style.setProperty("--pre3", "#f0f0f0");

    rootElement.style.setProperty("--sec", "#b4e1eb");
    rootElement.style.setProperty("--sec2", "#34a99d");

    rootElement.style.setProperty("--tri1", "#95bdd7");
    rootElement.style.setProperty("--tri2", "#78a4cb");
    rootElement.style.setProperty("--tri", "#458393");

    rootElement.style.setProperty("--dark", "#01150e");
    rootElement.style.setProperty("--dark1", "#0b745f");
    rootElement.style.setProperty("--dark2", "#08a182");
    rootElement.style.setProperty("--dark3", "#558467");

    rootElement.style.setProperty("--light0", "#ffbe91");
    rootElement.style.setProperty("--light1", "#ffddb0");
    rootElement.style.setProperty("--light2", "#fffce1");
    rootElement.style.setProperty("--light3", "#48484A");

    rootElement.style.setProperty("--additional0", "cornsilk");
    rootElement.style.setProperty("--MAIN", " rgb(216, 241, 239)");
    rootElement.style.setProperty("--PomoBTNC", " rgb(0, 1, 1)");

    flag = 0;
  }
});
}
theme();
//2:17:30
//3:19:25
//3:50:00
//4:35 rewatch and complete

//===============================
