<template>
  <main>
    <div class="title-wrapper" :class="{ 'is-scrolled': isScrolled}">
      <h2 class="upper-title">Membros</h2>
      <h1 class="title">{{this.$route.params.name}}</h1>
    </div>
    <PopOver
      v-if="popOver.active"
      :isActive="popOver.active"
      :X="popOver.X"
      :Y="popOver.Y">
    </PopOver>
    <div class="list-wrapper">
      <!-- <input v-model="searchInput" placeholder="Buscar por membro.." class="search-input" type="text">       -->
      <h2 class="list-title">Todos os membros</h2>
      <ol class="list" v-if="isLoaded">
        <li v-for="member in members" :key="member._id" class="item">
          <div class="item-photo"></div>
          <div class="item-info">
            <span class="member-name" v-if="member.google_name == ''">{{member.google_email}}</span>
            <span class="member-name" v-else>{{member.google_name}}</span>
            <h3 class="member-email">{{member.google_email}}</h3>
          </div>
          <img @click="test(member)" class="item-edit" src="../assets/edit.svg" alt="">
        </li>
        <!-- pop over -->
        <!-- <div 
          class="pop-over" 
          v-if="popOver.active" 
          :style="{ top: popOver.Y + 'px' }">
          <div>
            <h4>Modificar função</h4>
            <h4>Remover membro</h4>
          </div>
        </div> -->
        <!-- // -->
      </ol>
      <h1 v-else>Carregando..</h1>
    </div>
  </main>
</template>

<script>
  import axios from 'axios';
  const PopOver = () => import('@/components/helpers/PopOver')
  // import PopOver from '@/components/helpers/PopOver'

  export default {
    name: 'ProjectMembers',
    data() {
      return {
        isLoaded: false,
        members: [],
        searchInput: null,
        isScrolled: false,
        popOver: {
          active: false,
          X: Number,
          Y: Number
        }
      }
    },
    props: [
      'allProjects',
    ],
    components: {
      PopOver,
    },
    beforeMount() {
      // on page change
      if (this.members !== undefined) {
        setTimeout(() => {
          this.members = this.allProjects[this.$route.params.index].members
          this.loadMembers()
        },400)
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      loadMembers() {
        axios({
          url: this.$root.baseUrl + '/api/profile/many',
          method: 'POST',
          data: {
            ids: this.members.map(function(obj) {
              return obj._id;
            })  
          },
          headers: {
            'Authorization': 'Bearer ' + this.$root.authData }
          })
          .then(response => {
            // console.log(response.data)
            this.members = response.data
            this.isLoaded = true;
          })
          .catch(err => {
            console.log(err)
        })
      },
      handleScroll () {
        if(window.scrollY > 100) {
          this.isScrolled = true;
        } else {
          this.isScrolled = false;
        }
      },
      test(member) {
        this.popOver.active = true;
        this.popOver.Y = event.clientY
        this.popOver.X = event.clientX
      }
    },
    watch: {
      allProjects() {
        this.loaded = true;
        this.members = this.allProjects[this.$route.params.index].members
        this.loadMembers()
      },
    },
    computed: {
      // filteredList() {
      //   return this.members.filter(member => {
      //     return member.google_name.toLowerCase().includes(this.searchInput.toLowerCase())
      //   })
      // }
    }
  }
</script>

<style scoped lang="scss">
@import '../assets/scss/functions';
@import '../assets/scss/colors';

.is-scrolled {
  position: fixed;
  z-index: 1;
  background-color: white;
  width: 100%;
}

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

.search-input {
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
  width: 100%;
  padding: 16px 24px;
  
  &:focus {
    outline: none;
  }
}

.list-wrapper {
  overflow: hidden;
  background-color: $white;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  // padding: 16px 24px;
}

.list-title {
  font-size: em(16);
  font-weight: 500;
  color: $list-title-color;
  text-transform: uppercase;
  margin-bottom: 8px;
  padding: 16px 24px 4px 16px;
}

.item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px 24px;

  &-photo {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background-color: #C4c4c4;
  }

  &-info {
    margin-left: 16px;
  }

  &-edit {
    position: absolute;
    right: 24px;
  }
}

.item:nth-child(even) {
  background: #FAFAFA
}

.member-name, .member-email {
  font-size: em(14)
}

.member-email {
  color: #c4c4c4
}

</style>