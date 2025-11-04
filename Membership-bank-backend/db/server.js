require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Koneksi ke Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// =========================
// ROUTES API
// =========================

// Cek server
app.get('/', (req, res) => {
  res.send('✅ API Backend Node.js terhubung ke Supabase!');
});

// Ambil semua user
app.get('/api/anggota', async (req, res) => {
  const { data, error } = await supabase.from('anggota').select('*');
  if (error) return res.status(500).json({ message: 'Gagal ambil data', error });
  res.json(data);
});

// Tambah user baru
app.post('/api/anggota', async (req, res) => {
  const { name, email } = req.body;
  const { data, error } = await supabase.from('anggota').insert([{ name, email }]).select();

  if (error) return res.status(500).json({ message: 'Gagal menambah user', error });
  res.status(201).json(data[0]);
});

// Hapus user
app.delete('/api/anggota/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('anggota').delete().eq('id', id);
  if (error) return res.status(500).json({ message: 'Gagal hapus user', error });
  res.json({ message: 'User berhasil dihapus' });
});

// Jalankan server
app.listen(PORT, () => console.log(`🚀 Server berjalan di http://localhost:${PORT}`));
