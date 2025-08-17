import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "mobile-topic-floating-reply-edits",

  initialize() {
    withPluginApi("0.9.0", (api) => {
      // Anexa o Glimmer Component ao outlet 'post-controls:after'
      api.attachComponent('post-controls:after', 'MobileTopicFloatingReply', (helper) => {
        const topicController = helper.getModel();
        return {
          jumpToPostNumber: topicController.jumpToPostNumber,
          replyToPost: topicController.replyToPost,
        };
      });

      // Mantém a ação jumpToPost no controller de tópico
      api.modifyClass("controller:topic", {
        pluginId: "mobile-floating-reply",
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
