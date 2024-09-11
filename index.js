import express from "express"

const app =express()
const port =3000

app.use(express.json());

let teaData=[];
let nextid = 1;

app.post('/teas',(req,res)=>{
const {name,price}  = req.body
const newTwa = { id: nextid++, name, price}
teaData.push(newTwa) 
res.status(201).send(newTwa)
})

app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})


app.get("/teas/:id",(req,res)=>{
  const tea =  teaData.find(t=> t.id === parseInt(req.params.id)) 
  if(!tea){
    return res.status(404).send("tea not found")
  }
  res.status(200).send(tea)
})

app.put("/teas/:id",(req,res)=>{
    const tea = teaData.find(t=> t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("tea not found")
    }
    const {name,price}= req.body
    tea.name= name
    tea.price = price
    res.status(200).send(tea)
})

app.delete("/tea/:id",(req,res)=>{
    const tea = teaData.findIndex(t=> t.id === parseInt(req.params.id))
    if(tea === -1){
        return res.status(404).send("tea not found")
    }
    teaData.splice(tea,1)
    return res.status(200).send(`${req.params.id} is delect`)
})
app.listen(port,()=>{
    console.log(`server is runninge at prot ${port}`)
})