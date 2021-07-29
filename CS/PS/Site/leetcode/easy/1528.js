// Add your javascript here
// <img class="cariusel-img" src="../assets/images/img-0.jpg" height="100%" width="100%">
const DOM = {
  $imageTag : document.querySelector('.cariusel-img'),
  $prevBtn : document.querySelector('.previous'),
  $nextBtn : document.querySelector('.next'),
  $slideCheckBox : document.querySelector('#slide'),
  $indicatorList : document.querySelector('.indicator-list'),
  $liList : document.querySelectorAll('.indicator-list li'),
}

const init = () => {

  function updateIndicator(){
    DOM.$liList.forEach(item => {
        item.classList.remove("active");
      });
    DOM.$liList[currentNumber].classList.add("active");
  }

  const imagesList = Array(5).fill('').map((value, index) => {
    value = "../assets/images/img-" + (index + 1) + '.jpg';
    return value;
  });
  let currentNumber = 0;
  DOM.$imageTag.src = imagesList[0];
  DOM.$liList[0].classList.add("active");

  DOM.$nextBtn.addEventListener('click', (e)=>{
    currentNumber = (currentNumber + 1) % 5;
    DOM.$imageTag.src = imagesList[currentNumber];
    updateIndicator();
  });
  DOM.$prevBtn.addEventListener('click', (e)=>{
    console.log('prev')
    currentNumber = (currentNumber - 1);
    if (currentNumber < 0) { currentNumber = 4;}
    DOM.$imageTag.src = imagesList[currentNumber];
    updateIndicator();
  });

  DOM.$indicatorList.addEventListener('click', (e)=>{
    if (e.target.value >= 0){
      DOM.$imageTag.src = imagesList[e.target.value];
      currentNumber = e.target.value;
      updateIndicator();
    }
  });
}

init();