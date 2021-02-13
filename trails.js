let baseUrl = "https://www.hikingproject.com/data/get-"
let key = "200990449-73fd03c53163fa7ca684910f836269b1"
let lon = document.querySelector(".longitude")
let lat = document.querySelector(".latitude")
let maxDistance = document.querySelector(".maxDistance")
let sentButton = document.querySelector(".sentButton")
let mountainsDataWrapper = document.querySelector(".mountainsDataWrapper")
let america = document.querySelector(".america")
let europe = document.querySelector(".europe")
let africa = document.querySelector(".africa")
let australia = document.querySelector(".australia")
let loader = document.createElement('i');
loader.classList = 'fas fa-spinner fa-spin';



america.addEventListener("click", () => {
    printAmericaTrails()        
})
europe.addEventListener("click", () => {
    printEuropeTrails()    
    
})
africa.addEventListener("click", () => {
    printAfricaTrails()        
})
australia.addEventListener("click", () => {
    printAustraliaTrails()        
})


sentButton.addEventListener("click", () => {

    getTrails()
    // cardWrapper.classList="cardWrapper"
})

const getLongitude = () => {
    return (lon.value)
}
const getLatitude = () => {
    return (lat.value)
}
const getmaxDistance = () => {
    return (maxDistance.value)
}

const showLoader = () => {
    sentButton.textContent = '';
    sentButton.appendChild(loader);
}

const hideLoader = () => {
    sentButton.textContent = 'GO ON...!';
}

const getTrails = () => {
    mountainsDataWrapper.innerHTML = ""
    let getTrailsUrl = baseUrl + "trails?lat=" + getLatitude() + "&lon=" + getLongitude() + "&maxDistance=" + getmaxDistance() + "&key=" + key
    showLoader()
    fetch(getTrailsUrl)
        .then(function (response) {
            hideLoader()
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson)
            localStorage.setItem("test", JSON.stringify(myJson.trails))
            listOfTrails(myJson.trails)
        })
        .catch(error => {
            hideLoader()
        })

    function listOfTrails(mountainData) {
        for (var i = 0; i < 10; i++) {
            printMountainImage(mountainData[i]);
            // printMountinHeight(mountainData[i]);
            console.log(mountainData[i])
        }
    }
}

const printMountainImage = (el) => {
    

    let cardWrapper = document.createElement("div")
    cardWrapper.classList = "cardWrapper"
    let img = document.createElement("img")
    img.classList = "image"
    cardWrapper.appendChild(img)
    let poster = el.imgMedium
    if(poster==""){
        poster = 'https://www.kairoscanada.org/wp-content/uploads/2017/01/mountain.jpeg'
    }
    img.setAttribute("src", poster)
    console.log(poster)
    

    let mountainName = document.createElement("h2")
    mountainName.classList = "mountainName"
    mountainName.textContent = el.name
    cardWrapper.appendChild(mountainName)

    let howHigh = document.createElement("h3")
    cardWrapper.appendChild(howHigh)
    howHigh.textContent = "Mountain's height: " + el.high + "m"

    let findOutButton = document.createElement("button")
    findOutButton.classList = "viewMore"
    findOutButton.textContent = "Find out more"
    cardWrapper.appendChild(findOutButton)
    console.log("usao")
   
    mountainsDataWrapper.appendChild(cardWrapper)

    let mountainId = el.id

    findOutButton.addEventListener('click', () => {
        console.log("stagod");
        storeMountainData(mountainId)
        window.location.href = "mountainData.html";
    });
}
const storeMountainData = (mountainId) => {
    localStorage.setItem("mountainId", mountainId)
    console.log(mountainId, "OVO JE  NAME");
}

const printAmericaTrails = () => {

    lon.value = -119.49056513377305
    lat.value = 37.89263794592674
    maxDistance.value = 10
}
const printEuropeTrails = () => {

    lon.value = 7.657325711860647
    lat.value = 45.98688087212088
    maxDistance.value = 10
}

const printAfricaTrails = () => {
    lon.value = 21.666017010499807
    lat.value = -32.30522599312029
    maxDistance.value = 500
}

const printAustraliaTrails = () => {
    lon.value = 150.63993016781487
    lat.value = -30.285557815040697
    maxDistance.value = 500
}

