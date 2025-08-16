import React, { useMemo, useState, useEffect, useRef } from "react";

// SkinRush — CS Skins marketplace demo (single-file React SPA)
// Theme: Dark / Blue / Yellow minimal
// NOTE: This is a frontend-only prototype. Replace dummy data & wire real APIs (Steam/OpenID, price feeds, payment gateways).

/*************************
 * i18n (Thai / Chinese)
 *************************/
const I18N = {
  th: {
    brand: "SkinRush",
    nav: {
      market: "ตลาด",
      buy: "ซื้อ",
      sell: "ขาย",
      deposit: "เติมเงิน",
      withdraw: "ถอนเงิน",
      support: "ศูนย์ช่วยเหลือ",
    },
    heroTitle: "ตลาดซื้อขายสกิน",
    heroSubtitle: "",
    balance: "ยอดคงเหลือ",
    actions: { login: "เข้าสู่ระบบ", topup: "เติมเงิน", cashout: "ถอนเงิน" },
    filters: {
      title: "ตัวกรอง",
      search: "ค้นหา",
      weapon: "อาวุธ",
      category: "หมวดหมู่",
      sort: "จัดเรียง",
      sortPopular: "ความนิยม",
      sortPriceAsc: "ราคาต่ำ→สูง",
      sortPriceDesc: "ราคาสูง→ต่ำ",
      sortFloatAsc: "ค่า Float ต่ำ→สูง",
      sortFloatDesc: "ค่า Float สูง→ต่ำ",
      all: "ทั้งหมด",
    },
    item: { float: "Float", buyNow: "ซื้อทันที", addCart: "เพิ่มลงรถเข็น" },
    cart: {
      title: "รถเข็น",
      empty: "ยังไม่มีสินค้าในรถเข็น",
      checkout: "ชำระเงิน",
      remove: "นำออก",
      subtotal: "ยอดรวม",
    },
    deposit: {
      title: "เติมเงินเข้าระบบ",
      fullName: "ชื่อ-สกุลผู้เติมเงิน",
      amount: "จำนวนเงิน (บาท)",
      quickPick: "เลือกจำนวนเร็ว",
      channel: "ช่องทางชำระเงิน",
      channels: {
        KBANK: "กสิกร",
        SCB: "ไทยพาณิชย์",
        TRUEMONEY: "ทรูมันนี่",
        VISA: "วีซ่า",
        OMISE: "Omise",
        GB: "GB PrimePay",
        SCB_API: "SCB Easy API",
      },
      method: "วิธีการโอน",
      method_qr: "สแกน QR",
      method_manual: "กรอกเลขบัญชี",
      recipientName: "ชื่อบัญชีผู้รับ (ชื่อร้าน)",
      recipientNo: "เลขที่บัญชีผู้รับ",
      recipientBank: "ธนาคารผู้รับ",
      note: "หมายเหตุ (ถ้ามี)",
      uploadSlip: "แนบรูปสลิป",
      save: "บันทึกคำขอเติมเงิน",
      clear: "ล้างฟอร์ม",
      demoNotice: "* หน้านี้เป็นตัวอย่าง UI เท่านั้น ยังไม่ได้เชื่อมต่อระบบชำระเงินจริง",
    },
    withdraw: {
      title: "ถอนเงินออกจากระบบ",
      fullName: "ชื่อ-สกุลผู้รับเงิน",
      accName: "ชื่อบัญชีผู้รับ",
      accNo: "เลขที่บัญชีผู้รับ",
      bank: "ธนาคารผู้รับ",
      amount: "จำนวนเงิน (บาท)",
      submit: "ส่งคำขอถอนเงิน",
      notes: [
        "ถอนขั้นต่ำ 50 บาท / สูงสุด 50,000 บาท ต่อครั้ง",
        "ชื่อบัญชีควรตรงกับชื่อผู้ใช้งานเพื่อความปลอดภัย",
        "ทีมงานจะโอนภายใน 3 ชม. (ข้อความตัวอย่าง)",
      ],
    },
    sell: {
      title: "ประกาศขายไอเทมของคุณ",
      chooseCat: "เลือกหมวด",
      itemName: "ชื่อไอเทม",
      price: "ตั้งราคา (บาท)",
      float: "ค่า Float (ถ้ามี)",
      stattrak: "เป็น StatTrak™",
      upload: "อัปโหลดรูปสินค้า/สลิป Trade",
      submit: "ลงประกาศขาย",
      demo: "* ตัวอย่างฟอร์มขาย — เชื่อม API Steam/OpenID ภายหลัง",
    },
    buy: {
      title: "เลือกซื้อไอเทม",
    },
    support: {
      title: "ศูนย์ช่วยเหลือ SkinRush",
    },
    langSwitch: "中文",
  },
  zh: {
    brand: "SkinRush",
    nav: {
      market: "市场",
      buy: "购买",
      sell: "出售",
      deposit: "充值",
      withdraw: "提现",
      support: "帮助中心",
    },
    heroTitle: "皮肤交易市场",
    heroSubtitle: "",
    balance: "余额",
    actions: { login: "登录", topup: "充值", cashout: "提现" },
    filters: {
      title: "筛选",
      search: "搜索",
      weapon: "武器",
      category: "分类",
      sort: "排序",
      sortPopular: "人气",
      sortPriceAsc: "价格 低→高",
      sortPriceDesc: "价格 高→低",
      sortFloatAsc: "Float 低→高",
      sortFloatDesc: "Float 高→低",
      all: "全部",
    },
    item: { float: "Float", buyNow: "立即购买", addCart: "加入购物车" },
    cart: {
      title: "购物车",
      empty: "购物车里还没有商品",
      checkout: "去结算",
      remove: "移除",
      subtotal: "小计",
    },
    deposit: {
      title: "充值到账户",
      fullName: "充值人姓名",
      amount: "金额（元）",
      quickPick: "快捷选择",
      channel: "支付渠道",
      channels: {
        KBANK: "开泰银行",
        SCB: "暹罗商业银行",
        TRUEMONEY: "TrueMoney",
        VISA: "Visa",
        OMISE: "Omise",
        GB: "GB PrimePay",
        SCB_API: "SCB Easy API",
      },
      method: "支付方式",
      method_qr: "扫码支付",
      method_manual: "手动转账",
      recipientName: "收款账户名（店铺名）",
      recipientNo: "收款账号",
      recipientBank: "收款银行",
      note: "备注（可选）",
      uploadSlip: "上传转账凭证",
      save: "提交充值申请",
      clear: "清空",
      demoNotice: "* 演示界面，未接通真实支付系统",
    },
    withdraw: {
      title: "账户提现",
      fullName: "收款人姓名",
      accName: "收款账户名",
      accNo: "收款账号",
      bank: "收款银行",
      amount: "金额（元）",
      submit: "提交提现申请",
      notes: [
        "单次最低 50 THB（演示）",
        "账户名应与用户姓名一致以保障安全",
        "审核通过后 3 小时内打款（示例文案）",
      ],
    },
    sell: {
      title: "发布出售信息",
      chooseCat: "选择分类",
      itemName: "物品名称",
      price: "定价（元）",
      float: "Float（可选）",
      stattrak: "StatTrak™",
      upload: "上传商品图片/交易凭证",
      submit: "发布",
      demo: "* 出售表单示例 — 之后接入 Steam/OpenID",
    },
    buy: {
      title: "挑选购买",
    },
    support: { title: "SkinRush 帮助中心" },
    langSwitch: "ไทย",
  },
};

