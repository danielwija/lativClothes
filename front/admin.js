let data = {};
let id;

const onBasicInfoNextButtonClick = () => {
    $("#classDiv").removeClass("displayNone").addClass("displayBlock");
    let save = document.querySelector("#save");
    save.onclick = onClassNextButtonClick;

    id = document.querySelector("#idInput").value;
    let name = document.querySelector("#nameInput").value;
    let price = document.querySelector("#priceInput").value;

    document.querySelector("#idInputDiv").innerHTML = `<p>ID: ${id}</p>`;
    document.querySelector("#nameInputDiv").innerHTML = `<p>Name: ${name}</p>`;
    document.querySelector("#priceInputDiv").innerHTML = `<p>Price: ${price}</p>`;

    data[id] = { name: name, price: price };
}

const onClassNextButtonClick = () => {
    $("#stockDiv").removeClass("displayNone").addClass("displayBlock");
    let save = document.querySelector("#save");
    save.onclick = onSaveAllButtonClick;
    save.innerHTML = "Save";

    let group = document.querySelector("#groupInput").value;
    let category = document.querySelector("#categoryInput").value;
    let type = document.querySelector("#typeInput").value;

    document.querySelector("#groupInputDiv").innerHTML = `<p>Group: ${group}</p>`;
    document.querySelector("#categoryInputDiv").innerHTML = `<p>Category: ${category}</p>`;
    document.querySelector("#typeInputDiv").innerHTML = `<p>Type: ${type}</p>`;

    data[id].class = { group: group, category: category, type: type };
    console.log(data);
}

let colorNum = 0;
const addNewColor = () => {
    let html =
        `<div id="colorDiv${colorNum}">
            <div id="colorInputDiv${colorNum}" class="inputDiv">
                <label>Color:</label>
                <input type="text" id="colorInput${colorNum}">
            </div>

            <div id="clothesImgInputDiv${colorNum}" class="inputDiv">
                <label>Clothes Image:</label>
                <input type="text" id="clothesImgInput${colorNum}">
            </div>

            <div id="buttonImgInputDiv${colorNum}" class="buttonDiv">
                <label>Button Image:</label>
                <input type="text" id="buttonImgInput${colorNum}">
            </div>

            <div id="sizeButtonGroup${colorNum}">
            <label>Size:</label>
                <label><input id="sizeCheckBox0${colorNum}" type="checkbox" value="S">S</label>
                <label><input id="sizeCheckBox1${colorNum}" type="checkbox" value="M">M</label>
                <label><input id="sizeCheckBox2${colorNum}" type="checkbox" value="l">L</label>
                <label><input id="sizeCheckBox3${colorNum}" type="checkbox" value="XL">XL</label>
                <label><input id="sizeCheckBox4${colorNum}" type="checkbox" value="XXL">XXL</label>
            </div>
            <hr>
        </div>`
    document.querySelector("#stock").innerHTML += html;
}

// $(`#sizeCheckBoxS`).prop("checked", true);
// console.log($("#sizeCheckBoxS"));

const onAddColorButton = (mood) => {
    let size = [];
    let color = document.querySelector(`#colorInput${colorNum}`).value;
    let clothesImg = document.querySelector(`#clothesImgInput${colorNum}`).value;
    let buttonImg = document.querySelector(`#buttonImgInput${colorNum}`).value;
    let sizeToNumber = { 0: "S", 1: "M", 2: "L", 3: "XL", 4: "XXL" };
    for (let i = 0; i < 5; i++) {
        if (document.querySelector(`#sizeCheckBox${i}${colorNum}`).checked) {
            size.push(sizeToNumber[i])
        }
    }
    console.log(size)

    document.querySelector(`#colorInputDiv${colorNum}`).innerHTML = `<p>color: ${color}</p>`;
    document.querySelector(`#clothesImgInputDiv${colorNum}`).innerHTML = `<p>color: ${clothesImg}</p>`;
    document.querySelector(`#buttonImgInputDiv${colorNum}`).innerHTML = `<p>color: ${buttonImg}</p>`;
    document.querySelector(`#sizeButtonGroup${colorNum}`).innerHTML = `<p>size: ${size.join(" ")}</p>`;

    colorNum += 1;
    if (mood !== "save") {
        addNewColor();
    }

    //第一次run onAddColorButton
    if (colorNum === 1 && mood === "save") {
        console.log('colorNum === 1 && mood === "save"')
        data[id].stoke = [];
    }

    if (colorNum === 1) {
        data[id].stoke = [];
    }

    console.log(mood)
    let colorObj = { color: color, clothesImg: clothesImg, buttonImg: buttonImg, size: size };
    data[id].stoke.push(colorObj)
    console.log(data);
}

const onSaveAllButtonClick = async () => {
    onAddColorButton("save");
    console.log("onSaveButtonClick()")
    const url = 'http://localhost:8000/add'

    // console.log(data)
    await axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const initialSetting = () => {
    addNewColor()
}