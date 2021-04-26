class Scroll {
  constructor() {
    this.$chat = $('#chat');
    this.$chat.tinyscrollbar();
  }

  scrollToBottom = () => {
    const viewportHeight = document.querySelector('.viewport').offsetHeight;
    const overviewHeight = document.querySelector('.overview').offsetHeight;
    const pxToScroll = overviewHeight - viewportHeight;
    if (pxToScroll <= 0) return;

    const chat = this.$chat.data('plugin_tinyscrollbar');
    chat.update(pxToScroll);
  };
}

export default Scroll;