/*************************
 * Currency helpers
 *************************/
const CNY_PER_THB = 0.2; // Placeholder rate for demo only — replace with live FX API.
const fmt = (n, lang) => {
  if (lang === "zh") return new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 0 }).format(n * CNY_PER_THB);
  return new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", maximumFractionDigits: 0 }).format(n);
};

/*************************
 * Data (demo)
 *************************/
const CATEGORIES = [
  { key: "all", th: "ทั้งหมด", zh: "全部" },
  { key: "gun", th: "ปืน", zh: "枪械" },
  { key: "knife", th: "มีด", zh: "匕首" },
  { key: "case", th: "กล่องสุ่ม", zh: "箱子" },
  { key: "sticker", th: "สติ๊กเกอร์", zh: "贴纸" },
  { key: "agent", th: "ตัวละคร", zh: "特工" },
  { key: "charm", th: "พวงกุญแจ", zh: "挂件" },
  { key: "misc", th: "ไอเทมเสริม", zh: "其他" },
];

// NOTE: Using generic, license-free images for demo. Replace with real item images/price feeds later.
const DEMO_ITEMS = [
  // --- Guns (focus) ---
  { id: 101, name: "AWP | Dragon Lore", imageName: "AWP | Dragon Lore", exterior: "Factory New", weapon: "AWP", skin: "Dragon Lore", rarity: "Covert", price: 350000, float: 0.12, stattrak: false, img: "", cat: "gun" },
  { id: 102, name: "AK-47 | Case Hardened", imageName: "AK-47 | Case Hardened", exterior: "Field-Tested", weapon: "AK-47", skin: "Case Hardened", rarity: "Classified", price: 28000, float: 0.18, stattrak: true, img: "", cat: "gun", hide: true },
  { id: 103, name: "M4A1-S | Printstream", imageName: "M4A1-S | Printstream", exterior: "Factory New", weapon: "M4A1-S", skin: "Printstream", rarity: "Covert", price: 19000, float: 0.04, stattrak: false, img: "", cat: "gun" },
  { id: 104, name: "AK-47 | Redline", imageName: "AK-47 | Redline", exterior: "Field-Tested", weapon: "AK-47", skin: "Redline", rarity: "Classified", price: 4500, float: 0.20, stattrak: false, img: "", cat: "gun" },
  { id: 105, name: "AWP | Asiimov", imageName: "AWP | Asiimov", exterior: "Field-Tested", weapon: "AWP", skin: "Asiimov", rarity: "Covert", price: 12000, float: 0.24, stattrak: false, img: "", cat: "gun", hide: true },
  { id: 106, name: "M4A4 | Howl", imageName: "M4A4 | Howl", exterior: "Minimal Wear", weapon: "M4A4", skin: "Howl", rarity: "Contraband", price: 450000, float: 0.09, stattrak: false, img: "", cat: "gun" },
  { id: 107, name: "Desert Eagle | Blaze", imageName: "Desert Eagle | Blaze", exterior: "Minimal Wear", weapon: "Desert Eagle", skin: "Blaze", rarity: "Classified", price: 65000, float: 0.08, stattrak: false, img: "", cat: "gun", hide: true },
  { id: 108, name: "USP-S | Kill Confirmed", imageName: "USP-S | Kill Confirmed", exterior: "Field-Tested", weapon: "USP-S", skin: "Kill Confirmed", rarity: "Covert", price: 9500, float: 0.18, stattrak: false, img: "", cat: "gun" },
  { id: 109, name: "Glock-18 | Fade", imageName: "Glock-18 | Fade", exterior: "Factory New", weapon: "Glock-18", skin: "Fade", rarity: "Restricted", price: 22000, float: 0.02, stattrak: false, img: "", cat: "gun", hide: true },
  { id: 110, name: "AK-47 | Vulcan", imageName: "AK-47 | Vulcan", exterior: "Field-Tested", weapon: "AK-47", skin: "Vulcan", rarity: "Covert", price: 32000, float: 0.27, stattrak: false, img: "", cat: "gun", hide: true },
  { id: 111, name: "AWP | Atheris", imageName: "AWP | Atheris", exterior: "Field-Tested", weapon: "AWP", skin: "Atheris", rarity: "Restricted", price: 800, float: 0.22, stattrak: false, img: "", cat: "gun" },
  { id: 112, name: "AK-47 | Fire Serpent", imageName: "AK-47 | Fire Serpent", exterior: "Minimal Wear", weapon: "AK-47", skin: "Fire Serpent", rarity: "Covert", price: 120000, float: 0.11, stattrak: false, img: "", cat: "gun", hide: true },
  { id: 113, name: "P90 | Emerald Dragon", imageName: "P90 | Emerald Dragon", exterior: "Minimal Wear", weapon: "P90", skin: "Emerald Dragon", rarity: "Covert", price: 15000, float: 0.10, stattrak: false, img: "", cat: "gun" },
  { id: 114, name: "FAMAS | Commemoration", imageName: "FAMAS | Commemoration", exterior: "Factory New", weapon: "FAMAS", skin: "Commemoration", rarity: "Classified", price: 3500, float: 0.03, stattrak: false, img: "", cat: "gun" },
  { id: 115, name: "MP9 | Starlight Protector", imageName: "MP9 | Starlight Protector", exterior: "Factory New", weapon: "MP9", skin: "Starlight Protector", rarity: "Covert", price: 4200, float: 0.02, stattrak: false, img: "", cat: "gun" },

  // --- Knives ---
  { id: 201, name: "★ Karambit | Doppler (Phase 2)", imageName: "★ Karambit | Doppler (Phase 2)", exterior: "Factory New", weapon: "Karambit", skin: "Doppler P2", rarity: "Covert", price: 450000, float: 0.02, stattrak: false, img: "", cat: "knife", hide: true },
  { id: 202, name: "★ M9 Bayonet | Fade", imageName: "★ M9 Bayonet | Fade", exterior: "Factory New", weapon: "M9 Bayonet", skin: "Fade", rarity: "Covert", price: 180000, float: 0.03, stattrak: false, img: "", cat: "knife" },

  // --- Cases (a few) ---
  { id: 301, name: "Kilowatt Case", imageName: "Kilowatt Case", exterior: "N/A", weapon: "Case", skin: "Kilowatt", rarity: "Base", price: 80, float: 0, stattrak: false, img: "", cat: "case" },
  { id: 302, name: "Recoil Case", imageName: "Recoil Case", exterior: "N/A", weapon: "Case", skin: "Recoil", rarity: "Base", price: 45, float: 0, stattrak: false, img: "", cat: "case" },

  // --- Sticker (rare) ---
  { id: 402, name: "Sticker | iBUYPOWER (Holo) | Katowice 2014", imageName: "Sticker | iBUYPOWER (Holo) | Katowice 2014", exterior: "N/A", weapon: "Sticker", skin: "iBP Holo 2014", rarity: "Contraband", price: 12000000, float: 0, stattrak: false, img: "", cat: "sticker", hide: true },
];

