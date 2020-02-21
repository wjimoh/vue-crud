<template>
  <div>
    <div>
       <div class="container">
          <div class="row mt-3">
            <div class="col-sm-6">
               <h4 class="text-primary">Equipment</h4>
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
                      <tr v-for="(equipment, index) in equipments" :key="index" class="text-center" v-show="setPaginate(index)">
                        <td>{{equipment.name}}</td>
                        <td>{{equipment.quantity}}</td>
                        <td>{{equipment.status}}</td>
                        <td><a href="#" class="text-info" v-on:click="showEditEquipmentModal(equipment)"><i class="fas fa-edit"></i></a></td>
                        <td><a href="#" class="text-danger" v-on:click="showDeleteModalMtd(equipment.id)"><i class="fas fa-trash-alt"></i></a></td>
                      </tr>
                   </tbody>
                </table>
                <!-- pagination -->
               <div id="pagination" style="margin: 14px 40%;">
               <a href="#" class="btn btn-primary" style="border-radius: 0px; margin-right: 1px;" v-for="page_index in paginate_total" :key="page_index"
               @click.prevent="updateCurrent(page_index)">
                  {{ page_index }}
               </a>
               </div>

             </div>
          </div>
       </div>
   </div>
       <app-modal v-if="showModal" @close="showModal = false"></app-modal>
      <app-delete-modal v-if="showDeleteModal" @close="showDeleteModal = false" :equipmentId="equipmentId"></app-delete-Modal>
      <app-edit-modal v-if="showEditModal" :data="equipment" @close="showEditModal = false"></app-edit-Modal>
  </div>



</template>

<script>
import Modal from "../shared/Modal.vue";
import EditModal from "./EditModal.vue";
import DeleteModal from "./DeleteModal.vue";
import EquipmentDataService from "../../services/EquipmentDataService";
import {eventBus} from "../../main";

export default {
   data() {
    return {
      current: 1,
      paginate: 5,
      paginate_total: 0,
      // search_filter: '',
      // status_filter: '',

      equipments: [],
        equipment: null,

      showDeleteModal: false,
      showEditModal: false,
      showModal: false,
      errorMsg: false,
      successMsg: false,
      equipmentId: ''
    }

  },
  created () {
  
     this.getData().then(res => {
     console.log (res)
        if (Number((this.equipments.length / this.paginate)) > Number((this.equipments.length / this.paginate).toString().split('.')[0])) {
        this.paginate_total = Number((this.equipments.length / this.paginate).toString().split('')[0]) + 1
      } else {
        this.paginate_total = Number((this.equipments.length / this.pageSize))
      }
            // this.paginate_total = this.equipments.length/this.paginate;
            // console.log('paginate_total',res, this.paginate_total)
     })
      eventBus.$on('getData', (res) => {
         console.log('got here', res)
         this.getData().then(res => {
              if (Number((this.equipments.length / this.paginate)) > Number((this.equipments.length / this.paginate).toString().split('.')[0])) {
               this.paginate_total = Number((this.equipments.length / this.paginate).toString().split('')[0]) + 1
               } else {
               this.paginate_total = Number((this.equipments.length / this.pageSize))
               }
            console.log('paginate_total',res, this.paginate_total)
     })
      })

      eventBus.$on('searchName', (res) => {
         this.searchEquipment(res)
      })
      

  },
     methods: {
        getData(){
         return EquipmentDataService.getAllEquipment()
           .then(response => {
               return this.equipments = response.data
               // return this.equipments
           })
        },

        showEditEquipmentModal (equipment) {
           this.equipment = equipment
           console.log(this.equipment)
           this.showEditModal = true
        },

        showDeleteModalMtd (id) {
           this.equipmentId = id
         //   console.log(equipment)
         //    eventBus.$emit('equipment', equipment)
            this.showDeleteModal = true
        },
        searchEquipment(name) {
           if(name) {
               EquipmentDataService.searchEquipment(name)
                  .then(response => {
                     this.equipments = response.data;
                  })
                  .catch(e => {
                     console.log(e)
                  })
           } else {
               this.getData();
           }
        
        },

        //Pagination
     setPaginate: function (i) {
       if (this.current == 1) {
         return i < this.paginate;
       }
       else {
         return (i >= (this.paginate * (this.current - 1)) && i < (this.current * this.paginate));
       }
     },
     setStatus: function (status) {
       this.status_filter = status;
       this.$nextTick(function () {
         this.updatePaginate();
       });
     },
     updateCurrent: function (i) {
       this.current = i;
     },
     updatePaginate: function () {
       this.current = 1;
       this.paginate_total = Math.ceil(document.querySelectorAll('tbody tr').length/this.paginate);
     }
        /////////////////////////////////////////////

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
