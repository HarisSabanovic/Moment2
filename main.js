

window.onload = function() {
    getJobs();
};

//hämtar jobb
async function getJobs(){
   try {
     const respone = await fetch("/api/workers");
     const data = await respone.json();

     displayData(data)
   } catch (error) {
     console.error("Error occured fetching data: " + error)
   }
}


//visar varje jobb
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
        dateEl.innerHTML = `Från ${job.startdate.split("T")[0]} till ${job.enddate.split("T")[0]}`;

        const infoEl = document.createElement("p");
        infoEl.innerHTML = `Info:${job.description}`;

        //radera knapp
        const deleteBtn = document.createElement("a");
        deleteBtn.href = "#"
        deleteBtn.innerHTML = "Radera";

        deleteBtn.addEventListener("click", function() {
            event.preventDefault();
            deleteJob(job.id);
        });


        jobDivEl.appendChild(companyNameEl);
        jobDivEl.appendChild(locationEl);
        jobDivEl.appendChild(dateEl);
        jobDivEl.appendChild(infoEl);
        jobDivEl.appendChild(deleteBtn);

        containerEl.appendChild(jobDivEl);

    })
}


document.addEventListener("DOMContentLoaded", function() {
    let formEl = document.getElementById("workForm");
    formEl.addEventListener("submit", formPost);

    async function formPost(event) {
        event.preventDefault();

        const form = event.target;

        const formData = {
            companyname: form.companyname.value,
            jobtitle: form.jobtitle.value,
            location: form.location.value,
            startdate: form.startdate.value,
            enddate: form.enddate.value,
            description: form.description.value
        };

        try {
            const response = await fetch("/api/workers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to add job");
            }

            formEl.reset();
            
        } catch (error) {
            console.error("Error adding job:", error);
        }
    }
});

//funktion som raderar 
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
