import React, { useState } from "react";
import {
  Handshake,
  ShieldCheck,
  Search,
  MapPin,
  X,
  Star,
  Truck,
  User,
  Home,
  PlusCircle,
  PackageCheck,
  LogOut,
  Wallet,
  ChevronLeft,
} from "lucide-react";

// Tokens: forest #0D3B2E · gold #C9A227 · cream #F7F1E4 · ink #1C2620 · sage #5E7A6C · rust #B4472A

const BADGES = {
  verified: { label: "Verified", text: "text-[#8A6B10]", bg: "bg-[#FBF1D6]" },
  trustedSeller: { label: "Trusted Seller", text: "text-[#0D3B2E]", bg: "bg-[#E4EFE9]" },
  newSeller: { label: "New Seller", text: "text-[#5E7A6C]", bg: "bg-[#F0EEE6]" },
};

const CATEGORIES = ["All", "Food & Produce", "Fashion & Fabric", "Electronics", "Home & Furniture", "Services"];

const SEED_LISTINGS = [
  {
    id: "l1",
    title: "Fresh Cross River Cassava (Basket)",
    price: 4500,
    category: "Food & Produce",
    gradient: "from-[#3F5A4E] to-[#0D3B2E]",
    desc: "Harvested this morning at Itam market. Sold by the basket.",
    delivery: "Self pickup",
    seller: { name: "Iniobong Essien", initial: "IE", color: "#0D3B2E", badge: "trustedSeller", rating: 4.9, trades: 214, online: true, town: "Itam, Uyo" },
  },
  {
    id: "l2",
    title: "Ankara Fabric Bundle (6 yards)",
    price: 8000,
    category: "Fashion & Fabric",
    gradient: "from-[#C9A227] to-[#8A6B10]",
    desc: "Original wax print, six-yard bundle. Two colourways available.",
    delivery: "Rider delivery",
    seller: { name: "Blessing Udoh", initial: "BU", color: "#8A6B10", badge: "verified", rating: 4.8, trades: 132, online: false, lastActive: "2h ago", town: "Ewet Housing, Uyo" },
  },
  {
    id: "l3",
    title: "Used Samsung A14 (Good Condition)",
    price: 65000,
    category: "Electronics",
    gradient: "from-[#5E7A6C] to-[#3F5A4E]",
    desc: "Six months old, comes with charger.",
    delivery: "Seller delivery",
    seller: { name: "Emmanuel Akpan", initial: "EA", color: "#3F5A4E", badge: "newSeller", rating: 4.6, trades: 4, online: true, town: "Nwaniba, Uyo" },
  },
];

function naira(n) {
  return `₦${Number(n || 0).toLocaleString("en-NG")}`;
}

function Logo({ size = 34 }) {
  return (
    <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: size, height: size, background: "radial-gradient(circle at 35% 30%, #123F30, #0D3B2E 70%)" }}>
      <Handshake size={size * 0.52} color="#E8C468" strokeWidth={2.2} />
    </div>
  );
}

function OnlineDot({ online }) {
  return (
    <span
      className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white"
      style={{ background: online ? "#2FA65B" : "#B9C2BB" }}
    />
  );
}

function Avatar({ seller, size = 28 }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div className="w-full h-full rounded-full flex items-center justify-center text-white font-semibold" style={{ background: seller.color, fontSize: size * 0.36 }}>
        {seller.initial}
      </div>
      <OnlineDot online={seller.online} />
    </div>
  );
}

function BadgePill({ badgeKey, compact }) {
  const b = BADGES[badgeKey];
  return (
    <span className={`inline-flex items-center gap-1 ${b.bg} ${b.text} rounded-full font-medium ${compact ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1"}`}>
      <ShieldCheck size={compact ? 10 : 12} strokeWidth={2.4} />
      {b.label}
    </span>
  );
}

const inputCls = "w-full bg-white border border-[#E7E1D0] rounded-lg px-3 py-2 text-sm text-[#1C2620] outline-none focus:border-[#C9A227] transition-colors";

