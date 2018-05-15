<template>
    <main>
			<div class="title-wrapper">
				<img src="../assets/back-arrow.svg" />
				<h1 class="title">Nova frequência</h1>
			</div>
			<form>
				<label for="title">Título</label>
				<input type="text" class="input" id="title">

				<label for="title">Local</label>
				<input type="text" class="input" id="title">

				<label for="project">Projeto</label>
				<select class="input" id="project" v-model="selectedProject">
					<option hidden disabled>Choose</option>
					<option v-for="project in allProjects" >{{project.name}}</option>
				</select>
			</form>
    </main>
</template>

<script>
  export default {
		name: 'CreateAttendance',
		data() {
			return {
				selectedProject: 'Choose',
			}
		},
		props: [
			'allProjects',
		],
		beforeMount() {
			this.$emit('hideHeader', '')
		},
		methods: {
			send() {
				axios({
            url: this.$root.baseUrl + '/api/frequency',
            method: 'POST',
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
          .then(response => {
						
          })
          .catch(err => {
              console.log(err)
          })
        }
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

form {
	margin: 0 36px;
}

label {
	display: block;
	font-family: Montserrat;
	font-style: normal;
	font-weight: normal;
	line-height: normal;
	font-size: 14px;
	text-transform: uppercase;
	color: #989DA3;

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
</style>