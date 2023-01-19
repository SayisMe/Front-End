function onSubmit(event) {
  event.preventDefault();
  const w = parseFloat(event.target[0].value)
  const h = parseFloat(event.target[1].value)

  if(isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
    alert("적절한 값이 아닙니다.")
    return;
  }
}