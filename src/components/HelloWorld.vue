<template>
  <div>
    <h1>Calendário</h1> <button type="button" @click="test()">TEST PURPOSES ONLY</button>
    <button @click="test()">Criar evento [debug]</button>
    <vue-event-calendar :events="allEvents"></vue-event-calendar>
    

    <form id="eventForm">
      <h1>Criar evento</h1>

      <label for="title">Titulo</label>
      <input type="text" id="title" v-model="title" required>

      <label for="title">Place</label>
      <input type="text" id="place" v-model="place">

      <label for="date">Date</label>
      <input type="date" id="date" v-model="date">

      <label for="time">Time</label>
      <input type="time" id="time" v-model="time">

      <label for="duration">Duration</label>
      <input type="number" id="duration" v-model="duration" required>
      
      <div v-for="project in myProjects">
        <label for="project._id">{{project.name}}</label>
        <input type="radio" :id="project._id" :value="project" v-model="selectedProject">
      </div>
  
      <button type="button" @click="sendEvent(title, place, date, selectedProject, time, duration)">Criar evento</button>
    </form>
    
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
      myProjects: [],
      title: '',
      place: '',
      date: Date,
      time: '',
      duration: 0,
      selectedProject: '',
      delete: {},
    }
  },
  props: [
    'baseUrl',
  ],
  created() {
    // GET MY PROJECTS
    axios({
      url: this.baseUrl + '/api/project/my',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.$root.authData }
    })
    .then(response => {
      this.myProjects = response.data
    })
    .catch(e => {
      console.log(e);
    })

    // GET ALL EVENTS
    axios.get(this.baseUrl + '/api/event')
    .then(response => {
      this.allEvents = response.data;
      this.modify()
    }).catch(e => {
      console.log(e);
    })
  },
  updated() {
    var events = this.allEvents;
    // var test = events.filter(function(event){
    //   return (event._id == "59efa08092295d297ff78522")
    // });
    // console.log(test);

    // pos = events.map(function(e) { return e._id; }).indexOf('59c15991247c522cd8c99ff0');
    // console.log(pos);

    // this.test(pos);

    this.$events.on('delete-event', eventData => this.delete = eventData);
  },
  mounted() {
    
  },
  watch: {
    delete() {
      axios({
        url: 'http://ec2-54-207-86-56.sa-east-1.compute.amazonaws.com:8080' + '/api/event',
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer' + this.$root.authData 
        },
        data: {
          "_id": this.delete._id,
          "title": this.delete.title
        }
      })
      .then(response => {
        var events = this.allEvents;
        var deletedEvent = this.delete;

        var evIndex = events.map(function(e) { return e._id; }).indexOf(deletedEvent._id);
        events.splice(evIndex, 1);

        console.log(response.status);
      }).catch(e => {
        console.log(e);
      })
    }
  },
  methods: {
    sendEvent(title, place, date, selectedProject, time, duration, event) {
      // console.log(title, place, new Date(date), time, selectedProject._id, selectedProject.name);

      var timeString = time.replace(/[:]/, ',');
      var timeAndDate = new Date(date).setHours(parseInt(timeString));

      axios({
          url: this.baseUrl + '/api/event',
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + this.$root.authData,
          },
          data: {
            title: title,
            place: place,
            startsAt: timeAndDate,
            duration: duration,
            project: selectedProject._id,
            projectName: selectedProject.name
          }
        })
        .then(response => {
          const res = response.data;
          var date = new Date(res.startsAt);
          var modTime = date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2);
          var modDate = date.getFullYear() + '/' + ('0' + (date.getMonth()+1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2);

          this.allEvents.push({
            "__v": res.__v,
            "author": res.author,
            "_id": res._id,
            "date": modDate,
            "duration": res.duration,
            "place": res.place,
            "project": res.project,
            "projectName": res.projectName,
            "time": modTime,
            "title": res.title
          })
        })
        .catch(e => {
          console.log(e);
        })
    },
    modify() {
      var events = this.allEvents
      events.forEach(function(event, i) {
          var date = new Date(event.startsAt);
          event.time = date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2)
          event.startsAt = date.getFullYear() + '/' + ('0' + (date.getMonth()+1)).slice(-2) + '/' + ('0' +date.getDate()).slice(-2);
      });

      for (var i = 0; i < events.length; i++) {
          this.allEvents[i].date = this.allEvents[i].startsAt;
          delete this.allEvents[i].startsAt;
        }

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#eventForm {
  background-color: violet;
  margin-top: 50px;
  padding: 20px;
}

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
