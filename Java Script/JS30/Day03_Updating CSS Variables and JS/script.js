const inputList = document.querySelectorAll(".controls input");


function handleUpdate() {
  //data-으로 정해진 것들의 집합 = dataset
  const suffix = this.dataset.sizing || '';
  //:root의 값을 변경해주면, 그를 따르는 img의 값들도 변함
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
  
}
inputList.forEach((input) => {
  input.addEventListener("change", handleUpdate);
  input.addEventListener("mousemove", handleUpdate);
});
