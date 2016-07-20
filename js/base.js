var TRANSPARENCY = 0.7,
    DURATION     = 100;

$(function() {
  $('.post-image a.view-high-res, .post-image a[href$=jpg], .post-image a[href$=png]').fancybox({ type: 'image' });

  $('#social-icons li, #social-icons-footer li, #about-me img').fadeTo(0, TRANSPARENCY).mouseenter(function() {
    $(this).fadeTo(DURATION, 1);
  }).mouseleave(function() {
    $(this).fadeTo(DURATION, TRANSPARENCY);
  });

  $('#social-icons li').mouseenter(function() {
    $(this).animate({ 'margin-top': '-=8px' }, DURATION);
  }).mouseleave(function() {
    $(this).animate({ 'margin-top': '+=8px' }, DURATION);
  });

  var not_found_title = $('section.post h1:contains(Not Found)'),
      not_found_text  = 'The URL you requested could not be found.';

  if (not_found_title.length == 1 && not_found_title.next().text() == not_found_text) {
    $('#post-notes, #disqus_thread, aside').remove();
  }
});

// header avatar
var aboutMeLink = $('a#about-me-link');
$('#avatar-inner').fadeTo(DURATION, 0.5).mouseenter(function() {
  $(this).clearQueue();
  aboutMeLink.hide();

  $(this).fadeTo(DURATION, 1).css('cursor', 'pointer');

  $('#avatar').click(function() {
    // aboutMeLink.trigger('click');
    window.location = '#page-about';
  });
}).mouseleave(function() {
  $(this).clearQueue();
  aboutMeLink.fadeIn(DURATION);

  $(this).fadeTo(DURATION, 0.5);
});

// iframe styling (for Youtube videos, etc)

$('article > iframe').wrap('<p class="post-image">');

// post image styling

$('section.post article p img').parents('p').addClass('post-image');
$.each($('.post-image img'), function() {
  if (this.width > 500) {
    this.width = 500;
  }
});

// tooltips

$('#social-icons a').tipsy();

// smooth scrolling

function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
}
var locationPath = filterPath(location.pathname);
var scrollElem = scrollableElement('html', 'body');
$('a[href*=#]').each(function() {
  var thisPath = filterPath(this.pathname) || locationPath;
  if ( locationPath == thisPath
  && (location.hostname == this.hostname || !this.hostname)
  && this.hash.replace(/#/,'') ) {
    var $target = $(this.hash), target = this.hash;
    if (target) {
      var targetOffset = $target.offset().top;
      $(this).click(function(event) {
        event.preventDefault();
        $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
          location.hash = target;
        });
      });
    }
  }
});
function scrollableElement(els) {
  for (var i = 0, argLength = arguments.length; i <argLength; i++) {
    var el = arguments[i],
        $scrollElement = $(el);
    if ($scrollElement.scrollTop()> 0) {
      return el;
    } else {
      $scrollElement.scrollTop(1);
      var isScrollable = $scrollElement.scrollTop()> 0;
      $scrollElement.scrollTop(0);
      if (isScrollable) {
        return el;
      }
    }
  }
  return [];
}

// Google Analytics

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-13137273-1']);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
})();
