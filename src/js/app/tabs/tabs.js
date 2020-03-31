class Tabs {
	constructor(container) {
		this.container = container;
		this.navigationItems = this.container.querySelectorAll('.js-tabs-nav-item');
		this.panelsItems = this.container.querySelectorAll('.js-tabs-panel');
		this.activeClass = 'is-active';
		this.state = {};
		this.init();
	}

	switchTab(panelId) {
		const panelItem = this.panelsItems[panelId];
		const navItem = this.navigationItems[panelId];

		this.panelsItems.forEach((item) => {
			item.classList.remove(this.activeClass);
		});

		this.navigationItems.forEach((item) => {
			item.classList.remove(this.activeClass);
		});

		panelItem.classList.add(this.activeClass);
		navItem.classList.add(this.activeClass);
	}

	setActiveTab(hash) {
		this.navigationItems.forEach((item,i) => {
			const linkHash = item.getAttribute('href');

			if (linkHash === hash) {
				item.classList.add(this.activeClass);
				this.switchTab(i);
			}
		});
	}

	bindEvents() {
		this.navigationItems.forEach((item, i) => {
			item.addEventListener('click', (event) => {
				this.switchTab(i);
			})
		});

		window.onhashchange = () => {
			this.setActiveTab(window.location.hash);
			window.scroll(0, 0);
		}
	}

	init() {
		this.setActiveTab(window.location.hash);
		this.bindEvents();
	}
}

const tabsContainer = document.querySelector('.js-tabs');

if (tabsContainer) {
	new Tabs(tabsContainer);
}
