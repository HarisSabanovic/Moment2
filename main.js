
window.onload = function() {
    getJobs();
};

async function getJobs(){
   try {
     const respone = await fetch("/api/workers");
     const data = await respone.json();

     displayData(data)
   } catch (error) {
     console.error("Error occured fetching data: " + error)
   }
}


function displayData(data) {

    const containerEl = document.getElementById("data-container");

    //rensar innehållet innan 
    containerEl.innerHTML = "";

    data.forEach(job => {
        const jobDivEl = document.createElement("div");
        jobDivEl.classList.add("job-container");


        const companyNameEl = document.createElement("h3");
        companyNameEl.innerHTML = `${job.jobtitle} - ${job.companyname}`;

        const locationEl = document.createElement("p");
        locationEl.innerHTML = `${job.location}`;

        const dateEl = document.createElement("p");
        dateEl.innerHTML = `From ${job.startdate.split("T")[0]} to ${job.enddate.split("T")[0]}`;

        const infoEl = document.createElement("p");
        infoEl.innerHTML = `${job.description}`;

        const deleteBtn = document.createElement("a");
        deleteBtn.href = "#"
        deleteBtn.innerHTML = "Radera";

        deleteBtn.addEventListener("click", function() {
            event.preventDefault();
            deleteJob(job.id);
        })

        jobDivEl.appendChild(companyNameEl);
        jobDivEl.appendChild(locationEl);
        jobDivEl.appendChild(dateEl);
        jobDivEl.appendChild(infoEl);
        jobDivEl.appendChild(deleteBtn);

        containerEl.appendChild(jobDivEl);

    })
}

async function deleteJob(jobId) {
    try {
        const response = await fetch(`/api/workers/${jobId}`, {
            method: "DELETE"
        });

        if(response.ok) {
            console.log("Deleted succesfully");
            getJobs();
        } else {
            console.error("Kan inte radera")
        }
    } catch {
        console.error("could not delete job")
    }
}
