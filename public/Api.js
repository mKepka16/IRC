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

  formatTime = (time) => (time < 10 ? `0${time.toString()}` : time.toString());

  async getMessage(addMessage) {
    const response = await fetch('/chat');
    if (response.ok) {
      const messages = await response.json();

      messages.forEach((message) => {
        const { nick, nickColor, text, textColor, time } = message;
        const date = new Date(time);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formatedTime = `${this.formatTime(hours)}:${this.formatTime(
          minutes
        )}`;

        addMessage(
          Formatter.getFormattedMessage(
            formatedTime,
            nick,
            text,
            nickColor,
            textColor
          )
        );
      });
    }

    this.getMessage(addMessage);
  }
}

export default Api;
