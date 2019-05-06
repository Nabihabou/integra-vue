<template>

  <main>
    <div class="title-wrapper">
      <h2 class="upper-title">Frequência</h2>
      <h1 class="title">{{projectName}}</h1>
    </div>

    <span v-if="allFrequencies.length > 0">

      <ol class="list">
        <li class="item" v-for="(all, index) in allFrequencies">
          <router-link :to="{ name: 'AttendanceEach', params: { id: allFrequencies[index] }}" tag="li" class="item">
            <div class="item-info">
              <span class="att-type">Xxxxxxxxxxx xxxxxx</span>
              <span class="att-date">XX/XX/XXXX</span>
              <span class="att-hour">XX:XX</span>
            </div>
            <h1 class="att-title">{frequency.title}</h1>
          </router-link>
        </li>
      </ol>

    </span>

    <span v-else><h4 style="margin: 0 10px;">Nenhuma frequência cadastrada neste projeto.</h4></span>

    </div>
  </main>

</template>

<script>
  export default  {
    name: 'EaAttendance',
    props: [],
    beforeMount() {
      if (this.allFrequencies = []) {
        setTimeout(() => {
          this.allFrequencies = this.allProjects[this.$route.params.index].frequencies
        }, 50); 
      }
    },
    data() {
      return {
        allFrequencies: [],
        projectName: ''
      }
    },
    props: [
      'allProjects',
    ],
    mounted() {
      this.projectName = this.allProjects[this.$route.params.index].name
    },
    methods: {
      goToAttendance(index) {
        console.log('aa')
      }
    },
    computed: {

    },
    watch: {
      allProjects() {
        this.allFrequencies = this.allProjects[this.$route.params.index].frequencies
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

.item {
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  padding: 16px 24px;
  border: 1px solid #F3F5F8;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.08);

  &:not(:last-child) {
    margin-bottom: 8px;
  }
  // border-radius: 4px;
}

.info {
  width: calc(100% - 40px);
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.att-type, .att-date {
  color: $terciary-text-color;
}
</style>
