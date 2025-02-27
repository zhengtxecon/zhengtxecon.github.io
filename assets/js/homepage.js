document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js for the hero section background effect
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#756aff", "#00d4ff", "#4b45a1", "#ffffff"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#756aff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Implement glitch effect for titles
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(element => {
        element.setAttribute('data-text', element.textContent);
    });

    // Animate stats counters
    animateCounters();

    // Implement smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Implement parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const parallaxEffect = scrollPosition * 0.4;
            heroSection.style.backgroundPosition = `center ${parallaxEffect}px`;
        });
    }

    // Implement intersection observer for fade-in animation
    const fadeElements = document.querySelectorAll('.research-card, .project-card, .post-card, .paper');
    
    const fadeOptions = {
        root: null,
        threshold: 0.2,
        rootMargin: "0px"
    };
    
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, fadeOptions);
    
    fadeElements.forEach(element => {
        element.classList.add('fade-element');
        fadeObserver.observe(element);
    });

    // Implement typing effect for tagline
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect when hero section is in view
        const heroObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(typeWriter, 500);
            }
        });
        
        heroObserver.observe(document.querySelector('.hero-content'));
    }

    // Implement data visualization for research areas (simplified)
    const researchAreas = [
        { name: "Machine Learning", papers: 8, citations: 120 },
        { name: "Computational Economics", papers: 7, citations: 95 },
        { name: "Data Science", papers: 5, citations: 75 }
    ];

    if (document.getElementById('research-chart')) {
        createSimpleBarChart('research-chart', researchAreas);
    }

    // Add math equations rendering if MathJax is available
    if (typeof MathJax !== 'undefined') {
        const mathElements = document.querySelectorAll('.math-equation');
        mathElements.forEach(element => {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, element]);
        });
    }
});

// Function to animate counters
function animateCounters() {
    const counters = document.querySelectorAll('#publications-count, #projects-count, #collaborations-count');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000; // 2 seconds
        const steps = 50;
        const stepTime = duration / steps;
        const increment = target / steps;
        let current = 0;
        let stepCount = 0;
        
        const updateCounter = () => {
            stepCount++;
            current += increment;
            
            if (stepCount < steps) {
                counter.textContent = Math.floor(current) + '+';
                setTimeout(updateCounter, stepTime);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        // Only start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(updateCounter, 400);
                observer.unobserve(entries[0].target);
            }
        });
        
        observer.observe(counter);
    });
}

// Simple bar chart creation function
function createSimpleBarChart(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const chartWidth = canvas.width;
    const chartHeight = canvas.height;
    const barWidth = (chartWidth / data.length) * 0.8;
    const spacing = (chartWidth / data.length) * 0.2;
    
    // Find max value for scaling
    const maxValue = Math.max(...data.map(item => item.papers));
    
    // Draw bars
    data.forEach((item, index) => {
        const barHeight = (item.papers / maxValue) * chartHeight;
        const x = index * (barWidth + spacing) + spacing / 2;
        const y = chartHeight - barHeight;
        
        // Draw bar
        ctx.fillStyle = 'rgba(232, 73, 29, 0.8)'; // Use secondary color
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw label
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.name, x + barWidth / 2, chartHeight + 20);
        
        // Draw value
        ctx.fillText(item.papers, x + barWidth / 2, y - 5);
    });
}

// Add a modern code animation for the computer scientist theme
function initCodeAnimation() {
    const codeContainer = document.getElementById('code-animation');
    if (!codeContainer) return;
    
    const codeLines = [
        "function economicModel(data, params) {",
        "  // Initialize model variables",
        "  const markets = data.markets;",
        "  const agents = data.agents;",
        "  const equilibrium = { price: 0, quantity: 0 };",
        "",
        "  // Run simulation iterations",
        "  for (let i = 0; i < params.iterations; i++) {",
        "    // Update agent behaviors",
        "    agents.forEach(agent => {",
        "      agent.updateStrategy(markets, params.learningRate);",
        "    });",
        "",
        "    // Calculate market clearing prices",
        "    equilibrium.price = findEquilibrium(markets, agents);",
        "    equilibrium.quantity = calculateQuantity(equilibrium.price);",
        "  }",
        "",
        "  return {",
        "    equilibrium,",
        "    welfare: calculateWelfare(agents, equilibrium),",
        "    efficiency: measureEfficiency(markets, equilibrium)",
        "  };",
        "}"
    ];
    
    let i = 0;
    
    function typeLine() {
        if (i < codeLines.length) {
            const codeLine = document.createElement('div');
            codeLine.className = 'code-line';
            
            let j = 0;
            const lineText = codeLines[i];
            
            function typeChar() {
                if (j < lineText.length) {
                    codeLine.textContent += lineText.charAt(j);
                    j++;
                    setTimeout(typeChar, 20);
                } else {
                    i++;
                    setTimeout(typeLine, 100);
                }
            }
            
            codeContainer.appendChild(codeLine);
            typeChar();
        }
    }
    
    // Start typing when the code container is in view
    const codeObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            typeLine();
            codeObserver.unobserve(entries[0].target);
        }
    });
    
    codeObserver.observe(codeContainer);
}

// Initialize the code animation if the container exists
window.addEventListener('load', function() {
    initCodeAnimation();
    
    // Add floating graphs animation effect if canvas is supported
    if (document.getElementById('floating-graphs')) {
        initFloatingGraphs();
    }
});

// Floating economic graphs animation
function initFloatingGraphs() {
    const canvas = document.getElementById('floating-graphs');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = 300;
    
    // Create graph objects
    const graphs = [];
    const graphTypes = ['line', 'bar', 'scatter', 'pie'];
    
    for (let i = 0; i < 10; i++) {
        graphs.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 20 + Math.random() * 40,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            type: graphTypes[Math.floor(Math.random() * graphTypes.length)],
            opacity: 0.1 + Math.random() * 0.3
        });
    }
    
    function drawGraphs() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        graphs.forEach(graph => {
            // Update position
            graph.x += graph.speedX;
            graph.y += graph.speedY;
            
            // Bounce off edges
            if (graph.x < 0 || graph.x > canvas.width) graph.speedX *= -1;
            if (graph.y < 0 || graph.y > canvas.height) graph.speedY *= -1;
            
            // Draw graph symbol
            ctx.globalAlpha = graph.opacity;
            
            switch(graph.type) {
                case 'line':
                    drawLineGraph(ctx, graph.x, graph.y, graph.size);
                    break;
                case 'bar':
                    drawBarGraph(ctx, graph.x, graph.y, graph.size);
                    break;
                case 'scatter':
                    drawScatterGraph(ctx, graph.x, graph.y, graph.size);
                    break;
                case 'pie':
                    drawPieGraph(ctx, graph.x, graph.y, graph.size);
                    break;
            }
            
            ctx.globalAlpha = 1;
        });
        
        requestAnimationFrame(drawGraphs);
    }
    
    // Start animation
    drawGraphs();
}

// Helper functions to draw different types of graph symbols
function drawLineGraph(ctx, x, y, size) {
    ctx.strokeStyle = '#e8491d';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - size/2, y + size/4);
    ctx.lineTo(x - size/4, y - size/4);
    ctx.lineTo(x, y + size/3);
    ctx.lineTo(x + size/4, y - size/3);
    ctx.lineTo(x + size/2, y + size/4);
    ctx.stroke();
}

function drawBarGraph(ctx, x, y, size) {
    ctx.fillStyle = '#35424a';
    const barWidth = size / 5;
    ctx.fillRect(x - size/2, y, barWidth, -size/2);
    ctx.fillRect(x - size/4, y, barWidth, -size/3);
    ctx.fillRect(x, y, barWidth, -size/1.5);
    ctx.fillRect(x + size/4, y, barWidth, -size/2);
}

function drawScatterGraph(ctx, x, y, size) {
    ctx.fillStyle = '#e8491d';
    const dotSize = size / 8;
    
    for (let i = 0; i < 5; i++) {
        const dx = (Math.random() - 0.5) * size;
        const dy = (Math.random() - 0.5) * size;
        ctx.beginPath();
        ctx.arc(x + dx, y + dy, dotSize, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawPieGraph(ctx, x, y, size) {
    const radius = size / 2;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, 0, Math.PI * 0.7);
    ctx.lineTo(x, y);
    ctx.fillStyle = '#35424a';
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, Math.PI * 0.7, Math.PI * 1.5);
    ctx.lineTo(x, y);
    ctx.fillStyle = '#e8491d';
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, Math.PI * 1.5, Math.PI * 2);
    ctx.lineTo(x, y);
    ctx.fillStyle = '#4cAf50';
    ctx.fill();
}