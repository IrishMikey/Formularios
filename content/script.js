import { existingUserNames } from "./userNames.js";

var radioBtns = document.getElementsByClassName("radioCuenta");
var selectEle = document.getElementById("agno");

var dniSelectEle = document.getElementById("dniLetter");

var checkboxContainer = document.getElementById("dCBox");
var checkboxes = checkboxContainer.getElementsByTagName("input");

var secTwo = document.getElementById("sectionTwo");


var userUName;
var userPass;
var userNombre;
var userSName;
var userNum;
var userCP;
var userDNI;
var userJob;
var userYear;
var userHobbies = [];
var userTitulo;
var userDesc;
var userCanal;
/**
 * Insertar los años en el select
 * @fuction setSelectYears 
 */

function setSelectYears() {
    let select = document.getElementById("agno");

    let yearStart = 1930;
    let yearFinish = 2010;

    while (yearFinish >= yearStart) {
        let option = document.createElement("option");

        option.text = yearFinish;
        option.value = yearFinish;
        select.add(option);

        yearFinish--;
    }
}

/**
 * Insertar los errors de los campos
 * @fuction setError
 * @param {string} errorStr - Cadena de text con el error y su elemento de HTML
 * @param {HTMLCollection} currentEle - Elemento del campo actual
 */
function setError(errorStr, currentEle) {
    if (currentEle.nextElementSibling.hasChildNodes) {
        currentEle.style.border = "1px red solid";
        currentEle.style.borderRadius = "2px";
        currentEle.nextElementSibling.innerHTML = errorStr;
    }
}

/**
 * Quitar los errors/Ponerlos en verde de los campos
 * @fuction removeError
 * @param {HTMLCollection} currentEle - Elemento del campo actual
 */

function removeError(currentEle) {

    currentEle.style.border = "1px green solid";
    currentEle.style.borderRadius = "2px";
    currentEle.nextElementSibling.innerHTML = "";

}

/**
 * Comprobar validación de nombre de usuario
 * @fuction checkValidUsername
 */
function checkValidUsername(currentEle) {

    if (currentEle.value == "") {
        let errorStr = "<p> Campo obligatorio <p>";
        setError(errorStr, currentEle);
        return false;
    } else if (currentEle.value.indexOf(' ') >= 0) {
        let errorStr = "<p> No puede tener espacios en blanco <p>";
        setError(errorStr, currentEle);
        return false;
    } else if (currentEle.validity.patternMismatch) {
        let errorStr = "<p> No puede tener caracteres especiales <p>";
        setError(errorStr, currentEle);
        return false;
    } else if (findUsername(currentEle.value)) {
        let errorStr = "<p> El usuario ya existe <p>";
        setError(errorStr, currentEle);
        return false;
    } else {
        removeError(currentEle);
        userUName = currentEle.value;
        return true;
    }

}


function findUsername(currentUser) {

    var exists = false;
    existingUserNames.find(user => {
        if (user.userName == currentUser) {
            exists = true;
        }
    });
    return exists;

}


/**
 * Comprobar validación de contrasña
 * @fuction checkValidPassword
 */
function checkValidPassword(currentEle) {

    if (currentEle.value == "") {
        let errorStr = "<p> Campo obligatorio <p>";
        setError(errorStr, currentEle);
    } else if (currentEle.value.indexOf(' ') >= 0) {
        let errorStr = "<p> No puede tener espacios en blanco <p>";
        setError(errorStr, currentEle);
    } else if (currentEle.validity.tooShort) {
        let errorStr = "<p> Minimo 6 caracteres <p>";
        setError(errorStr, currentEle);
    } else {
        removeError(currentEle);
        passwordStrength(currentEle);
        userPass = currentEle.value
    }
}

/**
 * Cambiar visibilidad de la contraseña
 * @fuction passwordVisibility
 */
function passwordVisibility() {
    var passEle = document.getElementById("pass");
    if (passEle.type === "password") {
        passEle.type = "text";
    } else {
        passEle.type = "password";
    }
}

/**
 * Calcular fuerza de la contraseña
 * @fuction passwordStrength
 */
