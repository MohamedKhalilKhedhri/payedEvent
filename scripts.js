document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const nameError = document.getElementById('name-error');
    const nameLengthError = document.getElementById('name-length-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const phoneErrorFormat = document.getElementById('phone-format-error');
    const loader = document.querySelector('.loader');
    const submitText = document.getElementById('submit-text');
    const submitBtn = document.getElementById('submit');
    const eventMessage = document.querySelector('.event-message');
    const form = document.getElementById('myForm');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz5aF9wCCVm9Imcvjmci5xFKcBhtnVXZjRroJCypXDrDo71QbOEGMzg9HQVnDn5c1Y1/exec';

    loader.style.display = 'none';
    submitBtn.disabled = false;
    submitBtn.style.cursor = "pointer";

    const eventDate = new Date("November 23, 2024 00:00:00").getTime();
    const eventEndDate = eventDate + (24 * 60 * 60 * 1000);  // 24 hours after event date

    // Update the countdown every 1 second
    const interval = setInterval(function () {
        const now = new Date().getTime();
        const remainingTime = eventDate - now;
        const remainingTimeAfterEvent = eventEndDate - now;

        if (remainingTime < 0) {
            if (remainingTimeAfterEvent > 0) {
                clearInterval(interval);
                eventMessage.innerHTML = "<p>الفعالية تبدأ اليوم في الساعة 7 مساءً بتوقيت الكويت على Microsoft Teams</p>";
                displayCountdown(0, 0, 0, 0);
            } else {
                clearInterval(interval);
                eventMessage.innerHTML = "<p>انتهت الفعالية</p>";
                displayCountdown(0, 0, 0, 0);
            }
        } else {
            const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            // Display the countdown with leading zeros
            displayCountdown(days, hours, minutes, seconds);
        }
    }, 1000);

    // Function to display countdown with leading zeros
    function displayCountdown(days, hours, minutes, seconds) {
        document.getElementById("days").textContent = String(days).padStart(2, '0');
        document.getElementById("hours").textContent = String(hours).padStart(2, '0');
        document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
        document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.style.cursor = "not-allowed";
        loader.style.display = 'inline-block';
        submitText.textContent = 'جارٍ التسجيل';

        let isValid = true;

        // Validate Name
        if (nameInput.value.trim()) {
            if (nameInput.value.length < 3 || nameInput.value.length > 30) {
                nameLengthError.style.display = 'block';
                nameError.style.display = 'none';
                isValid = false;
            } else {
                nameError.style.display = 'none';
                nameLengthError.style.display = 'none';
            }
        } else {
            nameError.style.display = 'block';            
            nameLengthError.style.display = 'none';
            isValid = false;
        }

        // Validate Email
        if (emailInput.value.trim()) {
            emailError.style.display = 'none';
        } else {
            emailError.style.display = 'block';
            isValid = false;
        }

        // Validate Phone number for Kuwait (+965)
        if (phoneInput.value.trim()) {
            const phonePattern = /^[+]965\d{8}$/;
            if (phonePattern.test(phoneInput.value)) {
                phoneError.style.display = 'none';
                phoneErrorFormat.style.display = 'none';
            } else {
                phoneError.style.display = 'none';
                phoneErrorFormat.style.display = 'block';
                isValid = false;
            }
        } else {
            phoneError.style.display = 'block';
            phoneErrorFormat.style.display = 'none';
            isValid = false;
        }

        if (isValid) {
            const formData = new FormData(form);
            fetch(scriptURL, {
                method: 'POST',
                body: formData,
            })
            .then(response => {
                swal("تم!", "لقد تم التسجيل بنجاح!", "success");
                form.reset();  // Reset the form
                loader.style.display = 'none';
                submitText.textContent = 'احجز مكانك الآن';
                submitBtn.disabled = false;
                submitBtn.style.cursor = "pointer";
            })
            .catch(error => {
                swal("خطأ!", "حدثت مشكلة أثناء التسجيل. يرجى المحاولة مرة أخرى.", "error");
                loader.style.display = 'none';
                submitText.textContent = 'احجز مكانك الآن';
                submitBtn.disabled = false;
                submitBtn.style.cursor = "pointer";
            });
        } else {
            loader.style.display = 'none';
            submitText.textContent = 'احجز مكانك الآن';
            submitBtn.disabled = false;
            submitBtn.style.cursor = "pointer";
        }
    });
});
