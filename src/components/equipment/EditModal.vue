<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">Edit Equipment</slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <form>
                <div class="form-group">
                  <label>Equipment Name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="equipment.name"
                    placeholder="Equipment Name"
                  />
                </div>
                <div class="form-group">
                  <label>Quantity</label>
                  <validationProvider rules="required|min_value:1" v-slot="{ errors }">
                    <input
                      type="number"
                      class="form-control"
                      v-model="equipment.quantity"
                      min="1"
                      placeholder="Equipment Quantity"
                    />
                    <span>{{ errors[0] }}</span>
                  </validationProvider>
                </div>
                <div class="form-group">
                  <label>Type</label>
                  <select class="form-control" v-model="equipment.type">
                    <option v-for="item in type" :key="item.id" :value="item.id">{{item.value}}</option>
                  </select>
                </div>
              </form>
            </slot>
            <label>{{ error }}</label>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button btn-primary" @click="closeModal()">Cancel</button>
              <button class="modal-default-button btn-primary" @click="saveForm()">Add</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import EquipmentDataService from "../../services/EquipmentDataService";
import { eventBus } from "../../main";

export default {
  props: ["data"],
  data() {
    return {
      type: [
        { id: 0, value: "Indoor" },
        { id: 1, value: "Outdoor" }
      ],
      equipment: null,
      error: ""
      // equipment: {
      //   id: "",
      //   name: "",
      //   status: 1,
      //   statusName: '',
      //   quantity: null,
      //   typeName: '',
      //   type: ""
      // }
    };
  },
  created() {
    this.equipment = { ...this.data };
    console.log("testtt", this.data);
  },
  methods: {
    saveForm() {
      // console.log(this.equipment)
      if (this.equipment.type === 0) {
        this.equipment.typeName = "Indoor";
      } else {
        this.equipment.typeName = "Outdoor";
      }

      if (this.equipment.status === 1) {
        this.equipment.statusName = "Approved";
      } else {
        this.equipment.statusName = "Declined";
      }
      var equipment = {
        id: this.equipment.id,
        name: this.equipment.name,
        status: parseInt(this.equipment.status),
        statusName: this.equipment.statusName,
        type: parseInt(this.equipment.type),
        typeName: this.equipment.typeName,
        quantity: parseInt(this.equipment.quantity)
      };

      EquipmentDataService.updateEquipment(this.equipment.id, equipment).then(
        response => {
          console.log(response);
          this.equipment = null;
          this.$emit("close");
          eventBus.$emit("getData", true);
          this.error = '';
        },
        err => {
          console.log(err);
          this.error = err.title;
        }
      );
    },
    closeModal() {
      this.equipment = null;
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
