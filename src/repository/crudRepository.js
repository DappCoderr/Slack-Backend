export const crudRepository = (model) => {
  return {
    create: async (data) => model.create(data),

    getAll: async () => model.find(),

    getById: async (id) => model.findById(id),

    updateById: async (id, data) =>
      model.findByIdAndUpdate(id, data, { new: true }),

    deleteById: async (id) => model.findByIdAndDelete(id),

    getByAnyField: async (query) => model.findOne(query)
  };
};
