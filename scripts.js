document.addEventListener("DOMContentLoaded", () => {
    const whatsupButton = document.getElementById("cta2");
    const nameInput = document.getElementById('name');
    const countryInput = document.getElementById('country');
    const emailInput = document.getElementById('email');
    const nameError = document.getElementById('name-error');
    const nameLengthError = document.getElementById('name-length-error');
    const emailError = document.getElementById('email-error');
    const loader = document.querySelector('.loader');
    const submitText = document.getElementById('submit-text');
    const submitBtn = document.getElementById('submit') 
  
    whatsupButton.addEventListener("click", () => {
        const phoneNumber = "+9613520173"; 
        const url = `https://wa.me/${phoneNumber}`; 
        window.open(url, "_blank"); 
    });

    

    const form = document.getElementById('myForm');

    const scriptURL = 'https://script.google.com/macros/s/AKfycbw4MeVSBUAHJ0Me7P6FTMmYgOIXjyACSl-MnuyOhlNYutw8zpFsAaYnlwX4fdTan0M/exec';

    emailInput.classList.add('filledInput');
    nameInput.classList.add('filledInput'); 
    loader.style.display = 'none';
    submitBtn.disabled = false
    submitBtn.style.cursor="pointer"
    form.addEventListener('submit', e => {
        e.preventDefault(); 
        submitBtn.disabled = true;
        submitBtn.style.cursor="not-allowed";
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
            fetch(scriptURL, { method: 'POST', body: new FormData(form)})
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
                }).finally(()=>{
                            submitBtn.disabled = false
                            submitBtn.style.cursor="pointer"
                })
        } else {
            loader.style.display = 'none';
            submitText.textContent = 'Sign up';
            submitBtn.disabled = false
            submitBtn.style.cursor="pointer"
        }


    });

    
});

