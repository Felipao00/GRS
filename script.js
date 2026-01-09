// Menu mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenuClose = document.querySelector('.mobile-menu-close');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

// Abrir menu mobile
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    mobileMenuOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Fechar menu mobile
function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileMenuOverlay.addEventListener('click', closeMobileMenu);

// Fechar menu ao clicar em um link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Fecha todos os outros itens
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.display = 'none';
            }
        });
        
        // Alterna o item atual
        item.classList.toggle('active');
        const answer = item.querySelector('.faq-answer');
        
        if (item.classList.contains('active')) {
            answer.style.display = 'block';
        } else {
            answer.style.display = 'none';
        }
    });
});

// Slider de depoimentos
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function showSlide(index) {
    // Esconde todos os slides
    testimonialCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Remove classe active de todos os dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Mostra o slide atual
    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

// Eventos dos botões do slider
prevBtn.addEventListener('click', () => {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) {
        newIndex = testimonialCards.length - 1;
    }
    showSlide(newIndex);
});

nextBtn.addEventListener('click', () => {
    let newIndex = currentSlide + 1;
    if (newIndex >= testimonialCards.length) {
        newIndex = 0;
    }
    showSlide(newIndex);
});

// Eventos dos dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-rotacionar slides a cada 5 segundos
let slideInterval = setInterval(() => {
    let newIndex = currentSlide + 1;
    if (newIndex >= testimonialCards.length) {
        newIndex = 0;
    }
    showSlide(newIndex);
}, 5000);

// Pausar auto-rotação quando interagir com os controles
prevBtn.addEventListener('click', () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        let newIndex = currentSlide + 1;
        if (newIndex >= testimonialCards.length) {
            newIndex = 0;
        }
        showSlide(newIndex);
    }, 5000);
});

nextBtn.addEventListener('click', () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        let newIndex = currentSlide + 1;
        if (newIndex >= testimonialCards.length) {
            newIndex = 0;
        }
        showSlide(newIndex);
    }, 5000);
});

// Scroll suave para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Fechar menu mobile se estiver aberto
            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });
});

// Efeito de rolagem no header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        header.style.padding = '10px 0';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.padding = '15px 0';
    }
});

// Animação de elementos ao rolar
function checkVisibility() {
    // Animar hero section
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        const heroContentTop = heroContent.getBoundingClientRect().top;
        if (heroContentTop < window.innerHeight - 100 && !heroContent.classList.contains('visible')) {
            heroContent.classList.add('visible');
        }
    }
    
    if (heroImage) {
        const heroImageTop = heroImage.getBoundingClientRect().top;
        if (heroImageTop < window.innerHeight - 100 && !heroImage.classList.contains('visible')) {
            heroImage.classList.add('visible');
        }
    }
    
    // Animar features cards
    animateOrganizzeFeatures();
    
    // Animar celular central
    animateCenterPhone();
    
    // Animar steps
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        const stepTop = step.getBoundingClientRect().top;
        if (stepTop < window.innerHeight - 100 && !step.classList.contains('visible')) {
            setTimeout(() => {
                step.classList.add('visible');
            }, index * 200);
        }
    });
    
    // Animar pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 100 && !card.classList.contains('visible')) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 150);
        }
    });
    
    // Animar FAQ items
    const faqItemsAnimate = document.querySelectorAll('.faq-item');
    faqItemsAnimate.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < window.innerHeight - 100 && !item.classList.contains('visible')) {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 100);
        }
    });
    
    // Animar FAQ CTA
    const faqCta = document.querySelector('.faq-cta');
    if (faqCta) {
        const faqCtaTop = faqCta.getBoundingClientRect().top;
        if (faqCtaTop < window.innerHeight - 100 && !faqCta.classList.contains('visible')) {
            faqCta.classList.add('visible');
        }
    }
}

