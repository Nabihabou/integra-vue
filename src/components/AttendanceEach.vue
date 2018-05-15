<template>

  <main>
    <div v-if="dataLoaded">
      <div class="title-wrapper">
        <h2 class="upper-title">Frequencia</h2>
        <h1 class="title">{{project.name}}</h1>
        <h3 class="att-title">{{frequency.title}}</h3>
      </div>
      <div>
          <div class="dateAndTime"><span>{{formatDate()}}</span> <span>{{frequency.category}}</span></div>
          <!-- <span>{{frequency.duration}}</span> -->
          <ol class="member-list">
            <li v-for="member in project.members" class="item" v-if="project" :key="member._id">
              {{member._id}} 
              <div class="checkbox">
                <input type="checkbox" v-model="member.attended" @click="changePresent(member)">
              </div>
            </li>
          </ol>
      </div>
    </div>
  </main>

</template>

<script>
import axios from 'axios';
  export default {
    name: 'AttendanceEach',
    data() {
      return {
        frequency: [],
        project: [],
        members: [],
        attended: [],
        dataLoaded: false,
      }
    },
    props: [
        'allProjects',
    ],
    mounted() {
      axios({
            url: this.$root.baseUrl + '/api/frequency?id=' + this.$route.params.id,
            method: 'GET',
            headers: {
            'Authorization': 'Bearer ' + this.$root.authData }
          })
          .then(response => {
              this.dataLoaded = true;
              this.frequency = response.data;

              this.check();
          })
          .catch(err => {
              console.log(err)
          }) 

        if (this.allProjects = []) {
          axios({
            url: this.$root.baseUrl + '/api/project',
            method: 'GET',
            headers: {
            'Authorization': 'Bearer ' + this.$root.authData }
          })
          .then(response => {
              this.dataLoaded = true;
              this.project = response.data[this.$route.params.index];
              this.members = response.data[this.$route.params.index].members

              this.check();
          })
          .catch(err => {
              console.log(err)
          })
        }
    },
    methods: {
      changePresent(member) {
        
        let hours = this.frequency.duration;
        axios({
            url: this.$root.baseUrl + '/api/frequency',
            method: 'PUT',
            data: {
              memberId: member._id,
              frequencyId: this.frequency._id,
              hours: hours,
            },
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

      check() {
        for (let i = 0; i < this.frequency.presents.length; i++) {
          this.attended.push(this.frequency.presents[i].member);
        }  
        for (let i = 0; i < this.members.length; i++) {
          for (let j = 0; j < this.attended.length; j++) {
            if (this.members[i]._id === this.attended[j]) {
              this.members[i].attended = true;
              }
            }
          }
        },

      formatDate() {
        let date = new Date(this.frequency.date);
        return date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear(); 
      }
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
@import '../assets/scss/functions';
@import '../assets/scss/colors';

.title-wrapper {
  padding: 24px 24px 12px 24px;
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

.att-title {
  font-size: em(16);
  color: #474747;
  margin-top: 16px;
  text-transform: uppercase
}

.att-type, .att-date {
  color: $terciary-text-color;
}

.member-list {
  background: $white;
  border: 1px solid #F3F5F8;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  padding-left: 24px;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #F3f3f3;
}

.checkbox {
  display: flex;
  padding: 20px 32px;
  background-color: #FCFCFC;
  
  & input {
    background: #FCFCFC;
    border: 1px solid #C9C9C9;
    box-sizing: border-box;
    width: 24px;
    height: 24px;
  }
}

.dateAndTime {
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  & span {
    font-size: em(16);
    color: #CDCFD1;
  }
}
</style>
