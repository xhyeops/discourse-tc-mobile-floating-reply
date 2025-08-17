import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "mobile-topic-floating-reply-edits",

  initialize() {
    withPluginApi("0.8.32", (api) => {
      // injeta o componente MobileTopicFloatingReply após cada post
      api.decorateCooked(($elem, helper) => {
        const topicController = helper.getModel();
        if (topicController.currentUser && topicController.site.mobileView) {
          $elem.append('<MobileTopicFloatingReply />');
        }
      });

      // mantém jumpToPost no controller de tópico
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
