<template>
  <div class="addRun">
    <div class="container">
      <h1>Add Run</h1>

      <form @submit.prevent="addRun()">
        <div class="form-group row">
          <label for="txtTitle">Marraton Title:</label>
          <input
            type="text"
            class="form-control"
            id="txtTitle"
            placeholder="Enter Title"
            v-model="title"
          />
        </div>
        <div class="form-group row">
          <label for="txtKm">Distance in killometers:</label>
          <input
            type="number"
            class="form-control"
            id="txtKm"
            placeholder="Distance"
            v-model="dist"
          />
        </div>

        <!-- <div class="form-group row">
          <label for="txtStart">Start Point:</label>
          <input
            type="text"
            class="form-control"
            id="txtStart"
            placeholder="Start"
            v-model="startPoint"
          />
        </div>
        <div class="form-group row">
          <label for="txtEnd">End Point:</label>
          <input
            type="text"
            class="form-control"
            id="txtEnd"
            placeholder="Finish"
            v-model="endPoint"
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
            v-model="startTime"
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
            v-model="endTime"
          />
        </div>

        <div class="form-group row">
          <label for="txtDate">Runner:</label>
          <input
            type="text"
            class="form-control"
            id="txtRunner"
            placeholder="runner"
            v-model="runner"
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
// import { start } from "repl";
export default {
  data() {
    return {
      title: "",
      dist: 0,
      // startPoint: "",
      // endPoint: "",
      startTime: Date.now(),
      endTime: Date.now(),
      runner: "",
      confirmDateFail: false
    };
  },

  created() {
    if (JSON.parse(localStorage.getItem("runnings"))) {
      this.$store.commit("SET_RUNNINGS", {
        runnings: JSON.parse(localStorage.getItem("runnings"))
      });
    }
  },
  computed: {
    ...mapGetters({
      getRunnings: "getRunnings",
      getRunningsLastId: "getRunningsLastId",
      getRunByDate: "getRunByDate",
      getElementByTitleAndRunner: "getElementByTitleAndRunner"
    }),

    ...mapMutations({
      ADD_RUNNING: "ADD_RUNNING"
      // getRunnings: "getRunnings"
    })
  },

  methods: {
    addRun() {
      this.confirmTime();
      alert(
        this.getElementByTitleAndRunner(this.title, this.runner).length > 0
      );
      if (this.getElementByTitleAndRunner(this.title, this.runner).length > 0) {
        alert("Esse Correcdor ja foi enserido nessa prova");
      } else {
        if (this.confirmDateFail) {
          alert("Cannod add this run in this date and time");
        } else {
          this.$store.commit("ADD_RUNNING", {
            id: this.getRunningsLastId,
            title: this.title,
            dist: this.dist,
            // startPoint: this.startPoint,

            startTime: this.startTime,
            endTime: this.endTime,
            totalTime: this.getRaceTime(),
            runner: this.runner
          });
        }
      }
    },
    getRaceTime() {
      this.startTime = this.startTime.split(":");
      this.endTime = this.endTime.split(":");
      let startDate = new Date(
        0,
        0,
        0,
        this.startTime[0],
        this.startTime[1],
        this.startTime[2] ? this.startTime[2] : 0,
        0
      );
      let endDate = new Date(
        0,
        0,
        0,
        this.endTime[0],
        this.endTime[1],
        this.endTime[2] ? this.endTime[2] : 0,
        0
      );
      let diff = endDate.getTime() - startDate.getTime();
      let hours = Math.floor(diff / 1000 / 60 / 60);
      diff -= hours * 1000 * 60 * 60;
      let minutes = Math.floor(diff / 1000 / 60);
      diff -= minutes * 1000 * 60;
      let seconds = Math.floor(diff / 1000);
      // If using time pickers with 24 hours format, add the below line get exact hours
      if (hours < 0) hours = hours + 24;
      return (
        (hours < 9 ? "0" : "") +
        hours +
        "h:" +
        (minutes < 9 ? "0" : "") +
        minutes +
        "m:" +
        (seconds < 9 ? "0" : "") +
        seconds +
        "s"
      );
    },

    confirmTime() {
      if (this.startTime > this.endTime) {
        this.confirmDateFail = true;
      } else {
        this.confirmDateFail = false;
      }
    }
  }
};
</script>

<style scoped></style>
