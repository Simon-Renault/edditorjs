<template>
  <a href="https://github.com/login/oauth/authorize?scope=repo&client_id=bf5071b7cb30d7e2ad66">login with github</a>
</template>

<script>
import GitHub from 'github-api';
import Axios from 'axios'

export default {
  data(){
    return{
      token : null
    }
  },
  mounted(){
    this.$nextTick( async () => {
      let code =  this.$route.query.code
      if(!code) return
      console.log(code)
      const token = await Axios.get('https://editorjs.vercel.app/api/login?code=' + code)
      this.token = token.data
      console.log(token)

      const gh = new GitHub({token});

      console.log(gh)
      
    })
   
  }
}
</script>

<style>

</style>