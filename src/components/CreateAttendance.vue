<template>
    <main>
			<div class="title-wrapper">
				<BackArrow></BackArrow>
				<h1 class="title">Nova frequência</h1>
			</div>
			<form @submit.prevent="send">
        <div class="wrapper">
          <div class="input-group">
            <label for="title">Título</label>
            <input type="text" class="input" :class="{ 'input--error': !$v.title.required && submitStatus == 'ERROR' }" v-model.trim="$v.title.$model" placeholder="Insira o nome da atividade">
            <span class="error" v-if="!$v.title.required && submitStatus == 'ERROR'">invalid</span>
          </div>

          <div class="input-group">
            <label for="title">Tipo da frequencia</label>
            <select :class="{ placeholder: category == 'Escolha o tipo', 'input--error': !$v.category.$dirty && submitStatus == 'ERROR' }" class="input" v-model.trim="$v.category.$model" >
              <option disabled hidden selected>Escolha o tipo</option>
              <option>Reunião</option>
              <option>Módulo</option>
              <option>..</option>
            </select>
            <span class="error" v-if="!$v.category.$dirty && submitStatus == 'ERROR'">invalid</span>
          </div>

          <div class="input-group">
            <label for="project">Projeto</label>
            <select :class="{ placeholder: selectedProject == 'Choose', 'input--error': !$v.selectedProject.$dirty && submitStatus == 'ERROR' }" class="input" id="project" v-model.trim="$v.selectedProject.$model" >
              <option hidden disabled>Choose</option>
              <option v-for="project in allProjects" :value="project._id">{{project.name}}</option>
            </select>
            <span class="error" v-if="!$v.selectedProject.$dirty && submitStatus == 'ERROR'">invalid</span>
          </div>


          <div class="input-group">
            <div class="half-input">
              <div class="date">
                <label for="date">Data</label>
                <input class="input" :class="{ 'input--error': !$v.date.$dirty && submitStatus == 'ERROR' }" type="date" v-model.trim="$v.date.$model">
                <span class="error" v-if="!$v.date.$dirty && submitStatus == 'ERROR'">invalid</span>
              </div>
              <div class="duration">
                <label for="date">Duração</label>
                <input class="input" :class="{ 'input--error': !$v.duration.$dirty && submitStatus == 'ERROR' }" type="number" v-model.trim="$v.duration.$model" placeholder="2h" >
                <span class="error" v-if="!$v.duration.$dirty && submitStatus == 'ERROR'">invalid</span>
              </div>
            </div>
            
          </div>
        </div>

        <button type="submit" class="submit-btn" :disabled="submitStatus == 'ERROR'">Criar frequência</button>  
			</form>
      
    </main>
</template>

<script>
  import axios from 'axios'
  import { required, minLength, between, numeric, sameAs, not } from 'vuelidate/lib/validators'
  import BackArrow from '@/components/helpers/BackArrow.vue'

  export default {
		name: 'CreateAttendance',
		data() {
			return {
        title: '',
        // projectId: this.selectedProject._id,
        category: 'Escolha o tipo',
        selectedProject: 'Choose',
        date: Date,
        duration: Number,
        submitStatus: null,
			}
    },
    components: {
      BackArrow,
    },
    validations: {
      title: {
        required,
      },
      category: {
        required
      },
      selectedProject: {
        required
      },
      date: {
        required
      },
      duration: {
        required,
        numeric
      }
    },
		props: [
			'allProjects',
		],
		beforeMount() {
			this.$emit('hideHeader', '')
      this.$emit('hide-nav')
    },
    destroyed() {
      this.$emit('show-header', null)
      this.$emit('show-nav', null)
    },
		methods: {
			send() {
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR';
        } else {
            this.submitStatus = 'PENDING'
            axios({
            url: this.$root.baseUrl + '/api/frequency',
            method: 'POST',
            data: {
              title: this.title,
              projectId: this.selectedProject,
              category: this.category,
              duration: this.duration,
              date: this.date
            },
            headers: {
              'Authorization': 'Bearer ' + this.$root.authData }
            })
            .then(response => {
              this.submitStatus = 'OK'
              alert('Frequencia criada com sucesso')
              console.log(response.data)
              history.go(-1)
            })
            .catch(err => {
              console.log(err)
            })
          }
        }
      },
      validateForm() {
        return true
      }
		}
</script>

<style scoped lang="scss">
@import '../assets/scss/functions';
@import '../assets/scss/colors';

.title-wrapper {
	display: flex;
	margin: 32px;
}

.title {
	margin: 0 auto;
}

form .wrapper {
	margin: 0 32px;
}

label {
	display: block;
	font-family: Montserrat;
	font-style: normal;
	font-weight: normal;
	line-height: normal;
	font-size: 14px;
	text-transform: uppercase;
	color: $label-text-color;
  margin-bottom: 4px
}

input, select {
  max-height: 50px;
}

.input {
	box-sizing: border-box;
	width: 100%;
	padding-left: 12px;
	padding-top: 16px; padding-bottom: 16px;
	font-size: em(14);
	background: #FFFFFF;
	border: 1px solid #EDEDED;
	border-radius: 2px;
}

.placeholder {
  color: rgba(115, 127, 143, 0.32);
}

.half-input {
  display: flex;

  & .duration {
    margin-left: 8px;
  }
}

.submit-btn {
  position: fixed;
  bottom: 58px;
  background-color: $primary-color;
  color: #fafafa;
  border: 0;
  padding: 16px 0;
  width: 100%;
  font-size: em(14);
}

.submit-btn:disabled {
  background-color: #E5E5E5;
  color: #B5B5B5;
}
</style>