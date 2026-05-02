function renderSkills(){
    const skillsContainer=document.getElementById("skills-container");

    if(!skillsContainer){
        console.log("Skills container not found");
        return;
    }
    skillsContainer.innerHTML="";
    skillsData.forEach(function(skill){
        const card=document.createElement("div");
        card.className="p-8 text-center bg-white rounded-3xl shadow-lg";

        // Create Icon
        const iconBox=document.createElement("div");
        iconBox.className="w-20 h-20 mx-auto mb-4 bg-green-900 rounded-2xl flex items-center justify-center";

        // Create Icon Text
        const iconText=document.createElement("span");
        iconText.className="text-2xl text-white font-bold";
        iconText.textContent=skill.shortLabel;

        // Put icon text inside icon box
        iconBox.appendChild(iconText);

        // Create skill name
        const skillName=document.createElement("h3");
        skillName.className="tect-2xl font-blod mb-2";
        skillName.textContent=skill.name;

        // Create skill description
        const skillDescription=document.createElement("p");
        skillDescription.className="text-sm"
        skillDescription.textContent=skill.description;

        // Append all child elements to card
        card.appendChild(iconBox);
        card.appendChild(skillName);
        card.appendChild(skillDescription);

        // Append card to skills container
        skillsContainer.appendChild(card);
    });
    console.log("Skills rerndered successfully.");
}