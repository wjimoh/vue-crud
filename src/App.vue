<template>
  <div>
    <nav class="navbar navbar-dark bg-primary">
      <a class="navbar-brand">COMPANY X</a>
      <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>
      </div>-->

      <form  v-if="isAuthenticated" class="form-inline" style="position: relative; right: 1%;">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          v-model="searchParam.name"
        />
        <button
          class="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          style="color: black; background-color: white; margin-right: 10px;"
          @click="passSearchParam(searchParam.name)"
        >Search</button>
        <button
          type="button"
         
          class="btn btn-sm btn-primary"
          v-on:click="logout('google')"
        >Logout</button>
      </form>
    </nav>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
import { eventBus } from "./main";
export default {
  data() {
    return {
      searchParam: {
        name: "",
        isAuthenticated: false
      }
    };
  },
  created() {
    eventBus.$on("isAuthenticated" , payLoad => {
      this.isAuthenticated = payLoad;
    });

    var x = JSON.parse(localStorage.getItem("hello"));
    if (x) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  },
  //   forceRerender(){
  //   this.renderComponent= false;
  //   this.$isAuthenticated().then(() => {
  //   console.log('renderComponent', this.renderComponent)
  //   this.renderComponent= true;
  //   });
  // },
  methods: {
    passSearchParam(value) {
      eventBus.$emit("searchName", value);

      if (
        Number(this.equipments.length / this.paginate) >
        Number(
          (this.equipments.length / this.paginate).toString().split(".")[0]
        )
      ) {
        this.paginate_total =
          Number(
            (this.equipments.length / this.paginate).toString().split("")[0]
          ) + 1;
      } else {
        this.paginate_total = Number(this.equipments.length / this.pageSize);
      }
    },

    logout(network) {
      const hello = this.hello;
      console.log("logout", network);
      hello(network)
        .logout()
        .then(() => {
          console.log("logout");

          // this.$store.commit('checkAuthStatus')
          localStorage.removeItem("hello");
          this.isAuthenticated = false;
          this.$router.push("/login");
        });
    }
  }
};
</script>

<style>
</style>
