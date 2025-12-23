function setLanguage(lang) {
    const bodyClasses = document.body.classList;
    let classesToPreserve = '';
    if (bodyClasses.contains('nav-open')) classesToPreserve += ' nav-open';
    if (bodyClasses.contains('lightbox-is-open')) classesToPreserve += ' lightbox-is-open';

    document.body.className = `lang-${lang}-active${classesToPreserve}`;
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
        
        const startDrag = (eventType) => {
            isDragging = true;
            if (eventType === 'touch') {
                document.body.classList.add('slider-is-dragging');
            }
        };

        const stopDrag = () => {
            if (isDragging) {
                isDragging = false;
                document.body.classList.remove('slider-is-dragging');
            }
        };

        const dragMove = (e, clientX) => {
            if (isDragging) {
                if (e.type === 'touchmove') {
                    e.preventDefault();
                }
                setSliderPosition(clientX);
            }
        };

        handle.addEventListener('mousedown', (e) => { e.preventDefault(); startDrag('mouse'); });
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('mousemove', (e) => dragMove(e, e.clientX));
        
        handle.addEventListener('touchstart', (e) => { startDrag('touch'); }, { passive: true }); 
        document.addEventListener('touchend', stopDrag);
        document.addEventListener('touchmove', (e) => dragMove(e, e.touches[0].clientX), { passive: false });
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
    const initGalleryLightbox = () => {
        const modal = document.getElementById('lightbox-modal');
        if (!modal) return;

        const overlay = modal.querySelector('.lightbox-overlay');
        const closeBtn = modal.querySelector('.lightbox-close');
        const lightboxImgBefore = document.getElementById('lightbox-img-before');
        const lightboxImgAfter = document.getElementById('lightbox-img-after');
        const beforeContainer = lightboxImgBefore.parentElement;
        const lightboxImages = modal.querySelector('.lightbox-images');
        const allPhotos = document.querySelectorAll('.gallery-photo');

        const openLightbox = (photoElement) => {
            const type = photoElement.dataset.type;
            const afterImgSrc = photoElement.querySelector('.photo-after')?.src;

            if (!afterImgSrc) return;

            lightboxImgAfter.src = afterImgSrc;

            if (type === 'comparison') {
                lightboxImages.classList.remove('single-image-mode');
                
                const beforeImgSrc = photoElement.querySelector('.photo-before')?.src;
                if(beforeImgSrc) {
                    lightboxImgBefore.src = beforeImgSrc;
                    beforeContainer.style.display = 'block';
                }
            } else {
                lightboxImages.classList.add('single-image-mode');
                beforeContainer.style.display = 'none';
            }
            
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('is-visible');
                document.body.classList.add('lightbox-is-open');
            }, 10);
        };

        const closeLightbox = () => {
            modal.classList.remove('is-visible');
            document.body.classList.remove('lightbox-is-open');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        };

        allPhotos.forEach(photo => {
            photo.addEventListener('click', (e) => {
                if (e.target.classList.contains('photo-toggle-btn')) {
                    return;
                }
                openLightbox(photo);
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', closeLightbox);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.body.classList.contains('lightbox-is-open')) {
                closeLightbox();
            }
        });
    };

    const initFooterYear = () => {
        const yearSpans = document.querySelectorAll('.current-year');
        if (yearSpans.length > 0) {
            const currentYear = new Date().getFullYear();
            yearSpans.forEach(span => {
                span.textContent = currentYear;
            });
        }
    };

    initMobileNav();
    createComparisonSlider(document.getElementById('comparison-slider'));
    initGalleryAccordion();
    initPhotoToggler();
    initGalleryLightbox();
    initFooterYear();

});