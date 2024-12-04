

const form = document.getElementById('form')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const error_message = document.getElementById('error-message')


const all=[email_input, password_input];
all.forEach((input) => {
    input.addEventListener('input',()=>{
        if(input.parentElement.classList.contains('incorrect')){
            input.parentElement.classList.remove('incorrect')
            error_message.innerText='';
        }
    })
})


function loginValidation(){   
    let errors=[]

    if(email_input.value.trim()==''|| email_input.value == null){
        errors.push('Email is required')
        email_input.parentElement.classList.add('incorrect')

    }
    if(password_input.value.trim()==''|| password_input.value == null){
        errors.push('Password is required')
        password_input.parentElement.classList.add('incorrect')

    }
    return errors;
}

 form.addEventListener('submit',handleSubmit);

 function handleSubmit(e){
    e.preventDefault();

    const errors = loginValidation();

    if (errors.length > 0) { 
        error_message.innerText = errors.join('\n');
        return;
    }


    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => {
        data.forEach((user)=>{
            if(user.email === email_input.value && user.password === password_input.value)
            {
                alert('login successful!');
                window.location.href = 'dashboard.html';
            }else{
                error_message.innerText="check Your Credentials";
            }
        })
        .catch((error)=>{
            console.error(error);
            error_message.innerText = error.message;
        })
    })

}

