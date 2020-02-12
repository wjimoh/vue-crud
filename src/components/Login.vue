<template>
  <div>
    <button v-on:click="auth('google')">Google</button>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
   methods: {
    auth(network) {
      const hello = this.hello;
      hello(network).login().then(() => {
        const authRes = hello(network).getAuthResponse();
                console.log(authRes.access_token)

        if(authRes.access_token) {
                            this.$router.push('/UserTable')

            //nav to login page

        } else {
            //do something else
                this.$router.push('/Login')

        }
        /*
          performs operations using the token from authRes
        */
        hello(network).api('me').then(function (json) {
          const profile = json;
          console.log(profile)
          /*
            performs operations using the user info from profile
          */
        });
      })
    }
  }
}
</script>

<style scoped>

</style>

