export const crudRepository = (model) => {
  return {
    create: async (data) => model.create(data),

    find: async () => model.find(),

    findById: async (id) => model.findById(id),

    updateById: async (id, data) =>
      model.findByIdAndUpdate(id, data, { new: true }),

    deleteById: async (id) => model.findByIdAndDelete(id),

    findOne: async (query) => model.findOne(query)
  };
};
