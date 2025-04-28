const token = localStorage.getItem('token');
if(!token) window.location.href = '/';

function logoffAB(){
    localStorage.removeItem("token");
    window.location.href = "/";
}