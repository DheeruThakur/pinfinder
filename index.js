let pin = {
 fetchpin : function(city) {
  fetch("https://api.postalpincode.in/postoffice/" 
  + city)
  .then((response) => response.json())
  .then((data) => this.setLocation(data));
 },
 setLocation : function(data) {
  console.log(data[0].PostOffice);
  const { Pincode } = data[0].PostOffice[0];
  const { District } = data[0].PostOffice[0];
  console.log(Pincode , District);
  document.querySelector(".location").innerHTML = "Enter PIN shows the location of : " + Pincode ;
  document.querySelector("#district").innerHTML = "District : " + District ;
  const regionSelect=document.querySelector('#region')
  if(data[0].PostOffice){
   data[0].PostOffice.forEach(postOfficeDetails => {  
    const option=document.createElement('option')
    option.setAttribute('value',`${postOfficeDetails.Region}`)
    option.innerText=`${postOfficeDetails.Name}`
    regionSelect.appendChild(option)
   });
  }
 }
}

document.querySelector(".button").addEventListener("click" , () => {
 const regionSelect=document.querySelector('#region')
 regionSelect.innerHTML=''
 pin.fetchpin(document.querySelector(".searchbar").value);
});
document.querySelector(".searchbar").addEventListener("keyup" , (e) => {
 if(e.key === "Enter")
 {
  const regionSelect=document.querySelector('#region')
  regionSelect.innerHTML=''
  pin.fetchpin(document.querySelector(".searchbar").value)
 }
} );
