// Main JavaScript File - GRS Pro Platform

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

// Ativar link de navegação atual
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Contadores animados
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    });
}

// Demo tabs
function initDemoTabs() {
    const demoButtons = document.querySelectorAll('.demo-tab');
    const demoScreens = document.querySelectorAll('.demo-screen');
    
    demoButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe active de todos os botões
            demoButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            button.classList.add('active');
            
            // Esconder todas as telas
            demoScreens.forEach(screen => screen.classList.remove('active'));
            
            // Mostrar a tela correspondente
            const tabId = button.getAttribute('data-tab');
            const targetScreen = document.querySelector(`.${tabId}-screen`);
            if (targetScreen) {
                targetScreen.classList.add('active');
            }
        });
    });
}

// Alternador de planos (mensal/anual)
function initPricingToggle() {
    const pricingToggle = document.getElementById('pricing-toggle');
    const monthlyPrices = [297, 597, 1297];
    const annualPrices = [238, 478, 1038]; // -20%
    
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            const prices = document.querySelectorAll('.price');
            const isAnnual = this.checked;
            
            prices.forEach((priceElement, index) => {
                const price = isAnnual ? annualPrices[index] : monthlyPrices[index];
                priceElement.textContent = `R$ ${price}`;
                
                // Efeito de transição
                priceElement.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    priceElement.style.transform = 'scale(1)';
                }, 200);
            });
        });
    }
}

// Formulário de contato
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = new FormData(this);
            const formDataObj = Object.fromEntries(formData.entries());
            
            // Simular envio
            console.log('Formulário enviado:', formDataObj);
            
            // Feedback visual
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
            submitBtn.style.backgroundColor = '#4ade80';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
                this.reset();
            }, 3000);
        });
    }
}

// Botão Voltar ao Topo
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Criar partículas animadas
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posição aleatória
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Tamanho aleatório
        const size = Math.random() * 10 + 5;
        
        // Cor aleatória (tons de azul)
        const hue = Math.floor(Math.random() * 60) + 200; // 200-260 (azul)
        const opacity = Math.random() * 0.3 + 0.1;
        
        // Duração da animação
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            left: ${posX}%;
            top: ${posY}%;
            width: ${size}px;
            height: ${size}px;
            background: hsla(${hue}, 70%, 60%, ${opacity});
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Animação de elementos ao rolar
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animated-card, .animated-left, .animated-right, .animated-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Se for um card com counter, animar os números
                if (entry.target.querySelector('.counter')) {
                    setTimeout(animateCounters, 300);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Botões interativos do dashboard
function initDashboardInteractions() {
    // Botões do dashboard 3D
    const dashboardBtns = document.querySelectorAll('.dashboard-btn');
    dashboardBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Simular ação
            if (this.querySelector('.fa-plus')) {
                console.log('Adicionar novo item');
            } else if (this.querySelector('.fa-bell')) {
                console.log('Mostrar notificações');
            }
        });
    });
    
    // Botões no app do celular
    const appButtons = document.querySelectorAll('.app-btn-organizze');
    appButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            if (this.classList.contains('primary')) {
                console.log('Criar novo post');
            } else {
                console.log('Abrir analytics');
            }
        });
    });
    
    // Barras interativas do gráfico
    const chartBars = document.querySelectorAll('.bar, .bar-demo');
    chartBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            const height = this.style.height;
            this.dataset.originalHeight = height;
            this.style.height = '100%';
            this.style.transition = 'height 0.3s ease';
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.height = this.dataset.originalHeight;
        });
    });
}

// Efeito de digitação no título
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (!typingElement) return;
    
    // Reset para garantir que a animação funcione
    setTimeout(() => {
        typingElement.style.animation = 'none';
        setTimeout(() => {
            typingElement.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
        }, 10);
    }, 100);
}

// Setup de todos os eventos quando o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('GRS Pro Platform - Carregado');
    
    // Inicializar todas as funcionalidades
    initDemoTabs();
    initPricingToggle();
    initContactForm();
    initBackToTop();
    createParticles();
    initScrollAnimations();
    initDashboardInteractions();
    initTypingAnimation();
    
    // Atualizar navegação ativa ao rolar
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Chamar uma vez no carregamento
    
    // Configurar links âncora para scroll suave
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
    
    // Efeito de hover no logo
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
    
    // Efeito de header sticky
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '15px 0';
        }
    });
    
    // Log para debug
    console.log('Elementos animados encontrados:', document.querySelectorAll('.animated-card').length);
    console.log('Dashboard 3D encontrado:', document.querySelector('.dashboard-3d') ? 'Sim' : 'Não');
});