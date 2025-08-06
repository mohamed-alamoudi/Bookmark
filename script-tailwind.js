const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const hamburgerIcon = document.getElementById('hamburgerIcon');
const closeIcon = document.getElementById('closeIcon');
const logo = document.getElementById('logo');

const featureTabs = document.querySelectorAll('.feature-tab');
const featureContents = document.querySelectorAll('.feature-content');

const faqItems = document.querySelectorAll('.faq-item');

const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');
const emailError = document.getElementById('emailError');

navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('mobile-menu-open');

    if (isOpen) {
        mobileMenu.classList.remove('mobile-menu-open');
        mobileMenu.classList.add('-translate-x-full');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        logo.src = './images/logo-bookmark.svg';
        logo.classList.remove('brightness-0', 'invert');
        document.body.style.overflow = 'auto';
    } else {
        mobileMenu.classList.add('mobile-menu-open');
        mobileMenu.classList.remove('-translate-x-full');
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        logo.classList.add('brightness-0', 'invert');
        document.body.style.overflow = 'hidden';
    }
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('mobile-menu-open');
        mobileMenu.classList.add('-translate-x-full');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        logo.src = './images/logo-bookmark.svg';
        logo.classList.remove('brightness-0', 'invert');
        document.body.style.overflow = 'auto';
    });
});

featureTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabNumber = tab.getAttribute('data-tab');

        featureTabs.forEach(t => {
            t.classList.remove('feature-tab-active');
            t.classList.remove('text-grayish-blue', 'border-b-soft-red');
            t.classList.add('text-very-dark-blue', 'border-transparent');
        });
        featureContents.forEach(content => {
            content.classList.remove('feature-content-active');
            content.classList.add('hidden');
            content.classList.remove('grid');
        });

        tab.classList.add('feature-tab-active');
        tab.classList.remove('text-very-dark-blue', 'border-transparent');
        tab.classList.add('text-grayish-blue', 'border-b-soft-red');

        const activeContent = document.getElementById(`tab-${tabNumber}`);
        if (activeContent) {
            activeContent.classList.add('feature-content-active');
            activeContent.classList.remove('hidden');
            activeContent.classList.add('grid', 'md:grid-cols-2');
        }
    });
});

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('faq-item-open');

        faqItems.forEach(faqItem => {
            faqItem.classList.remove('faq-item-open');
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const faqIcon = faqItem.querySelector('.faq-icon');
            faqAnswer.classList.remove('max-h-96', 'pb-5');
            faqAnswer.classList.add('max-h-0');
            faqIcon.classList.remove('rotate-180');
            faqIcon.style.filter = '';
        });

        if (!isOpen) {
            item.classList.add('faq-item-open');
            answer.classList.remove('max-h-0');
            answer.classList.add('max-h-96', 'pb-5');
            icon.classList.add('rotate-180');
            icon.style.filter = 'brightness(0) saturate(100%) invert(27%) sepia(95%) saturate(1874%) hue-rotate(348deg) brightness(101%) contrast(97%)';
        }
    });
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();

        emailInput.classList.remove('newsletter-input-error');
        emailInput.classList.remove('border-soft-red', 'bg-soft-red', 'text-white');
        emailInput.classList.add('text-grayish-blue', 'border-transparent');
        emailError.classList.remove('newsletter-error-show');
        emailError.classList.remove('translate-y-0', 'opacity-100');
        emailError.classList.add('-translate-y-full', 'opacity-0');

        if (!email) {
            showEmailError('Whoops, make sure it\'s an email');
            return;
        }

        if (!validateEmail(email)) {
            showEmailError('Whoops, make sure it\'s an email');
            return;
        }

        showSuccess();
    });
}

function showEmailError(message) {
    emailInput.classList.add('newsletter-input-error');
    emailInput.classList.remove('text-grayish-blue', 'border-transparent');
    emailInput.classList.add('border-soft-red', 'bg-soft-red', 'text-white');
    emailError.textContent = message;
    emailError.classList.add('newsletter-error-show');
    emailError.classList.remove('-translate-y-full', 'opacity-0');
    emailError.classList.add('translate-y-0', 'opacity-100');

    emailInput.classList.add('shake');
    setTimeout(() => {
        emailInput.classList.remove('shake');
    }, 500);
}

function showSuccess() {
    emailInput.value = '';

    alert('Thank you! Your email has been added to our newsletter.');
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileMenu.classList.remove('mobile-menu-open');
        mobileMenu.classList.add('-translate-x-full');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        logo.src = './images/logo-bookmark.svg';
        logo.classList.remove('brightness-0', 'invert');
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const firstTab = document.querySelector('.feature-tab[data-tab="1"]');
    const firstContent = document.getElementById('tab-1');

    if (firstTab && firstContent) {
        firstTab.classList.add('feature-tab-active');
        firstTab.classList.remove('text-very-dark-blue', 'border-transparent');
        firstTab.classList.add('text-grayish-blue', 'border-b-soft-red');
        firstContent.classList.add('feature-content-active');
        firstContent.classList.remove('hidden');
        firstContent.classList.add('grid', 'md:grid-cols-2');
    }

    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    }, 100);
});

document.querySelectorAll('a[class*="bg-"], button[class*="bg-"]').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px)';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = 'none';
    });
});

document.querySelectorAll('a[class*="bg-"], button[class*="bg-"]').forEach(btn => {
    btn.style.transition = 'all 0.3s ease';
});
