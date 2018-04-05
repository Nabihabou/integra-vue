<template>

  <main>
    <div class="title-wrapper">
      <h2 class="upper-title">Frequencia</h2>
      <h1 class="title">profile Component</h1>
    </div>

    <div>
      <ol class="list">
        <li class="item" v-for="(all, index) in [1,2,3,4,5,6,7,8]">
          <div class="info">
            <span class="att-type">[Reuniao]</span>
            <span class="att-date">19/02/2018</span>
            <span class="att-hour">19:30</span>
          </div>
          <h1 class="att-title">Titulo</h1>
        </li>
      </ol>
    </div>
  </main>

</template>

<script>
  export default  {
    name: 'EaAttendance',
    props: [],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/functions';
@import '../assets/scss/colors';

.item {
  flex-direction: column;
  justify-content: center;
  align-items: left;
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