// Normalize items: ensure imageName/exterior exist
const IMAGE_NAME_FIX = {
  201: "★ Karambit | Doppler (Phase 2)",
  202: "★ M9 Bayonet | Fade",
  402: "Sticker | iBUYPOWER (Holo) | Katowice 2014",
};
const IMAGE_ALT_NAMES = {
  201: ["Karambit | Doppler (Phase 2)", "★ Karambit | Doppler (P2)", "Karambit | Doppler (P2)"],
  202: ["M9 Bayonet | Fade", "★ M9 Bayonet | Fade (Minimal Wear)", "★ M9 Bayonet | Fade (Well-Worn)", "M9 Bayonet | Fade (Factory New)"],
  402: ["Sticker | iBUYPOWER (Holo) | Katowice 2014"],
};

const ITEMS = DEMO_ITEMS.map((it) => ({
  ...it,
  imageName: IMAGE_NAME_FIX[it.id] || it.imageName || it.name,
  altNames: IMAGE_ALT_NAMES[it.id] || it.altNames,
  exterior: it.exterior || (it.cat === 'gun' || it.cat === 'knife' ? 'Factory New' : 'N/A'),
}));

const BANKS = [
  { code: "KTB", name: "Krungthai (KTB)" },
  { code: "SCB", name: "Siam Commercial (SCB)" },
  { code: "KBANK", name: "Kasikorn (KBank)" },
  { code: "BBL", name: "Bangkok Bank (BBL)" },
  { code: "KMA", name: "Krungsri (BAY)" },
  { code: "TTB", name: "TTB (TMBThanachart)" },
  { code: "UOB", name: "UOB" },
];

const PAY_CHANNELS = [
  { code: "KBANK", label: I18N.th.deposit.channels.KBANK },
  { code: "SCB", label: I18N.th.deposit.channels.SCB },
  { code: "TRUEMONEY", label: I18N.th.deposit.channels.TRUEMONEY },
  { code: "VISA", label: I18N.th.deposit.channels.VISA },
  { code: "OMISE", label: I18N.th.deposit.channels.OMISE },
  { code: "GB", label: I18N.th.deposit.channels.GB },
  { code: "SCB_API", label: I18N.th.deposit.channels.SCB_API },
];

/*************************
 * UI atoms
 *************************/
