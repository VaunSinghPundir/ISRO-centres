const input = document.querySelector("#search-bar");
const cityBtn = document.querySelector(".city-btn");
const statebtn = document.querySelector(".state-btn");
const centerBtn = document.querySelector(".center-btn");
const dataListDiv = document.querySelector(".dataList");
const historybtn = document.querySelector(".srh-history");
const delbtn = document.querySelector(".clr-history")

intialdata();
let data = [];
let history = JSON.parse(localStorage.getItem("savedData")) || [];
let toggle = false;
console.log(history)
let match = false;
let id = [];
function matchWord(){
  
  // data.map((item)=>{
  //   if(item.name === input.value || item.Place === input.value || item.State === input.value){
  //     return id.push(item.id);
  //   }
  // })
  // console.log(id)

  history.flat().map((data)=> 
  { 
    // if(id.includes(data.id)){
    //   match = true;
    // }
    
    if(data.name === input.value|| data.State === input.value || data.Place === input.value){
      match = true;
    }
  })
  // console.log(match , "vvvvvvvvvvv")
}



function deleteData(id) {
  dataListDiv.innerHTML = "";
  console.log(id)
  const newData = history.flat().filter((data) => {
  return data.id !== id;
  }
  );
  console.log(newData)
  localStorage.setItem("savedData", JSON.stringify(newData));
  console.log(history,"lllllllllll")

  cards(newData)
}


historybtn.addEventListener("click", showHistory);

function showHistory() {
  if (!toggle) {
    delbtn.classList.add("show");
    delbtn.classList.remove("hide");
    historybtn.innerHTML = "Close History";
    toggle = true;
    dataListDiv.innerHTML = "";
    // let savedHistory = JSON.parse(localStorage.getItem("savedData"));
    // let unsaved = savedHistory.flat();
    cards(history.flat());
    // deleteBtn = document.querySelector("#deleteData");
  } else if (toggle) {
    historybtn.innerHTML = "Show History";
    toggle = false;
    dataListDiv.innerHTML = "";
    cards(data);
    delbtn.classList.add("hide");
    delbtn.classList.remove("show");

  }
}

// delbtn.addEventListener("click",deleteAllhistory);
function deleteAllhistory (){
    localStorage.clear(); 
    location.reload();
}


async function intialdata() {
  const url = "https://isro.vercel.app/api/centres";
  const response = await fetch(url);
  const json = await response.json();
  const isroList = json.centres;
  data = isroList;
  cards(data);
}



// City Search Button
cityBtn.addEventListener("click", searchCity);
function searchCity() {
  toggle = false;
  dataListDiv.innerHTML = "";
  matchWord()
  if (input.value) {
    let keyword = input.value;
    let newCityData =  data.flat().filter((word) => {
      return word.Place.toLowerCase() === keyword.toLowerCase();
    });
    if (newCityData.length === 0) {
      dataListDiv.innerHTML = `    
                    <div class="mistype">
                    <h3>City Not Found</h3>
                    </div>
                `;
    }
    cards(newCityData);
    if (newCityData !== [] && !match) {
      history.push(newCityData);
      localStorage.setItem("savedData", JSON.stringify(history.flat()));
      console.log(history);
    }
  } else {
    dataListDiv.innerHTML = `    
                <div class="mistype">
                <h3>Please type something !!</h3>
                </div>
            `;
  }
}



// State search button
statebtn.addEventListener("click", searchState);
function searchState() {
  dataListDiv.innerHTML = "";
  console.log(match)
  matchWord()
  if (input.value) {
    toggle = false;
    let statevalue = input.value;
    let newStateData = data.flat().filter((word) => {
      return word.State.toLowerCase() === statevalue.toLowerCase();
    });
    if (newStateData.length === 0) {
      dataListDiv.innerHTML = `
                <div class = "mistype">
                <h3>State Not Found</h3>
                </div>
            `;
    } else {
      cards(newStateData);
    }
    // data.map((item)=>{
    //   if(item.name === input.value || item.Place === input.value || item.State === input.value){
    //     return id.push(item.id);
    //   }
    // })
    
    // for(let i=0;i<newStateData.flat().length;i++){
    //   for(let j=0;j<id.length;j++)
      if (newStateData !== [] && !match) {
      history.push(newStateData.flat());
      localStorage.setItem("savedData", JSON.stringify(history.flat()));     
    ``
      }
    
    
  } else {
    dataListDiv.innerHTML = `
            <div class="mistype">
                <h3>Please type something !!</h3>
            </div>
        `;
  }
}

// Center Search button
centerBtn.addEventListener("click", searchCenter);

function searchCenter() {
  dataListDiv.innerHTML = "";
  matchWord()
  if (input.value) {
    toggle = false;
    let centervalue = input.value;
    let newCenterData =  data.flat().filter((word) => {
      return word.name.toLowerCase() === centervalue.toLowerCase();
    });
    if (newCenterData.length === 0) {
      dataListDiv.innerHTML = `
                <div class = "mistype">
                    <h3>Center Not Found</h3>
                </div>
            `;
    } else {
      cards(newCenterData);
    }
    if (newCenterData !== [] && !match) {
      history.push(newCenterData);
      localStorage.setItem("savedData", JSON.stringify(history.flat()));
      console.log(history);
    }
  } else {
    dataListDiv.innerHTML = `
            <div class="mistype">
                <h3>Please type something !!</h3>
            </div>
        `;
  }
}
function cards(isroList) {
  for (let isro of isroList) {
    const section = document.createElement("section");
    section.innerHTML = `    
                <div class="box">
                    <h3 class = "newh3">Center</h3>
                    <P class="newP1">${isro.name}</P>
                </div>

                <div class="box">
                    <h3 class = "datah3">City</h3>
                    <p class= "dataP">${isro.Place}</p>
                </div>

                <div class="box">
                    <h3 class = "datah3">State</h3>
                    <p class="dataP">${isro.State}</p>
                </div>`
                // ${
                //   toggle
                //     ? `<button class="button" id="del-btn"onclick="deleteData(${isro.id})">X</button>`
                //     : ""
                //  }
            ;
    section.classList.add("center-card");
    dataListDiv.appendChild(section);
  }
}
