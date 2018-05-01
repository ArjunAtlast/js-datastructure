hljs.initHighlightingOnLoad();

$(document).ready(function(e){
  stickyNavbar("#navbar");
  $(".open-sidebar").click(toggleSidebar);
  $(".dropdown-list-item-title").click(toggleSublist);
  scrollTo(".dropdown-sublist-item [class^='item-type']");
});

function stickyNavbar(selector) {
  var $navbar = $(selector);
  var height = $navbar.height();
  $(".wrapper").scroll(function(){
    if($(this).scrollTop() < height) {
      $navbar.removeClass("locked");
    }
    else {
      $navbar.addClass("locked");
    }
  });
}

function toggleSidebar() {
  var $sidebar = $("#sidebar");
  $sidebar.toggleClass("open");
}

function toggleSublist(e) {
  e.preventDefault();
  $sublist = $(this).parent().find(".sidebar-sublist");
  $(".sidebar-sublist").not($sublist).slideUp(600,'swing');
  $sublist.slideToggle(600,'swing');
}

function scrollTo(trigger) {
  $trig = $(trigger);
  $trig.click(function(e){
    e.preventDefault();
    $href = $(this).attr("href");
    $target = $(`a[name=${$href.substr(1,$href.length)}]`);
    $(".wrapper").animate({
      scrollTop: `+=${$target.offset().top-100}px`
    }, 800, "swing");
  });
}
