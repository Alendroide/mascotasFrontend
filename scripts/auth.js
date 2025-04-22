const token = localStorage.getItem('token');
if(!token) window.location.href = '/';

function logoff(){
    localStorage.removeItem("token");
    window.location.href = "/";
}