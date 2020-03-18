const mobileBreakpoint = window.matchMedia('(max-width: 680px)');
let advantagesSlider;

function initAdvantagesSlider() {
	advantagesSlider = new Swiper('.js-advantages-slider', {
		slidesPerView: 'auto',
		centeredSlides: false,
		spaceBetween: 40,
		autoHeight: false,
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		}
	});
}

function checkBreakpoint() {
	if (mobileBreakpoint.matches === true) {
		initAdvantagesSlider();
	} else if (mobileBreakpoint.matches === false && advantagesSlider !== undefined) {
		advantagesSlider.destroy();
	}
}


mobileBreakpoint.addListener(checkBreakpoint);

checkBreakpoint();