function Badge({ children, tone = "blue" }) {
  const tones = {
    blue: "bg-blue-500/10 text-blue-300 ring-1 ring-blue-500/30",
    yellow: "bg-yellow-500/10 text-yellow-300 ring-1 ring-yellow-500/30",
    slate: "bg-slate-500/10 text-slate-300 ring-1 ring-slate-500/30",
    emerald: "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30",
  };
  return (
    <span className={`inline-flex items-center rounded-xl px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>
  );
}

function Button({ children, className = "", variant = "primary", ...props }) {
  const variants = {
    primary:
      "bg-gradient-to-tr from-blue-600 to-blue-400 text-slate-950 hover:from-blue-500 hover:to-blue-300 active:scale-[.98]",
    outline:
      "bg-transparent text-blue-300 ring-1 ring-blue-400/40 hover:ring-blue-300/70 hover:text-blue-200",
    ghost:
      "bg-transparent text-slate-200 hover:bg-white/5",
    danger: "bg-gradient-to-tr from-rose-600 to-rose-500 text-white hover:from-rose-500 hover:to-rose-400",
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl bg-[#121826]/80 border border-[#1E2A44] shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset,0_10px_30px_-15px_rgba(0,0,0,0.8)] ${className}`}>
      {children}
    </div>
  );
}

function TextInput({ label, id, placeholder, value, onChange, type = "text", required=false, lang="th" }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[13px] text-slate-300/90">{label}{required && <span className="text-rose-400"> *</span>}</span>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl bg-[#0D1320] border border-[#22305A] px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
      />
    </label>
  );
}

function Select({ label, id, value, onChange, options, required=false }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[13px] text-slate-300/90">{label}{required && <span className="text-rose-400"> *</span>}</span>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl bg-[#0D1320] border border-[#22305A] px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
      >
        <option value="">—</option>
        {options.map((o) => (
          <option key={o.code} value={o.code}>{o.name ?? o.label}</option>
        ))}
      </select>
    </label>
  );
}

/*************************
 * QR (fake demo)
 *************************/
function FakeQR({ seed = "0", size = 224 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cells = 21;
    const cellSize = Math.floor(size / cells);
    canvas.width = cells * cellSize;
    canvas.height = cells * cellSize;
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    let hash = 0; for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    for (let y = 0; y < cells; y++) {
      for (let x = 0; x < cells; x++) {
        const v = (hash ^ ((x + 13) * (y + 7) * 2654435761)) >>> 0;
        if ((v & 0x3) === 0) { ctx.fillStyle = "#0B0F1A"; ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize); }
      }
    }
    const drawFinder = (x, y) => {
      ctx.fillStyle = "#0B0F1A"; ctx.fillRect(x, y, cellSize*7, cellSize*7);
      ctx.fillStyle = "#fff"; ctx.fillRect(x+cellSize, y+cellSize, cellSize*5, cellSize*5);
      ctx.fillStyle = "#0B0F1A"; ctx.fillRect(x+cellSize*2, y+cellSize*2, cellSize*3, cellSize*3);
    };
    drawFinder(cellSize, cellSize);
    drawFinder(canvas.width - cellSize*8, cellSize);
    drawFinder(cellSize, canvas.height - cellSize*8);
  }, [seed, size]);
  return (
    <canvas ref={canvasRef} className="rounded-xl border border-slate-800" style={{ width: size, height: size }} aria-label="QR ตัวอย่าง (เดโม่)" />
  );
}

/*************************
 * Item card + Market
 *************************/
