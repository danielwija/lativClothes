const backEndPort = 8000;

//when user change category
const WhenCatChange = (cat) => {
    console.log('category is now ' + cat);
    loadClassList(cat);
    loadCatImg(cat);
    viewCat(cat)
}

//get class list (for left class bar)
const loadClassList = (cat) => {
    axios.get(`http://localhost:${backEndPort}/classList/${cat}`)
        .then(({ data }) => {
            let html = ''
            for (k in data) {
                let spaceK = k.replaceAll('_', ' ')
                let htmlList = ''
                data[k].map((className) => {
                    let nClassName = className.replaceAll('_', ' ');
                    htmlList += `
                        <li id="class_${className}">${nClassName}</li>
                    `
                })
                html += `
                <h3 id='kind_${k}' class="kind">${spaceK}</h3>
                <ul id="classList">
                    ${htmlList}
                </ul>`
            }
            document.querySelector('#left_classBar').innerHTML = html
        });
}

const loadCatImg = (cat) => {
    axios.get(`http://localhost:8000/categoryImage`)
        .then(({ data }) => { document.querySelector('#categoryImg').src = data[cat]; })
}

const viewCat = (cat) => {
    let catNameList = document.getElementsByClassName('categoryName');
    for (let i = 0; i < catNameList.length; i++) {
        catNameList[i].classList.remove('view')
    }
    document.querySelector(`#category_${cat}`).classList.add('view')
}

let body = document.getElementsByTagName('body')[0];
//when body is been loaded
body.onload = (() => {
    console.log('category.js is working');

    //make default category
    let cat = 'women';

    WhenCatChange(cat)

    //when user's mouse is on the category, change color
    let catColList = document.getElementsByClassName('categoryCol');
    for (let i = 0; i < catColList.length; i++) {
        catColList[i].addEventListener('mouseover', () => {
            catColList[i].children[0].classList.remove('notFocus');
            catColList[i].children[0].classList.add('focus');
        })
        catColList[i].addEventListener('mouseout', () => {
            catColList[i].children[0].classList.remove('focus');
            catColList[i].children[0].classList.add('notFocus');
        })
    }

    //when title has been click 
    let titleEle = document.querySelector('#title')
    titleEle.addEventListener('click', () => {
        location.href = './category.html'
    })

    //when mouse is on right top widget, let text have underline
    let underLineList = document.getElementsByClassName('mouseUnderLine');
    for (let i = 0; i < underLineList.length; i++) {
        underLineList[i].addEventListener('mouseover', () => {
            underLineList[i].classList.add('textUnderLine');
        })
        underLineList[i].addEventListener('mouseout', () => {
            underLineList[i].classList.remove('textUnderLine');
        })
    }

    let catList = ['women', 'men', 'kids', 'baby', 'sports'];
    catList.forEach((cat) => {
        let catEle = document.querySelector(`#category_${cat}`);
        catEle.addEventListener('click', () => {
            WhenCatChange(cat);
        })
    })
})

