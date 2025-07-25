export default crudRepository = (model) => {
    return{
        create: async function(data) {
            const newdoc = await model.create(data)
            return newdoc
        },
        getAll: async function(){
            const data = await model.find()
            return data
        },
        getById: async function(id){
            const data = await model.findById(id)
            return data
        },
        update:async function(id, data){
            return await model.findByIdAndUpdate(id, data, {new:true})
        },
        delete: async function(id){
            return await model.findByIdAndDelete(id)
        }
    }
}