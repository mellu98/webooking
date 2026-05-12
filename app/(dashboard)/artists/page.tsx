"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import EmptyState from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";

export default function ArtistsPage() {
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", genre: "", city: "", fee: "", bio: "", imageUrl: "" });

  const fetchArtists = async () => {
    setLoading(true);
    const res = await fetch("/api/artists");
    const data = await res.json();
    setArtists(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchArtists();
  }, []);

  const createArtist = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/artists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, fee: Number(form.fee) }),
    });
    toast.success("Artista creato");
    setOpen(false);
    setForm({ name: "", genre: "", city: "", fee: "", bio: "", imageUrl: "" });
    fetchArtists();
  };

  const deleteArtist = async (id: string) => {
    if (!confirm("Sei sicuro?")) return;
    await fetch(`/api/artists/${id}`, { method: "DELETE" });
    toast.success("Artista eliminato");
    fetchArtists();
  };

  const columns = [
    { key: "name", header: "Nome" },
    { key: "genre", header: "Genere" },
    { key: "city", header: "Città" },
    {
      key: "fee",
      header: "Cachet",
      render: (a: any) => formatCurrency(a.fee),
    },
    {
      key: "available",
      header: "Stato",
      render: (a: any) => <StatusBadge status={a.available ? "CONFIRMED" : "REJECTED"} />,
    },
    {
      key: "actions",
      header: "",
      render: (a: any) => (
        <div className="flex items-center gap-2">
          <Link href={`/artists/${a.id}`}>
            <Button variant="ghost" size="icon">
              <Pencil className="w-4 h-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => deleteArtist(a.id)}>
            <Trash2 className="w-4 h-4 text-rose-500" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Artisti"
        description="Gestisci gli artisti del tuo roster"
        action={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="inline-flex items-center justify-center rounded-lg border border-transparent bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium h-8 px-2.5 gap-2 transition-colors">
              <Plus className="w-4 h-4" /> Nuovo Artista
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Crea Artista</DialogTitle>
              </DialogHeader>
              <form onSubmit={createArtist} className="space-y-4 mt-4">
                <div>
                  <Label>Nome</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Genere</Label>
                    <Input value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} required />
                  </div>
                  <div>
                    <Label>Città</Label>
                    <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <Label>Cachet (€)</Label>
                  <Input type="number" value={form.fee} onChange={(e) => setForm({ ...form, fee: e.target.value })} required />
                </div>
                <div>
                  <Label>URL Immagine</Label>
                  <Input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." />
                </div>
                <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">Crea</Button>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      {artists.length === 0 && !loading ? (
        <EmptyState icon={Plus} title="Nessun artista" description="Aggiungi il tuo primo artista per iniziare." />
      ) : (
        <DataTable columns={columns} data={artists} keyExtractor={(a) => a.id} loading={loading} />
      )}
    </div>
  );
}
