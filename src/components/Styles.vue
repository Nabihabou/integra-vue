<template>
    <main>
        <a class="button">Criar evento</a>
    </main>
</template>

<script>
export default {
  name: 'StyleGuide',
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

  }, 
}
</script>

<style scoped lang="scss">
main {
  padding: 24px;
}

.button {
    align-items: center;
    border: 1px solid transparent;
    border-radius: 3px;
    -webkit-box-shadow: none;
    box-shadow: none;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    font-size: 1rem;
    text-transform: uppercase;
    height: 2.25em;
    justify-content: flex-start;
    line-height: 1.5;
    padding-bottom: calc(0.375em - 1px);
    padding-left: calc(0.625em - 1px);
    padding-right: calc(0.625em - 1px);
    padding-top: calc(0.375em - 1px);
    position: relative;
    vertical-align: top;
    user-select: none;
    background-color: #3461BF;
    // border-color: #dbdbdb;
    color: #f9f9f9;
    cursor: pointer;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding-left: 0.75em;
    padding-right: 0.75em;
    text-align: center;
    white-space: nowrap;
}
</style>