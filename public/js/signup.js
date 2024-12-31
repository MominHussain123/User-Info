let submit = document.querySelector(".submit");

submit.addEventListener("click", () => {
    let name = document.querySelector(".name").value;
    let email = document.querySelector(".email").value;
    let password = document.querySelector(".password").value;
    let phoneNo = document.querySelector(".phoneNo").value;
    let Gender = document.querySelector(".Gender").value;
    let Dateofbirth = document.querySelector(".Dateofbirth").value;
    let country = document.querySelector(".country").value;
    let city = document.querySelector(".city").value;
    let profileImage = document.querySelector(".profileImage").files[0];
    console.log(profileImage);

    if (name === "" && email === "" && password === "") {
        return alert("Fill your form")
    } else {
        const token = localStorage.getItem('token');
        let formData = new FormData();
        formData.append("fullName", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profileImage", profileImage);
        formData.append("phoneNo", phoneNo);
        formData.append("Gender", Gender);
        formData.append("Dateofbirth", Dateofbirth);
        formData.append("Country", country);
        formData.append("city", city);
        axios.post('http://localhost:9000/signup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            headers: {
                'Authorization': token
            },
        }, { withCredentials: true })
            .then(function (res) {
                if (res.data.message === "User registered successfully") {
                    console.log(res.data.message);
                    alert(res.data.message);
                    window.location.href = "http://localhost:9000/login.html";
                } else {
                    alert(res.data)
                    console.log(res.data)
                }
            })
            .catch(function (error) {
                console.log(error);
            })

        name.value = "";
        email.value = "";
        password.value = "";
    }

})
