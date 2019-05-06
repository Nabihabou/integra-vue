<template>
  <div>
    <div class="title-wrapper">
      <h1 class="title">Dashboard</h1> 
      <!-- <router-link to="/calendar/create" tag="button" class="title-btn">Criar </router-link> -->
    </div>
    <div class="calendar-wrapper">
      <div id="wrapper-1" style="flex: 2;">
        <!-- <Alert></Alert> -->

        <div class="section-title-wrapper">
          <h1 class="section-title">Calendário</h1> <Button v-if="$mq === 'mobile'" :title="'Criar evento'"></Button>
        </div>

        <vue-event-calendar 
<<<<<<< HEAD
          @day-changed="openModal"
          @go-to="goToCreateEvent()"
=======
          @day-changed="openModal" 
          @go-to="createEvent()"
>>>>>>> 0d2886f9d4d4d364b9cb2faa1c604606881c9d6b
          :events="allEvents">
        </vue-event-calendar>

        <!-- mobile view only -->
        <CalendarDay 
          :dayEvents="dayEvents" 
          :day="dayEvents[0].date"
          @close-modal="closeModal()"
          v-if="show">
        </CalendarDay>
      </div>

      <!-- <div style="flex: 1">
        <h1 class="section-title">Mensagens</h1>
        <div class="messages-wrapper">

        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-event-calendar/dist/style.css' //^1.1.10, CSS has been extracted as one file, so you 
import axios from 'axios'
import CalendarDay from './CalendarViewDay'
import Button from '@/components/helpers/Buttons'
import Alert from '@/components/helpers/Alerts'

export default {
  name: 'Dashboard',
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
      show: false,
      dayEvents: '',
    }
  },
  props: [
    'baseUrl',
  ],
  components: {
    CalendarDay,
    Button,
    Alert,
  },
  created() {
    // GET MY PROJECTS
    axios({
      url: this.$root.baseUrl + '/api/project/my',
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
    axios.get(this.$root.baseUrl + '/api/event')
    .then(response => {
      this.allEvents = response.data;
      this.modify()
    }).catch(e => {
      console.log(e);
    })
  },
  updated() {
    var events = this.allEvents;

    this.$events.on('delete-event', eventData => this.delete = eventData);
    this.$events.on('go-to', response => {
      this.$router.push('/calendar/create')
    });
  },
  mounted() {
    this.$events.on('day-changed', response => {
      console.log('calendar day changed');
    })
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
          url: this.$root.baseUrl + '/api/event',
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
    },
    openModal(value) {
      if (this.$mq === 'mobile') {
        this.show = true;  
        this.$emit('remove-header', '');
      }
      
      this.dayEvents = value.events;
    },
    closeModal() {
      this.show = false;
      this.dayEvents = []
      this.$emit('put-header', '')
    },
<<<<<<< HEAD
    goToCreateEvent() {
      // console.log(payload);
      console.log( 'test');
=======
    createEvent(){
      console.log("TESTE");
>>>>>>> 0d2886f9d4d4d364b9cb2faa1c604606881c9d6b
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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

// NOT IN USE
// .title-btn {
//   font-family: Montserrat;
//   font-style: normal;
//   font-weight: 600;
//   line-height: normal;
//   font-size: 12px;
//   text-transform: uppercase;
//   background-color: transparent;

//   color: #3461BF;
//   border: 1px solid #4F87FB;
//   border-radius: 2px;
//   padding: 4px 12px;
// }

.section-title {
  font-size: em(12);
  font-weight: 600;
  // margin-left: 24px;
  margin-bottom: 4px;
  text-transform: uppercase;
  color: rgba(71, 71, 71, 0.6);
}

.section-title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  margin-bottom: 4px;
  

  & > .section-title {
    margin-bottom: 0;
  }
}

.events-wrapper {
  display: none
}

#eventForm {
  background-color: violet;
  margin-top: 50px;
  padding: 20px;
}

.messages-wrapper {
  background: white;
  width: 100%;
  height: 100%;
}

#wrapper-1 {

}

@media (min-width: 767px) {
  .calendar-wrapper {
    display: flex;
    margin: 0 80px;
  }

  .events-wrapper {
    display: block;
  }

  .__vev_calendar-wrapper {
    margin: unset;
  }

  .__vev_calendar-wrapper .cal-wrapper .cal-header {
    background-color: transparent;
  }

  .title-wrapper {
    margin-left: 80px;
    padding-top: 40px;
    padding-left: unset;
  }

  .section-title-wrapper {
    padding-left: 4px;
  }

  #wrapper-1 {
    margin-right: 16px;
  }

}
</style>