/* Image helpers — SVG fallback thumbnails (no external network required) */
function thumbSvgData(item) {
  const { weapon = "Item", skin = "Skin", rarity = "", cat = "misc" } = item || {};
  const palettes = {
    gun: ["#0b1320", "#2563eb"],
    knife: ["#1e1b4b", "#a855f7"],
    case: ["#1f2937", "#f59e0b"],
    sticker: ["#1f2937", "#ef4444"],
    agent: ["#064e3b", "#22c55e"],
    charm: ["#0f172a", "#eab308"],
    misc: ["#0f172a", "#475569"],
  };
  const [c1, c2] = palettes[cat] || palettes.misc;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='900'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='${c1}'/>
      <stop offset='1' stop-color='${c2}'/>
    </linearGradient>
  </defs>
  <rect width='100%' height='100%' fill='url(#g)'/>
  <g fill='rgba(255,255,255,0.10)'>
    ${Array.from({length:48}).map((_,i)=>`<circle cx='${(i*97)%1200}' cy='${(i*173)%900}' r='${8+(i%18)}'/>`).join('')}
  </g>
  <text x='48' y='760' font-size='48' fill='#cbd5e1' font-family='Inter,system-ui,Segoe UI,Arial' opacity='0.95'>${weapon}</text>
  <text x='48' y='822' font-size='72' fill='#ffffff' font-family='Inter,system-ui,Segoe UI,Arial' font-weight='700'>${skin}</text>
  <text x='48' y='874' font-size='34' fill='#fde68a' font-family='Inter,system-ui,Segoe UI,Arial'>${rarity}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// === Steam image helpers (CS:GO/CS2 renders via Steam APIs CDN) ===
function imageUrlsForItem(item) {
  const raw = (item?.imageName || item?.name || "").trim();
  const starless = raw.startsWith('★') ? raw.slice(1).trimStart() : raw;
  const withExterior = item?.exterior && item.exterior !== 'N/A';
  let names = [];
  if (withExterior) names.push(`${raw} (${item.exterior})`);
  if (raw) names.push(raw);
  if (withExterior) names.push(`${starless} (${item.exterior})`);
  if (starless) names.push(starless);
  if (Array.isArray(item?.altNames)) names.push(...item.altNames);
  names = Array.from(new Set(names.filter(Boolean)));
  const bases = [
    (s) => `https://api.steamapis.com/image/item/730/${encodeURIComponent(s)}`,
    (s) => `https://cdn.steamapis.com/image/item/730/${encodeURIComponent(s)}`,
  ];
  const urls = [];
  for (const n of names) for (const b of bases) urls.push(b(n));
  return urls;
}
function nextImageOnError(e, item, fallback) {
  const img = e.currentTarget;
  const current = Number(img.dataset.attempt || 0);
  const cands = imageUrlsForItem(item);
  if (current + 1 < cands.length) {
    img.dataset.attempt = String(current + 1);
    img.src = cands[current + 1];
  } else if (fallback) {
    img.src = fallback;
  }
}

function MarketItemCard({ item, onBuy, onAddToCart, lang }) {
  const t = I18N[lang];
  const fallback = useMemo(() => thumbSvgData(item), [item]);
  const urls = useMemo(() => imageUrlsForItem(item), [item]);
  return (
    <Card className="overflow-hidden group">
      <div className="aspect-[4/3] relative">
        <img
          src={urls[0] || item.img || fallback}
          data-attempt={0}
          alt={item.name}
          className="absolute inset-0 h-full w-full object-contain transition group-hover:scale-105 bg-[#0B0F1A]"
          loading="lazy"
          onError={(e)=> nextImageOnError(e, item, fallback)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          {item.stattrak && <Badge tone="yellow">StatTrak™</Badge>}
          <Badge tone="emerald">{item.rarity}</Badge>
        </div>
      </div>
      <div className="p-4 grid gap-3">
        <div className="grid gap-0.5">
          <div className="text-sm text-slate-300/80">{item.weapon}</div>
          <div className="font-semibold text-slate-100">{item.skin}</div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">{t.item.float}: <span className="text-slate-200 font-medium">{item.float.toFixed(2)}</span></span>
          <span className="text-yellow-300 font-semibold">{fmt(item.price, lang)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => onBuy(item)} className="flex-1">{t.item.buyNow}</Button>
          <Button variant="outline" className="w-10 aspect-square" aria-label="add-to-cart" onClick={()=>onAddToCart(item)}>🛒</Button>
        </div>
      </div>
    </Card>
  );
}

/* Market (list + filters) */
function MarketPage({ items, onBuy, onAddToCart, lang }) {
  const t = I18N[lang];
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("popular");
  const [weapon, setWeapon] = useState("all");
  const [cat, setCat] = useState("all");

  const filtered = useMemo(() => {
    let list = items.filter((it) => !it.hide && (
      it.name.toLowerCase().includes(q.toLowerCase()) ||
      it.weapon.toLowerCase().includes(q.toLowerCase()) ||
      it.skin.toLowerCase().includes(q.toLowerCase())
    ));
    if (weapon !== "all") list = list.filter((it) => it.weapon.toLowerCase() === weapon.toLowerCase());
    if (cat !== "all") list = list.filter((it) => it.cat === cat);
    if (sort === "priceAsc") list = [...list].sort((a,b) => a.price - b.price);
    if (sort === "priceDesc") list = [...list].sort((a,b) => b.price - a.price);
    if (sort === "floatAsc") list = [...list].sort((a,b) => a.float - b.float);
    if (sort === "floatDesc") list = [...list].sort((a,b) => b.float - a.float);
    return list;
  }, [items, q, sort, weapon, cat]);

  const weapons = useMemo(() => ["all", ...new Set(items.map(i => i.weapon))], [items]);

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-6">
      <Card className="p-4 h-fit sticky top-20">
        <div className="text-sm font-semibold text-slate-200 mb-3">{t.filters.title}</div>
        <div className="grid gap-3">
          <label className="grid gap-1.5">
            <span className="text-[13px] text-slate-300/90">{t.filters.search}</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ค้นหาชื่อไอเทม / ปืน / สกิน"
              className="w-full rounded-xl bg-[#0D1320] border border-[#22305A] px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            />
          </label>
          <Select
            label={t.filters.category}
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            options={CATEGORIES.map(c => ({ code: c.key, name: lang === "zh" ? c.zh : c.th }))}
          />
          <Select
            label={t.filters.weapon}
            value={weapon}
            onChange={(e) => setWeapon(e.target.value)}
            options={weapons.map(w => ({ code: w, name: w.toUpperCase() }))}
          />
          <Select
            label={t.filters.sort}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            options={[
              { code: "popular", name: t.filters.sortPopular },
              { code: "priceAsc", name: t.filters.sortPriceAsc },
              { code: "priceDesc", name: t.filters.sortPriceDesc },
              { code: "floatAsc", name: t.filters.sortFloatAsc },
              { code: "floatDesc", name: t.filters.sortFloatDesc },
            ]}
          />
        </div>
      </Card>

      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-100">{t.buy.title}</h2>
          <div className="text-sm text-slate-400">{filtered.length} items</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <MarketItemCard key={item.id} item={item} onBuy={onBuy} onAddToCart={onAddToCart} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* Buy page wrapper */
function BuyPage(props) { return <MarketPage {...props} />; }

/* Sell page */
function SellPage({ lang }) {
  const t = I18N[lang];
  const [cat, setCat] = useState("gun");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [flt, setFlt] = useState("");
  const [st, setSt] = useState(false);
  return (
    <Card className="p-5 grid gap-4">
      <h2 className="text-lg font-semibold text-slate-100">{t.sell.title}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <Select label={t.sell.chooseCat} value={cat} onChange={(e)=>setCat(e.target.value)} options={CATEGORIES.filter(c=>c.key!=="all").map(c=>({code:c.key, name: lang==="zh"?c.zh:c.th}))} />
        <TextInput label={t.sell.itemName} value={name} onChange={(e)=>setName(e.target.value)} placeholder="เช่น AWP | Asiimov" />
        <TextInput label={t.sell.price} type="number" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="0" />
        <TextInput label={t.sell.float} type="number" value={flt} onChange={(e)=>setFlt(e.target.value)} placeholder="0.00" />
        <label className="flex items-center gap-2 text-sm text-slate-200">
          <input type="checkbox" checked={st} onChange={(e)=>setSt(e.target.checked)} />
          {t.sell.stattrak}
        </label>
        <label className="grid gap-1.5">
          <span className="text-[13px] text-slate-300/90">{t.sell.upload}</span>
          <input type="file" accept="image/*" className="block w-full text-sm text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:px-3 file:py-2 file:bg-blue-500/10 file:text-blue-300 hover:file:bg-blue-500/20" />
        </label>
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={()=>alert("ส่งประกาศขาย (เดโม่)")}>{t.sell.submit}</Button>
        <span className="text-xs text-slate-400">{t.sell.demo}</span>
      </div>
    </Card>
  );
}

/* Deposit page */
function DepositPage({ lang }) {
  const t = I18N[lang];
  const [fullName, setFullName] = useState("");
  const [amount, setAmount] = useState("");
  const [channel, setChannel] = useState("KBANK");
  const [method, setMethod] = useState("qr"); // qr | manual
  const [accName, setAccName] = useState("");
  const [accNo, setAccNo] = useState("");
  const [bank, setBank] = useState("");
  const [note, setNote] = useState("");
  const [slip, setSlip] = useState(null);
  const disabled = !fullName || !amount || Number(amount) < 50;
  const seed = `${fullName}|${channel}|${amount}`;
  const quick = [50, 300, 600, 1000];
  const save = () => {
    if (Number(amount) < 50) { alert("ขั้นต่ำ 50 บาท"); return; }
    alert("บันทึกคำขอเติมเงิน (เดโม่) — ต่อ API ภายหลัง");
  };
  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6">
      <Card className="p-5 grid gap-4">
        <h2 className="text-lg font-semibold text-slate-100">{t.deposit.title}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <TextInput label={t.deposit.fullName} required value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="เช่น อภิสิทธิ์ แสงทอง" />
          <div className="grid gap-1.5">
            <span className="text-[13px] text-slate-300/90">{t.deposit.amount}<span className="text-rose-400"> *</span></span>
            <div className="flex gap-2">
              <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="0" className="w-full rounded-xl bg-[#0D1320] border border-[#22305A] px-3 py-2.5 text-sm text-slate-100" />
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {quick.map(v => (
                <Button key={v} variant="outline" onClick={()=>setAmount(String(v))}>{v}</Button>
              ))}
            </div>
          </div>
          <Select label={t.deposit.channel} value={channel} onChange={(e)=>setChannel(e.target.value)} options={PAY_CHANNELS.map(p=>({code:p.code, name:p.label}))} />
          <label className="grid gap-1.5">
            <span className="text-[13px] text-slate-300/90">{t.deposit.method}</span>
            <div className="flex items-center gap-3 text-sm text-slate-200">
              <label className="inline-flex items-center gap-2"><input type="radio" checked={method==="qr"} onChange={()=>setMethod("qr")} />{t.deposit.method_qr}</label>
              <label className="inline-flex items-center gap-2"><input type="radio" checked={method==="manual"} onChange={()=>setMethod("manual")} />{t.deposit.method_manual}</label>
            </div>
          </label>
          {method === "manual" && (
            <>
              <TextInput label={t.deposit.recipientName} required value={accName} onChange={(e)=>setAccName(e.target.value)} placeholder="SkinRush Co., Ltd." />
              <TextInput label={t.deposit.recipientNo} required value={accNo} onChange={(e)=>setAccNo(e.target.value)} placeholder="xxxxxxxxxx" />
              <Select label={t.deposit.recipientBank} required value={bank} onChange={(e)=>setBank(e.target.value)} options={BANKS} />
              <label className="grid gap-1.5">
                <span className="text-[13px] text-slate-300/90">{t.deposit.uploadSlip}</span>
                <input type="file" accept="image/*" onChange={(e)=>setSlip(e.target.files?.[0]||null)} className="block w-full text-sm text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:px-3 file:py-2 file:bg-blue-500/10 file:text-blue-300 hover:file:bg-blue-500/20" />
              </label>
            </>
          )}
          <TextInput label={t.deposit.note} value={note} onChange={(e)=>setNote(e.target.value)} placeholder="รหัสอ้างอิง/โน้ต" />
        </div>
        <div className="flex items-center gap-3 pt-2">
          <Button disabled={disabled} onClick={save}>{t.deposit.save}</Button>
          <Button variant="outline" onClick={()=>{ setFullName(""); setAmount(""); setChannel("KBANK"); setMethod("qr"); setAccName(""); setAccNo(""); setBank(""); setNote(""); setSlip(null); }}>{t.deposit.clear}</Button>
        </div>
        <p className="text-xs text-slate-400">{t.deposit.demoNotice}</p>
      </Card>
      <Card className="p-5 grid gap-4 h-fit">
        <div className="grid gap-1">
          <h3 className="text-base font-semibold text-slate-100">{t.deposit.method_qr} (Demo)</h3>
          <p className="text-xs text-slate-400">QR เดโม่ ใช้ทดสอบหน้าตา UI เท่านั้น</p>
        </div>
        <div className="flex items-center justify-center">
          <FakeQR seed={seed || "demo"} />
        </div>
        <div className="grid gap-2 text-sm text-slate-300">
          <div>Channel: <span className="font-medium">{channel}</span></div>
          <div>Amount: <span className="text-yellow-300 font-semibold">{fmt(Number(amount||0), lang)}</span></div>
          <Button variant="outline" onClick={()=>navigator.clipboard.writeText(`CHANNEL:${channel} AMOUNT:${amount}`)}>คัดลอกข้อมูล</Button>
        </div>
      </Card>
    </div>
  );
}

/* Withdraw page */
function WithdrawPage({ lang }) {
  const t = I18N[lang];
  const [fullName, setFullName] = useState("");
  const [accName, setAccName] = useState("");
  const [accNo, setAccNo] = useState("");
  const [bank, setBank] = useState("");
  const [amount, setAmount] = useState("");
  const disabled = !fullName || !accName || !accNo || !bank || !amount || Number(amount) < 50;
  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6">
      <Card className="p-5 grid gap-4">
        <h2 className="text-lg font-semibold text-slate-100">{t.withdraw.title}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <TextInput label={t.withdraw.fullName} required value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="เช่น อภิสิทธิ์ แสงทอง" />
          <TextInput label={t.withdraw.accName} required value={accName} onChange={(e)=>setAccName(e.target.value)} placeholder="APISIT SANGTONG" />
          <TextInput label={t.withdraw.accNo} required value={accNo} onChange={(e)=>setAccNo(e.target.value)} placeholder="xxxxxxxxxx" />
          <Select label={t.withdraw.bank} required value={bank} onChange={(e)=>setBank(e.target.value)} options={BANKS} />
          <TextInput label={t.withdraw.amount} required type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="เช่น 1000" />
        </div>
        <div className="flex items-center gap-3 pt-2">
          <Button disabled={disabled} onClick={()=>alert("ส่งคำขอถอนเงิน (เดโม่)")}>{t.withdraw.submit}</Button>
          <Button variant="outline" onClick={()=>{ setFullName(""); setAccName(""); setAccNo(""); setBank(""); setAmount(""); }}>ล้างฟอร์ม</Button>
        </div>
        <ul className="list-disc pl-5 text-sm text-slate-300/90 space-y-1 mt-2">
          {t.withdraw.notes.map((n, i)=>(<li key={i}>{n}</li>))}
        </ul>
      </Card>
      <Card className="p-5 grid gap-3 h-fit">
        <h3 className="text-base font-semibold text-slate-100">ข้อมูลสำคัญ</h3>
        <ul className="list-disc pl-5 text-sm text-slate-300/90 space-y-1">
          <li>ขั้นต่ำ 50 บาท</li>
          <li>โอนภายใน 3 ชม. (ตัวอย่างข้อความ)</li>
        </ul>
      </Card>
    </div>
  );
}

/* Support */
function SupportPage({ lang }) {
  const t = I18N[lang];
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-slate-100 mb-2">{t.support.title}</h2>
      <div className="prose prose-invert max-w-none text-slate-300">
        <h3>เริ่มต้นใช้งาน / Getting Started</h3>
        <ol>
          <li>สมัครและยืนยันอีเมล จากนั้นเข้าสู่ระบบ</li>
          <li>เติมเงินขั้นต่ำ 50 บาท ผ่านช่องทางที่รองรับ</li>
          <li>เลือกซื้อไอเทมในหน้า “ซื้อ” หรือประกาศขายในหน้า “ขาย”</li>
        </ol>
        <h3>กฎการซื้อขาย / Trading Rules</h3>
        <ul>
          <li>ห้ามขายไอเทมที่มีที่มาผิดกฎหมายหรือฉ้อโกง</li>
          <li>ผู้ขายต้องส่งมอบไอเทมภายในเวลาที่กำหนดหลังได้รับชำระเงิน</li>
          <li>มีระบบระงับข้อพิพาทโดยทีมงาน</li>
        </ul>
        <h3>ชำระเงิน & ความปลอดภัย / Payment & Safety</h3>
        <ul>
          <li>รองรับ กสิกร, ไทยพาณิชย์, TrueMoney, Visa, Omise, GB PrimePay, SCB Easy API (ตัวอย่าง)</li>
          <li>เข้ารหัสการเชื่อมต่อ (HTTPS) และตรวจสอบ KYC ในกรณีจำเป็น</li>
        </ul>
        <h3>การถอนเงิน / Withdrawals</h3>
        <ul>
          <li>ขั้นต่ำ 50 บาท และโอนภายใน 3 ชม. (ตัวอย่าง)</li>
          <li>ชื่อบัญชีต้องตรงกับชื่อผู้ใช้งาน</li>
        </ul>
        <h3>ติดต่อเรา / Contact</h3>
        <p>Discord: @SkinRush • Email: support@skinrush.example</p>
      </div>
    </Card>
  );
}

