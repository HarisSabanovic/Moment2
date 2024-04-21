
getJobs();

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
        companyNameEl.innerHTML = `${job.companyname}`;

        const jobTitleEl = document.createElement("p");
        jobTitleEl.innerHTML = `${job.jobtitle}`;

        const locationEl = document.createElement("p");
        locationEl.innerHTML = `${job.location}`;

        const dateEl = document.createElement("p");
        dateEl.innerHTML = `${job.startdate} - ${job.enddate}`;

        const infoEl = document.createElement("p");
        infoEl.innerHTML = `${job.description}`;


        jobDivEl.appendChild(companyNameEl);
        jobDivEl.appendChild(jobTitleEl);
        jobDivEl.appendChild(locationEl);
        jobDivEl.appendChild(dateEl);
        jobDivEl.appendChild(infoEl);

        containerEl.appendChild(jobDivEl);

    })
}