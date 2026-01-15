// Sistema de Partículas para Background

class ParticlesSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.particles = [];
        this.particleCount = 50;
        this.colors = [
            'rgba(67, 97, 238, 0.2)',    // Primary blue
            'rgba(114, 9, 183, 0.15)',   // Secondary purple
            'rgba(247, 37, 133, 0.1)',   // Accent pink
            'rgba(76, 201, 240, 0.15)'   // Success blue
        ];
        
        this.init();
    }
    
    init() {
        // Criar partículas iniciais
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
        
        // Animar partículas
        this.animate();
        
        // Reposicionar partículas ao redimensionar
        window.addEventListener('resize', () => this.handleResize());
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Configurações aleatórias
        const size = Math.random() * 15 + 5;
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 25 + 15;
        const delay = Math.random() * 5;
        const blur = Math.random() * 10;
        
        // Aplicar estilos
        particle.style.cssText = `
            position: absolute;
            left: ${posX}%;
            top: ${posY}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            filter: blur(${blur}px);
            opacity: 0.3;
            pointer-events: none;
            z-index: 0;
        `;
        
        // Adicionar ao container
        this.container.appendChild(particle);
        
        // Armazenar referência
        this.particles.push({
            element: particle,
            x: posX,
            y: posY,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            size: size,
            color: color,
            rotation: Math.random() * 360
        });
    }
    
    animate() {
        const animateFrame = () => {
            this.particles.forEach(particle => {
                // Atualizar posição
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Rotação
                particle.rotation += 0.5;
                
                // Reaparecer do outro lado quando sair da tela
                if (particle.x > 100) particle.x = 0;
                if (particle.x < 0) particle.x = 100;
                if (particle.y > 100) particle.y = 0;
                if (particle.y < 0) particle.y = 100;
                
                // Aplicar transformações
                particle.element.style.left = `${particle.x}%`;
                particle.element.style.top = `${particle.y}%`;
                particle.element.style.transform = `rotate(${particle.rotation}deg)`;
                
                // Efeito de pulsação
                const pulse = Math.sin(Date.now() / 1000 + particle.x) * 0.2 + 0.8;
                particle.element.style.opacity = 0.2 * pulse;
                particle.element.style.transform = `rotate(${particle.rotation}deg) scale(${pulse})`;
            });
            
            requestAnimationFrame(animateFrame);
        };
        
        animateFrame();
    }
    
    handleResize() {
        // Manter partículas proporcionalmente posicionadas
        this.particles.forEach(particle => {
            particle.element.style.left = `${particle.x}%`;
            particle.element.style.top = `${particle.y}%`;
        });
    }
}

// Inicializar sistema de partículas quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    new ParticlesSystem('particles');
});