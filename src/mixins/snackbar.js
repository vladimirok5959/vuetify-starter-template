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
    },
    processAxiosError: function(err) {
      if(err.response && err.response.status == 403) {
        // Login page
        this.$router.push({ path: '/login' })
      } else {
        // Show message
        if(err.code == 'ERR_NETWORK') {
          this.showNoConnectionMsg()
        } else {
          this.showMsg(err.code)
        }
      }
    },
  }
}
