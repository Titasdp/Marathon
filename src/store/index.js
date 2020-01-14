import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    runnings: []
  },
  mutations: {
    SET_RUNNINGS(state, payload) {
      state.runnings = payload.runnings;
      localStorage.setItem("runnings", JSON.stringify(state.runnings));
    },

    ADD_RUNNING(state, payload) {
      state.runnings.push(payload);
      localStorage.setItem("runnings", JSON.stringify(state.runnings));
    },

    REMOVE_RUNNING(state, payload) {
      state.runnings = state.runnings.filter(run => run.id != payload.id);
      localStorage.setItem("runnings", JSON.stringify(state.runnings));
    }
  },
  getters: {
    getRunByDate: state => (start, date) => {
      return state.runnings.filter(run => {
        let startBool = false;
        let dateBool = false;

        if (run.date == date) {
          dateBool = true;
        }

        if (start >= run.startTime && start <= run.endTime) {
          startBool = true;
        }
        return dateBool && startBool;
      });
    },

    getElementByTitleAndRunner: state => (title, runner) => {
      let a = [];

      if (state.runnings.length > 0) {
        a = state.runnings.filter(run => {
          let runnerBool = false;
          let titleBool = false;

          // alert(runner.toUpperCase() == run.runner.toUpperCase())

          if (runner.toUpperCase() == run.runner.toUpperCase()) {
            runnerBool = true;
          }
          // alert(title.toUpperCase())
          // alert(run.title)

          if (run.title.toLowerCase() == title.toLowerCase()) {
            // alert("litmb")
            titleBool = true;
          }

          return titleBool && runnerBool;
        });

        return a;
      } else {
        return state.runnings;
      }
    },

    getRunnings: state => {
      return state.runnings;
    },
    getRunningsLastId: state => {
      if (state.runnings.length == 0) {
        return 1;
      } else {
        return state.runnings[state.runnings.length - 1].id + 1;
      }
    },

    getRunningIndexById: state => id => {
      return state.runnings.findIndex(run => run.id == id);
    }
  }
  // actions: {},
  // modules: {}
});

// https://javascript.info/date future use
