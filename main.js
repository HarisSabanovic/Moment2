
getJobs();

async function getJobs(){
   try {
     const respone = await fetch("/api/workers");
     const data = await respone.json();
   } catch (error) {
     console.error("Error occured fetching data: " + error)
   }
}


function displayData(data) {
    const containerEl = document
}