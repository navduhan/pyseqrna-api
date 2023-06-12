
const express = require('express');
const { tsv2json, json2tsv } = require('tsv-json');

const router = express.Router();

const pathways = require("../models/models");


router.route("/").get((req, res)=>{
    res.send(`<html><title>pySeqRNA-API</title>
             
             <body><h3>Welcome to pySeqRNA Functional Annotation API</h3>
             <h4>Check available species </h4>
             <code>https://bioinfo.usu.edu/api-pyseqrna/list/species </code>
             
             </body></html>`)
})

/**
 * @swagger
 * 
 * /list/pathways:
 * get: all pathways 
 */

router.route("/list/pathways").get(async(req,res)=>{


    let results = await pathways['ensembl_pathway'].aggregate( 
        [
            {$group: { "_id": { pathway_id: "$pathway_id", pathway_description: "$pathway_description" } } }
        ]
    )

    let path= [];

    results.map((data, index)=>{
        path.push(`${ data._id.pathway_id}\t${data._id.pathway_description}`)
    })

    const data = `<pre>${path.join("\n")}</pre>`
    
    res.send(data)
})

router.route("/list/pathways/:species").get(async(req,res)=>{

    let species = req.params.species

    let results = await pathways['ensembl_pathway'].find({'$or':[{'species':species}, {'species_abbr':species}]})

    let path= [];

    results.map((data, index)=>{
        path.push(`${ data.species}\t${ data.ensembl_gene}\t${ data.pathway_id}\t${data.pathway_description}`)
    })

    const data = `<pre>${path.join("\n")}</pre>`

    
    
    res.send(data)
})

router.route("/list/species").get(async(req,res)=>{

    let species = req.params.species

    let results = await pathways['ensembl_pathway'].aggregate( 
        [
            {$group: { "_id": { species: "$species", species_abbr: "$species_abbr" } } }
        ]
    )

    let path= [];

    results.map((data, index)=>{
        path.push(`${ data._id.species}\t${data._id.species_abbr}`)
    })

    const data = `<pre>${path.join("\n")}</pre>`
    
    res.send(data)
})





module.exports = router;
