<template>
  <div
    class="pop-over"
    :style="{ top: this.Y + 'px' }">
    <h4>Senpai</h4>
    <h4>Onii-chan</h4>
  </div>
</template>

<script>
export default {
  name: 'PopOver',
  data() {
    return {

    }
  },
  props: [
    'X',
    'Y',
    'isActive'
  ],
  created() {
    console.log('test')
  },
  methods: {

  }    
}
</script>

<style lang="scss" scoped>
.pop-over {
  position: absolute;
  text-align: right;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
  padding: 14px 16px;
  right: 24px;
}
</style>