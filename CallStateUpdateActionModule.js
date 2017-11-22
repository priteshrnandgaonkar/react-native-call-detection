var CallStateUpdateActionModule = {

  callStateUpdated(state, incomingNumber) {
    this.callback && this.callback(state, incomingNumber)
  }

}

module.exports = CallStateUpdateActionModule;
