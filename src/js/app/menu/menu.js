class Menu {
	constructor(container) {
		this.container = container;
		this.menuTrigger = this.container.querySelector('.js-menu-trigger');
		this.overlay = this.container.querySelector('.js-menu-overlay');
		this.class = {
			activeClass: 'is-open',
			croppedClass: 'is-cropped'
		};
		this.init();
	}

	bindEvents() {
		this.menuTrigger.addEventListener('click', (target) => {
			this.container.classList.toggle(this.class.activeClass);
			document.body.classList.toggle(this.class.croppedClass);
		});

		this.overlay.addEventListener('click', () => {
			this.container.classList.remove(this.class.activeClass);
			document.body.classList.remove(this.class.croppedClass);
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