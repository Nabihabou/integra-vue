<template>
  <main>
    <header>
      <img id="close-btn" @click="close()" src="../assets/chevron-down.svg" alt="">
      <h1 class="selectedDay">{{date}}</h1>
    </header>

    <section class="events-view">
      <h2 class="list-title">eventos do dia</h2>

      <div class="events">
        <div id="timeline">
          <div :style="{ height: height + 'px' }" id="hour"></div>
        </div>

        <div>
          <div v-for="event in dayEvents" :key="event._id" class="event-item">
            <div>
              <h1 class="event-title">{{event.title}}</h1>
              <h2 class="event-project">{{event.projectName}}</h2>
            </div>
            <div class="right-info">
              <span class="event-date">{{event.date}}</span>
              <span class="event-time">{{event.time}}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  </main>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CalendarDay',
  data() {
    return {
      height: Number,
      date: Date,
    }
  },
  props: [
    'dayEvents',
    'day',
  ],
  beforeMount() {
    this.$emit('hideHeader', '')
  },
  mounted() {
    var now = new Date()
    var secs = now.getSeconds() + (60 * now.getMinutes()) + (60 * 60 * now.getHours());
    
    this.height = secs/240

    var date = new Date(this.day);
    this.date = ("0" + date.getDate()).slice(-2) + '/' + ("0" + date.getMonth()).slice(-2);
    
  },
  methods: {
    close() {
      this.$emit('close-modal', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/functions';
@import '../assets/scss/colors';

main {
  position: fixed;
  left: 0;
  right: 0;
  background-color: $background-color;
  z-index: 10;
  top: 0;
  bottom: 0;
}

header {
  display: flex;
  justify-content: center;
  background-color: $white;
  padding: 24px 0;
  text-align: center;
}

#close-btn {
  position: absolute;
  left: 24px;
}

.events-view {
  margin: 24px 24px;
}

.selectedDay {
  font-size: em(24);
}

.list-title {
  font-size: em(16);
  font-weight: 500;
  color: $list-title-color;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.events {
  display: flex;
}

.event-item {
  display: flex;
  justify-content: space-between;
  background: #FFFFFF;
  border: 1px solid #F3F5F8;
  box-sizing: border-box;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
}

.event-title {
  font-weight: 500;
}

.event-title, .event-date {
  margin-bottom: 6px;
}

.right-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 32px;
}

#timeline {
  width: 4px;
  height: 400px;
  background: rgb(194, 194, 194);
  border-radius: 10px;
  margin-right: 16px;
  margin-left: 6px;
}

#hour {
  background: #3461BF;
  border-radius: 10px;
  height: 20px;
}
</style>