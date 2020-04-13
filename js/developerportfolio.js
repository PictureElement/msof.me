// Run a function when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {

  // In-page link animations
  $('.scroll-js').click(function(e) {
    e.preventDefault();
    var scrollTarget = $(this).attr('href');
    var scrollDistance = $(scrollTarget).offset().top - 50;
    $('html, body').animate({
      scrollTop: scrollDistance + 'px'
    }, 'slow');
  });

  // Add box shadow to the top navigation on scroll
  document.addEventListener('scroll', function() {
    if ($(document).scrollTop() > 0) {
      $('.top-bar').addClass('top-bar--fixed-scrolled');
    } else {
      $('.top-bar').removeClass('top-bar--fixed-scrolled');
    }
  });

  // Parallax
  var parallax = document.getElementById('parallax');
  M.Parallax.init(parallax);

  /* Tooltips
  var tooltips = document.querySelectorAll('.tooltipped');
  var instances = M.Tooltip.init(tooltips, {exitDelay: 0});
  */

  // Scrollspy
  var elems = document.querySelectorAll('.scrollspy');
  var instances = M.ScrollSpy.init(elems, {scrollOffset: 50});

  // Animated text
  var characters = document.querySelectorAll('.lead-card__title span');

  var delay = 0;
  var step = 100;
  characters.forEach(function(character) {
    setTimeout(function() {
      character.classList.add('animated', 'bounceIn');
    }, delay);
    delay += step;
  });

  // Init AOS
  AOS.init();
  
  // Chart
  var dom = document.getElementById('skillsChart');
  var skillsChart = echarts.init(dom, 'light', {renderer: 'canvas'});
  skillsChart.showLoading();
  var data;
  var option;

  function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }
  
  function json(response) {
    return response.json();
  }

  fetch('js/config/data.json')
    .then(status)
    .then(json)
    .then(function(response) {
      console.log('Request succeeded with JSON response', response);
      data = response;
      return fetch('js/config/option.json');
    })
    .then(status)
    .then(json)
    .then(function(response) {
      option = response;
      option.baseOption.series.data = data;
      console.log('Request succeeded with JSON response', response);
      skillsChart.hideLoading();
      skillsChart.setOption(option, true);
      // Resize chart, when window size changes
      window.onresize = function() {
        skillsChart.resize();
      };
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });

  // Sidenav
  var sidenav = document.getElementById('sidenav');
  M.Sidenav.init(sidenav);

  // Show more/less projects
  $('#showMoreProjects').click(function () {
    if ($('.projects-section__row-wrapper').hasClass('collapse')) {
      $('.projects-section__row-wrapper').removeClass('collapse');
      $(this).html('<i class="fas fa-chevron-up"></i> Show less');
    } else {
      $('.projects-section__row-wrapper').addClass('collapse');
      $(this).html('<i class="fas fa-chevron-down"></i> Show more');
    }
  });

  // Show more/less experience
  $('#showMoreExperience').click(function () {
    if ($('.timeline').hasClass('collapse')) {
      $('.timeline').removeClass('collapse');
      $(this).html('<i class="fas fa-chevron-up"></i> Show less');
    } else {
      $('.timeline').addClass('collapse');
      $(this).html('<i class="fas fa-chevron-down"></i> Show more');
    }
  });

});