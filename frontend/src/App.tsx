import { useState } from 'react';
import axios from 'axios';
import { Upload, Loader2, ReceiptText } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const fd = new FormData();
    fd.append('file', file);

    try {
      const { data } = await axios.post('http://localhost:3001/api/scan', fd);
      setResult(data);
    } catch (err) {
      alert("Scan failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900 rounded-3xl p-8 border border-zinc-800 shadow-2xl">
        <ReceiptText className="w-8 h-8 text-blue-400" />
        <h1 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          AI Receipt Scanner v2026
        </h1>

        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-zinc-700 rounded-2xl cursor-pointer hover:bg-zinc-800/50 transition-all">
          {loading ? <Loader2 className="animate-spin text-blue-500 w-10 h-10" /> : <Upload className="text-zinc-500 w-10 h-10" />}
          <p className="mt-4 text-zinc-400 font-medium">{loading ? 'AI กำลังประมวลผล...' : 'คลิกเพื่อเลือกใบเสร็จ'}</p>
          <input type="file" className="hidden" onChange={handleUpload} disabled={loading} />
        </label>

        {result && (
          <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-end border-b border-zinc-800 pb-2">
              <span className="text-zinc-500 text-sm italic">ร้านค้า</span>
              <span className="text-lg font-bold text-emerald-400">{result.store || 'ทั่วไป'}</span>
            </div>
            <div className="space-y-2">
              {result.items?.map((item: any, i: number) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-zinc-400">{item.name}</span>
                  <span className="font-mono">{item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-zinc-800 flex justify-between items-center text-xl font-black">
              <span>Total</span>
              <span className="text-blue-400 underline decoration-double">{result.total}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}