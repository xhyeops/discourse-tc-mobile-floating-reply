import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "mobile-topic-floating-reply-edits",

  initialize() {
    withPluginApi("0.8.32", (api) => {

      api.attachComponent('post-controls:after', 'MobileTopicFloatingReply', (helper) => {
        const topicController = helper.getModel();
        return {
          jumpToPostNumber: topicController.jumpToPostNumber,
          replyToPost: topicController.replyToPost,
        };
      });

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
