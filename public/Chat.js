import Scroll from './Scroll.js';
import Api from './Api.js';
import Commands from './Commands.js';

class Chat {
  constructor() {
    this.chat = document.querySelector('.overview');
    this.userInput = document.querySelector('.userInput');
    this.userInput.onkeydown = (e) => this.handleKeyDown(e);
    this.scroll = new Scroll();
    this.api = new Api();
    this.api.getMessage(this.addMessage);
    this.nick = prompt('Wprowadź nick:');

    while (!this.isProperNick(this.nick)) {
      this.nick = prompt('Wprowadź nick:');
    }
  }

  isProperNick(nick) {
    const nickRegex = /^[0-9A-Z]+$/i;
    return nickRegex.test(nick);
  }

  changeNick = (nick) => {
    this.nick = nick;
  };

  addMessage = (message) => {
    this.chat.innerHTML += message;
    $('.text').emoticonize();

    this.scroll.scrollToBottom();
  };

  handleKeyDown(e) {
    if (e.key != 'Enter') return;
    const text = e.target.value;
    e.target.value = '';

    if (Commands.isCommand(text, (nick) => this.changeNick(nick))) return;

    this.api.sendMessage(this.nick, text);
  }
}

const chat = new Chat();
