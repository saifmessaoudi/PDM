import User from "../models/Forum.js"

export const create = async(req, res) => {
    const newUser = new User({
        title: req.body.title,
        content: req.body.content,
        forum: req.body.forum,

    })
    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }

}


export const getAll = async(req, res) => {
    try {
        const all = await User.find().sort({createdAt: 1})
        res.status(200).json(all)

    } catch (error) {
        res.status(500).json(error)
    }
}


export const getOne = async(req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)
    }
}



export const update = async (req, res) => {

      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: {username: req.body.username, email: req.body.email, password: req.body.password},
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err)
      }
  
  };


  export const deleteUser = async (req, res) => {
   
      try {
        await forum.findByIdAndDelete(req.params.id);
        res.status(200).json("Forum has been deleted.");
      } catch (err) {
       res.status(500).json(err)
      }
  
  };





