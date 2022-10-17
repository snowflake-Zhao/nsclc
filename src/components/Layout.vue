<template>
  <v-container>
    <v-row class="px-6 py-4">
      <v-form ref="form" v-model="valid" class="d-flex" style="width: 100%">
        <v-col cols="6">
          <v-row>
            <v-card class="w100p px-4 mb-2 mr-5">
              <v-card-title class="px-0"> Demographic </v-card-title>
              <v-text-field
                class="mb-3"
                ref="ageInput"
                v-model="model.age"
                :rules="rules.ruleAge"
                label="Age (15~120)"
              >
              </v-text-field>
              <v-select
                :items="genders"
                item-value="index"
                item-text="value"
                v-model="model.gender"
                label="gender"
                outlined
                :rules="rules.ruleSelect"
              >
              </v-select>
            </v-card>
          </v-row>
          <v-row>
            <v-card class="w100p px-4 mb-2 mr-5">
              <v-card-title class="px-0"> Surgery Type </v-card-title>
              <v-select
                :items="surgery"
                item-value="index"
                item-text="value"
                v-model="model.surgery_type"
                label="RX Summ--Surg Prim Site"
                outlined
                :rules="rules.ruleSelect"
              ></v-select>
            </v-card>
          </v-row>
          <v-row>
            <v-card class="w100p px-4 mr-5">
              <v-card-title class="px-0"> Type </v-card-title>
              <v-select
                :items="ICD_O_3"
                item-value="index"
                item-text="value"
                v-model="model.histologic_type"
                label="ICD-O-3 Hist/behav"
                outlined
                :rules="rules.ruleSelect"
              ></v-select>
              <v-select
                :items="laterality"
                item-value="index"
                item-text="value"
                v-model="model.laterality"
                label="Laterality"
                outlined
                :rules="rules.ruleSelect"
              ></v-select>
            </v-card>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-card class="w100p px-4 ml-5">
              <v-card-title class="px-0"> Stage </v-card-title>
              <v-select
                :items="T"
                item-value="index"
                item-text="value"
                v-model="model.t"
                label="T"
                outlined
                :rules="rules.ruleSelect"
              ></v-select>
              <v-select
                :items="N"
                item-value="index"
                item-text="value"
                v-model="model.n"
                label="N"
                outlined
                :rules="rules.ruleSelect"
              ></v-select>
              <v-select
                :items="M"
                item-value="index"
                item-text="value"
                v-model="model.m"
                label="M"
                outlined
                :rules="rules.ruleSelect"
              ></v-select>
              <v-text-field
                class="mb-3"
                ref="ageInput"
                v-model="model.regional_node_examined"
                :rules="rules.ruleNodesExamined"
                label="Regional node examined (0-100)"
              >
              </v-text-field>
              <v-text-field
                class="mb-3"
                ref="ageInput"
                v-model="model.regional_node_positive"
                :rules="rules.ruleNodesPositive"
                label="Regional node positive (0-100)"
              >
              </v-text-field>
              <v-text-field
                class="mb-3"
                ref="ageInput"
                v-model="model.cs_tumor_size"
                :rules="rules.ruleTumorSize"
                label="CS tumor size  (0~999)"
              >
              </v-text-field>
            </v-card>
          </v-row>
          <v-row>
            <v-card></v-card>
          </v-row>
        </v-col>
      </v-form>
    </v-row>
    <v-row justify="center">
      <v-btn color="primary" @click="handleClick" dark> submit </v-btn>
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card class="d-flex flex-column">
          <v-toolbar class="flex-grow-0" dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Result</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-container
            class="d-flex flex-grow-1 justify-center align-center"
            v-if="loading"
          >
            <v-progress-circular
              :size="70"
              :width="7"
              color="#1976d2"
              indeterminate
            ></v-progress-circular>
          </v-container>
          <div v-else>
            <v-tabs color="deep-purple accent-4" left>
              <v-tab>Survival Curve</v-tab>
              <v-tab-item class="pa-10">
                <Figure :series="series" />
              </v-tab-item>
            </v-tabs>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
    <v-snackbar v-model="snackbar" top right color="#B00020" timeout="3000">
      网络异常
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import Figure from "@/components/Figure";
export default {
  name: "Layout",
  components: {
    Figure,
  },
  data: () => ({
    snackbar: false,
    loading: true,
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    valid: false,
    rules: {
      ruleAge: [
        (value) => !!value || "Required.",
        (value) => Number.isInteger(Number(value)) || "Must be integer.",
        (value) => (15 <= value && 120 >= value) || "Out of range.",
      ],
      ruleNodesExamined: [
        (value) => !!value || "Required.",
        (value) => Number.isInteger(Number(value)) || "Must be integer.",
        (value) => (0 <= value && 100 >= value) || "Out of range.",
      ],
      ruleNodesPositive: [
        (value) => !!value || "Required.",
        (value) => Number.isInteger(Number(value)) || "Must be integer.",
        (value) => (0 <= value && 100 >= value) || "Out of range.",
      ],
      ruleTumorSize: [
        (value) => !!value || "Required.",
        (value) => Number.isInteger(Number(value)) || "Must be integer.",
        (value) => (0 <= value && 999 >= value) || "Out of range.",
      ],
      ruleSelect: [(value) => !!value || "Required."],
    },
    genders: [
      { index: 1, value: "Male" },
      { index: 2, value: "Female" },
    ],
    surgery: [
      { index: 1, value: "Lobectomy WITH mediastinal lymph node dissection" },
      {
        index: 2,
        value: "WITH mediastinal lymph node dissection (radical pneumonectomy)",
      },
    ],
    T: [
      { index: 1, value: "T1a" },
      { index: 2, value: "T1b" },
      { index: 3, value: "T2a" },
      { index: 4, value: "T2b" },
      { index: 5, value: "T3" },
      { index: 6, value: "T4" },
    ],
    N: [
      { index: 1, value: "N0" },
      { index: 2, value: "N1" },
      { index: 3, value: "N2" },
      { index: 4, value: "N3" },
    ],
    M: [{ index: 1, value: "M0" }],
    ICD_O_3: [
      { index: 1, value: "8140/3: Adenocarcinoma" },
      { index: 2, value: "8070/3: Squamous cell carcinoma" },
      { index: 3, value: "8560/3: Adenosquamous carcinoma" },
    ],
    laterality: [
      { index: 1, value: "Right - origin of primary" },
      { index: 2, value: "Left - origin of primary" },
      {
        index: 3,
        value: "Paired site, but no information concerning laterality",
      },
      { index: 4, value: "Only one side - side unspecified" },
    ],
    model: {
      age: "",
      gender: "",
      surgery_type: "",
      t: "",
      n: "",
      m: "",
      regional_node_examined: "",
      regional_node_positive: "",
      cs_tumor_size: "",
      histologic_type: "",
      laterality: "",
    },
    rate: [],
    series: [],
  }),
  methods: {
    async handleClick() {
      let res = this.$refs.form.validate();
      if (res) {
        try {
          const res = await this.$http.post(
            "/nsclc/nsclc_hello",
            JSON.stringify(this.model),
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          this.rate = res.data.rate;
          this.series = res.data.series;
          this.dialog = true;
          this.loading = false;
        } catch (error) {
          this.snackbar = true;
        }
      } else {
        return;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.w100p {
  width: 100%;
}
</style>
