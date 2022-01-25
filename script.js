let divi1 = document.querySelector(".container-fluid");

let divi2 = document.createElement("div");
divi2.setAttribute("class", "row");
divi1.appendChild(divi2);

let dcol1 = document.createElement("div");
dcol1.setAttribute("class", "col");
divi2.appendChild(dcol1);

let dcol2 = document.createElement("div");
dcol1.setAttribute("class", "col");
divi2.appendChild(dcol2);

const imageBtn = document.createElement("button");
imageBtn.setAttribute("class", "btn btn-danger mt-3 ml-3");
imageBtn.setAttribute("id", "sbt-btn");
imageBtn.innerHTML= "All Details";
dcol1.appendChild(imageBtn);

const AllDetails = document.createElement("button");
AllDetails.setAttribute("class", "btn btn-secondary mt-3 ml-3");
AllDetails.setAttribute("id", "sbt-btn3");
AllDetails.innerHTML= "All Details Consolidated in a table";
dcol2.appendChild(AllDetails);

let searchBar = document.createElement("input");
searchBar.setAttribute("type", "search");
searchBar.setAttribute("class", "ml-4 text-black");
searchBar.setAttribute("id", "searchbar");
searchBar.setAttribute("placeholder", "Please Search here.....")
dcol1.appendChild(searchBar); 

let searchButton = document.createElement("button");
searchButton.setAttribute("class", "btn btn-primary mt-2 ml-2");
searchButton.setAttribute("id", "Searchbtnn")
searchButton.innerHTML = "Search";
dcol1.appendChild(searchButton);

let divi3 = document.createElement("div");
divi3.setAttribute("class", "row");
divi1.appendChild(divi3);

let col1 = document.createElement("div");
col1.setAttribute("class", "col");
col1.setAttribute("id", "col-1");
divi3.appendChild(col1);

let col2 = document.createElement("div");
col2.setAttribute("class", "col");
col2.setAttribute("id", "col-2");
divi3.appendChild(col2);

let tableBody = document.createElement("table");
tableBody.setAttribute("class", "table table-bordered mt-4");
let tableHeader = document.createElement("thead");
let tableHead = document.createElement("tr");
tableHead.setAttribute("class", "bg-warning");

let tableBody2 = document.createElement("tbody");
tableBody2.setAttribute("class", "table-body bg-secondary text-white");
tableBody.appendChild(tableBody2);

let tableCol1 = document.createElement("th");
tableCol1.innerHTML = "S.No";
let tableCol2 = document.createElement("th");
tableCol2.innerHTML = "Start Date";
let tableCol3 = document.createElement("th");
tableCol3.innerHTML = "End Date";
let tableCol4 = document.createElement("th");
tableCol4.innerHTML = "Type";
let tableCol5 = document.createElement("th");
tableCol5.innerHTML = "IMDB Rating";

tableHead.appendChild(tableCol1);
tableHead.appendChild(tableCol2);
tableHead.appendChild(tableCol3);
tableHead.appendChild(tableCol4);
tableHead.appendChild(tableCol5);

tableHeader.appendChild(tableHead);
tableBody.appendChild(tableHeader);
col2.appendChild(tableBody);

AllDetails.addEventListener("click", addDetails);

async function addDetails(){
    try{
        let tBody2 = document.querySelector(".table-body");
        let tableRow2 = "";
        let datum = await fetch("https://api.jikan.moe/v4/anime?q=naruto");
        let data = await datum.json();

        console.log(data);
        for(var i=0; i<data.data.length; i++){
            tableRow2 +=
            `<tr>
            <td>${i+1}</td>
            <td>${data.data[i].aired.from}</td>
            <td>${data.data[i].aired.to}</td>
            <td>${data.data[i].type}</td>
            <td>${data.data[i].score}</td>
            </tr>`
        }

        tBody2.innerHTML += tableRow2;
           
    }catch(error){
        console.log(error);
    }
}

imageBtn.addEventListener("click", getData);
async function getData(){
    try{
        let datum = await fetch("https://api.jikan.moe/v4/anime?q=naruto");
        let data = await datum.json();

        for(var i=0; i<data.data.length; i++){
            col1.innerHTML += 
            `<div class="mt-4">
                <div class="col">
                    <h3 class="h3">${i+1}</h3>
                    <div class="card">
                        <div class="card-title">
                        <h4>${data.data[i].title}</h4>
                            <div class="card-body">
                                <p><b>Start Date:</b> ${data.data[i].aired.from}</p>
                                <p><b>End Date:</b> ${data.data[i].aired.to}</p>
                                <p><b>Type:</b> ${data.data[i].type}</p>
                                <p><b>IMDB Rating:</b> ${data.data[i].score}</p> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <p><b>Image of the Season :</b></p>
                    <img src="${data.data[i].images.jpg.large_image_url}" ></img>
                    <p><b>Poster of the Season :</b></p>
                    <img src="${data.data[i].images.webp.large_image_url}" ></img>
                </div>
                <hr>
            </div>`
        }
    }catch(error){
        console.log(error)
    }
}

searchButton.addEventListener("click", Search);
async function Search(){
    let datum = await fetch("https://api.jikan.moe/v4/anime?q=naruto");
    let data = await datum.json();
    let title = document.getElementsByTagName("h4");
    let textContent = document.querySelector("#searchbar").value;
    
    try{
        for(var i=0; i<data.data.length; i++){
            if(data.data[i].title == textContent){
                col1.innerHTML = 
                `<div class="mt-4">
                <div class="col">
                    <div class="card">
                        <div class="card-title">
                        <h4>${data.data[i].title}</h4>
                            <div class="card-body">
                                <p><b>Start Date:</b> ${data.data[i].aired.from}</p>
                                <p><b>End Date:</b> ${data.data[i].aired.to}</p>
                                <p><b>Type:</b> ${data.data[i].type}</p>
                                <p><b>IMDB Rating:</b> ${data.data[i].score}</p> 
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <p><b>Image of the Season :</b></p>
                    <img src="${data.data[i].images.jpg.large_image_url}" ></img>
                    <p><b>Poster of the Season :</b></p>
                    <img src="${data.data[i].images.webp.large_image_url}" ></img>
                </div>
                <hr>
            </div>`
            break;
            }else{
                col1.innerHTML = 
                `<div class="col">
                    <h2>No results found</h2>       
                </div>`
            }
        }
    }catch(error){
        console.log(error);
    }
    
}
