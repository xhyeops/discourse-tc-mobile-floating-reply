import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "mobile-topic-floating-reply-edits",

  initialize() {
    withPluginApi("0.8.32", (api) => {
      // injeta o componente MobileTopicFloatingReply após cada post
      api.decorateWidget('post:after', (helper) => {
        const topicController = helper.getModel();

        // só exibe para usuário logado e mobile
        if (topicController.currentUser && topicController.site.mobileView) {
          return helper.h('MobileTopicFloatingReply', {
            jumpToPostNumber: topicController.jumpToPostNumber,
            replyToPost: topicController.replyToPost,
          });
        }
      });

      // mantém jumpToPost no controller de tópico
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
