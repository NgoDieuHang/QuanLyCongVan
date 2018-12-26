/*
 * Xử lý các sự kiện trên trang DASHBOARD
 * Author       :   TRAMHDT - 07/07/2018 - create  
 * Package      :   admin/dasboard
 * Copyright    :   ĐHBKĐN
 * Version      :   1.0.0
 */
// Thông tin để vẽ đồng hồ
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;

$(document).ready(function () {
    init();
    initEvent();
});
/*
 * init
 * Author       :   TRAMHDT - 07/07/2018 - create
 * Param        :
 * Output       :
 */
function init() {
    try {
        // Khởi tạo thời tiết
        getWeather();
        // Vẽ đồng hồ
        ctx.translate(radius, radius);
        radius = radius * 0.90;
        setInterval(drawClock, 1000);
    }
    catch (e) {
        JMessage(0, function (r) { }, '<b>init: </b> ' + e.message, 4);
    }
}
/*
 * initEvent
 * Author       :   TRAMHDT - 07/07/2018 - create
 * Param        :
 * Output       :
 */
function initEvent() {
    try {
       
    }
    catch (e) {
        JMessage(0, function (r) { }, '<b>initEvent: </b> ' + e.message, 4);
    }
}
/*
 * Lấy dữ liệu thời tiết từ API
 * Author       :  TRAMHDT - 07/07/2018 - create
 * Param        :
 * Output       :
 */
function getWeather() {
    try {
        var lang = getLang();
        var link = "https://api.openweathermap.org/data/2.5/forecast/daily?id=1905468&lang=" +
            lang +
            "&cnt=7&units=metric&appid=7aeec999a36738dccb8046e5dd50e502";
        $.getJSON(link, function (json) {
            // Danh sách các ngày trong tuần
            if (lang === 'vi') {
                var days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
            }
            else {
                var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            }
            // List thông tin thời tiết trong 7 ngày
            var listWeather = json.list;
            // Hiển thị thời tiết cho ngày hôm nay
            var today = new Date(listWeather[0].dt * 1000);
            // Phần thông tin ngày hôm nay
            $('#temperature').html('<b>' + days[today.getDay()] + '</b>, ' + today.ddmmyyyy());
            // Set phần icon
            $('.weather-icon').html('<canvas height="75" width="75" class="dashboard-weather-icon" id="' +
                listWeather[0].weather[0].main.toLowerCase() +
                '"></canvas>');
            // Phần chi tiết của thời tiết
            $('#today-description').text(listWeather[0].weather[0].description);
            // Phần thông tin bổ sung và nhiệt độ
            if (lang === 'vi') {
                $('.curent-weather').html(
                    '<h3 class="degrees" style="display: inline-block;">' + listWeather[0].temp.day + '</h3>' +
                    '<h3 class="listweather" style="display: inline;font-size: 16px;">, Độ ẩm: ' + listWeather[0].humidity +
                    '%, Lượng mây: ' + listWeather[0].clouds +
                    '%, Tốc độ gió: ' + listWeather[0].speed +
                    'm/s</h3>'
                );
            }
            else {
                $('.curent-weather').html(
                    '<h3 class="degrees" style="display: inline-block;">' + listWeather[0].temp.day + '</h3>' +
                    '<h3 style="display: inline" class="listweather" >, Humidity: ' + listWeather[0].humidity +
                    '% Clouds: ' + listWeather[0].clouds +
                    '%, Wind speed: ' + listWeather[0].speed +
                    'm/s</h3>'
                );
            }
            // Hiển thị thời tiết 6 ngày tiếp theo
            for (var i = 1; i < 7; i++) {
                today = new Date(listWeather[i].dt * 1000);
                var col = $('.daily-weather-' + i);
                // Phần thứ ngày
                col.find('.day').text(days[today.getDay()]);
                // Phần nhiệt độ: nim-max
                col.find('.degrees').text(Math.round(listWeather[i].temp.min) + '-' + Math.round(listWeather[i].temp.max));
                // Phần icon
                col.find('.weather-icon').attr('src', 'http://openweathermap.org/img/w/' + listWeather[i].weather[0].icon + '.png');
                // Phần tốc độ gió
                col.find('.speed').html(listWeather[i].speed + ' <i>m/s</i>');
            }
            initSkycons();
        });
    }
    catch (e) {
        JMessage(0, function (r) { }, '<b>getWeather: </b> ' + e.message, 4);
    }
}
/*
 * Init hiển thị các icon thời tiết bằng canvas
 * Author       :  TRAMHDT - 07/07/2018 - create
 * Param        :
 * Output       :
 */
function initSkycons() {
    try {
        if (typeof (Skycons) === 'undefined') { return; }
        var icons = new Skycons({
                "color": "#73879C"
            }),
            list = [
                "clear-day", "clear-night", "partly-cloudy-day", "clouds", "clear",
                "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
                "fog", "partly-cloudy", "partly-clouds",
            ],
            i;
        for (i = list.length; i--;)	icons.set(list[i], list[i]);
        icons.play();
    }
    catch (e) {
        JMessage(0, function (r) { }, '<b>initSkycons: </b> ' + e.message, 4);
    }
}
/*
 * Vẽ đồng hồ
 * Author       :   TRAMHDT - 07/07/2018 - create
 * Param        :
 * Output       :
 */
function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}
/*
 * Vẽ mặt đồng hồ
 * Author       :   TRAMHDT - 07/07/2018 - create
 * Param        :
 * Output       :
 */
function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}
/*
 * Vẽ số trên mặt đông hồ
 * Author       :   TRAMHDT - 07/07/2018 - create
 * Param        :
 * Output       :
 */
function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}
/*
 * Vẽ đồng hồ quay
 * Author       :  TRAMHDT - 07/07/2018 - create
 * Param        :
 * Output       :
 */
function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
}
/*
 * Vẽ kim đồng hồ
 * Author       :   TRAMHDT - 07/07/2018 - create
 * Param        :
 * Output       :
 */
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}
