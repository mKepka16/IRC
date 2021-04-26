class Formatter {
  constructor() {
    this.nickColor = this.getRandomColor();
    this.textColor = this.getRandomColor();
  }

  getRandomByte() {
    return Math.floor(Math.random() * 256);
  }

  getRandomColor() {
    const red = this.getRandomByte();
    const green = this.getRandomByte();
    const blue = this.getRandomByte();

    return `rgb(${red}, ${green}, ${blue})`;
  }

  getFormattedMessage(time, nick, text, nickColor, textColor) {
    return `
      <div class="message">
        [<span class="time">${time}</span>] 
        &#60;<span style="color: ${nickColor};" class="nick">@${nick}</span>&#62;
        <span style="color: ${textColor};" class="text">${text}</span>
      </div>`;
  }
}

export default new Formatter();
