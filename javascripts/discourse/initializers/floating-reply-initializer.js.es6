import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "mobile-topic-floating-reply-edits",

  initialize() {
    withPluginApi("0.8.32", (api) => {
      // registra o componente no outlet desejado
      api.registerPluginOutlet('after-post-buttons', 'mobile-topic-floating-reply');

      // mantém jumpToPost
      api.modifyClass("controller:topic", {
        actions: {
          jumpToPost(params) {
            if (params > 0) {
              this._jumpToPostNumber(params);
            } else {
              this.send("replyToPost");
            }
          },
        },
      });
    });
  },
};
