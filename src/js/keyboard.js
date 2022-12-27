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
    // document.getElemntById("switch") 로 탐색할 수 있지만, 그보다 하위인 container 부터 탐색하도록 해서 비용을 절감할 수 있게 되었다.
  }

  #addEvent() {
    this.#switchEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    document.addEventListener("keydown", this.#onKeyDown);
    document.addEventListener("keyup", this.#onKeyUp);
    this.#inputEl.addEventListener("input", this.#onInput);
  }

  #onInput(event) {
    event.target.value = event.target.value.replace(
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
      ""
    );
  }

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