function Field({ label, children }) {
  return (
    <label className="block mb-4">
      <span className="text-xs font-medium text-[#5E7A6C] uppercase tracking-wide">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

// ---------------------------------------------------------------------------
// Auth screen
// ---------------------------------------------------------------------------
function AuthScreen({ onLogin }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", role: "buyer" });

  return (
    <div className="min-h-screen bg-[#0D3B2E] flex items-center justify-center p-4">
      <div className="bg-[#F7F1E4] rounded-2xl w-full max-w-sm p-7">
        <div className="flex flex-col items-center mb-6">
          <Logo size={48} />
          <h1 className="font-serif text-2xl text-[#1C2620] mt-3">NaijaLocal</h1>
          <p className="text-xs text-[#5E7A6C]">Trade with people you can trust</p>
        </div>

        <Field label="Full name">
          <input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Grace Okon" />
        </Field>
        <Field label="Phone number">
          <input className={inputCls} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="080..." />
        </Field>
        <Field label="Email (for payment receipts)">
          <input className={inputCls} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
        </Field>

        <span className="text-xs font-medium text-[#5E7A6C] uppercase tracking-wide">I want to</span>
        <div className="grid grid-cols-3 gap-2 mt-1 mb-6">
          {[
            { id: "buyer", label: "Buy only" },
            { id: "seller", label: "Sell only" },
            { id: "both", label: "Buy & sell" },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setForm({ ...form, role: r.id })}
              className={`text-xs font-medium rounded-lg py-2 border ${
                form.role === r.id ? "bg-[#0D3B2E] text-white border-[#0D3B2E]" : "bg-white text-[#3F5A4E] border-[#E7E1D0]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <button
          disabled={!form.name || !form.phone}
          onClick={() => onLogin(form)}
          className="w-full bg-[#0D3B2E] disabled:opacity-40 text-[#F7F1E4] rounded-lg py-3 text-sm font-medium hover:bg-[#123F30]"
        >
          Continue
        </button>
        <p className="text-[10px] text-center text-[#9CA8A0] mt-3">Demo login — no password required in this prototype.</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sell / create listing screen
// ---------------------------------------------------------------------------
function SellScreen({ currentUser, onPublish }) {
  const [form, setForm] = useState({ title: "", price: "", category: "Food & Produce", desc: "", delivery: "Self pickup" });

  const canSell = currentUser.role === "seller" || currentUser.role === "both";

  if (!canSell) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <PackageCheck size={32} className="mx-auto mb-3 text-[#9CA8A0]" />
        <p className="font-serif text-lg text-[#1C2620] mb-1">You're set up as a buyer-only account</p>
        <p className="text-sm text-[#5E7A6C]">Switch to "Buy & sell" in your profile to start listing items.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="font-serif text-xl text-[#1C2620] mb-1">List an item or service</h2>
      <p className="text-sm text-[#5E7A6C] mb-6">Posting as {currentUser.name}.</p>

      <Field label="Title">
        <input className={inputCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Fresh Cassava (Basket)" />
      </Field>
      <Field label="Price (₦)">
        <input className={inputCls} type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="4500" />
      </Field>
      <Field label="Category">
        <select className={inputCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          {CATEGORIES.filter((c) => c !== "All").map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </Field>
      <Field label="Description">
        <textarea className={inputCls} rows={3} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="Describe condition, quantity, pickup details..." />
      </Field>
      <Field label="Delivery method">
        <select className={inputCls} value={form.delivery} onChange={(e) => setForm({ ...form, delivery: e.target.value })}>
          <option>Self pickup</option>
          <option>Seller delivery</option>
          <option>Rider delivery</option>
        </select>
      </Field>

      <button
        disabled={!form.title || !form.price}
        onClick={() => {
          onPublish(form);
          setForm({ title: "", price: "", category: "Food & Produce", desc: "", delivery: "Self pickup" });
        }}
        className="w-full bg-[#0D3B2E] disabled:opacity-40 text-[#F7F1E4] rounded-lg py-3 text-sm font-medium hover:bg-[#123F30] mt-2"
      >
        Publish listing
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Profile screen
// ---------------------------------------------------------------------------
function ProfileScreen({ currentUser, myListings, onUpdateRole, onLogout }) {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-[#E7E1D0] p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-serif" style={{ background: "#0D3B2E" }}>
              {currentUser.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <OnlineDot online />
          </div>
          <div>
            <h2 className="font-serif text-xl text-[#1C2620]">{currentUser.name}</h2>
            <p className="text-xs text-[#5E7A6C]">{currentUser.phone}</p>
            <span className="inline-block mt-1 text-[10px] uppercase tracking-wide bg-[#F0EEE6] text-[#5E7A6C] rounded-full px-2 py-0.5">
              {currentUser.role === "both" ? "Buyer & Seller" : currentUser.role}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#EFEADC]">
          <div>
            <div className="flex items-center gap-1 font-semibold text-[#1C2620] text-sm">
              <Star size={13} fill="#C9A227" color="#C9A227" /> —
            </div>
            <div className="text-[10px] text-[#5E7A6C]">Rating</div>
          </div>
          <div>
            <div className="font-semibold text-[#1C2620] text-sm">{myListings.length}</div>
            <div className="text-[10px] text-[#5E7A6C]">Active listings</div>
          </div>
          <div>
            <div className="font-semibold text-[#1C2620] text-sm">0</div>
            <div className="text-[10px] text-[#5E7A6C]">Completed trades</div>
          </div>
        </div>
      </div>

      <p className="text-xs uppercase tracking-wide text-[#5E7A6C] mb-2">Account type</p>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {[
          { id: "buyer", label: "Buy only" },
          { id: "seller", label: "Sell only" },
          { id: "both", label: "Buy & sell" },
        ].map((r) => (
          <button
            key={r.id}
            onClick={() => onUpdateRole(r.id)}
            className={`text-xs font-medium rounded-lg py-2 border ${
              currentUser.role === r.id ? "bg-[#0D3B2E] text-white border-[#0D3B2E]" : "bg-white text-[#3F5A4E] border-[#E7E1D0]"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {myListings.length > 0 && (
        <>
          <p className="text-xs uppercase tracking-wide text-[#5E7A6C] mb-2">Your listings</p>
          <div className="space-y-2 mb-6">
            {myListings.map((l) => (
              <div key={l.id} className="flex items-center justify-between bg-white rounded-lg border border-[#E7E1D0] px-3 py-2">
                <span className="text-sm text-[#1C2620]">{l.title}</span>
                <span className="text-sm font-medium text-[#0D3B2E]">{naira(l.price)}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 text-sm text-[#B4472A] border border-[#F0D9CF] rounded-lg py-2.5 hover:bg-[#FBEAE4]">
        <LogOut size={14} /> Log out
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Listing detail modal — Paystack checkout stub, no WhatsApp
// ---------------------------------------------------------------------------
function ListingModal({ listing, currentUser, onClose }) {
  const [payState, setPayState] = useState("idle"); // idle | processing | success

  if (!listing) return null;
  const s = listing.seller;

  const handlePay = async () => {
    setPayState("processing");
    // In production this calls your backend, e.g.:
    // const res = await fetch("/api/paystack/initialize", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email: currentUser.email, amount: listing.price, metadata: { listingId: listing.id } }),
    // });
    // const data = await res.json();
    // window.location.href = data.data.authorization_url;
    await new Promise((r) => setTimeout(r, 1200));
    setPayState("success");
  };

  return (
    <div className="fixed inset-0 bg-[#0D1F17]/60 flex items-end sm:items-center justify-center z-50 p-0 sm:p-6" onClick={onClose}>
      <div className="bg-[#F7F1E4] w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl overflow-hidden max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className={`h-40 bg-gradient-to-br ${listing.gradient} relative`}>
          <button onClick={onClose} className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 hover:bg-white">
            <X size={16} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-xs uppercase tracking-wide text-[#5E7A6C] mb-1">{listing.category}</p>
          <h2 className="font-serif text-2xl text-[#1C2620] mb-1">{listing.title}</h2>
          <p className="text-[#0D3B2E] font-semibold text-lg mb-4">{naira(listing.price)}</p>
          <p className="text-sm text-[#3F5A4E] leading-relaxed mb-5">{listing.desc}</p>

          <div className="flex items-center gap-3 bg-white rounded-xl border border-[#E7E1D0] p-3 mb-5">
            <Avatar seller={s} size={36} />
            <div className="flex-1">
              <p className="text-sm font-medium text-[#1C2620]">{s.name}</p>
              <p className="text-[11px] text-[#5E7A6C]">{s.online ? "Active now" : `Active ${s.lastActive}`}</p>
              <div className="mt-1">
                <BadgePill badgeKey={s.badge} compact />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs bg-[#E4EFE9] text-[#0D3B2E] rounded-full px-3 py-1.5 w-fit mb-6">
            <Truck size={12} /> {listing.delivery}
          </div>

          {payState !== "success" ? (
            <>
              <button
                onClick={handlePay}
                disabled={payState === "processing"}
                className="w-full flex items-center justify-center gap-2 bg-[#0D3B2E] text-[#F7F1E4] rounded-xl py-3 font-medium hover:bg-[#123F30] transition-colors disabled:opacity-60"
              >
                <Wallet size={16} />
                {payState === "processing" ? "Redirecting to Paystack..." : `Pay ${naira(listing.price)} securely`}
              </button>
              <p className="text-[11px] text-center text-[#5E7A6C] mt-2">
                Payment is processed by Paystack and held until delivery is confirmed.
              </p>
            </>
          ) : (
            <div className="text-center bg-[#E4EFE9] rounded-xl py-4">
              <PackageCheck size={22} className="mx-auto mb-1 text-[#0D3B2E]" />
              <p className="text-sm font-medium text-[#0D3B2E]">Payment held in escrow</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main app
// ---------------------------------------------------------------------------
export default function NaijaLocalApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [tab, setTab] = useState("home");
  const [listings, setListings] = useState(SEED_LISTINGS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [openListing, setOpenListing] = useState(null);

  if (!currentUser) return <AuthScreen onLogin={setCurrentUser} />;

  const myListings = listings.filter((l) => l.seller.name === currentUser.name);

  const filtered = listings.filter((l) => {
    const matchesSearch = l.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || l.category === category;
    return matchesSearch && matchesCategory;
  });

  const publishListing = (form) => {
    const newListing = {
      id: `l${Date.now()}`,
      title: form.title,
      price: Number(form.price),
      category: form.category,
      desc: form.desc || "No description provided.",
      delivery: form.delivery,
      gradient: "from-[#5E7A6C] to-[#0D3B2E]",
      seller: {
        name: currentUser.name,
        initial: currentUser.name.split(" ").map((n) => n[0]).slice(0, 2).join(""),
        color: "#0D3B2E",
        badge: "newSeller",
        rating: 0,
        trades: 0,
        online: true,
        town: "Uyo",
      },
    };
    setListings([newListing, ...listings]);
    setTab("home");
  };

  return (
    <div className="min-h-screen bg-[#F7F1E4] pb-20" style={{ fontFamily: "Manrope, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Fraunces', serif; }
      `}</style>

      <header className="sticky top-0 z-40 bg-[#F7F1E4]/95 backdrop-blur border-b border-[#E7E1D0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <Logo />
            <span className="font-serif text-lg text-[#0D3B2E] hidden sm:block">NaijaLocal</span>
          </div>
          {tab === "home" && (
            <div className="flex-1 flex items-center gap-2 bg-white rounded-full border border-[#E7E1D0] px-3 py-2">
              <Search size={16} className="text-[#5E7A6C]" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search listings..." className="flex-1 bg-transparent outline-none text-sm text-[#1C2620] placeholder:text-[#9CA8A0]" />
            </div>
          )}
          <div className="hidden sm:flex items-center gap-1 text-xs text-[#5E7A6C] shrink-0 ml-auto">
            <MapPin size={14} /> Uyo, Akwa Ibom
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {tab === "home" && (
          <>
            <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => setCategory(c)} className={`shrink-0 text-sm px-3.5 py-1.5 rounded-full border ${category === c ? "bg-[#0D3B2E] text-[#F7F1E4] border-[#0D3B2E]" : "bg-white text-[#3F5A4E] border-[#E7E1D0]"}`}>
                  {c}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((l) => (
                <button key={l.id} onClick={() => setOpenListing(l)} className="text-left bg-white rounded-2xl overflow-hidden border border-[#E7E1D0] hover:border-[#C9A227] transition-all">
                  <div className={`h-32 bg-gradient-to-br ${l.gradient}`} />
                  <div className="p-4">
                    <p className="font-serif text-[15px] text-[#1C2620] mb-1 line-clamp-2">{l.title}</p>
                    <p className="text-[#0D3B2E] font-semibold mb-3">{naira(l.price)}</p>
                    <div className="flex items-center gap-2">
                      <Avatar seller={l.seller} />
                      <span className="text-xs text-[#5E7A6C] truncate">{l.seller.name}</span>
                    </div>
                    <p className="text-[10px] text-[#9CA8A0] mt-1 ml-9">{l.seller.online ? "Active now" : `Active ${l.seller.lastActive}`}</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {tab === "sell" && <SellScreen currentUser={currentUser} onPublish={publishListing} />}

        {tab === "profile" && (
          <ProfileScreen
            currentUser={currentUser}
            myListings={myListings}
            onUpdateRole={(role) => setCurrentUser({ ...currentUser, role })}
            onLogout={() => setCurrentUser(null)}
          />
        )}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E7E1D0] flex justify-around py-2 z-40">
        {[
          { id: "home", icon: Home, label: "Home" },
          { id: "sell", icon: PlusCircle, label: "Sell" },
          { id: "profile", icon: User, label: "Profile" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex flex-col items-center gap-0.5 px-4 py-1 ${tab === t.id ? "text-[#0D3B2E]" : "text-[#9CA8A0]"}`}>
            <t.icon size={20} />
            <span className="text-[10px] font-medium">{t.label}</span>
          </button>
        ))}
      </nav>

      <ListingModal listing={openListing} currentUser={currentUser} onClose={() => setOpenListing(null)} />
    </div>
  );
}
