import axios from "axios";

export default {
  methods: {
    apiGet: function(path) {
      return axios.get(
        import.meta.env.VITE_API_BASE_URL + path,
        { dataType: 'json' }
      )
    },
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
        this.$router.push({ path: '/login' })
      } else {
        if(err.code == 'ERR_NETWORK') {
          this.showNoConnectionMsg()
        } else {
          this.showMsg(err.code)
        }
      }
    },
  }
}
