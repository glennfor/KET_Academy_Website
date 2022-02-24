


/*********HANDLING LOADING OF MATERIALS***********/



//subjects

const subjects = {
    all: "All Subjects",
    CSC: "Computer Science",
    Math: "Mathematics",
    Fmath: "Further Mathematics",
    ICT: "ICT",
    Chem: "Chemistry",
    Phy: "Physics",
    Bio: "Biology",
    Econs: "Economics",
    Geo: "Geography",
    Geolog: "Geology",
    His:"History"
  };
  
  

  function collapse(element){
    document.querySelector(element).style.display="none"
  }
  function expand(element){
    document.querySelector(element).style.display = "block"
  }
  
  
  let loadDataToUI = function(libraryData){
  
    const dataProps = {"notes":["lib-notes", "assets/img/library/book-5.jpeg"],
    "answers":["lib-answers", "assets/img/library/book-note-f.jpg"],
    "videos":["lib-videos", null],
    "questions":["lib-pastquestions", "assets/img/library/booky2.jfif"]
   }
  
  
    //handle videos
    for(videoItemId in libraryData['videos']){
     
      const title = libraryData['videos'][videoItemId].title,
            subjectTag = libraryData['videos'][videoItemId]["subjectTag"],
            href = libraryData['videos'][videoItemId]['linkToContent']
  
      const videoContainer = document.createElement('div');
      videoContainer.classList.add('video-item')
      videoContainer.id = `video-${videoItemId}`
      videoContainer.setAttribute("subject", subjectTag)
  
      const element = document.createElement("iframe")
      element.classList.add('vid-videos')
      element.src = href //put source
      element.style.border = "2px solid #fff"
  
      const titre = document.createElement('p')
      titre.innerHTML = `<b>${title}</b>`
      titre.classList.add('video-desc')
  
      videoContainer.appendChild(element)
      videoContainer.appendChild(titre)
      document.querySelector('.lib-videos').appendChild(videoContainer)
    }
  
      //handle paperwork data
  
    for(dataCategory in libraryData){
      if(dataCategory=='videos')continue
      for(itemId in libraryData[dataCategory]){
        const title = libraryData[dataCategory][itemId]["title"],
            subjectTag = libraryData[dataCategory][itemId]["subjectTag"],
            linkToContent = libraryData[dataCategory][itemId]['linkToContent'],
            description = libraryData[dataCategory][itemId]['description'],
            numberOfLikes = Math.ceil((Math.random()*50)+9)//change later
        const className = dataProps[dataCategory][0],
              image = dataProps[dataCategory][1]
        //create paper with picture bg
        const paperworkElement = document.createElement("div")
        paperworkElement.classList.add("atomic-item")
        paperworkElement.id = `paperItem-${itemId}`
        paperworkElement.setAttribute("subject", subjectTag)
        paperworkElement.style.backgroundImage = `url(${image})`
        
        //add event listeners for: expand, download, like and close-description

        function like(element){}
  
        const descId = `atomicItem-desc-${itemId}`
        const paperWorkContent = 
              `
                <p class="atomic-title">
                    ${title}
                </p>
                
                <div id="${descId}">
                    <p>
                        ${description}
                    </p>
                    <i onclick="collapse('.atomic-item > #${descId}')" 
                    class="bi bi-check-circle-fill"></i>
                </div>
  
                <div class="actions-bar">
                    <a href="${linkToContent}" target="_blank" ><i class="bi bi-download"></i></a>
                    <i onclick="expand('.atomic-item > #${descId}')" 
                    class="bi bi-plus"></i>
                    <i onclick= "like()" class="bi bi-heart-fill"> 
                        <span class="badge badge-pill badge-primary">${numberOfLikes}</span></i>
                </div>
              `
          paperworkElement.innerHTML = paperWorkContent
          document.querySelector('.'+className).appendChild(paperworkElement)
        }
      }
    
  }
  
  
  const dataFile = "../../data/library.json"
  const contentClasses = [".lib-notes", ".lib-videos", ".lib-answers", ".lib-pastquestions"]
  
  //==============================================================================
  //===============load all the material data from JSON database to the ui========
  //==============================================================================
  //can use jquery or fetch
  /*
  
  $(function(){
      $.getJSON(dataFile,function(data)
      {console.log({"Using JQuery": data})});
   })();
  
   $.getJSON("https://bioinfobot.github.io/data/2017-05.json")
  .done(function( data ) {
     console.log(data)
  });
  
  $.getJSON("https://bioinfobot.github.io/data/2017-05.json", function(json) {
      console.log(json); 
  });
   */
  
  fetch(dataFile).then(response => response.json()).then(libraryData => {
    console.log(libraryData)
    loadDataToUI(libraryData)
  }) 
  
  
  
  //collect search buttons and populate the select element

const searchItemButtons = document.querySelectorAll('.search-item');
const selectItems = document.querySelectorAll(".select-subject")

console.log(selectItems)

for(let subjectTag of Object.keys(subjects)){
    Array.from(selectItems).forEach(selectItem=>{
    const option = document.createElement('option')
    option.value = subjectTag
    option.innerHTML = subjects[subjectTag]
    selectItem.appendChild(option)
    })
}

//set event listeners for all buttons
function searchLibrary(button){
    const targetClass = button.getAttribute('target')
    let targetSearch 
    for(const target of Array.from(selectItems))
    if(target.getAttribute('target')==targetClass){
        targetSearch = target;
        break;
    }

    const subjectTagToSearch = targetSearch.value
    if(!Object.keys(subjects).includes(subjectTagToSearch)) return

    const library = Array.from(document.querySelector(targetClass).querySelectorAll('div[id^="paperItem-"')).concat(
                    Array.from(document.querySelector(targetClass).querySelectorAll('div[id^="video-v"')))
    
    for(let item of library){
    subject = item.getAttribute("subject")
    console.log({id:item.id})
    console.log({item:item})
    if(!(subject == subjectTagToSearch) && subjectTagToSearch != "all"){
        $('#'+item.id).slideUp(1600)
        
        ///item.style.display = "none";
    }
    else if(item.style.display === "none"){
        $('#'+item.id).slideDown(1600)
        //item.style.display = "table-row";
    }
    }
}


Array.prototype.forEach.call(searchItemButtons, (button)=>{
    button.addEventListener('click', (ev)=>searchLibrary(button))
})

