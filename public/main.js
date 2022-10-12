const cryptoField = document.querySelector('#cryptocurrency')
const currencyField = document.querySelector('#currency')
const form = document.querySelector('#form')

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

    console.log('pasastes')
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
