<template>
  <router-link to="/calendar/create" tag="button">
    {{this.title}}
  </router-link>
</template>

<script>
export default {
  name: 'Buttons',
  data() {
    return {}
  },
  props: [
    'title',
  ],
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/functions';

button {
  background: #4F87FB;
  border: unset;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  color: #fafafa;
  padding: 6px 16px;
}
</style>