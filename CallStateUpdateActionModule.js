var CallStateUpdateActionModule = {

  callStateUpdated(state) {
    this.callback && this.callback(state)
  }

}

module.exports = CallStateUpdateActionModule;
