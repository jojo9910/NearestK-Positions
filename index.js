const express=require('express');
const app=express();
const bodyparser = require("body-parser");
const VehicleData=require('./generateDatabase/data.json');
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const PriorityQueue=require('./HeapImplementation/Heap');

function round(num) {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

app.get("/", (req, res) => {
  res.render('index');
});


app.post("/fetchCabs",(req,res) =>{
 
  let NearK = [];
  console.log(req.body);
  const {x_cor,y_cor,K_Value}=req.body;
try{
  const pairwiseQueue = new PriorityQueue((a, b) => a[0] > b[0]);   
  for(var i=0;i<VehicleData.length;i++){
     const x=VehicleData[i].vehicleX;
     const y=VehicleData[i].vehicleY;
     const id=VehicleData[i].vehicleId;
  //  console.log(x," ",y);

     let dis=Math.sqrt((x-x_cor)*(x-x_cor)+(y-y_cor)*(y-y_cor));
    //  console.log(dis);
     if(pairwiseQueue.size()<K_Value){
       pairwiseQueue.push([dis,id]);
     }
     else if(pairwiseQueue.peek()[0]>dis){
     pairwiseQueue.pop();
     pairwiseQueue.push([dis,id]);
     }

  }

  while(!pairwiseQueue.isEmpty()){
    const near=pairwiseQueue.pop();
    const cor = VehicleData[near[1]];
    console.log(cor.vehicleX," ",cor.vehicleY);
    NearK.push({"id":near[1],"X":cor.vehicleX,"Y":cor.vehicleY,"Dist_frmSource":round(near[0])});
  }
NearK.reverse();
res.render('display',{NearK});
}catch(err){
  console.log(err);
  res.send("A error Here!!");
}
    
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});