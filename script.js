$('.nav-link').click(function() {
    $('.nav-link').removeClass("active");
    $('li.nav-item.active').removeClass("active");
    $(this).addClass("active");
  });