function passwordStrength(currentEle) {
    var passwordInput = currentEle.value;
    var strength = 0;

    var criteria = ["[a-z]", "[A-Z]", "[0-9][^0-9]*[0-9]", "[!·#@$%&/()=?¿¡:.,;-^]"]
    criteria.forEach(expression => {
        if (passwordInput.match(expression)) {
            strength++;
        }
    });
    drawPasswordBar(strength, currentEle);
}

/**
 * Insertar la barrar de fortaleza
 * @fuction drawPasswordBar
 * @param {int} strength - Número entre 0-4 para valorar la fuerza de la contraseña.
 * @param {HTMLCollection} currentEle - Elemento del campo actual
 */
function drawPasswordBar(strength, currentEle) {
    let bar = currentEle.nextElementSibling;
    if (strength == "4") {
        bar.style.borderBottom = "4px green solid";
        bar.style.maxWidth = "100%";
    } else if (strength == "3") {
        bar.style.borderBottom = "4px orange solid";
        bar.style.maxWidth = "75%";
    } else if (strength == "2") {
        bar.style.borderBottom = "4px orange solid";
        bar.style.maxWidth = "50%";
    } if (strength == "1") {
        bar.style.borderBottom = "4px red solid";
        bar.style.maxWidth = "25%";
    }
}

/**
 * Comprobar validacion del nombre
 * @fuction checkValidFName
 */
function checkValidFName(currentEle) {
    let errorStr = ""
    let char = currentEle.value.charAt(0);

    if (currentEle.value == "") {
        errorStr = "<p> Campo obligatorio <p>";
        setError(errorStr, currentEle);
        return false;
    } else if (char != char.toUpperCase()) {
        errorStr = "<p> Tiene que empezar con una letra en mayuscula. <p>";
        setError(errorStr, currentEle);
        return false;
    } else if (currentEle.validity.patternMismatch) {
        errorStr = "<p> No puede tener caracteres especiales <p>";
        setError(errorStr, currentEle);
    } else {
        removeError(currentEle);
        userNombre = currentEle.value;

        return true;

    }
    if (currentEle.value.indexOf(" ") >= 1) {
        let names = currentEle.value.split(" ");
        let continuar = true;
        console.log(names);
        names.forEach(name => {
            let charName = name.charAt(0);
            if (charName != charName.toUpperCase()) {
                continuar = false
            }
        });
        if (continuar == false) {
            errorStr = "<p>Los nombres tienen que empezar con una letra en mayuscula<p>";
            setError(errorStr, currentEle);
            return false;
        } else {
            removeError(currentEle);
            userNombre = currentEle.value;
            return true;

        }
    }

}

/**
 * Comprobar validacion del apellido
 * @fuction checkValidSName
 */
function checkValidSName(currentEle) {
    let errorStr = ""

    if (currentEle.value == "") {
        errorStr = "<p> Campo obligatorio <p>";
        setError(errorStr, currentEle);
        return false;

    } else if (currentEle.value.startsWith(" ")) {
        errorStr = "<p>No puede empezar con un espacio en blanco <p>";
        setError(errorStr, currentEle);
        return false;

    } else if (currentEle.validity.patternMismatch) {
        errorStr = "<p> No puede tener caracteres especiales o números <p>";
        setError(errorStr, currentEle);
        return false;

    } else {
        removeError(currentEle);
        userSName = currentEle.value;
        return true;
    }

}


function checkValidDNI(currentEle, type) {
    let errorStr = "";
    if (currentEle.value == "") {
        errorStr = "<p> Campo obligatorio </p>";
        setError(errorStr, currentEle);
        return false;
    } else if (type == "DNI") {
        if (!(/^[0-9]{8}[A-Z]/.test(currentEle.value))) {
            errorStr = "<p>DNI erronea</p>";
            setError(errorStr, currentEle);
            return false;
        } else {
            removeError(currentEle);
            userDNI = currentEle.value;
            return true;
        }
    } else if (type == "NIE") {
        if (!(/^[X,x,Z,z][0-9]{8}[A-Z]/.test(currentEle.value))) {
            errorStr = "<p>NIE erronea</p>";
            setError(errorStr, currentEle);
            return false;
        } else {
            removeError(currentEle);
            userDNI = currentEle.value;
            return true;
        }
    }
}

