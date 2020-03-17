var swiper = new Swiper('.swiper-container', {
	// direction: 'vertical',
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: false,
	loop: true,
	autoplay: {
		delay: 5000,
	},
	effect: 'fade',
	mousewheel: false,
	fadeEffect: {
		crossFade: true
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	breakpoints: {
		768: {
			autoHeight: false
		},
		320: {
			autoHeight: true
		}
	}
});