// Animar features cards
function animateOrganizzeFeatures() {
    const featureCards = document.querySelectorAll('.feature-card-modern');
    
    featureCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 150;
        
        if (cardTop < window.innerHeight - cardVisible && !card.classList.contains('visible')) {
            // Delay progressivo baseado na posição
            const delay = index * 100;
            
            setTimeout(() => {
                card.classList.add('visible');
            }, delay);
        }
    });
}

// Animar celular central
function animateCenterPhone() {
    const centerPhone = document.querySelector('.phone-mockup-center');
    
    if (centerPhone) {
        const phoneTop = centerPhone.getBoundingClientRect().top;
        const phoneVisible = 200;
        
        if (phoneTop < window.innerHeight - phoneVisible && !centerPhone.classList.contains('animated')) {
            centerPhone.classList.add('animated');
            centerPhone.style.opacity = '1';
            centerPhone.style.transform = 'translateY(0) scale(1)';
            
            // Adicionar efeito de flutuação depois de 1s
            setTimeout(() => {
                centerPhone.style.animation = 'float 3s ease-in-out infinite';
            }, 1000);
        }
    }
}

// Verificar visibilidade ao carregar e ao rolar
window.addEventListener('load', checkVisibility);
window.addEventListener('scroll', checkVisibility);

// Inicializar primeiro slide
showSlide(0);

// Configurar WhatsApp links
function setupWhatsAppLinks() {
    const whatsappNumber = "5588993678250";
    
    // Atualizar links dos botões dos planos
    const planButtons = document.querySelectorAll('.pricing-actions a');
    
    planButtons.forEach((button) => {
        if (!button.querySelector('.fab.fa-whatsapp')) {
            const icon = document.createElement('i');
            icon.className = 'fab fa-whatsapp';
            button.prepend(icon);
            button.prepend(document.createTextNode(' '));
        }
    });
}

// Adicionar botão flutuante do WhatsApp
function addFloatingWhatsAppButton() {
    const floatingButton = document.createElement('a');
    floatingButton.href = `https://wa.me/5588993678250?text=Olá! Gostaria de saber mais sobre o SocialFlow`;
    floatingButton.target = '_blank';
    floatingButton.className = 'floating-whatsapp';
    floatingButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
    floatingButton.title = 'Fale conosco no WhatsApp';
    
    document.body.appendChild(floatingButton);
    
    // Adicionar estilo para o botão flutuante
    const style = document.createElement('style');
    style.textContent = `
        .floating-whatsapp {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background-color: #25D366;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 30px;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
            z-index: 1000;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .floating-whatsapp:hover {
            background-color: #1da851;
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(37, 211, 102, 0.6);
        }
        
        @media (max-width: 768px) {
            .floating-whatsapp {
                width: 50px;
                height: 50px;
                font-size: 24px;
                bottom: 15px;
                right: 15px;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Adicionar interatividade aos gráficos do celular
function setupPhoneInteractions() {
    const bars = document.querySelectorAll('.bar-mini');
    
    if (bars.length > 0) {
        bars.forEach(bar => {
            bar.addEventListener('mouseenter', function() {
                this.style.opacity = '0.8';
                this.style.transform = 'scaleY(1.1)';
            });
            
            bar.addEventListener('mouseleave', function() {
                this.style.opacity = '1';
                this.style.transform = 'scaleY(1)';
            });
        });
    }
}

// Adicionar interação nos botões de ação
function setupActionButtons() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    if (actionButtons.length > 0) {
        actionButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Efeito de clique
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                // Ação para "Ver relatório"
                if (this.classList.contains('outline')) {
                    // Redirecionar para seção de recursos
                    document.querySelector('#features').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Adicionar animação ao logo no header
function setupLogoAnimation() {
    const logo = document.querySelector('.logo a');
    
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(15deg)';
            }
        });
        
        logo.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    }
}

// Configurar quando o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    setupWhatsAppLinks();
    addFloatingWhatsAppButton();
    setupPhoneInteractions();
    setupActionButtons();
    setupLogoAnimation();
    
    // Inicializar checkVisibility após um pequeno delay
    setTimeout(checkVisibility, 100);
});