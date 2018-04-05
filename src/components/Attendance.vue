<template>
  <section class="attendance">
    <div class="title-wrapper">
      <h1 class="title">Frequências</h1>
    </div>
    
    <div class="att-wrapper">
      <h2 class="list-title">Meus projetos</h2>
      <ol class="list" >
        <li class="item" v-for="(all, index) in [1, 2, 3, 4, 5, 6]" @click="goTo(index)">
          <img  src="../assets/lotus.png" alt="" />
          <div class="item-info">
            <h1 class="item-title">Lótus</h1>
            <h2 class="item-test">35 frequencias</h2>
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
    props: [],
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
    data() {
      return {

      }
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

<style lang="scss">
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

.att-wrapper {
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
}
</style>