/**
 * Comprobar validacion del teléphono
 * @fuction checkValidNum
 */
function checkValidNum(currentEle) {
    let errorStr = ""

    if (currentEle.value == "") {
        errorStr = "<p> Campo obligatorio </p>";
        setError(errorStr, currentEle);
        return false;
    } else if (currentEle.validity.patternMismatch) {
        errorStr = "<p> El teléfono puede tener prefijo de país y 9 cifras. </p>";
        setError(errorStr, currentEle);
        return false;
    } else {
        removeError(currentEle);
        userNum = currentEle.value;
        return true;
    }
}

/**
 * Comprobar validacion del código postal
 * @fuction checkValidCP
 */
function checkValidCP(currentEle) {
    let errorStr = ""

    if (currentEle.value == "") {
        errorStr = "<p> Campo obligatorio </p>";
        setError(errorStr, currentEle);
        return false;
    } else if (currentEle.validity.patternMismatch) {
        errorStr = "<p> Debe ser de 5 numeros y empezar con 38 </p>";
        setError(errorStr, currentEle);
        return false;
    } else {
        removeError(currentEle);
        userCP = currentEle.value;
        return true;
    }

}

/**
 * Comprobar validacion del trabajo (NO funciona)
 * @fuction checkValidJob
 */
function checkValidJob(currentEle) {
    let errorStr = ""

    if (currentEle.checked == false) {
        errorStr = "<p> Debe selecionar uno </p>";
        setError(errorStr, currentEle.parentElement);
        return false;
    }
    else {
        removeError(currentEle.parentElement);
        console.log(currentEle.name)
        userJob = currentEle.name;
        return true;
    }
}

/**
 * Comprobar validacion de edad
 * @fuction checkValidAge
 */
function checkValidAge(currentEle) {
    let errorStr = ""

    var d = new Date();
    var n = d.getFullYear()

    var age = n - currentEle.value;
    if (age < 18) {
        errorStr = "<p> Tienes que ser mayor de edad </p>";
        setError(errorStr, currentEle);
        return false;
    }
    else {
        removeError(currentEle);
        userYear = currentEle.value;
        return true;
    }

}

/**
 * Comprobar validacion de aficiónes
 * @fuction checkVaildCBox
 */
function checkValidCBox(currentEle) {
    var currentEleParent = currentEle.parentElement;

    let errorStr = ""
    let numChecked = 0;
    for (let index = 0; index < checkboxes.length; index++) {
        if (checkboxes[index].checked) {
            numChecked++;
        }
    }
    if (numChecked <= 1) {
        errorStr = "Tienes que marcar dos o más aficiónes"
        setError(errorStr, currentEleParent);
        return false;
    } else {
        removeError(currentEleParent);
        for (let index = 0; index < checkboxes.length; index++) {
            if (checkboxes[index].checked) {
                userHobbies[index] = checkboxes[index].name;
            }
        }
        return true;
    }
}

/**
 * Comprobar validacion del título
 * @fuction checkValidTitle
 */

function letterCount(ele, counter) {

    var content = ele.value;
    console.log(content.length)

    counter.innerText = content.length;
}

function checkValidTitle(currentEle) {
    const titleCounter = document.getElementById("letterCountTitle");
    letterCount(currentEle, titleCounter)
    let errorStr = ""

    if (currentEle.value == "") {
        errorStr = "<p> Campo obligatorio </p>";
        setError(errorStr, currentEle);
        return false;
    } else if (currentEle.value.startsWith(" ")) {
        errorStr = "<p>No puede empezar con un espacio en blanco </p>";
        setError(errorStr, currentEle);
        return false;
    } else {
        removeError(currentEle);
        userTitulo = currentEle.value;
        return true;
    }
}

/**
 * Comprobar validacion del descripción
 * @fuction checkValidDesc
 */
function checkValidDesc(currentEle) {
    let errorStr = ""

    const titleCounter = document.getElementById("letterCountDesc");
    letterCount(currentEle, titleCounter)

    if (currentEle.value == "") {
        errorStr = "<p> Campo obligatorio </p>";
        setError(errorStr, currentEle);
        return false;
    } else if (currentEle.value.startsWith(" ")) {
        errorStr = "<p>No puede empezar con un espacio en blanco </p>";
        setError(errorStr, currentEle);
        return false;
    } else {
        removeError(currentEle);
        userDesc = currentEle.value;
        return true;
    }

}


