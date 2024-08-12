document.addEventListener('DOMContentLoaded', function() {
    const scrollPages = document.querySelectorAll('.scroll-page');

    scrollPages.forEach(page => {
        const folder = page.getAttribute('data-folder');
        loadImages(folder, page);
    });

    function loadImages(folder, page) {
        let i = 1;

        function loadNextImage() {
            const imgElement = new Image();
            imgElement.src = `${folder}/image${i}.png`;
            imgElement.alt = `Image from ${folder}`;

            imgElement.onload = () => {
                page.appendChild(imgElement);
                i++;
                loadNextImage(); // Try to load the next image
            };

            imgElement.onerror = () => {
                // Stop loading more images when no more are found
                if (i === 1) {
                    console.error(`No images found in ${folder}`);
                }
                return;
            };
        }

        loadNextImage();
    }
});
