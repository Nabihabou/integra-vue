<template>
  <div>
    <h1>Calendário</h1>
    <button @click="test()">Criar evento [debug]</button>
    <vue-event-calendar :events="allEvents"></vue-event-calendar>
  </div>
</template>

<script>
import 'vue-event-calendar/dist/style.css' //^1.1.10, CSS has been extracted as one file, so you 
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      allEvents: [],
    }
  },
  props: [
    'baseUrl',
  ],
  created() {
    // date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()

    axios.get(this.baseUrl + '/api/event')
    .then(response => {
      this.allEvents = response.data;
      console.log(this.allEvents);
      this.modify()
    }).catch(e => {
      console.log(e);
    })
  },
  beforeMount() {
    
  },
  methods: {
    test() {
      console.log('test');
    },
    modify() {
      var events = this.allEvents
      events.forEach(function(event, i) {
          var date = new Date(event.startsAt);
          event.startsAt = date.getFullYear() + '/' + ('0' + (date.getMonth()+1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2);
          console.log(event.startsAt);
      });
      // console.log(events);
      for (var i = 0; i < events.length; i++) {
          this.allEvents[i].date = this.allEvents[i].startsAt;
          delete this.allEvents[i].startsAt;
        }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