/**
 * Comprobar validacion del canal
 * @fuction checkValidCanal
 */
function checkValidCanal(currentEle) {
    let canalUrl = currentEle.value;
    let errorStr = "";

    let canalIcon = document.getElementById("canalIcon");

    let twitchRegEx = /^(https:\/\/www\.twitch\.tv\/)+\w+/;
    let youtubeRegEx = /^(https:\/\/www\.youtube\.com\/channel\/\w+)/;
    let instaRegEx = /^(https:\/\/www\.instagram\.com\/)+\w+/;

    if (currentEle.value == "") {
        errorStr = "<p> Campo obligatorio </p>";
        setError(errorStr, currentEle.parentElement);

        return false;
    } else if (canalUrl.match(youtubeRegEx)) {
        removeError(currentEle.parentElement);
        canalIcon.src = "./content/img/youtube.png";
        userCanal = currentEle.value;
        return true;
    } else if (canalUrl.match(twitchRegEx)) {
        removeError(currentEle.parentElement);
        canalIcon.src = "./content/img/twitch.png";
        userCanal = currentEle.value;
        return true;
    } else if (canalUrl.match(instaRegEx)) {
        removeError(currentEle.parentElement);
        canalIcon.src = "./content/img/instagram.png";
        userCanal = currentEle.value;
        return true;
    } else {
        canalIcon.src = "./content/img/question.png";

        errorStr = "<p>Url Erronea </p>";
        setError(errorStr, currentEle.parentElement)
        return false;
    }
}

function getAge() {
    var currentYear= new Date().getFullYear()
    var userAge =  currentYear - parseInt(userYear);
    return userAge;
}
function showResult() {

    var usuarioTitle = document.createElement("h4");
    usuarioTitle.textContent = "Datos Usuario";
    secTwo.appendChild(usuarioTitle);

    var usuarioUName = document.createElement("p");
    usuarioUName.textContent = "Username: " + userUName;
    secTwo.appendChild(usuarioUName);

    var usuarioPass = document.createElement("p");
    usuarioPass.textContent = "Password: " + userPass;
    secTwo.appendChild(usuarioPass);

    var personalesTitle = document.createElement("h4");
    personalesTitle.textContent = "Datos Personales";
    secTwo.appendChild(personalesTitle);

    var personalesNombre = document.createElement("p");
    personalesNombre.textContent = "Nombre: " + userNombre;
    secTwo.appendChild(personalesNombre);

    var personalesSname = document.createElement("p");
    personalesSname.textContent = "Apellidos: " + userSName;
    secTwo.appendChild(personalesSname);

    var personalesNum = document.createElement("p");
    personalesNum.textContent = "Teléfono: " + userNum;
    secTwo.appendChild(personalesNum);

    var personalesCP = document.createElement("p");
    personalesCP.textContent = "Código Postal: " + userCP;
    secTwo.appendChild(personalesCP);

    var personalesDNI = document.createElement("p");
    personalesDNI.textContent = "DNI: " + userDNI;
    secTwo.appendChild(personalesDNI);

    var personalesJob = document.createElement("p");
    personalesJob.textContent = "Tipo de cuenta: " + userJob;
    secTwo.appendChild(personalesJob);

    var personalesAge = document.createElement("p");
    personalesAge.textContent = "Edad del usuario: " + getAge();
    secTwo.appendChild(personalesAge);

    var personalesHobbies = document.createElement("p");
    personalesHobbies.textContent = "Aficiones del Usuario: ";
    secTwo.appendChild(personalesHobbies);

    var personalesHobbyOne = document.createElement("ul");
    personalesHobbyOne.textContent = userHobbies[0];
    secTwo.appendChild(personalesHobbyOne);

    var personalesHobbyTwo = document.createElement("ul");
    personalesHobbyTwo.textContent = userHobbies[1];
    secTwo.appendChild(personalesHobbyTwo);

    var publicacionTitle = document.createElement("h4");
    publicacionTitle.textContent = "Datos Publicación";
    secTwo.appendChild(publicacionTitle);

    var publicacionTitulo = document.createElement("p");
    publicacionTitulo.textContent = "Título: " + userTitulo;
    secTwo.appendChild(publicacionTitulo);

    var publicacionDesc = document.createElement("p");
    publicacionDesc.textContent = "Descripción: " + userDesc;
    secTwo.appendChild(publicacionDesc);

    var publicacionCanal = document.createElement("p");
    publicacionCanal.innerHTML = "Canal: <a href=" + userCanal + ">" + userCanal + "</a>";
    secTwo.appendChild(publicacionCanal);

}



