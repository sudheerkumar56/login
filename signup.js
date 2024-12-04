const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');


  
const all=[firstname_input, email_input, password_input];
all.forEach((input) => {
    input.addEventListener('input',()=>{
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect')
            error_message.innerText='';
        }
    })
})


function Validateform() {
    let errors = [];

    if (firstname_input.value.trim() === '' || firstname_input.value == null) {
        errors.push('First name is required');
        firstname_input.parentElement.classList.add('incorrect')

    }
    if (email_input.value.trim() === '' || email_input.value == null) {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect')

    }
    if (password_input.value.trim() === '' || password_input.value == null) {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect')
    } else if (password_input.value.length < 8) {
        errors.push('Password must have at least 8 characters');
    }
    if (repeat_password_input.value.trim() === '' || repeat_password_input.value == null) {
    } else if (password_input.value !== repeat_password_input.value) {
        errors.push('Passwords do not match');
    }

    console.log('Validation errors:', errors);
    return errors;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const errors = Validateform();

    if (errors.length > 0) { 
        error_message.innerText = errors.join('\n');
        return;
    }

    const users = {
        firstname: firstname_input.value,
        email: email_input.value,
        password: password_input.value,
    };

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(users)
    })
        .then(  (response) => {
            if (!response.ok) {
                alert('Error creating user');
                return; 
             } else {
                window.location.href = 'login.html'; 
                alert('User created successfully');
            }
        })
        .catch((error) => {
            error_message.innerText = error.message;
        });
});
