<template>

   <div class="component">
      
      <p>Click Here To Login <i class="fas fa-hand-point-down"></i> </p>
      <hr>
       <button type="button" class="btn btn-lg btn-primary" v-on:click="loginPage">
        Login</button>
   </div>
   

</template>

<script>
export default {
        methods: {
            loginPage() {
                this.$router.push('/Login')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div.component {
       background-color:whitesmoke;
       font-size: 1.5rem;
       text-align: center;
    }
</style>