const uName = document.getElementById("uName");
uName.addEventListener("input", (e) => {
    checkValidUsername(e.target);
});
const pass = document.getElementById("pass");
pass.addEventListener("input", (e) => {
    checkValidPassword(e.target);
});

const showPass = document.getElementById("showPass");
showPass.addEventListener("click", (e) => {
    passwordVisibility(e.target);
});

const fName = document.getElementById("fName");
fName.addEventListener("input", (e) => {
    checkValidFName(e.target);
});

const sName = document.getElementById("sName")
sName.addEventListener("change", (e) => {
    checkValidSName(e.target);
});

const num = document.getElementById("num")
num.addEventListener("input", (e) => {
    checkValidNum(e.target);
});


const postNum = document.getElementById("postNum")
postNum.addEventListener("input", (e) => {
    checkValidCP(e.target);
});


[...radioBtns].forEach(btn => {
    btn.addEventListener("click", (e) => {
        checkValidJob(e.target);
    });
});

selectEle.addEventListener("change", (e) => {
    checkValidAge(e.target);
});

for (let index = 0; index < checkboxes.length; index++) {
    if (checkboxes[index].type == "checkbox") {
        checkboxes[index].addEventListener("click", (e) => {
            checkValidCBox(e.target);
        })
    }
}

const titulo = document.getElementById("titulo");
titulo.addEventListener("input", (e) => {
    checkValidTitle(e.target);

});

const desc = document.getElementById("desc");
desc.addEventListener("input", (e) => {
    checkValidDesc(e.target);
});

const canal = document.getElementById("canal");
canal.addEventListener("input", (e) => {
    checkValidCanal(e.target);
});

var dni = document.getElementById("dni");

dniSelectEle.addEventListener("change", (e) => {
    let type = e.target.value;

    if (e.target.value != "DNI") {
        dni.disabled = false;

        dni.addEventListener("input", (e) => {
            checkValidDNI(e.target, type)
        });
    } else if (e.target.value != "NIE") {
        dni.disabled = false;
        dni.addEventListener("input", (e) => {
            checkValidDNI(e.target, type)
        });
    } else {
        dni.disabled = true;
    }
})

var numCorrect = 0;
document.getElementById("submitBtn").addEventListener("click", (e) => {
    console.log("submit");
    e.preventDefault();

    if (checkValidUsername(uName)) {
        numCorrect++;
    };
    if (checkValidPassword(pass)) {
        numCorrect++;

    }
    if (checkValidFName(fName)) {
        numCorrect++;

    }
    if (checkValidSName(sName)) {
        numCorrect++;

    };
    if (checkValidNum(num)) {
        numCorrect++;

    };
    if (checkValidCP(postNum)) {
        numCorrect++;

    };
    if (checkValidDNI(dni)) {
        numCorrect++;

    };
    let radioNum = 0;
    [...radioBtns].forEach(btn => {
        if (checkValidJob(btn)) {
            radioNum++;
        };
        if (radioNum > 1) {
            numCorrect++;
        }

    });

    if (checkValidAge(selectEle)) {
        numCorrect++;

    };
    [...checkboxes].forEach(cbox => {
        if (checkValidCBox(cbox)) {
            numCorrect++;

        }
    });

    if (checkValidTitle(titulo)) {
        numCorrect++;

    };
    if (checkValidDesc(desc)) {
        numCorrect++;

    };
    if (checkValidCanal(canal)) {
        numCorrect++;

    };

    if (numCorrect = 13) {
        showResult();
    }
});



setSelectYears();
