import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fileLoaded: false,
    firstData: { boxId: 0, boxName: "firstData", contents: [] },
    currentData: [],
    nextBoxId: 1,
    fileName: "output.json",
  },
  mutations: {
    setFirstData(state, { firstData }) {
      if (!("itemId" in firstData[0])) {
        // itemIdプロパティを持っていない場合番号を付与する
        let i = 0;
        for (let item of firstData) {
          item.itemId = i++;
        }
      }
      state.firstData = {
        boxId: 0,
        boxName: "firstData",
        contents: firstData,
      };
      console.log(state.firstData);
      state.currentData = [];
      state.nextBoxId = 1;
      state.fileLoaded = true;
      state.fileName = "output.json";
    },
    setSavedData(state, { loadedData, fileName }) {
      state.firstData = loadedData.data.shift();
      state.currentData = loadedData.data;
      state.nextBoxId = loadedData.nextBoxId;
      state.fileLoaded = true;
      state.fileName = fileName;
    },

    addNewBox(state, { name }) {
      state.currentData.push({
        boxId: state.nextBoxId++,
        boxName: name,
        contents: [],
      });
    },
    removeBox(state, { boxId }) {
      state.currentData = state.currentData.filter(
        (box) => box.boxId !== boxId
      );
    },
    renameBox(state, { boxId, newName }) {
      let box;
      if (boxId === 0) {
        box = state.firstData;
      } else {
        box =
          state.currentData[
            state.currentData.findIndex((e) => e.boxId === boxId)
          ];
      }
      box.boxName = newName;
    },

    addItem(state, { toBoxId, itemId }) {
      const box =
        state.currentData[
          state.currentData.findIndex((e) => e.boxId === toBoxId)
        ];
      box.contents.push(itemId);
      // 重複は取り除く.
      box.contents = box.contents.filter((e, i, self) => self.indexOf(e) === i);
    },
    removeItem(state, { fromBoxId, itemId }) {
      const box =
        state.currentData[
          state.currentData.findIndex((e) => e.boxId === fromBoxId)
        ];
      box.contents = box.contents.filter((e) => e !== itemId);
    },
  },
  actions: {},
  modules: {},
});
