module.exports = function(mongoose){
    var employees = new mongoose.Schema({
        employeeName    :   { type: String }
    });
    
    mongoose.model('employees', employees);
};