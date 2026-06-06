import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Hanya terima method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { wish, timestamp, id } = req.body;

    // Validasi input
    if (!wish || !timestamp || !id) {
      return res.status(400).json({ error: 'Missing required fields: wish, timestamp, id' });
    }

    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'wishes.json');

    // Buat folder data jika belum ada
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Baca file yang ada atau buat array kosong
    let wishes = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      wishes = JSON.parse(fileContent);
    }

    // Tambahkan wish baru
    wishes.push({ id, wish, timestamp });

    // Tulis kembali ke file
    fs.writeFileSync(filePath, JSON.stringify(wishes, null, 2), 'utf-8');

    return res.status(200).json({ success: true, message: 'Wish saved successfully' });
  } catch (error) {
    console.error('Error saving wish:', error);
    return res.status(500).json({ error: 'Failed to save wish' });
  }
}
