let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //EventListeners
  
 const form = document.querySelector("form");
 form.addEventListener("submit", submitHandler);
  



  //Functions

  function toyCards(toy){
    let newDiv = document.createElement("div");
    newDiv.className = "card";
    let toyName = document.createElement('h2');
    let toyImage = document.createElement("img");
    let toyLikes = document.createElement("p");
    let likeButton = document.createElement("button");

    toyName.textContent = toy.name;
    toyImage.src = toy.image;
    toyImage.className = "toy-avatar";
    toyLikes.textContent = `${toy.likes} likes`;
    likeButton.className = "like-btn";
    likeButton.id = toy.id
    likeButton.textContent = "like ❤️"

    likeButton.addEventListener("click", () => {
      toy.likes += 1
      updateLikes(toy)
      toyLikes.textContent = `${toy.likes} likes`;
    })

    newDiv.appendChild(toyName);
    newDiv.appendChild(toyImage);
    newDiv.appendChild(toyLikes);
    newDiv.appendChild(likeButton);
    document.querySelector("div#toy-collection").appendChild(newDiv);
  }
  // function toyCards(array){
  //   for(element of array){
  //     let newDiv = document.createElement("div");
  //     let toyName = document.createElement('h2');
  //     let toyImage = document.createElement("img");
  //     let toyLikes = document.createElement("p");
  //     let likeButton = document.createElement("button");
      

  //     newDiv.className = "card";

  //     toyName.textContent = element.name;
  //     toyImage.src = element.image;
  //     toyImage.className = "toy-avatar";
  //     toyLikes.textContent = `${element.likes} likes`;
  //     likeButton.className = "like-btn";
  //     likeButton.id = element.id
  //     likeButton.textContent = "like ❤️"

  //     newDiv.appendChild(toyName);
  //     newDiv.appendChild(toyImage);
  //     newDiv.appendChild(toyLikes);
  //     newDiv.appendChild(likeButton);
  //     document.querySelector("div#toy-collection").appendChild(newDiv);

  //     likeButton.addEventListener("click", function(){
  //       console.log(element.id)
  //       updateLikes;
  //     })
  //   }
  // }

  function submitHandler(event){
    event.preventDefault();
  //  console.log(event.target.name.value)
   
   let toyObj = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0,
   }
  //  event.target.name.value = "";
  //  event.target.image.value = "";
  form.reset()

   makeNewToy(toyObj)
  }

  function changeLikesText(){
    
  }

  //Fetch Requests

  function getToys(){
    fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(data => data.forEach(toy => toyCards(toy)))
  }
  
  function makeNewToy(toyObj){
    fetch("http://localhost:3000/toys",{
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        accept: "application/json"
      },
      body: JSON.stringify(toyObj),

    })
    .then(resp => resp.json())
    .then(data => getToys(data))
  }

  function updateLikes(toy){
    let idNum = toy.id
    
    fetch(`http://localhost:3000/toys/${idNum}`,{
      method: "PATCH",
      headers:{
        'Content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        likes: toy.likes
      })
    })
    .then(resp => resp.json())
    .then(data => (data))
  }

  getToys()

});
