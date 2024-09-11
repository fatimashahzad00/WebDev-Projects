// Smooth Scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        })
    })
})

// form submission handling
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    var formData = new FormData(this);
    var contactData = {};
    console.log('Form Submited');
    for (var [key, value] of formData.entries()) {
        contactData[key] = value
    }

    // store the form data in local storage
    localStorage.setItem('contactData', JSON.stringify(contactData));
    console.log("Form submitted and data saved to local storage", contactData);


    this.reset();
    alert('Thank you for your message! I\'ll get back to you soon ')

})

// retrieve the contact data from local storage
var storedData = localStorage.getItem('contactData');
if (storedData) {
    console.log('Stored Contact Data:', JSON.parse(storedData));
} else {
    console.log('No contact data found');

}

document.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('visible');
        }
    });
});

// Lightbox for Project Images
document.querySelectorAll('.project img').forEach(img => {
    img.addEventListener('click', () => {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
            </div>
        `;
        document.body.appendChild(lightbox);

        lightbox.querySelector('.close').addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });
    });
});

// Scroll to Top Button
const scrollTopButton = document.createElement('button');
scrollTopButton.textContent = '↑';
scrollTopButton.classList.add('scroll-top');
document.body.appendChild(scrollTopButton);

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.style.display = 'block';
    } else {
        scrollTopButton.style.display = 'none';
    }
});