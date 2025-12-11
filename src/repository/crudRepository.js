export const crudRepository = (model) => {
  return {
    create: async (data) => model.create(data),

    getAll: async () => model.find(),

    getById: async (id) => model.findById(id),

    delete: async function (id) {
      const response = await model.findByIdAndDelete(id);
      return response;
    },

    update: async (id, data) =>
      model.findByIdAndUpdate(id, data, { new: true }),

    deleteById: async (id) => model.findByIdAndDelete(id),

    deleteMany: async function (modelIds) {
      const response = await model.deleteMany({
        _id: {
          $in: modelIds
        }
      });
      return response;
    }
  };
};
