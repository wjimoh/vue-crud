<template>
  <div>

<nav class="navbar navbar-dark bg-primary">
  <a class="navbar-brand">COMPANY X</a>
   <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
    </ul>
  </div>
  <form class="form-inline">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit" style="color: black;
    background-color: white;">Search</button>
  </form>
</nav>
    <hr>
      <router-view></router-view>
  </div>
</template>

<script>

export default {
     components: {
    
     }
};
</script>

<style>

</style>
