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
    document.addEventListener("keydown",(event) => {
      this.#inputGrouptEl.classList.toggle(
        "error",
        /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key)
      );
      
      this.#keyboardEl
        .querySelector(`[data-code=${event.code}]`)
        ?.classList.add("active");
    });
    document.addEventListener("keyup", (event) => {
      //console.log("keyup")
      this.#keyboardEl
        .querySelector(`[data-code=${event.code}]`)
        ?.classList.remove("active");
    });
    this.#inputEl.addEventListener("input", (event) => {
      
    });
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