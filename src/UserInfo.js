export default class UserInfo {
  constructor(currentUser) {
    this.current_user = currentUser;
    this.user_name = this.current_user.displayName;
  }

}