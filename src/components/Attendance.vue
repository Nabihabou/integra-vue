<template>
  <section class="attendance">
    <div class="title-wrapper">
      <h1 class="title">Frequências</h1> 
      <router-link to="/createatt" tag="button" class="title-btn">Criar </router-link>
    </div>
    
    <div class="list-wrapper">
      <h2 class="list-title">Meus projetos</h2>
      <ol class="list" >
        <li class="item" v-for="(project, index) in this.allProjects" @click="goTo(index)">
          <img :src="'http://ec2-54-207-86-56.sa-east-1.compute.amazonaws.com:8080/' + project.logo" alt="" />
          <div class="item-info">
            <h1 class="item-title">{{project.name}}</h1>
            <h2 class="item-test">{{project.frequencies.length}} <span v-if="project.frequencies.length > 1">frequências</span> <span v-else>frequência</span></h2>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script>
  import axios from 'axios';
  import router from 'vue';

  export default  {
    name: 'Attendance',
    props: [
      'allProjects',
    ],
     data() {
      return {
       
      }
    },
    created() {
      axios({
        url: this.$root.baseUrl + '/api/frequency',
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.$root.authData }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err)
      })
    },
    methods: {
      goTo(index) {
        this.$router.push({ path: '/attendance/' + index })
      }
    },
    computed: {

    }
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

.title-btn {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-size: 12px;
  text-transform: uppercase;
  background-color: transparent;

  color: #3461BF;
  border: 1px solid #4F87FB;
  border-radius: 2px;
  padding: 4px 12px;
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