import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class MobileTopicFloatingReplyComponent extends Component {
  @service currentUser;
  @service site;

  @action
  floatingReply() {
    if (this.args.jumpToPostNumber) {
      this.args.jumpToPostNumber(-1);
    } else if (this.args.replyToPost) {
      this.args.replyToPost();
    }
  }

  get showButton() {
    return this.currentUser && this.site.mobileView;
  }
}
