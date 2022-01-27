//使clothesIndex可以從網址抓
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let { group } = params;
console.log(group);

const backEndPort = 8000;
const frontEndPort = 5000;

const InitialSetting = () => {
    getGroupImgData();
    changeLeftMenuHref();
    getClothesData();
}

const getGroupImgData = async () => {
    let { data } = await axios.get(`http://localhost:${backEndPort}/groupImg`);
    let { groupImg } = data;
    document.querySelector("#groupImg").src = groupImg[group]
}

const changeLeftMenuHref = () => {
    let list = $(".typeLi");
    for (let i = 0; i < list.length; i++) {
        list[i].href = `http://localhost:${frontEndPort}/type?group=${group}&type=${list[i].text}`;
    }
}

const getClothesData = () => {
    fetch(`http://localhost:${backEndPort}/entireApi`)
        .then(res => res.json())
        .then(data => {

            for (k in data) {
                if (data[k].class.group === group) {
                    let html =
                        `<div>
                        <a href="http://localhost:${frontEndPort}/detail?id=${k}">                
                            <img src="${data[k].stoke[0].clothesImg}">
                        </a>
                        <p>${data[k].name}</p>
                        <p>${data[k].price}</p>
                    </div>`
                    document.querySelector("#content").innerHTML += html
                }
            }
        });
}
