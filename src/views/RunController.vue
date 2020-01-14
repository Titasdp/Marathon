<template>
  <div class="runControl">
    <div class="container-fluid">
      <form class="form-inline my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          v-model="filter"
        />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>

      <div class="col-lg-12 d-flex justify-content-center">
        <table class="table table-bordered w-90">
          <thead>
            <tr>
              <!-- <th scope="col">#</th> -->
              <th scope="col">Title</th>
              <th scope="col">distance</th>
              <th scope="col">Start Point</th>
              <th scope="col">End Point</th>
              <th scope="col">Date</th>
              <th scope="col">eliminar</th>
              <th scope="col">editar</th>
            </tr>
          </thead>
          <tbody v-for="run in runningsOutput" :key="run.id">
            <tr>
              <td>{{ run.title }}</td>
              <td>{{ run.dist }}</td>
              <td>{{ run.startTime }}</td>
              <td>{{ run.endTime }}</td>
              <td>{{ run.runner }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-primary btnIcon"
                  @click="deleteRun(run.id)"
                >
                  Eliminar
                </button>
              </td>

              <td>
                <button
                  type="button"
                  class="btn btn-primary btnIcon"
                  data-toggle="modal"
                  data-target="#myModal"
                  @click="openModalAdd(run.id)"
                >
                  Editar
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div
          class="modal fade"
          id="myModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myModal"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="editRun()">
                  <div class="form-group row">
                    <label for="txtTitle">Exercice Title:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="txtTitle"
                      placeholder="Enter Title"
                      v-model="form.title"
                    />
                  </div>
                  <div class="form-group row">
                    <label for="txtKm">Distance in killometers:</label>
                    <input
                      type="number"
                      class="form-control"
                      id="txtKm"
                      placeholder="Distance"
                      v-model="form.dist"
                    />
                  </div>
                  <!-- 
                  <div class="form-group row">
                    <label for="txtStart">Start Point:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="txtStart"
                      placeholder="Start"
                      v-model="form.startPoint"
                    />
                  </div>
                  <div class="form-group row">
                    <label for="txtEnd">End Point:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="txtEnd"
                      placeholder="Finish"
                      v-model="form.endPoint"
                    />
                  </div>-->

                  <div class="form-group row">
                    <label for="dataTimeStart">Start Time:</label>
                    <input
                      type="time"
                      step="1"
                      min="01:00"
                      max="24:00"
                      class="form-control"
                      id="timeStart"
                      placeholder="start time"
                      v-model="form.startTime"
                    />
                  </div>

                  <div class="form-group row">
                    <label for="timeEnd">End Time:</label>
                    <input
                      type="time"
                      step="1"
                      min="01:00"
                      max="24:00"
                      class="form-control"
                      id="timeEnd"
                      placeholder="end time"
                      v-model="form.endTime"
                    />
                  </div>

                  <div class="form-group row">
                    <label for="txtDate">Date:</label>
                    <input
                      type="date"
                      class="form-control"
                      id="txtRunner"
                      placeholder="date"
                      v-model="form.runner"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      filter: "",
      runningsOutputs: "",
      runnings: "",
      chosenId: "",
      form: {
        title: "",
        dist: 0,
        // startPoint: "",
        // endPoint: "",
        startTime: Date.now(),
        endTime: Date.now(),
        runner: ""
      }
    };
  },
  computed: {
    runningsOutput() {
      return this.runningsOutputs.filter(run => {
        let contains = false;
        if (this.filter !== "") {
          contains = run.title.includes(this.filter);
        } else {
          contains = true;
        }

        return contains;
      });
    },

    ...mapGetters({
      getRunnings: "getRunnings",
      getRunningsLastId: "getRunningsLastId",
      getRunByDate: "getRunByDate",
      getRunningIndexById: "getRunningIndexById"
    })
  },
  created() {
    this.runnings = this.getRunnings;
    this.runningsOutputs = this.runnings;
    this.orderRunBydist();
  },
  methods: {
    deleteRun(id) {
      this.$store.commit("REMOVE_RUNNING", { id: id });
      this.runnings = this.getRunnings;
      this.runningsOutputs = this.runnings;
      this.orderRunBydist();
    },
    openModalAdd(id) {
      this.chosenId = id;
      this.form.title = this.runnings[this.getRunningIndexById(id)].Title;
      this.form.dist = this.runnings[this.getRunningIndexById(id)].dist;
      this.form.startPoint = this.runnings[
        this.getRunningIndexById(id)
      ].startPoint;
      this.form.endPoint = this.runnings[this.getRunningIndexById(id)].endPoint;
      this.form.startTime = this.runnings[
        this.getRunningIndexById(id)
      ].startTime;
      this.form.endTime = this.runnings[this.getRunningIndexById(id)].endTime;
      this.form.date = this.runnings[this.getRunningIndexById(id)].date;
    },
    editRun() {
      this.runnings[
        this.getRunningIndexById(this.chosenId)
      ].Title = this.form.title;
      this.runnings[
        this.getRunningIndexById(this.chosenId)
      ].dist = this.form.dist;
      this.runnings[
        this.getRunningIndexById(this.chosenId)
      ].startPoint = this.form.startPoint;
      this.runnings[
        this.getRunningIndexById(this.chosenId)
      ].endPoint = this.form.endPoint;
      this.runnings[
        this.getRunningIndexById(this.chosenId)
      ].startTime = this.form.startTime;
      this.runnings[
        this.getRunningIndexById(this.chosenId)
      ].endTime = this.form.endTime;
      this.runnings[
        this.getRunningIndexById(this.chosenId)
      ].date = this.form.date;

      this.$store.commit("SET_RUNNINGS", { runnings: this.runnings });
      this.runnings = this.getRunnings;
      this.runningsOutputs = this.runnings;
      this.orderRunBydist();
    },
    orderRunBydist() {
      this.runningsOutputs.sort(this.comparePop);
    },
    // ! numero ku string e  diferente
    comparePop(a, b) {
      if (a.dist > b.dist) return -1;
      if (a.dist < b.dist) return 1;
      else return 0;
    }
  }
};
</script>
