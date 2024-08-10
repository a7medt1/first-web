const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const secretKey = 'your_secret_key'; // استخدم مفتاح سري قوي

// تسجيل مستخدم جديد
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).send('تم التسجيل بنجاح!');
    } catch (error) {
        res.status(400).send('حدث خطأ أثناء التسجيل.');
    }
});

// تسجيل دخول المستخدم
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('اسم المستخدم أو كلمة المرور غير صحيحة.');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send('اسم المستخدم أو كلمة المرور غير صحيحة.');
        }

        // إنشاء رمز توثيق (اختياري)
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
        res.json({ message: 'تسجيل الدخول ناجح!', token });
    } catch (error) {
        res.status(500).send('حدث خطأ أثناء تسجيل الدخول.');
    }
});
