import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import usermodel from "../models/user.model.js";
import paymentModel from "../models/payment.model.js";
import axios from "axios";
import dotenv from "dotenv";

const User = usermodel.User;

/*----------------------------------- GET --------------------------------------- */

const getCurrentUser = async (req, res) => {
    try {
       if (!req.header("Authorization")) return res.status(401).json({ message: "Unauthorized" });
        const token = req.header("Authorization").split(" ")[1];
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.userId).select("-password -createdAt -updatedAt -__v");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        if (users.length === 0) {
            return res.status(400).json( "No users found" );
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


const getAllClients = async (req, res) => {
    try {
        const users = await usermodel.User.find({ role: "client" }).select("-password");
        if (users.length === 0) {
            return res.status(400).json( "No clients found" );
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllMedecins = async (req, res) => {
    try {
        const users = await User.find({ role: "medecin" }).select("-password");
        if (users.length === 0) {
            return res.status(400).json( "No medecins found" );
        }else{
            return res.status(200).json(users);}
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getClientById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select("-password");
        if (user === null) {
            return res.status(400).json( "No client found" );
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getMedecinById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select("-password");
        if (user === null) {
            return res.status(400).json( "No medecin found" );
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


/*----------------------------------- Search --------------------------------------- */

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


/*----------------------------------- Updates --------------------------------------- */

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, phone ,email, location } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
    const updatedUser = { firstName, lastName, phone,email ,location};
    await User.findByIdAndUpdate(id, updatedUser, { new: true });
    res.json(updatedUser);
};


/*----------------------------------- Favorites --------------------------------------- */

const addRemoveFavorite = async (req, res) => {
    try {
       
        const currentUserId = req.params.userId;
        const otherUserId = req.params.otherUserId;
        if (currentUserId === otherUserId) return res.status(400).json({ message: "You can't add yourself to favorites" });
        const currentUser = await User.findById(currentUserId);
        const otherUser = await User.findById(otherUserId);
        if (!currentUser || !otherUser) return res.status(404).json({ message: "User not found" });
        const isFavorite = currentUser.favorites.includes(otherUserId);
        if (isFavorite) {
            currentUser.favorites = currentUser.favorites.filter((id) => id !== otherUserId);
            await currentUser.save();
            return res.status(200).json({message : "User removed from favorites"});
        } else {
            currentUser.favorites.push(otherUserId);
            await currentUser.save();
            res.status(200).json({message : "User added to favorites"});
        }
    }catch(error){
        res.status(404).json({ message: error.message });
    }
};


const getFavorites = async (req, res) => {
    try {
        const token = req.header("Authorization").split(" ")[1];
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const currentUserId = decodedToken.userId;
        const currentUser = await User.findById(currentUserId).populate("favorites");
        
        if (!currentUser) return res.status(404).json({ message: "No user found" });
        const favoriteUsers = await Promise.all(currentUser.favorites.map(async (favoriteId) => {
            const user = await User.findById(favoriteId, "-password");
            return { id:user._id ,firstName :user.firstName, lastName:user.lastName};
        }));

        res.status(200).json(favoriteUsers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const Payment = async (req, res) => {
    const url = "https://developers.flouci.com/api/generate_payment";
    const payload = {
      app_token: "5f434644-7f1a-4e02-a6c4-6f317a3fb668",
      app_secret: process.env.FLOUCI_SECRET,
      amount: req.body.amount * 1000,
      accept_card: "true",
      session_timeout_secs: 1200,
      success_link: "https://developers.flouci.com/api/verify_payment",
      fail_link: "http://0.0.0.0:3000/user",
      developer_tracking_id: "3d6c3855-88b9-481f-9c00-43c8b8745f80",
    };
  
    try {
      const result = await axios.post(url, payload);
      const payment = new paymentModel({
        user: req.body.userId,
        balanace: req.body.amount,
        payment_id: result.data.result.payment_id,
        state: "in progress",
      });
      await payment.save();
      res.send(result.data);
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occurred");
    }
  };

  const Verify = async (req, res) => {
    const id_payment = req.params.id;
  
    try {
      const result = await axios.get(
        `https://developers.flouci.com/api/verify_payment/${id_payment}`,
        {
          headers: {
            "Content-Type": "application/json",
            apppublic: "5f434644-7f1a-4e02-a6c4-6f317a3fb668",
            appsecret: process.env.FLOUCI_SECRET,
          },
        }
      );

      const payment = await paymentModel.findOne({
        user: req.body.userId,
        payment_id: id_payment,
      });
  
      
      
          payment.state = "success";
          await payment.save();
        
      
  
      res.json(result.data);
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occurred");
    }
  };


export default {
    getAllClients,
    getAllMedecins,
    getClientById,
    getMedecinById,
    getAllUsers, 
    updateUser,
    addRemoveFavorite,
    getFavorites,
    searchUser,
    Payment,
    Verify,
    getCurrentUser
};


     