const express = require('express');
const path = require('path');
const app = express();

// استخدام المنفذ الذي يحدده Render تلقائياً أو 3000 محلياً
const PORT = process.env.PORT || 3000;

// تحديد مجلد 'public' كمصدر للملفات الثابتة (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// توجيه أي طلب لفتح ملف index.html الموجود داخل مجلد public
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Nexus running on port ${PORT}`);
    console.log(`Project: LAW CITY | IQ TEAM`);
});