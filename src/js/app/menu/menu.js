class Menu {
	constructor(container) {
		this.container = container;
		this.menuTrigger = this.container.querySelector('.js-menu-trigger');
		this.overlay = this.container.querySelector('.js-menu-overlay');
		this.settings = {
			activeClass: 'is-open',
			croppedClass: 'is-cropped'
		};
		this.init();
	}

	bindEvents() {
		this.menuTrigger.addEventListener('click', (target) => {
			this.container.classList.toggle(this.settings.activeClass);
			document.body.classList.toggle(this.settings.croppedClass);
		});

		this.overlay.addEventListener('click', () => {
			this.container.classList.remove(this.settings.activeClass);
			document.body.classList.remove(this.settings.croppedClass);
		});
	}

	init() {
		this.bindEvents();
	}
}

const menuContainer = document.querySelector('.js-menu-container');

if (menuContainer) {
	new Menu(menuContainer);
}