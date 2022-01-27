//使clothesIndex可以從網址抓
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let { group, type } = params;

//創見列表(失敗)
// let categoryArray = {};
// fetch("http://localhost:8000/entireApi")
//     .then(res => res.json())
//     .then(data => {
//         for (k in data) {
//             if (categoryArray[data[k].category] === undefined || categoryArray[data[k].category].type === undefined) {
//                 let typeArray = []
//                 typeArray.push(data[k].type);
//                 categoryArray[data[k].category] = {}
//                 categoryArray[data[k].category].type = typeArray;
//             } else {
//                 categoryArray[data[k].category].type.push(data[k].type);
//                 categoryArray[data[k].category].type = [...new Set(categoryArray[data[k].category].type)]
//             }
//         }
//     });

// let test = document.querySelector("#topsList").firstChild;
// console.log(document.querySelector("#topsList"))
// console.log(test)

//改左側列表的href
let list = $(".typeLi");
for (let i = 0; i < list.length; i++) {
    list[i].href = `http://localhost:5000/type?group=${group}&type=${list[i].text}`;
}





fetch("http://localhost:8000/entireApi")
    .then(res => res.json())
    .then(data => {
        for (k in data) {
            if (data[k].class.type === type && data[k].class.group === group) {
                let html =
                    `<div>
                        <a href="http://localhost:5000/detail?id=${k}">                
                            <img src="${data[k].stoke[0].clothesImg}">
                        </a>
                        <p>${data[k].name}</p>
                        <p>${data[k].price}</p>
                    </div>`
                document.querySelector("#content").innerHTML += html
            }
        }
    });