<template>
  <div style="width:112px; margin:auto;">
    <button v-on:click="auth('google')">
      <img src="./../../assets/gmail_logo.png" />
      Google
    </button>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
  methods: {
    auth(network) {
      const hello = this.hello;
      hello(network)
        .login()
        .then(() => {
          const authRes = hello(network).getAuthResponse();

          console.log(authRes.access_token);

          /*
          performs operations using the token from authRes
        */
          hello(network)
            .api("me")
            .then(function(json) {
              const profile = json;
              console.log(profile);
              /*
            performs operations using the user info from profile
          */
            });
        })
        .then(res => {
          console.log(res);
          this.$router.push("/");
        });
    }
  }
};
</script>

<style scoped>
</style>

