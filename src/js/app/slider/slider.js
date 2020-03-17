const swiper = new Swiper('.swiper-container', {
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
	}
});
