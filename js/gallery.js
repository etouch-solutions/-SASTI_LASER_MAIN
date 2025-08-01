// Gallery page functionality

class GalleryPage {
    constructor() {
        this.currentImageIndex = 0;
        this.galleryItems = [];
        this.filteredItems = [];
        this.init();
    }

    init() {
        this.setupGalleryFilter();
        this.setupGalleryModal();
        this.setupGalleryHovers();
        this.collectGalleryItems();
    }

    collectGalleryItems() {
        this.galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
        this.filteredItems = [...this.galleryItems];
    }

    setupGalleryFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });

                // Update filtered items for modal navigation
                this.filteredItems = filter === 'all' 
                    ? [...this.galleryItems]
                    : this.galleryItems.filter(item => item.dataset.category === filter);
            });
        });
    }

    setupGalleryModal() {
        const modal = document.getElementById('galleryModal');
        const viewBtns = document.querySelectorAll('.gallery-view-btn');
        const closeBtn = modal.querySelector('.close-modal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        // Gallery data
        const galleryData = [
            {
                title: 'Decorative Peacock Panel',
                description: 'Intricate peacock design showcasing the precision and artistry of our laser cutting capabilities.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipOXHpXg-nLzRr8ca8iojkbg0BgfKJof5jC1FJZA=s1360-w1360-h1020-rw'
            },
            {
                title: 'Industrial Components',
                description: 'High-precision mechanical parts manufactured for industrial applications.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipPqEwE8PaykJr1J2XLepK7UJBGNIkgxRu5yOo2d=s1360-w1360-h1020-rw'
            },
            {
                title: 'Floral Art Panel',
                description: 'Custom artistic floral design demonstrating our capability in decorative metalwork.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipOC1aDiZWVhjqS5TDIZ-UCN46DOSk0r5uhXRN0G=s1360-w1360-h1020-rw'
            },
            {
                title: 'Geometric Pattern',
                description: 'Modern geometric design perfect for contemporary architectural applications.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipM5cBxHPNXLVIj2Jguw9ueP_lRjgybv3sg6p-B6=s1360-w1360-h1020-rw'
            },
            {
                title: 'Business Signage',
                description: 'Professional cut letters and logos for commercial branding applications.',
                image: "https://lh3.googleusercontent.com/p/AF1QipMUIXS9scAExBSGaB0fhWUBHphHvFTLReaUUMpA=s1360-w1360-h1020-rw"
            },
            {
                title: 'Precision Brackets',
                description: 'Custom mounting solutions engineered for specific industrial requirements.',
                image: "https://lh3.googleusercontent.com/p/AF1QipMc2iqiGcgJ25nOg60eTxKStQ2HnTY_EGxEv6Ly=s1360-w1360-h1020-rw"
            },
            {
                title: 'Mandala Design',
                description: 'Intricate mandala pattern showcasing detailed precision cutting capabilities.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipM2L6SyZCbo8wk_KL0UvjdDoPrCFJuwlBuddW37=s1360-w1360-h1020-rw'
            },
            {
                title: 'Architectural Screen',
                description: 'Elegant privacy screen combining functionality with aesthetic appeal.',
                image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nocpjUjJY0hjaPLSstA_Q9h1t_Rr9nMjx8sq2d2DLSO7H_Jn5o9b-wUhFnXwXcY5ibZWdtxZ78xw65HbN0kKcZB0NY5hi_WeZD82HORtSgglMva4PdjTJusCkjbK7oYyoIvPKObjKlyweY=s1360-w1360-h1020-rw'
            },
            {
                title: 'Company Logo',
                description: '3D cut company branding elements for professional business presentation.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipOp_MDMAHOl3WJXotVKE7Pgx4Bi2uI0pqAwoSNG=s1360-w1360-h1020-rw'
            },
            {
                title: 'Machine Parts',
                description: 'High-precision mechanical components for specialized industrial equipment.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipNG2MFUwbuACxGsrq7J5UKDxcejLNERfoOQYuFx=s1360-w1360-h1020-rw'
            },
            {
                title: 'Abstract Art Panel',
                description: 'Contemporary abstract design for modern architectural and interior applications.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipO0EvnidNyuxBy9kTO9eN-kZn1Kp4yI2xl_G7KI=s1360-w1360-h1020-rw'
            },
            {
                title: 'Decorative Border',
                description: 'Ornamental border design for architectural enhancement and decoration.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipN9XzkDzcPapRUdi49_ftmHdL4xcj3FZKUgoA2E=s1360-w1360-h1020-rw'
            },
            {
                title: 'Decorative Peacock Panel',
                description: 'Intricate peacock design showcasing the precision and artistry of our laser cutting capabilities.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipPAnRvpgyfWtpqMjDBcQdy2R9OkGqLXThd49cyL=s1360-w1360-h1020-rw'
            },
            {
                title: 'Industrial Components',
                description: 'High-precision mechanical parts manufactured for industrial applications.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipPBYZQ3IO1XYZofBynuF5A-xW8I_00Do2PhhYSR=s1360-w1360-h1020-rw'
            },
            {
                title: 'Floral Art Panel',
                description: 'Custom artistic floral design demonstrating our capability in decorative metalwork.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipN24ydXsg-0tqJaDnoQYkRP9oQ4brGfrtNGOuIW=s1360-w1360-h1020-rw'
            },
            {
                title: 'Geometric Pattern',
                description: 'Modern geometric design perfect for contemporary architectural applications.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipOZr642_EQAQ1omEJu8ddOu8Ag7Ng8qysmu_7DG=s1360-w1360-h1020-rw'
            },
            {
                title: 'Business Signage',
                description: 'Professional cut letters and logos for commercial branding applications.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipMSJVfn0NgTVgW4OWEwT9goc5Pt9MVkjH8fB4AT=s1360-w1360-h1020-rw'
            },
            {
                title: 'Precision Brackets',
                description: 'Custom mounting solutions engineered for specific industrial requirements.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipMhaU31i-tt9wWUMscHpY854fyPb1LDCuiYLWYC=s1360-w1360-h1020-rw'
            },
            {
                title: 'Mandala Design',
                description: 'Intricate mandala pattern showcasing detailed precision cutting capabilities.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipOs5GljefQE30yab2XVhGcUTrmbq7S53h6CGXvD=s1360-w1360-h1020-rw'
            },
            {
                title: 'Architectural Screen',
                description: 'Elegant privacy screen combining functionality with aesthetic appeal.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipNZ4hiWhqwdqhOyBRbUA74IgIT-j0H6PHBTEUTZ=s1360-w1360-h1020-rw'
            },
            {
                title: 'Company Logo',
                description: '3D cut company branding elements for professional business presentation.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipOykE7x5f074eHc31q9WgcVf0eLTI0cxfocB9ZC=s1360-w1360-h1020-rw'
            },
            {
                title: 'Machine Parts',
                description: 'High-precision mechanical components for specialized industrial equipment.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipOSkfvaaNSv19T5OADNNp7eviNztVv_ye5aXGEp=s1360-w1360-h1020-rw'
            },
            {
                title: 'Abstract Art Panel',
                description: 'Contemporary abstract design for modern architectural and interior applications.',
                image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq-hUVaSV2L3wKqeA3pheE_nZ3Ay8vPCfUMyXo4cNdby-UuB-L_7CvoHS8yQmka44851Hvw62NqBPM5E-NtKzIcmWy7qWF5S9xcSn5n2__Fsx8MdHXV3TlU2Uq5995hrer8UUlNTQ=s1360-w1360-h1020-rw'
            },
            {
                title: 'Decorative Border',
                description: 'Ornamental border design for architectural enhancement and decoration.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipPUCzstSu1rtyj3kThz9lI12RxOXfMrTSh4k-xx=s1360-w1360-h1020-rw'
            },
            {
                title: 'Decorative Peacock Panel',
                description: 'Intricate peacock design showcasing the precision and artistry of our laser cutting capabilities.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipOlDUn2n59DGxcsQ6luMireW2B3tc1J2Gtr5SDo=s1360-w1360-h1020-rw'
            },
            {
                title: 'Industrial Components',
                description: 'High-precision mechanical parts manufactured for industrial applications.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipOtZFXhzmK2_DfLVy6n07Qig6Zjt3AHzCr3EHsk=s1360-w1360-h1020-rw'
            },
            {
                title: 'Floral Art Panel',
                description: 'Custom artistic floral design demonstrating our capability in decorative metalwork.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipNSg4o_d_ZKlP5RCeIMrnrSoGF3XAkuC3bzUfw6=s1360-w1360-h1020-rw'
            },
            {
                title: 'Geometric Pattern',
                description: 'Modern geometric design perfect for contemporary architectural applications.',
                image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1'
            },
            {
                title: 'Business Signage',
                description: 'Professional cut letters and logos for commercial branding applications.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipMhGojMYj1cETmxyVmUE1rh9UUVEo4NTN9MFqWs=s1360-w1360-h1020-rw'
            },
            {
                title: 'Precision Brackets',
                description: 'Custom mounting solutions engineered for specific industrial requirements.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipNX8cYb7IDV2BTdOGFE0cLgGQgsoBS4qowIEENe=s1360-w1360-h1020-rw'
            },
            {
                title: 'Mandala Design',
                description: 'Intricate mandala pattern showcasing detailed precision cutting capabilities.',
                image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrpQonlngUC6hR9wM30HO7jEsCIGeWHZMBZv3gLaJAJFvPKN3GP9nnQTkJoK4BOiqOWfhiUAlmLpnhSu18AK9YC63eEbgm4BGpzPf9r7ArGXd7Za3bs6Tglz7UxRceIU0rdhzsK0Wjd3tN-=s1360-w1360-h1020-rw'
            },
            {
                title: 'Architectural Screen',
                description: 'Elegant privacy screen combining functionality with aesthetic appeal.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipOQ5HZhYVUCTiNUAowZJiDfsEapdBIXaQV-5Jnc=s1360-w1360-h1020-rw'
            },
            {
                title: 'Company Logo',
                description: '3D cut company branding elements for professional business presentation.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipMEJWHW4CPza88CpM-VKB7vTVQ2ocUzzl00OuK4=s1360-w1360-h1020-rw'
            },
            {
                title: 'Machine Parts',
                description: 'High-precision mechanical components for specialized industrial equipment.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipN4s8Vr1j_Aow2G4pmTVNz9ZEtFnsjMqd9YxpOn=s1360-w1360-h1020-rw'
            },
            {
                title: 'Abstract Art Panel',
                description: 'Contemporary abstract design for modern architectural and interior applications.',
                image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nplrZuIdOVgrfJy8cCgm5XRTjkKI0aK41XGoLc-NE9DOMEMzAFTl8VrjoIAhC1YbJeyDLa_u2BuLS4A8nsT9Ql4BLYYmHP3mz_JOmyXfq1D1Ekr4jlcrAhzyl76UXnZerQZktQEFiBVwRUb=s1360-w1360-h1020-rw'
            },
            {
                title: 'Decorative Border',
                description: 'Ornamental border design for architectural enhancement and decoration.',
                image: 'https://lh3.googleusercontent.com/p/AF1QipOYOXUTHMzRltRPxsl2UGE2-vfpUWa3WFn9BEMt=s1360-w1360-h1020-rw'
            }
        ];

        // Open modal
        viewBtns.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.currentImageIndex = index;
                this.showModalImage(galleryData[index]);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
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

        // Navigation buttons
        prevBtn.addEventListener('click', () => {
            this.currentImageIndex = (this.currentImageIndex - 1 + galleryData.length) % galleryData.length;
            this.showModalImage(galleryData[this.currentImageIndex]);
        });

        nextBtn.addEventListener('click', () => {
            this.currentImageIndex = (this.currentImageIndex + 1) % galleryData.length;
            this.showModalImage(galleryData[this.currentImageIndex]);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'block') {
                if (e.key === 'Escape') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else if (e.key === 'ArrowLeft') {
                    prevBtn.click();
                } else if (e.key === 'ArrowRight') {
                    nextBtn.click();
                }
            }
        });

        this.showModalImage = (data) => {
            modalImage.src = data.image;
            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;
        };
    }

    setupGalleryHovers() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const img = item.querySelector('img');
                img.style.transform = 'scale(1.1)';
            });

            item.addEventListener('mouseleave', () => {
                const img = item.querySelector('img');
                img.style.transform = 'scale(1)';
            });
        });

        // Video placeholders
        const videoPlaceholders = document.querySelectorAll('.video-placeholder');
        videoPlaceholders.forEach(placeholder => {
            placeholder.addEventListener('click', () => {
                alert('Video player would open here. Integration with video platform needed.');
            });
        });
    }
}

// Initialize gallery page functionality
document.addEventListener('DOMContentLoaded', () => {
    new GalleryPage();
});