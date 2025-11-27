document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav-buttons');
    const navItems = document.querySelectorAll('.nav-buttons li');

    // Set active item based on current URL
    navItems.forEach(item => {
        const a = item.querySelector('a');
        if (!a) return;
        try {
            const linkPath = new URL(a.href, location.origin).pathname.replace(/\/+$/, '');
            const currentPath = location.pathname.replace(/\/+$/, '');
            if (linkPath === currentPath || (linkPath === '/index.html' && (currentPath === '/' || currentPath === '/index.html'))) {
                item.classList.add('active');
            }
        } catch (e) {
            // ignore malformed hrefs
        }

        // Click highlights the item (browser will still follow the link)
        item.addEventListener('click', () => {
            navItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');
            // close mobile nav after selecting
            if (nav && nav.classList.contains('open')) nav.classList.remove('open');
        });
    });

    // Hamburger toggle for small screens
    const hamburger = document.querySelector('.hamburger-menu');
    if (hamburger && nav) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            nav.classList.toggle('open');
        });

        // Close nav if clicked outside
        document.addEventListener('click', (ev) => {
            if (!nav.contains(ev.target) && nav.classList.contains('open')) {
                nav.classList.remove('open');
            }
        });
    }
});
