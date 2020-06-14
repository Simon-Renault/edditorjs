<template>
<div class="app">
  <div class="repos">
    <a href="https://github.com/login/oauth/authorize?scope=repo&client_id=bf5071b7cb30d7e2ad66">login with github</a>  
    <ul>
      <li v-for="(repo,i) in repos" :key="'repo'+ i" @click="selectRepo(repo)">
        <div>{{repo.name}}</div>
        <div>{{repo.size}}</div>
      </li>
    </ul>
  </div>

  <div class="files">
    <div>
       Selected repo : {{selectedRepo}}
    </div>
    <ul>
      <li v-for="(file,i) in selectedRepoContent" :key="'repo'+ i" @click="selectFile(file)">{{file.name}}</li>
    </ul>
  </div>

  <div class="editor">
    <div>

    </div>
    Selected file : {{selectedFile}}
    <input type="text" name="" id="" v-model="selectedFile">
    <input type="text" name="" id="" v-model="fileSha">
    <textarea name="" id="" cols="30" rows="40" v-model="fileContent"></textarea>
    <button @click="createFile">new file</button>
  </div>
  

 
 

  
</div>

</template>

<script>
import GitHub from 'github-api';
import Axios from 'axios'
const { Octokit } = require("@octokit/rest");


export default {
  data(){
    return{
      token : null,
      user : null,
      repos : [],
      selectedRepo : null,
      selectedRepoContent : null,
      selectedFile:null,
      fileContent : null,
      fileSha : null,
      fileTitle : null
    }
  },
  methods : {
    async selectRepo(repo){
      console.log(repo)
      this.selectedRepo = repo.name
      const content = await this.octokit.repos.getContent({
        owner: this.user.login,
        repo: repo.name,
        path: ''
      })
      this.selectedRepoContent = content.data.filter(c => {
        var re = /(?:\.([^.]+))?$/;
        
        const isFile = c.type === 'file' 
        if(!isFile) return false
        const ext = re.exec(c.path)[1];  
        console.log(ext)
        const whitelist = ['md','html']
        const hasRightExtension = whitelist.includes(ext)
        if(hasRightExtension  ){
          return true
        }
        return false
      })
      console.log(content)
    },
    async selectFile(file){
      this.selectedFile = file.path
      const content = await this.octokit.request(`GET /repos/${this.user.login}/${this.selectedRepo}/contents/${this.selectedFile}`,{
        ref:'master'
      })
      this.fileSha = file.sha
      this.fileContent = atob(content.data.content)
    },
    async createFile(){
        const repos  = await this.octokit.request(`PUT /repos/${this.user.login}/${this.selectedRepo}/contents/${this.selectedFile}`,{
          "message": "my commit message",
          "committer": {
            "name": this.user.name,
            "email": this.user.email
          },
          "content": btoa(this.fileContent),
          "sha": this.fileSha
        })
    }
  },
  mounted(){
    this.$nextTick( async () => {
      let code =  this.$route.query.code
      if(!code) return

      if(!localStorage.getItem('token')){
        const token = await Axios.get('https://edditorjs.vercel.app/api/login?code=' + code)
        this.token = token.data
        localStorage.setItem('token',this.token)
      }else{
        this.token = localStorage.getItem('token')
      }

    
      this.octokit = new Octokit({
        auth: this.token
      });

      const rate = await this.octokit.rateLimit.get();
      console.log(rate)
      const { data } = await this.octokit.request("/user");
      this.user = data
      const repos  = await this.octokit.request('GET /user/repos')
      this.repos =  repos.data.filter(repo => repo.size > 0)
     
    })
   
  }
}
</script>

<style lang="scss">
*,*::before,*::after{
  padding:0;
  margin:0;
  box-sizing: border-box;
  font-family: sans-serif;
}
li{
  list-style: none;
}
ul{

}
.app{
  display:grid;
  grid-template-columns: 300px 300px 1fr;
  height:100vh;
}
.repos{
  position: relative;
  display: flex;
  flex-direction: column;
  background : var(--accents-1);
  border-right :  1px solid var(--accents-2);
  max-height: 100vh;
  overflow: auto;
  a{
    background : var(--accents-8);
    width:100%;
    height: 50px;
    color: var(--accents-1);
    text-decoration: none;
    flex-shrink: 0;
  }
  li{
    padding: 10px;
    cursor: pointer;
     border-bottom :  1px solid var(--accents-2);
  }
}
.files{
     background : var(--accents-1);
  border-right :  1px solid var(--accents-2);
   display:flex;
  flex-direction: column;
   li{
    padding: 10px 10px;
    cursor: pointer;
     border-bottom :  1px solid var(--accents-2);
  }
}
.editor{
  padding: 10%;
  display:flex;
  flex-direction: column;
}
</style>