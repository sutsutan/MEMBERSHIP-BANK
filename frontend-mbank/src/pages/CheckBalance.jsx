export default function CheckBalance() {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Cek Saldo Anggota</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">ID Anggota</label>
            <input
              type="text"
              className="w-full border rounded-md p-2 mt-1"
              placeholder="Masukkan ID Anggota"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Cek Saldo
          </button>
        </form>
      </div>
    );
  }
  