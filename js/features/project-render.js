function renderProjects() {
    const projectsContainer = document.getElementById("projects-container");

    if (!projectsContainer) {
        console.log("Projects container not found");
        return;
    }
    projectsContainer.innerHTML = "";
    projectsData.forEach(function (project) {

        // to create outer card
        const card = document.createElement("div");
        card.className = "p-8 text-center bg-gray-300 rounded-3xl shadow-lg";

        //create icon
        const iconBox = document.createElement("div");
        iconBox.className = "w-20 h-10 mx-auto mb-4 bg-gray-500 rounded-2xl flex item-center justify-center";

        //create icon text
        const iconText = document.createElement("span");
        iconText.className = "text-xl text-white font-bold";
        iconText.textContent = project.status;

        //put iconText inside iconBox
        iconBox.appendChild(iconText);


        //create project name
        const projectName = document.createElement("h4");
        projectName.className = "text-xl font-bold mb-2";
        projectName.textContent = project.name;
        projectName.style.color = "blue";

        //create project category
        const projectCategory = document.createElement("h3");
        projectCategory.className = "text-xl font-bold mb-2";
        projectCategory.textContent = project.category;

        //create project description
        const projectDescription = document.createElement("h5");
        projectDescription.className = "text-xl mb-2";
        projectDescription.textContent = project.description;

        //create project technologies
        const projectTechnologies = document.createElement("h3");
        projectTechnologies.className = "text-xl font-bold mb-2";
        projectTechnologies.textContent = project.technologies;


        //create icon1
        const iconBox1 = document.createElement("div");
        iconBox1.className = "w-20 h-10 mx-auto mb-4 bg-gray-500 rounded-2xl flex item-center justify-center";

        //create icon text1
        const iconText1 = document.createElement("span");
        iconText1.className = "text-xl text-white font-bold";
        iconText1.textContent = project.liveDemo;

        //put iconText inside iconBox
        iconBox1.appendChild(iconText1);

        //create icon2
        const iconBox2 = document.createElement("div");
        iconBox2.className = "w-20 h-10 mx-auto mb-4 bg-gray-500 rounded-2xl flex item-center justify-center";

        //create icon text2
        const iconText2 = document.createElement("span");
        iconText2.className = "text-xl text-white font-bold";
        iconText2.textContent = project.github;

        //put iconText inside iconBox
        iconBox2.appendChild(iconText2);


        //Append
        card.appendChild(iconBox);
        card.appendChild(projectName);
        card.appendChild(projectCategory);
        card.appendChild(projectDescription);
        card.appendChild(projectTechnologies);
        card.appendChild(iconBox1);
        card.appendChild(iconBox2);

        //append 
        projectsContainer.appendChild(card);
    });
    console.log("Projects rendered successfully");
}