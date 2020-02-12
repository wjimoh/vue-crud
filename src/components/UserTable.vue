<template>
  <div>
    <div>
       <div class="container">
          <div class="row mt-3">
            <div class="col-sm-6">
               <h4 class="text-primary">Equipments</h4>
            </div>
            <div class="col-sm-6">
               <button class="btn btn-primary float-right" id="show-modal" v-on:click="showModal = true">
               New Equipment
               </button>
            </div>
          </div>
          <hr class="bg-primary">
          <div class="alert alert-danger" v-if="errorMsg">
             Erro Message
          </div>
          <div class="alert alert-success" v-if="successMsg">
             success Message
          </div>
          <!-- Equipment Table -->
          <div class="row">
             <div class="col-lg-12">
                <table class="table table-bordered table-striped">
                   <thead>
                      <tr class="text-center bg-primary text-light">
                        <th>Equipment Name</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                   </thead>
                   <tbody>
                      <tr v-for="equipment in 10" :key="equipment" class="text-center">
                        <td>Mouse</td>
                        <td>4</td>
                        <td>Approved</td>
                        <td><a href="#" class="text-info" v-on:click="showEditModal = true"><i class="fas fa-edit"></i></a></td>
                        <td><a href="#" class="text-danger" v-on:click="showDeleteModal = true"><i class="fas fa-trash-alt"></i></a></td>
                      </tr>
                   </tbody>
                </table>
                <!-- pagination -->
                <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                    <button type="button" class="page-link" v-if="page != 1" @click="page--"> Previous </button>
                </li>
                <li class="page-item">
                    <button type="button" class="page-link" v-for="pageNumber in pages.slice(page-1, page+5)" :key="pageNumber" @click="page = pageNumber"> {{pageNumber}} </button>
                </li>
                <li class="page-item">
                    <button type="button" @click="page++" v-if="page < pages.length" class="page-link"> Next </button>
                </li>
            </ul>
        </nav>  
             </div>
          </div>
       </div>
   </div>
       <app-modal v-if="showModal" @close="showModal = false"></app-modal>
       <app-edit-modal v-if="showEditModal" @close="showEditModal = false"></app-edit-Modal>
      <app-delete-modal v-if="showDeleteModal" @close="showDeleteModal = false"></app-delete-Modal>
  </div>



</template>

<script>
import Modal from "./Modal.vue";
import EditModal from "./EditModal.vue";
import DeleteModal from "./DeleteModal.vue";

export default {
   data() {
    return {

       posts : [''],
            page: 1,
            perPage: 9,
            pages: [],   

      showDeletModal: false,
      showEditModal: false,
      showModal: false,
      errorMsg: false,
      successMsg: false
    }
  },
     methods: {
            // modalPage() {
            //     this.$router.push('/Modal')
            // }
        },
   components: {
    appModal: Modal,
    appEditModal: EditModal,
    appDeleteModal: DeleteModal
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div.component {
       background-color:whitesmoke;
       font-size: 1.5rem;
       text-align: center;
    }

button.page-link {
    display: inline-block;
}
button.page-link {
    font-size: 20px;
    color: #29b3ed;
    font-weight: 500;
}
.offset{
  width: 500px !important;
  margin: 20px auto;  
}
</style>
