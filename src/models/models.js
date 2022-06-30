const mongoose = require("mongoose");

const PATHWAYSchema = new mongoose.Schema({
    'species' : {type: String}, 
    'species_abbr' : {type: String}, 
    'species_class' : {type: String}, 
    'ensembl_gene' : {type: String}, 
    'pathway_id' : {type: String}, 
    'pathway_description' : {type: String}, 

});


const Ensembl_pathways = mongoose.model('ensembl_pathways', PATHWAYSchema)

module.exports = {
    'ensembl_pathway': Ensembl_pathways,
}