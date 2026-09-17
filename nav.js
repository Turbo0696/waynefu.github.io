// Hamburger menu — toggles the whole nav panel
function toggleNav() {
  document.querySelector('.nav-links').classList.toggle('open');
}

// Nav dropdowns — click to toggle (supports multiple dropdowns per page)
document.addEventListener('DOMContentLoaded', function () {
  var dropdowns = document.querySelectorAll('.nav-dropdown');
  if (!dropdowns.length) return;

  dropdowns.forEach(function (dropdown) {
    var label = dropdown.querySelector('.nav-dropdown-label');
    var menu = dropdown.querySelector('.dropdown-menu');
    if (!label || !menu) return;

    label.addEventListener('click', function (e) {
      e.stopPropagation();
      var wasOpen = menu.classList.contains('open');
      // close any other open dropdown first
      dropdowns.forEach(function (d) {
        var m = d.querySelector('.dropdown-menu');
        if (m && m !== menu) m.classList.remove('open');
      });
      menu.classList.toggle('open', !wasOpen);
    });

    // keep menu open when clicking inside it
    menu.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  });

  // close all dropdowns when clicking anywhere outside
  document.addEventListener('click', function () {
    dropdowns.forEach(function (d) {
      var m = d.querySelector('.dropdown-menu');
      if (m) m.classList.remove('open');
    });
  });
});
