/* fix touchstart problems */
if (!("ontouchstart" in document.documentElement)) {
document.documentElement.className += " no-touch";
}

/* Add video controls */
$(document).ready(function () {
  var lastVideo, $lastVideo;

  $(".video-controls").click(function (evt) {
    var $controls = $(evt.target);
    var video = document.getElementById($controls.data('target'));

    /* toggle play/pause */
    if ($controls.hasClass('press-play')) {
      $controls.removeClass('press-play');
      $controls.addClass('press-pause');
      video.play();

      /* only allow one video to play at a time */
      if (lastVideo && lastVideo !== video) {
        lastVideo.pause();
        $lastVideo.removeClass('press-pause');
        $lastVideo.addClass('press-play');
      }

      lastVideo = video; $lastVideo = $controls;
    }
    else {
      $controls.removeClass('press-pause');
      $controls.addClass('press-play');
      video.pause();
      lastVideo = null; $lastVideo = null;
    }
  });
});
