export class Keyboard {
  /* #를 사용하면 private 선언 */
  #switchEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGrouptEl;
  #inputEl;
  #keyPress = false;
  #mouseDown = false;
  constructor() {
    this.#asssignElement();
    this.#addEvent();
  }

  #asssignElement() {
    this.#containerEl = document.getElementById("container");
    this.#switchEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGrouptEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGrouptEl.querySelector("#input");
    // document.getElemntById("switch") 로 탐색할 수 있지만, 그보다 하위인 container 부터 탐색하도록 해서 비용을 절감할 수 있게 되었다.
  }

  #addEvent() {
    this.#switchEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    document.addEventListener("keydown", this.#onKeyDown.bind(this));  // 1) 여기서 this는 윈도우를 가리키고 있기 때문에,
    document.addEventListener("keyup", this.#onKeyUp.bind(this));      // 3) 따라서 .bind(this) 를 해서 this가 윈도우가 아닌 클래스의 this를 가리키도록 해준다.
    this.#inputEl.addEventListener("input", this.#onInput);
    this.#keyboardEl.addEventListener("mousedown", this.#onMouseDown.bind(this));
    document.addEventListener("mouseup", this.#onMouseUp.bind(this));
  }

  // 키보드를 누르고, 뗄 때는 누른 위치가 아닌 곳에서 뗄 수도 있기 때문에 document로 addEvent를 하고,
  // this.#keyboardEl 을 통해서 제거를 해준다.
  #onMouseUp(event) {
    if(this.#keyPress) return;
    this.#mouseDown = false;
    const keyEl = event.target.closest("div.key");
    const isActive = !!keyEl?.classList.contains("active"); // 느낌표를 두 개 함으로써 boolean으로 type casting
    const val = keyEl?.dataset.val; // data-val = "1" 인 것을 값을 불러올때 이렇게 표현
    if (isActive && !!val && val !== "Space" && val !== "Backspace") {
      this.#inputEl.value += val;
    }
    if (isActive && val === "Space") {
      this.#inputEl.value += " ";
    }
    if (isActive && val === "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  }

  #onMouseDown(event) {
    if(this.#keyPress) return;
    this.#mouseDown = true;
    event.target.closest("div.key")?.classList.add("active");
  }

  #onInput(event) {
    event.target.value = event.target.value.replace(
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
      ""
    );
  }

  // 2) window로 가리켜서 행해진 함수 onKeyDown에서 this.#inputGroupEl 은 keyboard class 안의 변수이므로
  // (즉, 전역 객체의 변수가 아니므로) 에러가 난다.
  #onKeyDown(event) {
    if(this.#mouseDown) return;
    this.#keyPress = true;
    this.#inputGrouptEl.classList.toggle(
      "error",
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key)
    );
    
    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.add("active");
  }
  
  #onKeyUp(event) {
    if(this.#mouseDown) return;
    this.#keyPress = false;
    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.remove("active");
  }

  #onChangeTheme(event) {
    document.documentElement.setAttribute(
      "theme",
      event.target.checked ? "dark-mode" : ""
    );
  }

  #onChangeFont(event) {
    document.body.style.fontFamily = event.target.value;
  }
}