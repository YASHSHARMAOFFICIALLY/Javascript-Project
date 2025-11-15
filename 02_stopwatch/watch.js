const start = document.getElementById('start');
const stop = document.getElementById('stop');
const resetBtn = document.getElementById('Reset');

let hour = 0;
let minute = 0;
let second = 0;
let minisec = 0;
let timer = false;

start.addEventListener('click', function () {
    timer = true;
    stopwatch();
});

stop.addEventListener('click', function () {
    timer = false;
});

resetBtn.addEventListener('click', function () {
    timer = false;
    hour = 0;
    minute = 0;
    second = 0;
    minisec = 0;

    document.getElementById('hr').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
    document.getElementById('minisec').innerHTML = "00";
});


function stopwatch() {
    if (timer) {
        minisec++;

        if (minisec == 100) {
            second++;
            minisec = 0;
        }
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }


        let hrstring = hour < 10 ? "0" + hour : hour;
        let ministring = minute < 10 ? "0" + minute : minute;
        let secstring = second < 10 ? "0" + second : second;
        let minisecstring = minisec < 10 ? "0" + minisec : minisec;

        document.getElementById('hr').innerHTML = hrstring;
        document.getElementById('min').innerHTML = ministring;
        document.getElementById('sec').innerHTML = secstring;
        document.getElementById('minisec').innerHTML = minisecstring;

        setTimeout(stopwatch, 10);
    }
}
