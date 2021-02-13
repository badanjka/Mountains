let baseUrl = "https://www.hikingproject.com/data/get-"
let key = "200990449-73fd03c53163fa7ca684910f836269b1"
let mainDiv = document.querySelector(".main")
let cardWrapper = document.createElement("div")
let icon = document.querySelector(".icon")
let iconWeather = document.querySelector(".iconWeather")
let mountainData = '';
let map=document.getElementById("map")
const getMountainId = () => {
    return localStorage.getItem("mountainId");
}

const getAllData = () => {
    return JSON.parse(localStorage.getItem("test"));
}
const getMountain = () => {
    let allData = getAllData()
    let mountainId = getMountainId()
    const mountainData = allData.filter(mountain => mountain.id == mountainId)
    return mountainData[0]
}

const printMountainName = () => {
    let mountainName = document.createElement("h2")
    mountainName.classList = "mountainName"
    mountainName.textContent = getMountain().name
    cardWrapper.appendChild(mountainName)   
    mainDiv.appendChild(cardWrapper)
}
printMountainName()

const printMountainImg = () => {

    cardWrapper.classList = "cardWrapper"
    let img = document.createElement("img")
    img.classList = "image"
    cardWrapper.appendChild(img)
    let poster = getMountain().imgMedium
    if(poster==""){
        poster = 'https://www.kairoscanada.org/wp-content/uploads/2017/01/mountain.jpeg'
    }
    img.setAttribute("src", poster)
    cardWrapper.appendChild(map)
    mainDiv.appendChild(cardWrapper)
}
printMountainImg()

const printMountainType = () => {
    let mountainType = document.createElement("h2")
    mountainType.classList = "mountainType"
    mountainType.textContent = "Type: " + getMountain().type
    cardWrapper.appendChild(mountainType)
    mainDiv.appendChild(cardWrapper)
}
printMountainType()

const printMountainSummary = () => {
    let mountainSummary = document.createElement("h2")
    mountainSummary.classList = "mountainType"
    mountainSummary.textContent = getMountain().summary
    cardWrapper.appendChild(mountainSummary)
    mainDiv.appendChild(cardWrapper)
}
printMountainSummary()

const printMountainDifficulty = () => {
    let mountainDifficulty = document.createElement("h2")
    mountainDifficulty.classList = "mountainType"
    mountainDifficulty.textContent = "Difficulty: " + getMountain().difficulty
    cardWrapper.appendChild(mountainDifficulty)
    cardWrapper.appendChild(icon)
    cardWrapper.appendChild(iconWeather)
    mainDiv.appendChild(cardWrapper)
}
printMountainDifficulty()


const getMountainData = () => {
    const conditionUrl = baseUrl + "conditions?ids=" + getMountainId() + "&key=" + key
    fetch(conditionUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            mountainData = myJson
            // Initialize and add the map       
                
            console.log(myJson)

        });
}
getMountainData()

let visitPageForHistory = () => {
    const conditionUrl = baseUrl + "conditions?ids=" + getMountainId() + "&key=" + key
    fetch(conditionUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            window.location.href = myJson[0].urlConditionsHistory
        });

}

let conditionsUpdate = () => {
    const conditionUrl = baseUrl + "conditions?ids=" + getMountainId() + "&key=" + key
    fetch(conditionUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            window.location.href = myJson[0].urlConditionsUpdate
        });
}

// Initialize and add the map
function initMap() {
    console.log("TEST")
    let latitude = getMountain().latitude
    let longitude = getMountain().longitude
   

    const location = { lat: latitude, lng: longitude };

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: location,
    });

    const marker = new google.maps.Marker({
      position: location,
      map: map,
    });
  }