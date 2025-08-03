function setLanguage(lang) {
    const isNavOpen = document.body.classList.contains('nav-open');
    document.body.className = `lang-${lang}-active`;
    if (isNavOpen) {
        document.body.classList.add('nav-open');
    }
}

document.addEventListener('DOMContentLoaded', function() {

    const initMobileNav = () => {
        const navToggle = document.querySelector('.mobile-header .nav-toggle');
        const navClose = document.querySelector('.mobile-nav-close');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

        if (!navToggle || !navClose) return;

        const openNav = () => document.body.classList.add('nav-open');
        const closeNav = () => document.body.classList.remove('nav-open');

        navToggle.addEventListener('click', openNav);
        navClose.addEventListener('click', closeNav);
    
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeNav);
        });
    };

    const createComparisonSlider = (sliderElement) => {
        if (!sliderElement) return;

        const afterImageContainer = sliderElement.querySelector('.image-after');
        const handle = sliderElement.querySelector('.slider-handle');
        let isDragging = false;

        const setSliderPosition = (x) => {
            const rect = sliderElement.getBoundingClientRect();
            let position = (x - rect.left) / rect.width;
            position = Math.max(0, Math.min(1, position));
            const percentage = position * 100;

            afterImageContainer.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
            handle.style.left = `${percentage}%`;
        };

        handle.addEventListener('mousedown', (e) => { isDragging = true; e.preventDefault(); });
        document.addEventListener('mouseup', () => isDragging = false);
        document.addEventListener('mousemove', (e) => { if (isDragging) setSliderPosition(e.clientX); });
        handle.addEventListener('touchstart', () => isDragging = true, { passive: true });
        document.addEventListener('touchend', () => isDragging = false);
        document.addEventListener('touchmove', (e) => { if (isDragging) setSliderPosition(e.touches[0].clientX); });
    };

    const initGalleryAccordion = () => {
        const categoryToggles = document.querySelectorAll('.category-toggle');
        categoryToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const section = toggle.parentElement;
                section.classList.toggle('is-open');
                const isOpening = section.classList.contains('is-open');
                toggle.setAttribute('aria-expanded', isOpening);
            });
        });
    };

    const initPhotoToggler = () => {
        const comparisonPhotos = document.querySelectorAll('.gallery-photo[data-type="comparison"]');
        comparisonPhotos.forEach(photo => {
            const prevBtn = photo.querySelector('.photo-toggle-btn.prev');
            const nextBtn = photo.querySelector('.photo-toggle-btn.next');

            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    photo.classList.remove('is-showing-before');
                });

                nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    photo.classList.add('is-showing-before');
                });
            }
        });
    };

    initMobileNav();
    createComparisonSlider(document.getElementById('comparison-slider'));
    initGalleryAccordion();
    initPhotoToggler();

});