<template>
    <img @click="goBack()" src="../../assets/back-arrow.svg" />
</template>

<script>
export default {
  name: 'BackArrow',
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }     
}
</script>

<style scoped>

</style>