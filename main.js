
getData();

async function getData(){
const response = await fetch("/api/workers");
const data = await response.json();

console.log(data);
}