/* Cart */
function CartPage({ lang, cart, onRemove, onCheckout }) {
  const t = I18N[lang];
  const subtotalTHB = cart.reduce((s,it)=>s+it.price,0);
  return (
    <Card className="p-5 grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100">{t.cart.title}</h2>
        <div className="text-sm text-slate-400">{t.cart.subtotal}: <span className="text-yellow-300 font-semibold">{fmt(subtotalTHB, lang)}</span></div>
      </div>
      {cart.length===0 ? (
        <div className="text-slate-400 text-sm">{t.cart.empty}</div>
      ) : (
        <div className="grid gap-3">
          {cart.map((it)=> (
            <div key={it.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#0D1320] border border-[#22305A]">
              <img
                src={(imageUrlsForItem(it)[0]) || it.img || thumbSvgData(it)}
                data-attempt={0}
                alt={it.name}
                className="h-14 w-20 object-contain rounded-lg bg-[#0B0F1A]"
                loading="lazy"
                onError={(e)=> nextImageOnError(e, it, thumbSvgData(it))}
              />
              <div className="flex-1">
                <div className="text-slate-100 text-sm font-medium">{it.skin}</div>
                <div className="text-slate-400 text-xs">{it.weapon} • Float {it.float.toFixed(2)}</div>
              </div>
              <div className="text-yellow-300 text-sm font-semibold mr-2">{fmt(it.price, lang)}</div>
              <Button variant="outline" onClick={()=>onRemove(it)}>{t.cart.remove}</Button>
            </div>
          ))}
          <div className="flex justify-end"><Button onClick={onCheckout}>{t.cart.checkout}</Button></div>
        </div>
      )}
    </Card>
  );
}

/* Navbar (TopBar) */
function TopBar({ route, setRoute, balance, lang, setLang, cartCount }) {
  const t = I18N[lang];
  const MENU = [
    { key: "market", label: t.nav.market },
    { key: "buy", label: t.nav.buy },
    { key: "sell", label: t.nav.sell },
    { key: "deposit", label: t.nav.deposit },
    { key: "withdraw", label: t.nav.withdraw },
    { key: "support", label: t.nav.support },
  ];
  return (
    <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[#0B0F1A]/70 bg-[#0B0F1A]/90 border-b border-[#1E2A44]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 grid place-items-center rounded-xl bg-[#0E1629] ring-1 ring-blue-500/40">
                <div className="h-4 w-4 rounded-full bg-gradient-to-tr from-blue-500 to-yellow-400" />
              </div>
              <div className="font-semibold text-slate-100">{t.brand}</div>
            </div>
            <nav className="hidden md:flex items-center gap-2">
              {MENU.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setRoute(m.key)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition ${route === m.key ? "bg-white/5 text-slate-100" : "text-slate-300 hover:text-slate-100"}`}
                >
                  {m.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-xl bg-[#0D1320] border border-[#22305A] px-3 py-2 text-sm text-slate-300">
              {t.balance}: <span className="font-semibold text-yellow-300">{fmt(balance, lang)}</span>
            </div>
            <Button variant="outline" onClick={()=>setLang(lang === "th" ? "zh" : "th")}>{I18N[lang].langSwitch}</Button>
            <button onClick={()=>setRoute("cart")} className="relative rounded-xl px-3 py-2 text-sm text-slate-200 ring-1 ring-blue-400/40 hover:ring-blue-300/70">
              🛒<span className="ml-1">{cartCount}</span>
            </button>
            <Button onClick={()=>alert("เข้าสู่ระบบ (เดโม่)")}>{t.actions.login}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Footer */
function Footer({ lang }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-10 border-t border-[#1E2A44]">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-400 grid sm:grid-cols-2 gap-3">
        <div>© {year} SkinRush — CS Skins Marketplace (Demo)</div>
        <div className="sm:text-right">ธีม: ดำ / น้ำเงิน / เหลือง แบบมินิมอล</div>
      </div>
    </footer>
  );
}

/*************************
 * App
 *************************/
export default function App() {
  const [route, setRoute] = useState("market");
  const [lang, setLang] = useState("th");
  const [balance] = useState(2500);
  const [items] = useState(ITEMS);
  const [cart, setCart] = useState([]);

  const onBuy = (item) => {
    setCart((c)=>[...c, item]);
    alert(`เพิ่มลงรถเข็น: ${item.name}`);
  };
  const onAddToCart = (item) => setCart((c)=>[...c, item]);
  const onRemove = (it) => setCart((c)=>c.filter(x=>x.id!==it.id));
  const onCheckout = () => alert("ชำระเงิน (เดโม่) — ต่อเกตเวย์จริงภายหลัง");

  return (
    <div className="min-h-screen text-slate-200" style={{ background: "linear-gradient(180deg, #0B0F1A 0%, #0E1629 100%)" }}>
      <TopBar route={route} setRoute={setRoute} balance={balance} lang={lang} setLang={setLang} cartCount={cart.length} />

      <main className="mx-auto max-w-7xl px-4 pt-6 pb-12 grid gap-6">
        {/* Page Hero */}
        <Card className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="grid gap-1">
              <h1 className="text-xl font-semibold text-slate-100">{I18N[lang].heroTitle}</h1>
              {I18N[lang].heroSubtitle ? (
                <p className="text-sm text-slate-400">{I18N[lang].heroSubtitle}</p>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={()=>setRoute("deposit")}>{I18N[lang].actions.topup}</Button>
              <Button variant="outline" onClick={()=>setRoute("withdraw")}>{I18N[lang].actions.cashout}</Button>
            </div>
          </div>
        </Card>

        {/* Routed pages */}
        {route === "market" && <MarketPage items={items} onBuy={onBuy} onAddToCart={onAddToCart} lang={lang} />}
        {route === "buy" && <BuyPage items={items} onBuy={onBuy} onAddToCart={onAddToCart} lang={lang} />}
        {route === "sell" && <SellPage lang={lang} />}
        {route === "deposit" && <DepositPage lang={lang} />}
        {route === "withdraw" && <WithdrawPage lang={lang} />}
        {route === "support" && <SupportPage lang={lang} />}
        {route === "cart" && <CartPage lang={lang} cart={cart} onRemove={onRemove} onCheckout={onCheckout} />}
      </main>

      <Footer lang={lang} />
    </div>
  );
}
