$(function() {
  var videoEle = document.getElementById("myVideo");
  $("#slider").slider({
    slide: function(event, ui) {
      videoEle.currentTime = ui.value / 100 * videoEle.duration;
      videoEle.pause();
      $("#playButton").attr("src", "images/play.png");
    }
  });
  $("#volumeSlider").slider({
    value: 100,
    slide: function(event, ui) {
      videoEle.volume = ui.value / 100;
    }
  });
  $("#speedSlider").slider({
    min: 0.5,
    max: 2.0,
    value: 1,
    step: 0.1,
    slide: function(event, ui) {
      videoEle.defaultPlaybackRate = videoEle.playbackRate = ui.value;
    }
  });
  $("#playButton").click(function() {
    if (videoEle.paused) {
      videoEle.play();
      $(this).attr("src", "images/pause.png");
    } else {
      videoEle.pause();
      $(this).attr("src", "images/play.png");
    }
  });
  $("#volumeButton").click(function() {
    if (videoEle.muted) {
      videoEle.muted = false;
      $(this).attr("src", "images/volume.png");
    } else {
      videoEle.muted = true;
      $(this).attr("src", "images/mute.png");
    }
  });
  $("#fsButton").click(function() {
    try {
      videoEle.webkitEnterFullscreen();
    } catch (e) {}
  });
  videoEle.addEventListener("timeupdate", function() {
    var cTime = videoEle.currentTime; 
    var dTime = videoEle.duration;
    $("#slider").slider("value", cTime / dTime * 100);
    document.getElementById("ctime").innerHTML = toTimeStr(cTime) + "/" + toTimeStr(dTime);
  }, true);
  videoEle.addEventListener("ended", function() {
    $("#playButton").attr("src", "images/play.png");
  }, true);
  videoEle.addEventListener("volumechange", function() {
    $("#volumeSlider").slider("value", videoEle.volume * 100);
  }, true);
  function toTimeStr(n) {
    var m = "00" + Math.floor(n / 60);
    var s = "00" + Math.floor(n % 60);
    m = m.substr(m.length - 2, 2);
    s = s.substr(s.length - 2, 2);
    return m + ":" + s;
  }
  $("#playList img").click(function() {
    var mimeTypeList = ["video/webm", "video/ogg", "video/mp4"];
    var mimeTypeExt = [".webm", ".ogv", ".mov"];
    var videoName = $(this).attr("title");
    for (var i = 0; i < mimeTypeList.length; i++) {
      if (videoEle.canPlayType(mimeTypeList[i]) == "maybe") { videoName += mimeTypeExt[i]; break; }
    }
    videoEle.src = "movie/" + videoName;
    videoEle.load();
    $("#playButton").attr("src", "images/play.png");
    $("#slider").slider("value", 0);
  });
});