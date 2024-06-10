import { Octokit } from "https://esm.sh/octokit";
export { Home }

class Home {
    constructor(){
        this.descriptionHTML = document.querySelector('.js-home-description');
        this.linkHTML = document.querySelector('.js-home-github-url');
        this.avatarHTML = document.querySelector('.js-home-avatar');

        this.projectsTitle = document.querySelectorAll('.js-home-project-title');
        this.projectsDescription = document.querySelectorAll('.js-home-project-description');
        this.projectsLink = document.querySelectorAll('.js-home-project-link');
        this.projectsTagsContainer = document.querySelectorAll('.js-home-project-tags-container');
        
        this.init();
    }

    init(){
        //Récupérer les infos depuis l'API
        this.getUserInformations();
        this.getReposInformations();
    }

    getUserInformations(){
        //Api méthode 1 : récupérer le contenu avec un fetch
        fetch("https://api.github.com/users/CynthiaVL")
            .then((response) => response.json())
            .then((data)=>{
                //Afficher le contenu de mon profil
                this.updateHTMLUser(data);
            })
            .catch((error) =>{
                console.log("Erreur lors de l'appel api getUserInformations", error)
            })
    }

    updateHTMLUser(APIdata){
        // Afficher la description de mon profil
        this.descriptionHTML.textContent = APIdata.bio;
        // Afficher l'url d emon profil github
        this.linkHTML.setAttribute("href", APIdata.html_url);
        // Afficher l'avatar
        this.avatarHTML.setAttribute("src", APIdata.avatar_url);
    }

    async getReposInformations(){
        //Api méthode 2 : récupérer le contenu avec l'Oktokit JS
        const octokit = new Octokit();
        // https://api.github.com/users/CynthiaVL/repos
        const response = await octokit
            .request("GET /users/CynthiaVL/repos")
            .catch((error) =>{console.log("Erreur lors de l'appel api getReposInformations", error)});
        this.updateHTMLProjects(response.data);
    }

    updateHTMLProjects(projects){
        const maxIndex = projects.length -1;
        let htmlIndex = 0;
        for (let i = maxIndex; i > maxIndex-3; i--) {
            const projectInfo = projects[i];
            this.projectsTitle[htmlIndex].textContent = projectInfo.name;
            this.projectsDescription[htmlIndex].textContent=projectInfo.description;
            const languages = projectInfo.topics;
            console.log(languages);
            htmlIndex++;
        }
    }
}