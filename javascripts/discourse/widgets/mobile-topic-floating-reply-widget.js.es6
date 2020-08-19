import { createWidget } from "discourse/widgets/widget";
import { h } from "virtual-dom";

createWidget("mobile-topic-floating-reply-widget", {
  tagName: "span.mobile-topic-floating-reply-widget",

  buildKey: () => `mobile-topic-floating-reply-widget`,

  html(attrs) {
    var controls = [];

    if (this.currentUser && this.site.mobileView) {
      controls.push(
        h(
          "span.mobile-topic-floating-reply",
          this.attach("button", {
            className: "mobile-topic-floating-reply",
            buttonClass: "popup-menu-btn",
            action: "floatingReplyToPost",
            icon: "reply",
          })
        )
      );
    }

    return controls;
  },

  floatingReplyToPost() {
    this.sendWidgetAction('floatingReply', -1);
  },
});
