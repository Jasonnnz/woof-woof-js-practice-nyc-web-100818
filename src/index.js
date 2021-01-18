document.addEventListener('DOMContentLoaded', e => {
  // const domController = new DOMController
  fetchAllDogs(); 

  const filterBtn = document.querySelector('button#good-dog-filter');
  filterBtn.addEventListener('click', function(e){
    if (e.target.textContent === "Filter good dogs: OFF"){
      emptyDogs();
      fetchAllGoodDogs();
      e.target.textContent = "Filter good dogs: ON";
    } else {
      emptyDogs();
      fetchAllDogs();
      e.target.textContent = "Filter good dogs: OFF";
    }
  })
})

function fetchAllDogs(){
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(arrOfDogs => {
    arrOfDogs.forEach(dog => addSpanToDog(dog))
  })
}

function fetchAllGoodDogs(){
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(arrOfDogs => {
    arrOfDogs.forEach(dog => {
      if (dog.isGoodDog === true){
        addSpanToDog(dog);
      }
    })
  })
}

function addSpanToDog(dog){
  const dogBar = document.querySelector('div#dog-bar');
  const span = document.createElement('span');
  
  span.textContent = dog.name;
  dogBar.append(span);

  span.addEventListener('click', function(e){
    dogInfo(dog);
  });
}

function dogInfo(dog){
  const dogInfo = document.querySelector('div#dog-info');
  dogInfo.innerHTML = "";
  const dogImg = document.createElement('img');
  dogImg.src = dog.image;
  const dogH2 = document.createElement('h2');
  dogH2.textContent = dog.name;
  const dogBtn = document.createElement('button');
  
  if (dog.isGoodDog === true){
    dogBtn.textContent = "Bad Dog!";
  } else {
    dogBtn.textContent = "Good Dog!";
  }
  dogInfo.append(dogImg, dogH2, dogBtn);
  
  dogBtn.addEventListener('click', function(e){
    if (e.target.textContent === "Good Dog!"){
      e.target.textContent = "Bad Dog!";
      dog.isGoodDog = !dog.isGoodDog;
      updateDB(dog);
    } else {
      e.target.textContent = "Good Dog!";
      dog.isGoodDog = !dog.isGoodDog;
      updateDB(dog);
    }
  })
}

function updateDB(dog){
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dog = {isGoodDog: dog.isGoodDog}),
  }).then(res => res.json())
  .then(data => console.log('Success:', data))
}

function emptyDogs(){
  const dogBar = document.querySelector('div#dog-bar');
  while (dogBar.firstChild){ 
    dogBar.removeChild(dogBar.firstChild);
  }
}
 
