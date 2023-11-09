    import User from "../models/user.model.js";


    /*----------------------------------- Admin --------------------------------------- */

    const getUserById = async (req, res) => {
        try{
            const { id } = req.params;
            const user = await User.findById(id).select("-password");
            if (user === null) {
                return res.status(400).json( "No client found" );
            }
            res.status(200).json(user);
        }catch(error){
            res.status(404).json({ message: error.message });
        }

    };

    const getAllUsers = async (req, res) => {
        try {
            const users = await User.find();
            if (users.length === 0) {
                return res.status(400).json( "No users found" ).select("-password");
            }
            res.status(200).json(users);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    };


    const searchUser = async (req, res) => {
        try {
        const { query } = req.query;
        const users = await User.find({
            $or: [
                { firstName: { $regex: `^${query}`, $options: "i" } },
                { lastName: { $regex: `^${query}`, $options: "i" } },
            ],
        }).select("-password");
        if (users.length === 0) {
            return res.status(400).json("No users found");
        }
        res.status(200).json(users);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
    };

    const deleteUser = async (req, res) => {
        const { id } = req.params;
            try {
                const user = await User.findByIdAndDelete(id);
                if (user === null) {
                    return res.status(400).json( "No client found" );
                }
                res.status(200).json("Client deleted successfully");
            } catch (error) {
                res.status(404).json({ message: error.message });
            }
    };

    const banUser = async (req, res) => {
    const { id } = req.params;
        try {
            const user = await User.findByIdAndUpdate(id, { isBanned: true });
            if (user === null) {
                return res.status(400).json( "No client found" );
            }
            res.status(200).json("Client banned successfully");
        } catch (error) {
            res.status(404).json({ message: error.message });
    }};

    const unbanUser = async (req, res) => {
    const { id } = req.params;
        try {
            const user = await User.findByIdAndUpdate(id, { isBanned: false });
            if (user === null) {
                return res.status(400).json( "No client found" );
            }
            res.status(200).json("Client unbanned successfully");
        } catch (error) {
            res.status(404).json({ message: error.message })
    }};



    export default {
        deleteUser,
        banUser,
        unbanUser,
        getAllUsers,
        getUserById,
        searchUser
    };