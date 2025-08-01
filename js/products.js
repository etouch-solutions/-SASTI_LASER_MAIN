// Products page functionality

class ProductsPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupProductModal();
        this.setupProductHovers();
    }

    setupProductModal() {
        const modal = document.getElementById('productModal');
        const viewBtns = document.querySelectorAll('.view-btn');
        const closeBtn = document.querySelector('.close-modal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');

        // Product data
        const productData = {
            0: {
                title: 'Decorative Floral Panel',
                description: 'Intricate floral design cut from high-grade stainless steel. Perfect for architectural applications, interior decoration, and privacy screens. Features precise detailing and smooth edges.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipNRDLddCP_XJegR6Fnn9WtKs2wSHkmWHuC1m_dV=s1360-w1360-h1020-rw'
            },
            1: {
                title: 'Geometric Pattern Sheet',
                description: 'Modern geometric design suitable for contemporary architecture. Cut with precision to ensure perfect alignment and consistency across multiple panels.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipPLRNUnbBk1Cskqmrgt2EBcBwcqtQP7eyFEihDn=s1360-w1360-h1020-rw'
            },
            2: {
                title: 'Industrial Components',
                description: 'Precision-engineered parts for machinery and industrial equipment. Manufactured to exact specifications with tight tolerances for reliable performance.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipMGx9xTcZmjLIg4OwAF6BAKzGq6azgM-8Ddixg0=s1360-w1360-h1020-rw'
            },
            3: {
                title: 'Custom Brackets',
                description: 'Tailored mounting brackets designed for specific applications. Available in various materials and finishes to meet your project requirements.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipOhRReIUI2fHWJpxJXzfBK_geZHecBdRMro0nj_=s1360-w1360-h1020-rw'
            },
            4: {
                title: 'Artistic Metal Panels',
                description: 'Custom artistic designs for interior decoration and architectural features. Each piece is carefully crafted to showcase intricate details and artistic vision.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipOJI16SI-o5FjXuAF5nISoxdMljTAz3VztYAiz6=s1360-w1360-h1020-rw'
            },
            5: {
                title: 'Signage Letters',
                description: 'Professional cut letters for business signage and branding. Available in various fonts, sizes, and materials to match your brand identity.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipOVK9dBGNynH4DtT90z_N8iPjRMpRGk7PoPU47i=s1360-w1360-h1020-rw'
            },
            6: {
                title: 'Precision Parts',
                description: 'High-accuracy components for specialized equipment and machinery. Manufactured with advanced laser cutting technology for superior precision.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipM5cBxHPNXLVIj2Jguw9ueP_lRjgybv3sg6p-B6=s1360-w1360-h1020-rw'
            },
            7: {
                title: 'Decorative Screens',
                description: 'Elegant screening solutions combining functionality with aesthetic appeal. Perfect for privacy, ventilation, and architectural enhancement.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipPozySUo9pmDmzeHoikgGki09fSH64CiUD8pUsp=s1360-w1360-h1020-rw'
            }
        };

        // Open modal
        viewBtns.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const product = productData[index];
                if (product) {
                    modalImage.src = product.image;
                    modalTitle.textContent = product.title;
                    modalDescription.textContent = product.description;
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    setupProductHovers() {
        const productItems = document.querySelectorAll('.product-item');
        
        productItems.forEach(item => {
            // Simple hover effect
            item.style.transition = 'box-shadow 0.3s ease';
        });
    }
}

// Initialize products page functionality
document.addEventListener('DOMContentLoaded', () => {
    new ProductsPage();
});