const mobileBreakpoint = window.matchMedia('(min-width: 980px)');
let questionsSlider;

function initQuestionsSlider() {
	questionsSlider = new Swiper('.js-questions-slider', {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		effect: 'fade',
		mousewheel: false,
		fadeEffect: {
			crossFade: true
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		}
	});
}

function checkBreakpoint() {
	if (mobileBreakpoint.matches === false && typeof questionsSlider !== 'undefined') {
		questionsSlider.destroy();
	} else if (mobileBreakpoint.matches === true) {
		initQuestionsSlider();
	}
}

const questionsSliderContainer = document.querySelector('.js-questions-slider');

if (questionsSliderContainer) {
	mobileBreakpoint.addListener(checkBreakpoint);
	checkBreakpoint();
}