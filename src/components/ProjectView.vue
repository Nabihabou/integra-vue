<template>
  <main>
    <div class="title-wrapper">
      <h2 class="upper-title">Projeto</h2>
      <h1 class="title">{{this.$route.params.name}}</h1>
    </div>

    <div class="project" v-if="loaded">
      <div class="info">
        <img class="project-logo" :src="test()" alt="">
        <div class="stats">
          <h1 class="p-stat">
            <span>{{project.members.length}}</span> membros
          </h1>
          <h1 class="p-stat">
            <span>14/02</span> próx. módulo
          </h1>
        </div>
      </div>
      <div class="place">
        <div class="current-community">
          <h1>Espírito Santo do Itá</h1>
          <span>Comunidade atual</span>
        </div>
        <div class="past-community">
          <h1>place</h1>
        </div>
      </div>
      <div class="members">
        <h1 class="section-title">Coordenadores</h1>
        <div class="coord">
          <div class="circles">
            <div v-for="member in coord" class="member-circle" :key="member._id"></div>
          </div>
          <router-link tag="a" :to="{ name: 'ProjectMembers' }" class="">
            Ver todos os membros
          </router-link>
        </div>
      </div>
      <div class="next-events">
        <h1 class="section-title">Próx. eventos</h1>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    data() {
      return {
        project: {},
        coord: [],
        loaded: false,
      }
    },
    props: [
      'allProjects',
    ],
    mounted() {
      // on page change
      if(this.allProjects == []) {
        this.project = this.allProjects[this.$route.params.index]

        this.project.members.forEach(element => {
          if (element.level == 3) {
            this.coord.push(element._id)
          }
          this.loaded = true;
        });
      } else {
        this.project = this.allProjects[this.$route.params.index]
        this.loaded = true;
      }
    },
    methods: {
      test() {

          return 'http://ec2-54-207-86-56.sa-east-1.compute.amazonaws.com:8080/' + this.project.logo

      }
    },
    watch: {
      // on reload
      allProjects() {
        this.project = this.allProjects[this.$route.params.index];
        this.loaded = true;
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

.project {
  background: $white;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
}

.info {
  display: flex;
  padding: 16px 24px; 
}

.project-logo {
  max-width: 200px;
  max-height: 140px;
}

.stats {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.p-stat {
  &:first-child {
    margin-bottom: 16px
  }

  & span {
    display: block;
    font-size: em(18);
    font-weight: 500;
    color: #525B66
  }
}

.place {
  display: flex;
  border-top: 1px solid #F3f3f3;
  border-bottom: 1px solid #f3f3f3;
}

.current-community, .past-community {
  flex: 1;
  margin: 16px 0;
  padding-left: 24px;
  font-size: em(14);
  border-right: 1px solid #f3f3f3;

  & span {
    display: block;
    color: #737F8F;
  }
}

.members {
  margin-top: 16px;
  padding: 0 24px;
}

.section-title {
  color: #2E3192;
}

.coord {
  display: flex;
  align-items: center;
  justify-content: space-between;

  & a {
    margin-top: 8px;
    font-size: em(14);
    text-decoration-line: underline;
    color: #3461BF;
  }
}

.circles {
  display: flex;
}

.member-circle {
  background: grey;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  margin-top: 8px;

  &:not(:first-child) {
    margin-left: 8px;
  }
}

.next-events {
  margin-top: 32px;
  padding: 0 24px
}

</style>