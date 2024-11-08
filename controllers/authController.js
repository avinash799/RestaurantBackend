const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone } = req.body;

        // Validation
        if (!userName || !email || !password || !phone || !answer) {
            return res.status(400).send({
                success: false,
                message: "Please provide all fields"
            });
        }

        // Check if user already exists
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "Email already registered, please login"
            });
        }
        //hashing password
        //    var salt = bcrypt.genSaltSync(10);
        //    const hashedPassword=await bcrypt.hash(password,salt);

        // Create new user
        const user = await userSchema.create({
            userName,
            email,
            // password:hashedPassword,
            password,
            phone,
            answer
        });


        res.status(201).send({
            success: true,
            message: "Successfully registered",
            user,
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({
            success: false,
            message: "Error in Register API",
            error
        });
    }
};

// Login controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email and password
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please provide email and password"
            });
        }

        // Check if user exists
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        // Add password check logic here (assuming bcrypt for hashing)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid credentials"
            });
        }
        //token
        // const token=JWT.sign({id:user._id},process.env.JWT_SECRET,expiredIn:"7d")
        //hide the password fields
        // user.password=undefined;
        res.status(200).send({
            success: true,
            message: "Successfully logged in",
            // token,
            user
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({
            success: false,
            message: "Error in Login API",
            error
        });
    }
};

export { registerController, login };
