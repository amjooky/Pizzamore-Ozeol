/**
 * Pizza More — Glassmorphism Grid Gallery
 */

const RAW_MENU = [
    {
        category: 'Classiques',
        items: [
            { name: 'Della Mamma',  badge: '🌊 Méditerranéenne', ingredients: 'Sauce tomate, mozzarella, thon, persil, tomates, olives.', prices: { M: '18.9', L: '37.9', XL: '72.9' }, image: 'pizzass/della mamma pizza.jpg' },
            { name: 'Perfetto',     badge: '👑 N°1 des Ventes',   ingredients: 'Sauce tomate, mozzarella, pepperoni, Grana Padano.', prices: { M: '18.9', L: '37.9', XL: '72.9' }, image: 'pizzass/670416161_17944344393160622_8557261601981723518_n.jpg' },
            { name: 'Della Nonna', badge: '🪵 Fumée Artisanale', ingredients: 'Sauce tomate, mozzarella, jambon fumé, champignons, Grana Padano.', prices: { M: '18.9', L: '37.9', XL: '72.9' }, image: 'pizzass/della nona.png' }
        ]
    },
    {
        category: 'Gourmandes',
        items: [
            { name: 'Tenero',   badge: '🥩 Bresaola Italienne',  ingredients: 'Sauce tomate, mozzarella, roquette, bresaola, tomates cerises, Grana Padano, noix, sauce balsamique.', prices: { M: '19.9', L: '39.9', XL: '77.9' }, image: 'pizzass/bersawla pizza.jpg' },
            { name: 'Oro Nero', badge: '🖤 Truffe Noire',    ingredients: 'Sauce blanche, mozzarella, champignons, sauce à la truffe, roquette.', prices: { M: '19.9', L: '39.9', XL: '77.9' }, image: 'pizzass/avec roquette .jpg' },
            { name: 'Oro Nero', badge: '🖤 Truffe Noire',    ingredients: 'Sauce blanche, mozzarella, champignons, sauce à la truffe, roquette.', prices: { M: '19.9', L: '39.9', XL: '77.9' }, image: 'pizzass/avec roquette .jpg' }
        ]
    },
    {
        category: 'Spéciales',
        items: [
            { name: 'Tutti Formaggi', badge: '🧀 6 Fromages', ingredients: 'Sauce blanche, mozzarella, gruyère, gouda Kaiser, raclette, roquefort.', prices: { M: '19.9', L: '39.9', XL: '77.9' }, image: 'pizzass/670416161_17944344393160622_8557261601981723518_n.jpg' },
            { name: 'Mamma Mia',      badge: '🌿 Pesto Frais',      ingredients: 'Sauce blanche, mozzarella, poulet, champignons, pesto.', prices: { M: '19.9', L: '39.9', XL: '77.9' }, image: 'pizzass/avec pesto .jpg' },
            { name: 'Speziato', badge: '🌶️ Piquante', ingredients: 'Sauce tomate, mozzarella, poulet épicé, piment, citron.', prices: { M: '19.9', L: '39.9', XL: '77.9' }, image: 'pizzass/speziato.jpg' }
        ]
    },
    {
        category: 'Signature',
        items: [
            { name: 'Salmone',      badge: '🐟 Saumon Fumé', ingredients: 'Sauce blanche, mozzarella, saumon fumé, pistaches concassées, Grana Padano.', prices: { M: '24.9', L: '48.9', XL: '92.9' }, image: 'pizzass/pizzasaumon.jpg' },
            { name: 'Pizza Burger', badge: '🍔 Fusion Unique', ingredients: 'Sauce tomate, mozzarella, viande hachée, oignons caramélisés, cheddar, sauce burger.', prices: { M: '24.9', L: '48.9', XL: '92.9' }, image: 'pizzass/della mamma pizza.jpg' },
            { name: 'Poulet fumée', badge: '🍗 Poulet Fumé', ingredients: 'Sauce blanche, roquette, poulet fumée, tomate cerise, mozzarella cerise, sauce du chef, Grana Padano.', prices: { M: '24.9', L: '48.9', XL: '92.9' }, image: 'pizzass/avec pesto .jpg' }
        ]
    }
];

const ALL_ITEMS = RAW_MENU.flatMap(cat => 
    cat.items.map(item => ({ ...item, categoryName: cat.category }))
);

const $loader     = document.getElementById('loader');
const $hero       = document.getElementById('hero');
const $enterBtn   = document.getElementById('enterMenu');
const $app        = document.getElementById('app');
const $menuGrid   = document.getElementById('menuGrid');

window.addEventListener('DOMContentLoaded', () => {
    renderGrid();
    setupScrollEffects();
    
    setTimeout(() => {
        $loader.classList.add('hidden');
        triggerSmoothReveal();
    }, 1500);

    $enterBtn.addEventListener('click', () => {
        $hero.style.opacity = '0';
        $hero.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            $hero.style.display = 'none';
            $app.classList.add('visible');
            window.scrollTo(0, 0);
            triggerGridAnimations();
        }, 600);
    });
});

function triggerSmoothReveal() {
    const elements = document.querySelectorAll('.reveal-text');
    elements.forEach((el, i) => {
        setTimeout(() => el.classList.add('active'), 300 + (i * 200));
    });
}

function renderGrid() {
    $menuGrid.innerHTML = '';
    let currentCat = '';
    
    ALL_ITEMS.forEach((item, index) => {
        if (item.categoryName !== currentCat) {
            currentCat = item.categoryName;
            const header = document.createElement('div');
            header.className = 'grid-category-header';
            header.innerHTML = `<h2>${currentCat}</h2><div class="header-line"></div>`;
            $menuGrid.appendChild(header);
        }

        const card = document.createElement('div');
        card.className = 'grid-card hidden-card';
        
        let badgeClass = '';
        if (item.badge) {
            const b = item.badge.toLowerCase();
            if (b.includes('piquante') || b.includes('spicy') || b.includes('hot')) badgeClass = 'badge-hot';
            else if (b.includes('pesto') || b.includes('new') || b.includes('méditerranéenne')) badgeClass = 'badge-new';
            else if (b.includes('truffe') || b.includes('limited') || b.includes('exclusive') || b.includes('fusion')) badgeClass = 'badge-limited';
            else badgeClass = 'badge-gold'; // N°1, Signature, Fumée, 6 Fromages, Saumon, Bresaola
        }

        card.innerHTML = `
            <div class="card-image-box">
                <img src="${item.image}" alt="${item.name}" class="parallax-img" loading="lazy">
                ${item.badge ? `<span class="card-badge ${badgeClass}">${item.badge}</span>` : ''}
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.name}</h3>
                <p class="card-ingredients">${item.ingredients}</p>
                <div class="card-footer">
                    <div class="card-prices">
                        ${Object.entries(item.prices).map(([size, val]) => `
                            <div class="price-item">
                                <span class="s">${size}</span>
                                <span class="v">${val}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        $menuGrid.appendChild(card);
    });
}

function triggerGridAnimations() {
    const cards = document.querySelectorAll('.grid-card');
    cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('reveal'), i * 100);
    });
}

function setupScrollEffects() {
    const a1 = document.querySelector('.a1');
    const a2 = document.querySelector('.a2');
    
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        if (a1) a1.style.transform = `translateY(${scroll * 0.2}px)`;
        if (a2) a2.style.transform = `translateY(${scroll * -0.15}px)`;
        
        const images = document.querySelectorAll('.parallax-img');
        images.forEach(img => {
            const rect = img.parentElement.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const shift = (rect.top / window.innerHeight) * 30;
                img.style.transform = `scale(1.1) translateY(${shift}px)`;
            }
        });
        
        const btt = document.getElementById('backToTop');
        if (btt) {
            if (scroll > 500) btt.classList.add('visible');
            else btt.classList.remove('visible');
        }
    });
}

document.addEventListener('click', e => {
    if (e.target.id === 'backToTop' || e.target.parentElement?.id === 'backToTop') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
