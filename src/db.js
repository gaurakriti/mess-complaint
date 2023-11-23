const connectToDatabase = async () => {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/collection1", {});
    } catch (error) {
        throw error; // Throw the error to indicate a failed connection
    }
};
module.exports = connectToDatabase