window.addEventListener("DOMContentLoaded", function () {
    // Grab elements, create settings, etc.
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('video');
    var mediaConfig = {
        video: true
    };
    var errBack = function (e) {
        console.log('An error has occurred!', e)
    };

    // Put video listeners into place
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
        });
    }

    /* Legacy code below! */
    else if (navigator.getUserMedia) { // Standard
        navigator.getUserMedia(mediaConfig, function (stream) {
            video.src = stream;
            video.play();
        }, errBack);
    } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia(mediaConfig, function (stream) {
            video.src = window.webkitURL.createObjectURL(stream);
            video.play();
        }, errBack);
    } else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
        navigator.mozGetUserMedia(mediaConfig, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, errBack);
    }

    // Trigger photo take
    document.getElementById('snap').addEventListener('click', function () {
        context.drawImage(video, 0, 0, 320, 240);
        getLocation();

        exportCanvasAsPNG('canvas', filename);
        video.style.display = "none"
        document.getElementById('snap').display = "none"

    });


}, false);

function exportCanvasAsPNG(canvasid, fileName) {

    var canvasElement = document.getElementById(canvasid);

    var MIME_TYPE = "image/png";

    var imgURL = canvasElement.toDataURL(MIME_TYPE);

    var dlLink = document.createElement('a');
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    dlLink.remove();
};
(function (factory) {

    if (typeof define === 'function' && define.amd) {
        define(['exports'], function (exports) {
            window.Orienter = factory(exports);
        });
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        window.Orienter = factory({});
    }

}(function (Orienter) {

    Orienter = function () {
        this.initialize.apply(this, arguments);
    };

    Orienter.prototype = {
        lon: 0,
        lat: 0,
        direction: 0,
        fix: 0,
        os: '',
        initialize: function (config) {
            var _config = config || {};

            this.onOrient = _config.onOrient || function () {};
            this.onChange = _config.onChange || function () {};

            this._orient = this._orient.bind(this);
            this._change = this._change.bind(this);

            this.lon = 0;
            this.lat = 0;
            this.direction = window.orientation || 0;

            switch (this.direction) {
                case 0:
                    this.fix = 0;
                    break;
                case 90:
                    this.fix = -270;
                    break;
                case -90:
                    this.fix = -90;
                    break;
            }

            if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                this.os = 'ios';
            } else {
                this.os = (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux')) ? 'android' : '';
            }
        },

        init: function () {
            window.addEventListener('deviceorientation', this._orient, false);
            window.addEventListener('orientationchange', this._change, false);
        },

        destroy: function () {
            window.removeEventListener('deviceorientation', this._orient, false);
            window.removeEventListener('orientationchange', this._change, false);
        },

        _change: function (event) {
            this.direction = window.orientation;

            this.onChange(this.direction);
        },

        changeDirectionTo: function (n) {
            this.direction = n;
        },

        _orient: function (event) {
            switch (this.os) {
                case 'ios':
                    switch (this.direction) {
                        case 0:
                            this.lon = event.alpha + event.gamma;
                            if (event.beta > 0) this.lat = event.beta - 90;
                            break;
                        case 90:
                            if (event.gamma < 0) {
                                this.lon = event.alpha - 90;
                            } else {
                                this.lon = event.alpha - 270;
                            }
                            if (event.gamma > 0) {
                                this.lat = 90 - event.gamma;
                            } else {
                                this.lat = -90 - event.gamma;
                            }
                            break;
                        case -90:
                            if (event.gamma < 0) {
                                this.lon = event.alpha - 90;
                            } else {
                                this.lon = event.alpha - 270;
                            }
                            if (event.gamma < 0) {
                                this.lat = 90 + event.gamma;
                            } else {
                                this.lat = -90 + event.gamma;
                            }
                            break;
                    }
                    break;
                case 'android':
                    switch (this.direction) {
                        case 0:
                            this.lon = event.alpha + event.gamma + 30;
                            if (event.gamma > 90) {
                                this.lat = 90 - event.beta;
                            } else {
                                this.lat = event.beta - 90;
                            }
                            break;
                        case 90:
                            this.lon = event.alpha - 230;
                            if (event.gamma > 0) {
                                this.lat = 270 - event.gamma;
                            } else {
                                this.lat = -90 - event.gamma;
                            }
                            break;
                        case -90:
                            this.lon = event.alpha - 180;
                            this.lat = -90 + event.gamma;
                            break;
                    }
                    break;
            }

            this.lon += this.fix;
            this.lon %= 360;
            if (this.lon < 0) this.lon += 360;

            this.lon = Math.round(this.lon);
            this.lat = Math.round(this.lat);

            this.onOrient({
                a: Math.round(event.alpha),
                b: Math.round(event.beta),
                g: Math.round(event.gamma),
                lon: this.lon,
                lat: this.lat,
                dir: this.direction
            });
        }

    };

    return Orienter;
}));


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);

    } else {
        alert("don't support");

    }
}
var lat
var lon

function showPosition(position) {
    lat = position.coords.latitude; //纬度 
    lon = position.coords.longitude; //经度 
    alert('latitude:' + lat + ',longitude:' + lon);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("failed,permission denied");

        case error.POSITION_UNAVAILABLE:
            alert("failed, unavailable");

        case error.TIMEOUT:
            alert("time out");

        case error.UNKNOWN_ERROR:
            alert("system failed");

    }
}


function init() {
    if (window.DeviceMotionEvent) {

        window.addEventListener('devicemotion', deviceMotionHandler, false);

    } else {

        alert("don't support");
    }
}

// 那么，我们如何计算用户是否是在摇动手机呢？可以从以下几点进行考虑：
// 1、其实用户在摇动手机的时候始终都是以一个方向为主进行摇动的；
// 2、用户在摇动手机的时候在x、y、z三个方向都会有相应的想速度的变化；
// 3、不能把用户正常的手机运动行为当做摇一摇（手机放在兜里，走路的时候也会有加速度的变化）。
// 从以上三点考虑，针对三个方向上的加速度进行计算，间隔测量他们，考察他们在固定时间段里的变化率，而且需要确定一个阀值来触发摇一摇之后的操作。

// 首先，定义一个摇动的阀值
var SHAKE_THRESHOLD = 3000;
// 定义一个变量保存上次更新的时间
var last_update = 0;
// 紧接着定义x、y、z记录三个轴的数据以及上一次出发的时间
var x;
var y;
var z;
var last_x;
var last_y;
var last_z;

var count = 0;

function deviceMotionHandler(eventData) {
    // 获取含重力的加速度
    var acceleration = eventData.accelerationIncludingGravity;

    // 获取当前时间
    var curTime = new Date().getTime();
    var diffTime = curTime - last_update;
    // 固定时间段
    if (diffTime > 100) {
        last_update = curTime;

        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;

        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

        if (speed > SHAKE_THRESHOLD) {
            // apple fall
            alert("shake it!")

        }

        last_x = x;
        last_y = y;
        last_z = z;
    }
}