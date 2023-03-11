export default {
  methods: {
    showMsg: function(message) {
      var parent = this.$parent
      while(parent.showMsg == undefined) {
        parent = parent.$parent
      }
      parent.showMsg(message)
    },
    showNoConnectionMsg: function() {
      var parent = this.$parent
      while(parent.showNoConnectionMsg == undefined) {
        parent = parent.$parent
      }
      parent.showNoConnectionMsg()
    }
  }
}
