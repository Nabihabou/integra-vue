<template>
    <div>
      <div v-for="(project, index) in allProjects">
        <router-link :to="{ name: 'ProjectView', params: { name: project.name, index: index }}" tag="li">
          {{project.name}}
        </router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Projects',
  data() {
    return {

    }
  },
  props: [
    'allProjects',
  ],
  mounted() {

  },
  methods: {

  }, 
}
</script>

<style scoped>

</style>