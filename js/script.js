// Script for Contact Form Validation
document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".simple-form");

    const messageDisplay = document.getElementById("form-message");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (username === "" || email === "" || message === "") {
            messageDisplay.textContent = "Please fill in all fields.";
            messageDisplay.classList.remove("hidden");
            messageDisplay.classList.remove("success");
            messageDisplay.classList.add("fail");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            messageDisplay.textContent = "Please enter a valid email address.";
            messageDisplay.classList.remove("hidden");
            messageDisplay.classList.remove("success");
            messageDisplay.classList.add("fail");
            return;
        }

        messageDisplay.textContent = '✓ Message sent successfully!';
        messageDisplay.classList.remove("hidden");
        messageDisplay.classList.remove("fail");
        messageDisplay.classList.add("success");
        form.reset();
    });

// Projects Filter Script
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {

            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const selected = this.dataset.filter;

            projectCards.forEach(card => {
                if (selected === 'all' || card.dataset.category === selected) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Graduation Countdown
    const graduationDate = new Date('2027-05-15T00:00:00');

    function updateCountdown() {
        const now = new Date();
        const diff = graduationDate - now;

        if (diff <= 0) {
            document.getElementById('cd-days').textContent = '0';
            document.getElementById('cd-hours').textContent = '0';
            document.getElementById('cd-minutes').textContent = '0';
            document.getElementById('cd-seconds').textContent = '0';
            return;
        }

        const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('cd-days').textContent    = String(days).padStart(2, '0');
        document.getElementById('cd-hours').textContent   = String(hours).padStart(2, '0');
        document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});
