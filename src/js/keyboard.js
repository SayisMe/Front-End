export class Keyboard {
  /* #를 사용하면 private 선언 */
  #switchEl;
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGrouptEl;
  #inputEl;
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
    this.#inputGrouptEl.classList.toggle(
      "error",
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key)
    );
    
    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.add("active");
  }
  
  #onKeyUp(event) {
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