export const validate = (schema) => async (req, res, next) => {
  try {
    schema.parse(req.body); 
    next(); 
  } catch (error) {
    res.status(400).json({ errors: error.errors }); 
  }
};
