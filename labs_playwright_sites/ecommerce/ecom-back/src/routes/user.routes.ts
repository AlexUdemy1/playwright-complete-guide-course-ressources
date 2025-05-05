import express from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
} from '../controllers/user.controller';

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/users/:email', getUser);
router.post('/createUser', createUser);
router.put('/users/:email', updateUser);
router.delete('/users/:email', deleteUser);

export default router;
