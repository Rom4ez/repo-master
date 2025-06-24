// Инициализация библиотеки анимаций
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Плавная прокрутка к якорным ссылкам
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

// Параллакс эффект для плавающих фигур
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach(shape => {
        const speed = shape.getAttribute('data-speed') || 2;
        const moveX = (x * speed) * 50;
        const moveY = (y * speed) * 50;
        shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.2}deg)`;
    });
});

// 3D эффект для карточек
document.querySelectorAll('.service-card, .calculator-form, .calculator-result').forEach(card => {
    card.addEventListener('mousemove', handleCardMove);
    card.addEventListener('mouseleave', handleCardLeave);
});

function handleCardMove(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
}

function handleCardLeave(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
}

// Анимация чисел в калькуляторе
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current).toLocaleString('ru-RU') + ' ₽';
    }, 16);
}

// Добавляем эффект параллакса при скролле
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Анимация появления элементов при скролле
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .advantage-card');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight) && (elementBottom >= 0);
        
        if (isVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Инициализация анимаций при загрузке и скролле
document.addEventListener('DOMContentLoaded', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Обработка отправки формы
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Здесь можно добавить логику отправки формы
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Пример уведомления об успешной отправке
        alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
        this.reset();
    });
}

// Добавляем стили для анимации при скролле
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .advantage-card {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);
});

// Слушаем событие скролла
window.addEventListener('scroll', animateOnScroll);

// Функция калькулятора
function calculatePrice() {
    const personnelType = document.getElementById('personnelType').value;
    const employeeCount = parseInt(document.getElementById('employeeCount').value);
    const daysCount = parseInt(document.getElementById('daysCount').value);
    
    // Базовые ставки за одного сотрудника в день
    const rates = {
        warehouse: 1500,
        production: 2000,
        construction: 2500,
        service: 1800
    };

    // Расчет базовой стоимости
    let basePrice = rates[personnelType] * employeeCount;
    
    // Скидка при большом количестве сотрудников
    if (employeeCount > 10) {
        basePrice *= 0.9; // 10% скидка
    }
    
    // Учет срока подбора
    let finalPrice = basePrice * (daysCount / 7); // Стоимость за неделю
    
    // Форматирование суммы
    const formattedPrice = new Intl.NumberFormat('ru-RU').format(Math.round(finalPrice));
    
    // Вывод результата
    document.getElementById('calculationResult').textContent = formattedPrice + ' ₽';
}

// Categories Section
document.addEventListener('DOMContentLoaded', function() {
    const categoryHeaders = document.querySelectorAll('.category-header');

    categoryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const categoryItem = this.parentElement;
            const isActive = categoryItem.classList.contains('active');
            
            // Close all other categories
            document.querySelectorAll('.category-item').forEach(item => {
                if (item !== categoryItem) {
                    item.classList.remove('active');
                }
            });

            // Toggle current category
            categoryItem.classList.toggle('active');
        });
    });
});

// Добавляем в начало файла
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
}); 