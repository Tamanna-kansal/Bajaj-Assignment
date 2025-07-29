const express = require('express');
const app = express();

app.use(express.json());

// Constants
const FULL_NAME = "tamannakansal";
const DOB = "02102004";
const EMAIL = "tamannakansal5@gmail.com";
const ROLL_NUMBER = "2210992436";

// Alternating Caps Reverse
function alternating(inputString) {
    let reversed = inputString.split('').reverse();
    let result = '';
    for (let i = 0; i < reversed.length; i++) {
        result += (i % 2 === 0)
            ? reversed[i].toUpperCase()
            : reversed[i].toLowerCase();
    }
    return result;
}

// POST /bfhl Route
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        // Validate input
        if (!data) {
            return res.status(400).json({
                is_success: false,
                message: "'data' field must be a valid array."
            });
        }

        let even_numbers = [];
        let odd_numbers = [];
        let alphabets = [];
        let special_characters = [];
        let sum = 0;
        let alpha_string = '';

        data.forEach(item => {
            if (/^\d+$/.test(item)) { // Pure numeric string
                const num = parseInt(item);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item);
                } else {
                    odd_numbers.push(item);
                }
            } else if (/^[a-zA-Z]+$/.test(item)) {
                // Alphabet strings
                alphabets.push(item.toUpperCase());
                alpha_string += item;
            } else {
                // Special characters
                special_characters.push(item);
            }
        });

        const response = {
            is_success: true,
            user_id: `${FULL_NAME}_${DOB}`,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: sum.toString(),
            concat_string: alternating(alpha_string)
        };

        return res.status(200).json(response);

    } catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).json({
            is_success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
