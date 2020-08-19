export default {
  actions: {
    floatingReply(params) {
      //hack to exploit the only available action supported by plugin connector
      this.sendAction('jumpToPost', params)
    }
  }
}
