export default function RegisterMember() {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-lg">
        <h1 className="text-2xl font-semibold mb-4">Form Pendaftaran Anggota</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nama Lengkap</label>
            <input
              type="text"
              className="w-full border rounded-md p-2 mt-1"
              placeholder="Masukkan nama lengkap"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Alamat Email</label>
            <input
              type="email"
              className="w-full border rounded-md p-2 mt-1"
              placeholder="Masukkan email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Nomor Telepon</label>
            <input
              type="text"
              className="w-full border rounded-md p-2 mt-1"
              placeholder="08xxxxxxxxxx"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800"
          >
            Daftar
          </button>
        </form>
      </div>
    );
  }
  