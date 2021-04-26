import Formatter from './Formatter.js';

class Commands {
  isCommand(text, changeNick) {
    let command = false;
    if (this.isColorCommand(text)) command = true;
    if (this.isQuitCommand(text)) command = true;
    if (this.isNickCommand(text, changeNick)) command = true;

    return command;
  }

  isNickCommand(text, changeNick) {
    console.log(text);
    const nickCommandRegex = /^\/nick [0-9A-Z]+$/i;
    const isCommand = nickCommandRegex.test(text);
    console.log(isCommand);

    if (isCommand) {
      this.changeNick(text, changeNick);
      return true;
    }
  }

  changeNick(command, changeNick) {
    let nick = command.split(' ')[1];
    changeNick(nick);
    alert('Nick changed');
  }

  isQuitCommand(text) {
    const quitCommandRegex = /^\/quit$/i;
    const isCommand = quitCommandRegex.test(text);

    if (isCommand) {
      this.quit();
      return true;
    }
  }

  quit() {
    location.reload();
  }

  isColorCommand(text) {
    const colorCommandRegex = /^\/color( #[0-9A-F]{6})?$/i;
    const isCommand = colorCommandRegex.test(text);

    if (isCommand) {
      this.setColor(text);
      return true;
    }
  }

  setColor(command) {
    let color = command.split(' ')[1];
    if (!color) color = Formatter.getRandomColor();

    Formatter.textColor = color;
    alert('Color changed');
  }
}

export default new Commands();
