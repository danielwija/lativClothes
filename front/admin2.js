let body = document.getElementsByTagName('body')[0];
body.onload = (() => {
    console.log('admin2.js is working')
})
// const chang = () => {
//     console.log(document.querySelector('#imageInput'));
//     let x = document.querySelector('#imageInput').value;
//     console.log(x);
//     axios.post('http://localhost:8000/photos/upload', x, {
//         headers: { 'Content-Type': 'image/jpeg ' }
//     })
// }

const uploadForm = document.querySelector('.upload')
uploadForm.addEventListener('submit', function (e) {
    e.preventDefault()
    let file = e.target.uploadFile.files[0]

    var formdata = new FormData();
    formdata.append("upload", file);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://localhost:8000/photos/upload", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
})
