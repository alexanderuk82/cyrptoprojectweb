const cryptoField = document.querySelector('#cryptocurrency')
const currencyField = document.querySelector('#currency')
const form = document.querySelector('#form')

const openDayMarket = document.getElementById('openDay')
const highDayMarket = document.getElementById('highDay')
const lowDayMarket = document.getElementById('lowDay')
const lastUpdateMarket = document.getElementById('lastUpdate')

const tagResults = document.querySelector('.main__results__top > .tag > span')
const tagNews = document.querySelector('.footer__news__top > .tag > span')

const footerContainer = document.querySelector('.footer__news__container')

const dataStorage = {
    currency: '',
    cryptocurrency: '',
}
document.addEventListener('DOMContentLoaded', () => {
    getCryptoData()
    form.addEventListener('submit', validate)
    currencyField.addEventListener('change', getValue)
    cryptoField.addEventListener('change', getValue)
})

function getCryptoData() {
    const url = `https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD`
    fetch(url)
        .then((response) => response.json())
        .then((data) => insertData(data.Data))
}

//  Insert data on the field dropDown

function insertData(data) {
    //We insert inside on the TOP boxes
    dataBox(data)

    data.forEach((crypto) => {
        const { Name, FullName } = crypto.CoinInfo
        const option = document.createElement('option')
        option.value = Name
        option.textContent = FullName

        cryptoField.appendChild(option)
    })
}

function dataBox(data) {
    const boxWrapper = document.querySelector('.swiper-wrapper')

    const newData = [data[0], data[1], data[2], data[3], data[4]]
    newData.forEach((crypto) => {
        //Details of the crypto

        const { Name, FullName, ImageUrl } = crypto.CoinInfo
        const imgURL = 'https://www.cryptocompare.com/'

        //Details of the value crypto Display nice

        const { TOSYMBOL, PRICE } = crypto.DISPLAY.USD

        //  HTML structure here

        const swiperSlide = document.createElement('div')
        swiperSlide.className = 'swiper-slide'

        const container = document.createElement('div')
        container.className = 'swiper-slide__container'

        container.innerHTML = `
            
            <div class="swiper-slide__container__top">
            <img
                src="https://www.cryptocompare.com${ImageUrl}"
                alt="icon-crypto"
            />
            <div
                class="swiper-slide__container__top--content"
            >
                <div class="h2">${Name}</div>
                <span></span>
                <p>usd</p>
            </div>
        </div>
        <div
            class="swiper-slide__container__bottom"
        >
            <img
                src="../public/img/chart-evaluation.svg"
                alt=""
            />
            <p>${PRICE}</p>
        </div>        
            
            
            `
        swiperSlide.appendChild(container)

        //The general wrapper
        boxWrapper.appendChild(swiperSlide)
    })
}
// Form Validation

function validate(e) {
    e.preventDefault()
    const { currency, cryptocurrency } = dataStorage

    if (currency === '' || cryptocurrency === '') {
        message('All the fields are required, please try again')
        return
    }
    getResultsValue()
}

//Getting data Total results

function getResultsValue() {
    const { currency, cryptocurrency } = dataStorage
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}`

    fetch(url)
        .then((response) => response.json())
        .then((data) =>
            insertValueField(data.DISPLAY[cryptocurrency][currency])
        )
}

//Inserting data inside of the fields
const resultContainer = document.querySelector('.main__operations__totals')

function insertValueField(data) {
    clearHtml()
    const { currency, cryptocurrency } = dataStorage

    //Insert tag value top SECTION

    tagResults.textContent = `${cryptocurrency}/${currency}`
    tagNews.textContent = `${cryptocurrency}/${currency}`

    const { TOSYMBOL, PRICE, OPENDAY, HIGHDAY, LOWDAY, LASTUPDATE } = data

    //Inserting value total html

    //Form __results

    const container = document.createElement('div')
    container.classList.add('main__operations__results')
    container.innerHTML = `
        
        <div class="main__operations__results__text">
            <p>The total value is calculated</p>
            <div class="main__operations__results__text--value">
                <p>for <span>${TOSYMBOL}1 ${currency}</span></p>
                <p>to <span>1 ${cryptocurrency}</span></p>
            </div>
        </div>
        <div class="main__operations__results__total">
            <p>total</p>
            <h2 class="h2">${PRICE}</h2>
        </div>
        
        
        `

    // Appending

    resultContainer.appendChild(container)

    // iNSERTING DATA ON THE RESULTS SECTION
    openDayMarket.textContent = `${OPENDAY}`
    highDayMarket.textContent = `${HIGHDAY}`
    lowDayMarket.textContent = `${LOWDAY}`
    lastUpdateMarket.textContent = `${LASTUPDATE}`

    displayNews()
}

//Display news Data API

function displayNews() {
    const { currency, cryptocurrency } = dataStorage

    const url = `https://min-api.cryptocompare.com/data/v2/news/?categories=${cryptocurrency},${currency}&excludeCategories=Sponsored`

    fetch(url)
        .then((response) => response.json())
        .then((data) => insertNews(data.Data))
}

//Inserting news

function insertNews(data) {
    clearHtmlNews()
    const newsContainer = document.createElement('div')
    newsContainer.classList.add('footer__news__content')
    data.forEach((crypto, index) => {
        const { id, imageurl, title, url, body } = crypto

        if (index <= 5) {
            const article = document.createElement('div')
            article.classList.add('footer__news__content__article')
            article.innerHTML = `
        
            <div class="footer__news__content__article--img">
                <img src="${imageurl}" />
            </div>
            <div class="footer__news__content__article--text">
                <h4 class="h4">
                    ${title}
                </h4>
                <p>
                    ${body}
                </p>
                <a href="${url}" target="_blank">Read more 
                <img src="../public/img/external-link.svg" alt=""/></a>
            </div>
                
        `

            newsContainer.appendChild(article)

            footerContainer.appendChild(newsContainer)
        }
    })
}

function getValue(e) {
    dataStorage[e.target.name] = e.target.value

    console.log(dataStorage)
}

function message(message) {
    const notification = document.querySelector('.toast')

    const notiContainer = document.createElement('div')

    notiContainer.classList.add('toast__container')
    notiContainer.style.display = 'block'
    notiContainer.innerHTML = `
    
                <h2 class="h2">Error!</h2>
                <p>${message}</p>
        
    `

    setTimeout(() => {
        notiContainer.remove()
    }, 2500)

    notification.appendChild(notiContainer)
}
//Selection cryptocurrencies

//   Initialize Swiper

const swiper = new Swiper('.boxSlider', {
    slidesPerView: 'auto',
    spaceBetween: 17,
})

//Function clear

function clearHtml() {
    while (resultContainer.firstChild) {
        resultContainer.removeChild(resultContainer.firstChild)
    }
}

//Clear HTML for news result

function clearHtmlNews() {
    while (footerContainer.firstChild) {
        footerContainer.removeChild(footerContainer.firstChild)
    }
}
