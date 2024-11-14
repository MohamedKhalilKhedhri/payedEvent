document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById('name');
    const countryInput = document.getElementById('country');
    const emailInput = document.getElementById('email');
    const nameError = document.getElementById('name-error');
    const nameLengthError = document.getElementById('name-length-error');
    const emailError = document.getElementById('email-error');
    const loader = document.querySelector('.loader');
    const submitText = document.getElementById('submit-text');
    const submitBtn = document.getElementById('submit');
    const eventMessage = document.querySelector('.event-message');


    const form = document.getElementById('myForm');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbw4MeVSBUAHJ0Me7P6FTMmYgOIXjyACSl-MnuyOhlNYutw8zpFsAaYnlwX4fdTan0M/exec';
    emailInput.classList.add('filledInput');
    nameInput.classList.add('filledInput');
    loader.style.display = 'none';
    submitBtn.disabled = false;
    submitBtn.style.cursor = "pointer";

    const eventDate = new Date("November 24, 2024 00:00:00").getTime();
    const eventEndDate = eventDate + (24 * 60 * 60 * 1000);  // 24 hours after event date

    // Update the countdown every 1 second
    const interval = setInterval(function () {
        // Get the current time
        const now = new Date().getTime();

        // Calculate the remaining time
        const remainingTime = eventDate - now;
        const remainingTimeAfterEvent = eventEndDate - now;

        // If the countdown has finished
        if (remainingTime < 0) {
            // If the event has started but not finished (24 hours after)
            if (remainingTimeAfterEvent > 0) {
                // Display "Event starts: Today" while it's within 24 hours of the event
                clearInterval(interval);
                eventMessage.innerHTML = "<p>Event starts: Today</p>";
                document.getElementById("days").textContent = '0';
                document.getElementById("hours").textContent = '0';
                document.getElementById("minutes").textContent = '0';
                document.getElementById("seconds").textContent = '0';
            } else {
                // If 24 hours have passed, show "Event Done"
                clearInterval(interval);
                eventMessage.innerHTML = "<p>Event Done</p>";
                document.getElementById("days").textContent = '0';
                document.getElementById("hours").textContent = '0';
                document.getElementById("minutes").textContent = '0';
                document.getElementById("seconds").textContent = '0';
            }
        } else {
            // Calculate days, hours, minutes, and seconds
            const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            // Display the countdown
            document.getElementById("days").textContent = days;
            document.getElementById("hours").textContent = hours;
            document.getElementById("minutes").textContent = minutes;
            document.getElementById("seconds").textContent = seconds;

            // If the event is today, show "Today" instead of the countdown
            if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
                clearInterval(interval);
                eventMessage.innerHTML = "<p>Event starts: Today</p>";  // Change to "Today"
            }
        }
    }, 1000);

    form.addEventListener('submit', e => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.style.cursor = "not-allowed";
        loader.style.display = 'inline-block';
        submitText.textContent = 'Submitting';

        let isValid = true;

        if (nameInput.value.trim()) {
            if (nameInput.value.length < 3 || nameInput.value.length > 30) {
                nameInput.classList.remove('filledInput');
                nameInput.classList.add('emptyInput');
                nameLengthError.style.display = 'block';
                nameError.style.display = 'none';
                isValid = false;
            } else {
                nameInput.classList.remove('emptyInput');
                nameInput.classList.add('filledInput');
                nameError.style.display = 'none';
                nameLengthError.style.display = 'none';
            }
        } else {
            nameInput.classList.remove('filledInput');
            nameInput.classList.add('emptyInput');
            nameError.style.display = 'block';
            nameLengthError.style.display = 'none';
            isValid = false;
        }

        if (emailInput.value.trim()) {
            emailInput.classList.remove('emptyInput');
            emailInput.classList.add('filledInput');
            emailError.style.display = 'none';
        } else {
            emailInput.classList.remove('filledInput');
            emailInput.classList.add('emptyInput');
            emailError.style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    loader.style.display = 'none';
                    submitText.textContent = 'Sign up';
                    swal({
                        text: "Thank you for your submission. We will notify you by email once the product is ready.",
                        icon: "success",
                        showCloseButton: true,
                        closeButtonAriaLabel: 'Close this alert',
                    });
                    nameInput.value = '';
                    emailInput.value = '';
                    countryInput.value = '';
                })
                .catch(error => {
                    loader.style.display = 'none';
                    submitText.textContent = 'Sign up';
                    swal({
                        text: "There was an error submitting the form. Please try again.",
                        icon: "warning",
                        showCloseButton: true,
                        closeButtonAriaLabel: 'Close this alert',
                    });
                    console.error('Error!', error.message);
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.style.cursor = "pointer";
                });
        } else {
            loader.style.display = 'none';
            submitText.textContent = 'Sign up';
            submitBtn.disabled = false;
            submitBtn.style.cursor = "pointer";
        }
    });
});
