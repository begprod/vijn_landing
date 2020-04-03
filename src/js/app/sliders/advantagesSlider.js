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
			clickable: true,
			renderBullet: function (index, className) {
				return `<div class="${className}"><div class="dot"></div></div>`;
			}
		}
	});
}

function checkBreakpoint() {
	if (mobileBreakpoint.matches === true) {
		initAdvantagesSlider();
	} else if (mobileBreakpoint.matches === false && typeof advantagesSlider !== 'undefined') {
		advantagesSlider.destroy();
	}
}

const advantagesSliderContainer = document.querySelector('.js-advantages-slider');

if (advantagesSliderContainer) {
	mobileBreakpoint.addListener(checkBreakpoint);
	checkBreakpoint();
}