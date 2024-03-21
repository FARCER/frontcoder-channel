// svg4everybody();

const courseDirections = function () {
  const courseDirectionsNav = document.querySelector('.course-directions-nav');
  courseDirectionsNav.addEventListener('mouseover', function (e) {
    if (!e.target.classList.contains('course-directions-nav__item')) {
      e.preventDefault();
      return;
    }
    handleMouseOver(e.target.getAttribute('data-list-target'))
  })

  function handleMouseOver(target) {
    const navLinks = document.querySelectorAll('.course-directions-nav__item');
    navLinks.forEach(link => {
      if (link.getAttribute('data-list-target') !== target) {
        link.classList.remove('is-active')
      } else if (!link.classList.contains('is-active')) {
        handleAddIsActiveClass(link, target)
      }
    })
  }

  function handleAddIsActiveClass(link, target) {
    link.classList.add('is-active');
    document.querySelectorAll('.course-directions-content__list').forEach(item => {
      if (item.getAttribute('data-list-name') !== target) {
        item.classList.remove('is-active')
      } else {
        item.classList.add('is-active');
      }
    })
  }
}


courseDirections();
