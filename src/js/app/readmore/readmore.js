class Readmore {
	constructor(container) {
		this.container = container;
		this.readMoreButton = this.container.querySelector('.js-readmore-button');
		this.hiddenText = this.container.querySelector('.js-read-more-hidden-text');
		this.settings = {
			activeClass: 'is-active',
			showMoreText: 'Show more',
			showLessText: 'Show less'
		};
		this.state = {
			isOpen: false
		};
		this.init();
	}

	calcHeight() {
		if (this.state.isOpen) {
			this.state.hiddenTextHeight = this.hiddenText.children[0].offsetHeight;
			this.hiddenText.style.height = `${this.state.hiddenTextHeight}px`;
		}
	}

	bindEvents() {
		if (this.readMoreButton) {
			this.readMoreButton.addEventListener('click', () => {
				if (!this.state.isOpen) {
					this.state.isOpen = true;
					this.container.classList.add(this.settings.activeClass);
					this.hiddenText.style.height = `${this.hiddenText.children[0].offsetHeight}px`;
					this.readMoreButton.innerText = this.settings.showLessText;
				} else {
					this.state.isOpen = false;
					this.container.classList.remove(this.settings.activeClass);
					this.hiddenText.removeAttribute("style");
					this.readMoreButton.innerText = this.settings.showMoreText;
				}
			});
		}

		window.addEventListener('resize', () => {
			this.calcHeight();
		});
	}

	init() {
		this.bindEvents();
		this.calcHeight();
	}
}

const readMoreContainer = document.querySelectorAll('.js-read-more');

if (readMoreContainer) {
	readMoreContainer.forEach((item) => {
		new Readmore(item);
	});
}