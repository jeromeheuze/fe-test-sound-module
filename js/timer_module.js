/**
 * Created by jeromeheuze on 1/12/16.
 */
$(function(){
    var rootTimer = $("#timer-module");
    var rootTimerScreen = rootTimer.find(".screen");
    var rootTimerControls = rootTimer.find(".controls");
    var btnPlus = rootTimerControls.find("#btnPlus");
    var btnMinus = rootTimerControls.find("#btnMinus");
    var btnPower = rootTimerControls.find("#btnPower");
    var btnRateSwitch = rootTimer.find("#btnRateSwitch");

    btnPlus.click(function(){
        //get current time
        var currentTime = getCurrentTime();
        var newTime = parseInt(currentTime, 10) + 1;
        setCurrentTime(newTime);

    });
    btnMinus.click(function(){
        //get current time
        var currentTime = getCurrentTime();
        var newTime = parseInt(currentTime, 10) - 1;
        setCurrentTime(newTime);
    });
    btnPower.click(function(){
        //get current state
        var currentState = rootTimer.data("state");
        if (currentState == "on") {
            rootTimerControls.find(".led").removeClass("on").addClass("off");
            setCurrentState("off");
            switchTimerOff();
        } else {
            rootTimerControls.find(".led").removeClass("off").addClass("on");
            setCurrentState("on");
            switchTimerOn();
        }
    });
    btnRateSwitch.click(function(){
        //get current rate
        var currentRate = getCurrentRate();
        if (getCurrentState() == "on") {
            if (currentRate == "MIN") {
                btnRateSwitch.find(".inner").removeClass("left").addClass("right");
                setCurrentRate("HRS");
            } else {
                btnRateSwitch.find(".inner").removeClass("right").addClass("left");
                setCurrentRate("MIN");
            }
        }
    });

    var getCurrentTime = function() {
        return rootTimerScreen.find("#timeToChange").text();
    };
    var getCurrentRate = function() {
        return btnRateSwitch.data("switch");
    };
    var getCurrentState = function() {
        return rootTimer.data("state");
    };
    var setCurrentTime = function(value) {
        rootTimerScreen.find("#timeToChange").text(value);
        rootTimer.find('.nstSlider').nstSlider('set_position', value);
    };
    var setCurrentState = function(value) {
        rootTimer.data("state", value);
    };
    var setCurrentRate = function(value) {
        btnRateSwitch.data("switch", value);
        rootTimerScreen.find("#rateToChange").text(value);
    };
    var switchTimerOff = function() {
        rootTimerScreen.find(".clock").addClass("off");
        rootTimerScreen.find("#rateToChange").text("");
        btnRateSwitch.find(".inner").removeClass("right").addClass("left");
        rootTimer.find('.nstSlider').nstSlider('set_position', 0);
        rootTimer.find('.nstSlider').nstSlider('disable');
        setTimeout(
            function()
            {
                rootTimerScreen.find("#timeToChange").text("");
            }, 1000);
    };
    var switchTimerOn = function() {
        rootTimerScreen.find(".clock").removeClass("off");
        setCurrentTime("0");
        rootTimerScreen.find("#rateToChange").text("MIN");
        btnRateSwitch.find(".inner").removeClass("right").addClass("left");
        rootTimer.find('.nstSlider').nstSlider('set_position', 0);
        rootTimer.find('.nstSlider').nstSlider('enable');
        setCurrentRate("MIN");
    };

    rootTimer.find('.nstSlider').nstSlider({
        "left_grip_selector": ".leftGrip",
        "value_bar_selector": ".bar",
        "value_changed_callback": function(cause, leftValue) {
            setCurrentTime(leftValue);
        }
    });
});