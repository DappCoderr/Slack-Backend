export default crudRepository = () => {
    return{
        create: async function(data) {
            const newdoc = await this.create(data)
            return newdoc
        },
        getAll: async function(){
            const data = await this.find()
            return data
        },
        getById: async function(id){
            const data = await this.findById(id)
            return data
        },
        update:async function(id, data){
            return await this.findByIdAndUpdate(id, data, {new:true})
        },
        delete: async function(id){
            return await this.findByIdAndDelete(id)
        }
    }
}