// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

        // Open clicked if wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== Quantity Selector =====
function changeQty(delta) {
    const input = document.getElementById('qty');
    let val = parseInt(input.value) + delta;
    if (val < 1) val = 1;
    if (val > 10) val = 10;
    input.value = val;
    updateSummary();
}

function updateSummary() {
    const qty = document.getElementById('qty').value;
    const price = 39.99;
    const total = (qty * price).toFixed(2);
    document.getElementById('summary-qty').textContent = 'الكمية: ' + qty;
    document.getElementById('total-price').textContent = '$' + total;
}

// ===== Form Handling =====
function handleOrder(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    // Collect order data
    const order = {
        name: data.get('name'),
        phone: data.get('phone'),
        email: data.get('email'),
        country: data.get('country'),
        city: data.get('city'),
        address: data.get('address'),
        quantity: data.get('quantity')
    };

    // Show confirmation
    alert(`✅ تم استلام طلبك!\n\nالاسم: ${order.name}\nالكمية: ${order.quantity}\nالإجمالي: $${(order.quantity * 39.99).toFixed(2)}\n\nسنتواصل معك قريباً لتأكيد الطلب.`);

    // Here you would send to your backend or email
    console.log('Order:', order);
}

// ===== Scroll Animations =====
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

document.querySelectorAll('.feature-card, .review-card, .ps-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// ===== Sticky Navbar Effect =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
    }

    lastScroll = currentScroll;
});

// ===== Stock Counter Animation =====
function animateStock() {
    const stockNum = document.querySelector('.stock-number');
    if (!stockNum) return;

    let count = 23;
    const interval = setInterval(() => {
        count--;
        stockNum.textContent = count;
        if (count <= 17) {
            clearInterval(interval);
        }
    }, 2000);
}

// Start stock animation when urgency section is visible
const urgencyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStock();
            urgencyObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const urgencySection = document.querySelector('.urgency');
if (urgencySection) urgencyObserver.observe(urgencySection);

// ===== Smooth Scroll for Nav Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ===== Mobile Menu Toggle (if needed) =====
// Add hamburger menu logic here if you want mobile nav

console.log('🚀 Store loaded successfully!');
