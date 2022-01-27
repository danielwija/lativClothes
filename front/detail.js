//使clothesIndex可以從網址抓
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const { id } = params;
// const { group, category, type, id } = params;
// console.log(`group=${group}\ncategory=${category}\ntype=${type}\nid=${id}`)

//找出與顏色相符的index
//用index of
const checkColor = (colorStr) => {
    for (let i = 0; i < stoke.length; i++) {
        if (stoke[i].color === colorStr)
            index = i
    }
    return index
}

//清空element裡所有子結點
const removeAllChildNodes = () => {
    let el = document.getElementById("sizeButton")
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

const whenPressSizeButton = (size, colorStr) => {
    let index = checkColor(colorStr);
    clothesName.innerHTML = data.name + `(${stoke[index].color}`
    // console.log(clothesName)
    clothesName.innerHTML += "-" + size + ")"
}

//創建 size button
const addSizeButton = (colorStr) => {
    let index = checkColor(colorStr);

    let html = stoke[index].size.map((size) => {
        return `<button onclick="whenPressSizeButton('${size}','${colorStr}')">${size}</button>`
    })
    document.getElementById("sizeButton").innerHTML = html.join('')
}

//換圖片
const changImg = (colorStr) => {
    let index = checkColor(colorStr);
    document.getElementById("img").src = stoke[index].clothesImg;
    clothesName.innerHTML = data.name + `(${colorStr})`;
}

//換衣服尺寸的button
const changSizeButton = (colorStr) => {
    //清空之前的button
    removeAllChildNodes()
    //加新的button
    addSizeButton(colorStr)
}

//當顏色按鈕被按時
const whenPressColorButton = (colorStr) => {
    changImg(colorStr)
    changSizeButton(colorStr)
}

let data;
let stoke;

//初始設定
const initialSetting = async () => {

    //加入顏色按鈕
    const addColorButton = (colorStr) => {
        let index = checkColor(colorStr)
        let html = `<img id="${colorStr}Button" src="${stoke[index].buttonImg}" onclick="whenPressColorButton('${colorStr}')">`;
        document.getElementById("colorButton").innerHTML += html;
    }

    // //抓到url裡的東西
    // let pathName = window.location.pathname
    // //如果沒有url後面沒有東西
    // if (pathName === "/") {
    //     alert("url error");
    //     //send to front page
    //     console.log("send to front page");
    // }
    // let path = window.location.pathname.slice(1).split('/');
    // //指定到變數
    // let [userGroup, category, type, id] = path;

    //fetch api
    // let apiUrl = `http://localhost:3000/api/${group}/${category}/${type}/${id}`;
    let apiUrl = `http://localhost:8000/api/${id}`;

    const getJson = async (apiUrl) => {
        try {
            let response = await fetch(apiUrl);
            try {
                let json = await response.json();
                return json
            } catch {
                alert("url error (inside)")
            }
        } catch {
            alert("url error (outside)")
        }
        // let response = await fetch(apiUrl);
        // let json = await response.json()
        // return json;
    }

    //把data指定到全域變數
    data = await getJson(apiUrl)
    console.log(data)

    stoke = data.stoke

    //先放一些東西
    //logo
    document.getElementById("companyLogo").src = "https://s4.lativ.com.tw/images/logo-2011.png?22221";
    //價格
    document.getElementById("salePrice").innerHTML = data.price;
    //圖
    document.getElementById("img").src = stoke[0].clothesImg;
    //size button
    addSizeButton(stoke[0].color);
    //color button
    for (let i = 0; i < stoke.length; i++) {
        addColorButton(stoke[i].color)
    }
    //衣服名稱
    let clothesName = document.getElementById("clothesName")
    clothesName.innerHTML = data.name + `(${stoke[0].color})`
}

