const express = require ('express')
const cors = require ('cors')
const connectDB = require('./src/db')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express()
const apiPort = 3810
const routes =require('./src/routes/pyseqrna_routes')


const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "PySeqRNA API",
        description: "PySeqRNA Functional Annotation API",
        contact: {
          name: "Naveen Duhan"
        },
        servers: [{url:"http://localhost:4000",},]
      }
    },
    apis: ["./src/routes/pyseqrna_routes.js"],
   
  };
  
console.log(__dirname)

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.urlencoded({extended:true}))
app.use(cors("*"))
app.use(express.json())

connectDB.on('error', console.error.bind(console, 'MongoDB connection error:'))


app.use("/", routes)

app.listen(apiPort, ()=> console.log(`Server runnning on port ${apiPort}`))
