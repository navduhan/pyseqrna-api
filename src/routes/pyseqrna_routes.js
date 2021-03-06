
const express = require('express');
const { tsv2json, json2tsv } = require('tsv-json');

const router = express.Router();

const pathways = require("../models/models");


router.route("/").get((req, res)=>{
    res.send("<html><title>pySeqRNA-API</title><body><h3>Welcome to pySeqRNA Functional Annotation API</h3></body></html>")
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
        path.push(`${ data._id.pathway_id}&emsp;${data._id.pathway_description}`)
    })

    const data = `<html><body><pre>${path.join("\n")}</pre></body></html>`
    
    res.send(data)
})

router.route("/list/pathways/:species").get(async(req,res)=>{

    let species = req.params.species

    let results = await pathways['ensembl_pathway'].find({'$or':[{'species':species}, {'species_abbr':species}]})

    let path= [];

    results.map((data, index)=>{
        path.push(`${ data.species}&emsp;${ data.ensembl_gene}&emsp;${ data.pathway_id}&emsp;${data.pathway_description}`)
    })

    const data = `<html><body><pre>${path.join("\n")}</pre></body></html>`
    
    res.send(data)
})




module.exports = router;