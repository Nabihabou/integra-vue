<template>
    <div>
      <div class="title-wrapper">
        <h1 class="title">Projetos</h1> 
      </div>

      <div class="tabs">
        <li 
          @click="active = 'left'"
          class="l-tab" 
          :class="{ 'active-tab': active == 'left' }">
          <h1>Meus projetos</h1>
        </li>
        <li
          @click="active = 'right'"
          class="r-tab" 
          :class="{ 'active-tab': active == 'right' }">
          <h1>Todos os projetos</h1>
        </li>
      </div>

      <div class="list-wrapper">
        <h2 class="list-title">
          <span v-if="active == 'left'">Meus projetos</span>
          <span v-else>Todos os projetos</span>
        </h2>

        <!-- All Projects -->
        <h1 v-if="!isLoaded">Carregando..</h1>
        <div v-if="isLoaded">
          <ol class="list" v-if="active == 'left'">
            <router-link class="item" v-for="(project, index) in myProjects" :to="{ name: 'ProjectView', params: { name: project.name, index: index }}" tag="li" :key="index">
              <img :src="'http://ec2-54-207-86-56.sa-east-1.compute.amazonaws.com:8080/' + project.logo" alt="" />
              <div class="item-info">
                <h1 class="item-title">{{project.name}}</h1>
                <h2 class="item-test">Próx. módulo: 14/02</h2>
              </div>
            </router-link>
            <div class="list-error" v-show="myProjects.length == 0 ">
              Você não está em nenhum projeto
            </div>
          </ol>

          <!-- My Projects -->
          <ol class="list" v-else>
            <router-link class="item" v-for="(project, index) in allProjects" :to="{ name: 'ProjectView', params: { name: project.name, index: index }}" tag="li" :key="index">
              <img :src="'http://ec2-54-207-86-56.sa-east-1.compute.amazonaws.com:8080/' + project.logo" alt="" />
              <div class="item-info">
                <h1 class="item-title">{{project.name}}</h1>
                <h2 class="item-test">Próx. módulo: 14/02</h2>
              </div>
            </router-link>
          </ol>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Projects',
  data() {
    return {
      myProjects: [],
      active: 'left',
      isLoaded: false,
    }
  },
  props: [
    'allProjects',
  ],
  mounted() {
    axios({
      url: this.$root.baseUrl + '/api/project/my',
      method: 'GET',
      headers: {
      'Authorization': 'Bearer ' +  this.$root.authData }
    })
    .then(response => {
      this.isLoaded = true;
      // console.log(response.data);
      this.myProjects = response.data;
    })
    .catch(err => {
      console.log(err);
    })
  },
  methods: {

  }, 
}
</script>

<style scoped lang="scss">
@import '../assets/scss/functions';
@import '../assets/scss/colors';

.title-wrapper {
  display: flex;
  justify-content: space-between;
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

.tabs {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #989DA3;
  padding: 0 24px;
  margin-bottom: 24px;
}

.l-tab, .r-tab {
  border-radius: 100px;
  padding: 8px 16px;
}

.active-tab {
  background-color: #3461BF;
  color: #F3F5F8
}

.list-wrapper {
  background-color: $white;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  padding: 16px 24px;
}

.list-title {
  font-size: em(16);
  font-weight: 500;
  color: $list-title-color;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.item {
  display: flex;
  align-items: center;
  padding: 24px 0;
  border-bottom: 1px solid #F3f3f3;

  &-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
  }

  &-title {
    font-weight: 500;
    line-height: 2;
  }

  &-test {
    color: $secondary-text-color;
  }

  &:after {
    content: '';
    position: absolute;
    right: 40px;
    width: 6px;
    height: 11px;
    background: url('../assets/Vector.svg');
  }

  & img {
    max-width: 76px;
  }
}
</style>