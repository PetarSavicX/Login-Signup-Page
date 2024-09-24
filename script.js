const loginState = 1;
const signupState = 2;

const apiKey = 'AIzaSyAp6a5TQWeCYyiu6pgY4ATsOdcnvhYgQM4';
const loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
const signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

let state = loginState;

window.onload = function(){
    onStateChangeStyle(state);
    onStateChangeText(state);
}

const cWrapper = document.getElementById('cWrapper');
const colorBg = document.getElementById('colorBg');
const toggleStateWrapper = document.getElementById('toggleStateWrapper');

const heading = document.getElementById('heading');
const toggleStateParagraph = document.getElementById('toggleStateParagraph');
const buttonSubmit = document.getElementById('submit');

const statusHeading = document.getElementById('status');

function onChangeState(){
    if(state == loginState){
        state = signupState;
    }
    else if(state == signupState){
        state = loginState;
    }
    onStateChangeStyle(state);
    setTimeout(()=>{
        onStateChangeText(state);
    },480);
}

function onStateChangeStyle(state){
    if(state == loginState){
        changeStyleToLogIn();
    } else if(state == signupState) {
        changeStyleToSignUp()
    }
}

function onStateChangeText(state){
    if(state == loginState){
        changeTextToLogIn();
    } else if(state == signupState) {
        changeTextToSignUp()
    }
}

function changeStyleToLogIn(){
    //Form to the left
    if(cWrapper.classList.contains('right')){
        cWrapper.style.animation = 'disapear 500ms ease-out';
        setTimeout(()=>{
            cWrapper.classList.remove('right');
            cWrapper.classList.add('left');
            cWrapper.style.animation = '';
        },480);
    } else { cWrapper.classList.add('left'); }

    //Color bg to the right
    if(colorBg.classList.contains('color-background-left')){
        colorBg.classList.add('color-background-right');
        colorBg.classList.remove('color-background-left');
    } else { colorBg.classList.add('color-background-right'); }

    //Toggle state to the right
    if(toggleStateWrapper.classList.contains('left')){
        toggleStateWrapper.style.animation = 'disapear 500ms ease-out';
        setTimeout(()=>{
            toggleStateWrapper.classList.remove('left');
            toggleStateWrapper.classList.add('right');
            toggleStateWrapper.style.animation = '';
        },480);
    } else { toggleStateWrapper.classList.add('right'); }
}

function changeStyleToSignUp(){
    //Form to the right
    if(cWrapper.classList.contains('left')){
        cWrapper.style.animation = 'disapear 500ms ease-out';
        setTimeout(()=>{
            cWrapper.classList.remove('left');
            cWrapper.classList.add('right');
            cWrapper.style.animation = '';
        },480);
    }

    //Color bg to the left
    if(colorBg.classList.contains('color-background-right')){
        colorBg.classList.add('color-background-left');
        colorBg.classList.remove('color-background-right');
    } else { colorBg.classList.add('color-background-left'); }

    //Toggle state to the left
    if(toggleStateWrapper.classList.contains('right')){
        toggleStateWrapper.style.animation = 'disapear 500ms ease-out';
        setTimeout(()=>{
            toggleStateWrapper.classList.remove('right');
            toggleStateWrapper.classList.add('left');
            toggleStateWrapper.style.animation = '';
        },480);
    }
}

function changeTextToLogIn(){
    heading.textContent = 'Please Login';
    toggleStateParagraph.innerHTML = `If you don't have account, please <span onclick="onChangeState()">Sign Up</span>`;
    buttonSubmit.textContent = 'Login';
}

function changeTextToSignUp(){
    heading.textContent = 'Please Sign Up';
    toggleStateParagraph.innerHTML = `If you have the account, please <span onclick="onChangeState()">Login</span>`;
    buttonSubmit.textContent = 'SignUp';
}

function onSubmit(event){
    event.preventDefault();
    const email = document.getElementById('email');
    const pass = document.getElementById('pass');
    
    if(state == loginState){
        login(email.value, pass.value);
    }
    if(state == signupState){
        signup(email.value, pass.value);
    }
    email.value = '';
    pass.value = '';
}

function login(email, password) {
    fetch(`${loginUrl}${apiKey}`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
        })
    }).then(async response => {
        if(!response.ok){
            const resData = await response.json().then(data=>{
                return data.error.message;
            })
            throw new Error(resData);
        }
        return response.json();
    }).then(data =>{
        statusHeading.textContent = 'You are now logged with ' + data.email + '!';
        setTimeout(()=>{
            statusHeading.textContent = '';
        },2000);
    }).catch(err =>{
        let errMessage;
        switch(err.message){
            case 'INVALID_LOGIN_CREDENTIALS':
                errMessage = 'Email or password is not valid!';
                break;
            case 'MISSING_PASSWORD':
                errMessage = 'Password is missing!';
                break;
            case 'USER_DISABLED':
                errMessage = 'This user is disabled by admin!';
                break;
            default:
                errMessage = 'Unknown error!';
                break;
        }
        statusHeading.textContent = errMessage;
        setTimeout(()=>{
            statusHeading.style.animation = 'disapear 500ms ease';
            setTimeout(()=>{
                statusHeading.textContent = '';
                statusHeading.style.animation = '';
            },480);
        },2000);
    });
}

function signup(email, password) {
    fetch(`${signupUrl}${apiKey}`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
        })
    }).then(async response => {
        if(!response.ok){
            const resData = await response.json().then(data=>{
                return data.error.message;
            })
            throw new Error(resData);
        }
        return response.json();
    }).then(data =>{
        statusHeading.textContent = 'You made account ' + data.email + '!';
        setTimeout(()=>{
            statusHeading.textContent = '';
        },2000);
    }).catch(err =>{
        let errMessage;
        switch(err.message){
            case 'EMAIL_EXISTS':
                errMessage = 'Account already exists!';
                break;
            case 'OPERATION_NOT_ALLOWED':
                errMessage = 'Sign in for this project is disabled!';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errMessage = 'To many attempts, try later please!';
                break;
            case 'MISSING_PASSWORD':
                errMessage = 'Password is missing!';
                break;
            default:
                errMessage = 'Unknown error!';
                break;
        }
        statusHeading.textContent = errMessage;
        setTimeout(()=>{
            statusHeading.style.animation = 'disapear 500ms ease';
            setTimeout(()=>{
                statusHeading.textContent = '';
                statusHeading.style.animation = '';
            },480);
        },2000);
    });
}
