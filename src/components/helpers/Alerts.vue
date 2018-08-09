<template>
  <div class="alerts-wrapper">
    <div class="section-title-wrapper">
      <h1 class="section-title">Alertas</h1>
    </div>
    <div style="display: flex;">
      <div class="alert-1"></div>
      <div class="alert-2"></div>
      <div class="alert-3"></div>
    </div>
    <!-- <div class="alert-2">dasd</div> -->
  </div>
</template>

<script>
export default {
  name: 'Alerts',
  data() {
    return {

    }
  },
  props: [

  ],
  mounted() {

  },
  methods: {

  },
  computed() {
  }
}
</script>

<style lang="scss" scoped>
.alerts-wrapper {
  margin-bottom: 16px;
}

.alert-1, .alert-2, .alert-3 {
  width: 100%;
  height: 140px;
}

.alert-1 {
  background: #4F87FB;
  // border: 1px solid $border-color;
  box-sizing: border-box;
}

.alert-2 {
  background-color: grey;
}

.alert-3 {
  background-color: lavender
}

@media (min-width: 767px) {
  .alert-1, .alert-2 {
    max-width: 380px;
  }

  .alert-1, .alert-2 {
    margin-right: 16px;
  }
};
</style>