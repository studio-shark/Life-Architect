import React from 'react';

interface AvatarShopProps {
  coins: number;
  ownedAvatarIds: string[];
  selectedAvatarId: string;
  onBuy: (id: string, price: number) => void;
  onSelect: (id: string) => void;
}

const AvatarShop: React.FC<AvatarShopProps> = ({ 
  coins, 
  ownedAvatarIds, 
  selectedAvatarId, 
  onBuy, 
  onSelect 
}) => {
  const avatars = Array.from({ length: 100 }, (_, i) => {
    const id = `shell-${i}`;
    const price = (i + 1) * 500;
    const seed = `quantum-shell-${i}`;
    const url = `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${seed}`;
    return { id, price, url, name: `Shell v${i + 1}.0` };
  });

  // Add the default one
  const allAvatars = [
    { id: 'default', price: 0, url: 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=default', name: 'Origin Shell' },
    ...avatars
  ];

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Neural Shell Vault</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Upgrade your synaptic identity across the hardware network</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-900/50 border border-amber-500/20 px-6 py-3 rounded-2xl">
          <span className="text-amber-500 font-black text-xl tracking-tight">{coins}</span>
          <div className="w-6 h-6 bg-gradient-to-tr from-amber-600 to-yellow-300 rounded-full flex items-center justify-center text-[10px] font-black text-amber-900 shadow-[0_0_15px_rgba(245,158,11,0.4)]">₵</div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {allAvatars.map((avatar) => {
          const isOwned = ownedAvatarIds.includes(avatar.id);
          const isSelected = selectedAvatarId === avatar.id;
          const canAfford = coins >= avatar.price;

          return (
            <div 
              key={avatar.id} 
              className={`relative bg-[#1a1a1e] border-2 rounded-[2rem] p-6 flex flex-col items-center transition-all duration-300 group ${isSelected ? 'border-amber-500 shadow-2xl shadow-amber-500/10 scale-105' : isOwned ? 'border-emerald-500/30 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10' : 'border-slate-800 hover:border-slate-700'}`}
            >
              {isSelected && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest z-10">
                  Active
                </div>
              )}

              <div className="relative mb-6">
                <div className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${isSelected ? 'border-amber-400 bg-amber-400/5' : isOwned ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-slate-800 bg-slate-800/20 opacity-40 group-hover:opacity-100'}`}>
                  <img src={avatar.url} alt={avatar.name} className="w-full h-full object-cover" />
                </div>
                {!isOwned && (
                   <div className="absolute -bottom-2 -right-2 bg-slate-900 border border-slate-700 w-8 h-8 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                   </div>
                )}
              </div>

              <h3 className={`text-[10px] font-black uppercase tracking-widest mb-4 transition-colors ${isSelected ? 'text-amber-500' : isOwned ? 'text-emerald-500' : 'text-slate-500'}`}>
                {avatar.name}
              </h3>

              {isOwned ? (
                <button 
                  onClick={() => onSelect(avatar.id)}
                  disabled={isSelected}
                  className={`w-full py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${isSelected ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-900/20'}`}
                >
                  {isSelected ? 'Equipped' : 'Equip Shell'}
                </button>
              ) : (
                <button 
                  onClick={() => onBuy(avatar.id, avatar.price)}
                  disabled={!canAfford}
                  className={`w-full py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${canAfford ? 'bg-slate-100 text-black hover:bg-white hover:scale-105 active:scale-95 shadow-lg shadow-white/10' : 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50'}`}
                >
                  <span>{avatar.price}</span>
                  <div className={`w-3 h-3 rounded-full flex items-center justify-center text-[6px] font-black ${canAfford ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-500'}`}>₵</div>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvatarShop;