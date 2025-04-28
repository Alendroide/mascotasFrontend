const token = localStorage.getItem('token');
if(token) window.location.href = '/page/home.html';

const loginForm = document.getElementById("login-form");
loginForm.addEventListener('submit',loginAB);

async function loginAB(e){
    e.preventDefault();
    try{
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const data = {
            email,
            password
        }
        const response = await fetch(`${API_URL}/auth/login`,{
            headers : {
                'Content-Type' : 'application/json'
            },
            method : 'POST',
            body : JSON.stringify(data)
        })

        const responseBody = await response.json();

        if(!response.ok){
            document.getElementById('login-error').innerHTML = responseBody.msg;
        }else{
            document.getElementById('login-error').innerHTML = '';
            localStorage.setItem('token',responseBody.data);
            window.location.href = '/page/home.html';
        }
    
    }
    catch(error){
        console.log("The error is: ",error);
    }

}