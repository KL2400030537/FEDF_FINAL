import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb'; // ObjectId added

const app = express();
app.use(cors());
app.use(express.json());

const url = "mongodb+srv://saigamer224_db_user:BGmongodb@cluster0fedf.dnpbiva.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0fedf";
const dbName = "mental_health";
const client = new MongoClient(url);

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1);
    }
}

const PORT = 5000;
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
});

// ------------------ Existing Routes ------------------

// Testing Service
app.get("/", (req, res) => {
    res.status(200).json("Hello World from Express JS");
});

// SIGN UP OPERATION
app.post("/signup", async (req, res) => {
    try {
        const user = await db.collection("users").findOne({ email: req.body.email });
        if (user) return res.status(400).json("Email ID already exists");

        // Generate unique userId using ObjectId
        const userId = new ObjectId().toString();

        const newUser = {
            ...req.body,
            userId,                     // <--- Add userId
            email: req.body.email.trim(),
            password: req.body.password.trim()
        };

        await db.collection("users").insertOne(newUser);
       res.status(201).json("Registered Successfully"); // return userId to frontend
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
});

// LOGIN OPERATION
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email.trim();
        const password = req.body.password.trim();

        const user = await db.collection("users").findOne({ email });
        console.log("Login attempt:", { email, password }, "Found:", user);

        if (!user || user.password !== password) {
            return res.status(401).json("Invalid Credentials!");
        }

        const fullName = `${user.firstName} ${user.lastName}`;
        res.status(200).json({ redirect: "/dashboard", name: fullName, userId: user.userId });
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
});

// ------------------ Mood Tracking Routes ------------------

// GET moods for a user
app.get("/api/moods/:userId", async (req, res) => {
    try {
        const moods = await db.collection("moods")
            .find({ userId: req.params.userId })
            .sort({ date: 1 })
            .toArray();
        res.status(200).json(moods);
    } catch (err) {
        console.error("Error fetching moods:", err);
        res.status(500).json("Internal Server Error");
    }
});

// POST a new mood entry
app.post("/api/moods", async (req, res) => {
    try {
        const { userId, mood, note } = req.body;

        if (!userId || !mood) {
            return res.status(400).json("userId and mood are required");
        }

        const newMood = {
            userId,
            mood,
            note: note || "",
            date: new Date()
        };

        await db.collection("moods").insertOne(newMood);
        res.status(201).json(newMood);
    } catch (err) {
        console.error("Error saving mood:", err);
        res.status(500).json("Internal Server Error");
    }
});
