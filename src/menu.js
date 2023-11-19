const mongoose = require('mongoose');
const messmenuSchema = new mongoose.Schema({
  day: String,
  breakfast: String,
  lunch: String,
  snacks: String,
  dinner: String,
});
const Messmenu = mongoose.model('Messmenu', messmenuSchema);
const mongoURI = 'mongodb://localhost:27017/your_database_name';
async function connectToMongo() {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
}
async function createMenuCollection() {
  try {
    await connectToMongo();
    await Messmenu.createCollection();
    const result = await Messmenu.insertMany(menuData);
    console.log('Data inserted successfully:', result);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}
const menuData = [
    { day: 'Monday', breakfast: 'Omelette,Idli-sambhar,Bread-jam,Milk,Tea', lunch: 'Mix-veg,Rice,Roti,Salad', snacks: 'Bread-Cutlet,tea', dinner: 'Palak-allu,Rice,Roti,Ice-cream' },
    { day: 'Tuesday', breakfast: 'Fried-idli,Bread-jam,Milk,Tea', lunch: 'Alu,Raita,Rice,Roti,Salad', snacks: 'Manchurian,Tea', dinner: 'Pulao,chola,Gulaabjamun,Roti' },
    { day: 'Wednesday', breakfast: 'Fruit Salad,Bread-jam,Milk,Tea', lunch: 'Patta-gobhi,Raita,Rice,Roti,Salad', snacks: 'pastry,Coffee', dinner: 'Chana-Allu,Rice,Roti' },
    { day: 'Thursday', breakfast: 'Pav-bhaji,Bread-jam,Milk,Tea', lunch: 'Kadi-pakoda,Rice,Roti,Salad', snacks: 'Allu tikia,tea', dinner: 'Mix-veg,Rice,Roti,Salad' },
    { day: 'Friday', breakfast: 'Chole Bhatore,Bread-jam,Milk,Tea', lunch: 'Chana-dal,Phool gobhi,Raita,Rice,Roti,Salad', snacks: 'Noodle,tea', dinner: 'Allu-paalak,Rice,Roti,Salad' },
    { day: 'Saturday', breakfast: 'Poori sabji,Bread-jam,Milk,Tea', lunch: 'Mix-veg,kali-masur,Rice,Roti,Salad', snacks: 'off', dinner: 'Matar-Paneer,Chana-dal,Roti,Rice' },
    { day: 'Sunday', breakfast: 'Sambhar Vada,Omlet,Bread-Butter ', lunch: 'Rajma,Aku fry,Raita,Rice,Roti,Salad', snacks: 'Pani-puri,tea', dinner: 'MAlai Kofta,Arhar dal,EGG curry,Roti,Rice' },
  ];
createMenuCollection();

