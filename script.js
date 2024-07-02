window.addEventListener('scroll', function() {
    const heroHeight = document.querySelector('.hero').offsetHeight;
    const floatingNav = document.getElementById('floatingNav');
    const threshold = heroHeight - 100; // 100px before the end of the hero section
    if (window.scrollY >= threshold) {
        floatingNav.classList.remove('hidden');
    } else {
        floatingNav.classList.add('hidden');
    }
});

// Load content from JSON
document.addEventListener('DOMContentLoaded', function() {
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById('content');
            data.sections.forEach(section => {
                const sectionDiv = document.createElement('div');
                sectionDiv.id = section.id;
                sectionDiv.className = 'content-section';

                const title = document.createElement('h2');
                title.textContent = section.title;
                sectionDiv.appendChild(title);

                section.paragraphs.forEach(paragraph => {
                    const p = document.createElement('p');
                    p.textContent = paragraph;
                    sectionDiv.appendChild(p);
                });

                section.images.forEach(image => {
                    const img = document.createElement('img');
                    img.src = image.src;
                    img.alt = image.alt;
                    img.className = 'zoomable-image';
                    sectionDiv.appendChild(img);
                });

                if (section.equations) {
                    section.equations.forEach(equation => {
                        const eq = document.createElement('p');
                        eq.className = 'equation';
                        eq.textContent = equation;
                        sectionDiv.appendChild(eq);
                    });
                }

                content.appendChild(sectionDiv);
            });

            // Add event listeners for image zoom
            const images = document.querySelectorAll('.zoomable-image');
            const modal = document.getElementById('myModal');
            const modalImg = document.getElementById('img01');
            const close = document.getElementsByClassName('close')[0];

            images.forEach(img => {
                img.addEventListener('click', function() {
                    modal.style.display = 'block';
                    modalImg.src = this.src;
                });
            });

            close.onclick = function() {
                modal.style.display = 'none';
            };

            window.onclick = function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            };
        })
        .catch(error => console.error('Error loading content:', error));
});
