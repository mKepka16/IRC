import Formatter from './Formatter.js';

class Api {
  async sendMessage(nick, text) {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nick,
        text,
        nickColor: Formatter.nickColor,
        textColor: Formatter.textColor,
      }),
    });

    // console.log(response);
  }

  async getMessage(addMessage) {
    const response = await fetch('/chat');
    if (response.ok) {
      const messages = await response.json();

      messages.forEach((message) => {
        const { nick, nickColor, text, textColor, time } = message;
        addMessage(
          Formatter.getFormattedMessage(time, nick, text, nickColor, textColor)
        );
      });
    }

    this.getMessage(addMessage);
  }
}

export default Api;
