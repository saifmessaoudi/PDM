export default (schema) =>{
     return async (req,res,next) =>{
        try {
            const validBody = await schema.validate(req.body);
            req.body = schema.cast(validBody, { stripUnknown: true });
            //call the next middleware in the stack
            return next();
        }catch(error)
        {
            res.status(400).json(error.message);
        }
        };
    };

