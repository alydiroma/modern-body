const videoBtns = document.querySelectorAll('.testimonials-video-btn');

videoBtns.forEach((btn) => {
   btn.addEventListener('click', function(e) {
        const videoImage = e.target.nextElementSibling;

        e.target.style.display='none';
        videoImage.style.display='none';
    });
});