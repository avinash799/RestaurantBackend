const getUserController = async (req, res) => {
    try {
        const user = await userSchema.findById(req.body.id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        user.password = undefined; // Hiding the password in the response

        res.status(200).send({
            success: true,
            message: "User retrieved successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get User API',
            error
        });
    }
};

const updateUserController = async (req, res) => {
    try {
        const user = await userSchema.findById(req.body.id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        // Updating user details
        const { userName, address, phone } = req.body;
        if (userName) user.userName = userName;
        if (address) user.address = address;
        if (phone) user.phone = phone;

        // Save the updated user
        await user.save();

        res.status(200).send({
            success: true,
            message: "User updated successfully",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in update User API",
            error
        });
    }
};

const updatePasswordController = async (req, res) => {
    try {
        const { id, oldPassword, newPassword } = req.body;

        // Find user by ID
        const user = await userSchema.findById(id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        // Check if the old password matches
        const isMatch = await user.isPasswordCorrect(oldPassword);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Incorrect old password"
            });
        }

        // Set new password
        user.password = newPassword;
        await user.save();

        res.status(200).send({
            success: true,
            message: "Password updated successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in update password API",
            error
        });
    }
};

const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;

        // Validate required fields
        if (!email || !newPassword || !answer) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Find user by email and answer
        const user = await userSchema.findOne({ email, answer });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found or invalid answer'
            });
        }

        // Hash new password and update user
        const salt = bcrypt.genSaltSync(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password reset successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in password reset API',
            error
        });
    }
};

const deleteProfileController = async () => {
    try {
        await userSchema.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "Your account has been deleted"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in delete profile api',
            error
        });
    }
}

export { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController };
