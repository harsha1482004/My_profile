function initThemeToggle(){
    const toggleBtn = document.getElementById("theme-toggle");
    const body = document.body;

    const savedTheme = localStorage.getItem("portfolio-theme");

    if(savedTheme === "dark"){
        body.classList.add("dark-mode");
    }
    toggleBtn.addEventListener("click",function(){
        body.classList.toggle("dark-mode");
        if(body.classList.contains("dark-mode")){
            localStorage.setItem("portfolio-theme","dark");
            console.log("Dark mode enabled");
        }else{
            localStorage.setItem("portfolio-theme","light");
            console.log("light mode enabled");
        }
    });
}