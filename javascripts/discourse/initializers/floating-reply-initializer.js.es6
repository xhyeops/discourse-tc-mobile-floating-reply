import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "mobile-topic-floating-reply-edits",

  initialize() {
    withPluginApi("0.8.32", (api) => {
      // Adiciona o botão ao final de cada post (mobile)
      api.decorateCooked(($elem, helper) => {
        const topicController = helper.getModel();
        if (topicController.currentUser && topicController.site.mobileView) {
          $elem.append(helper.h('MobileTopicFloatingReply', {
            jumpToPostNumber: topicController.jumpToPostNumber,
            replyToPost: topicController.replyToPost,
          }));
        }
      });

      // Mantém jumpToPost
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
