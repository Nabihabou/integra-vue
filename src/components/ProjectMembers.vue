<template>
  <main v-if="loaded">
    <div class="title-wrapper">
      <h2 class="upper-title">Projeto</h2>
      <h1 class="title">{{this.$route.params.name}}</h1>
    </div>

    <div>
      <input placeholder="Buscar por membro.." class="search-input" type="text">
      <ol class="members-list">
        <h1 class="list-title">Todos os membros</h1>
        <li v-for="member in members" :key="member._id">
          {{member._id}}
        </li>
      </ol>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'ProjectMembers',
    data() {
      return {
        loaded: false,
        members: this.allProjects[this.$route.params.index].members,
      }
    },
    props: [
      'allProjects',
    ],
    beforeMount() {
      if (this.members !== undefined) {
        this.loaded = true;
      }
    },
    methods: {

    },
    watch: {
      allProjects() {
        this.loaded = true;
        this.members = this.allProjects[this.$route.params.index].members
      }
    }
  }
</script>

<style scoped lang="scss">
@import '../assets/scss/functions';
@import '../assets/scss/colors';

.title-wrapper {
  padding: 24px;
}

.title {
  font-size: em(22);
  font-weight: 600;
  color: $page-title-color;
  text-transform: uppercase;
}

.upper-title {
  font-size: em(16);
  color: #CDCFD1;
  margin-bottom: 8px;
}

.search-input {
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
  width: 100%;
  padding: 16px 24px;
  
  &:focus {
    outline: none;
  }
}

.members-list {
  background: $white;
}
</style>