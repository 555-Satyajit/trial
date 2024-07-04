document.addEventListener("DOMContentLoaded", function() {
    const galleryItems = document.querySelectorAll('.gallery-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-content');
    const closeBtn = document.querySelector('.close');

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            lightbox.style.display = "block";
            lightboxImage.src = this.src;
            document.getElementById('caption').innerText = this.alt;
        });
    });

    closeBtn.addEventListener('click', function() {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target !== lightboxImage) {
            lightbox.style.display = "none";
        }
    });
});
