/**
 * THE COFFEE LAB - COMPREHENSIVE ROLE-BASED SYSTEM
 * Pages: Home/About (with Table Reservations), Customer Auth (Login/Signup), Guest Menu, Cashier POS, Admin Portal
 * Bottom-Right Corner: Separate discreet Staff Logins for Cashier & Admin
 */

// ============================================================================
// 1. DATA SEEDING & LOCAL STORAGE HELPERS
// ============================================================================

const STORAGE_KEYS = {
  USER: 'coffee_lab_user',
  ACCOUNTS: 'coffee_lab_accounts',
  MENU: 'coffee_lab_menu',
  ORDERS: 'coffee_lab_orders',
  RESERVATIONS: 'coffee_lab_reservations'
};

const DEFAULT_ACCOUNTS = [
  { username: 'admin', password: 'admin123', name: 'Store Director (Admin)', role: 'admin', email: 'admin@thecoffeelab.com' },
  { username: 'cashier', password: 'cashier123', name: 'Barista Register #1', role: 'cashier', email: 'cashier@thecoffeelab.com' },
  {
    username: 'jordan',
    password: 'password123',
    name: 'Jordan Hayes',
    role: 'member',
    email: 'jordan.hayes@example.com',
    contact: '+63 917 555 2480',
    deliveryAddress: 'Unit 402, The Residences at Banga, Plaridel, Bulacan 3004',
    loyalty: {
      points: 340,
      tier: 'Silver',
      lifetimePoints: 540,
      history: [
        { date: '2026-11-01', desc: 'Welcome Member Sign-Up Bonus', points: 100, type: 'earn' },
        { date: '2026-11-03', desc: 'Order #LAB-1012 (Single Origin Pour Over)', points: 40, type: 'earn' },
        { date: '2026-11-05', desc: 'Order #LAB-1018 (Vanilla Bean Latte + Croissant)', points: 100, type: 'earn' },
        { date: '2026-11-06', desc: 'Order #LAB-1025 (Nitro Cold Brew 2x)', points: 100, type: 'earn' }
      ],
      vouchers: [
        { id: 'VOUCHER-1', title: 'Free Fresh French Pastry', code: 'CL-PASTRY-4819', discount: 3.75, date: '2026-11-05', used: false },
        { id: 'VOUCHER-2', title: '₱2.00 Off Any Brew', code: 'CL-BREW2-7102', discount: 2.00, date: '2026-11-06', used: false }
      ]
    }
  }
];

const LOYALTY_REWARDS_CATALOG = [
  { id: 'REW-1', title: '₱2.00 Off Any Brew', cost: 100, discount: 2.00, desc: 'Instant ₱2 discount on pour-over, latte, or cold brew.' },
  { id: 'REW-2', title: 'Free French Butter Pastry', cost: 180, discount: 3.75, desc: 'Fresh 72-layer butter croissant or pain au chocolat.' },
  { id: 'REW-3', title: 'Free Artisanal Pour-Over', cost: 300, discount: 5.50, desc: 'Single origin Ethiopian or Colombian micro-lot brew.' },
  { id: 'REW-4', title: '₱10.00 Off Entire Order', cost: 500, discount: 10.00, desc: 'Full food, coffee flight, and pastry checkout discount.' }
];

const DEFAULT_MENU_ITEMS = [
  {
    id: 'item-1',
    name: 'Brewed Coffee',
    category: 'Hot Coffee',
    image: 'hot-drinks/brewed-coffee.png',
    price: 5.25,
    calories: 5,
    description: 'Freshly brewed coffee with a smooth, balanced flavor.',
    inStock: true
  },
  {
    id: 'item-2',
    name: 'Rich Latte',
    category: 'Hot Coffee',
    image: 'hot-drinks/rich-latte.png',
    price: 5.75,
    calories: 220,
    description: 'Espresso blended with steamed milk for a rich, creamy cup.',
    inStock: true
  },
  {
    id: 'item-3',
    name: 'Spanish Latte',
    category: 'Hot Coffee',
    image: 'hot-drinks/spanish-latte.png',
    price: 4.50,
    calories: 90,
    description: 'Espresso with milk and a sweet, creamy Spanish-style finish.',
    inStock: true
  },
  {
    id: 'item-4',
    name: 'Caramel Latte',
    category: 'Hot Coffee',
    image: 'hot-drinks/caramel-latte.png',
    price: 6.00,
    calories: 340,
    description: 'Espresso and steamed milk finished with buttery caramel sweetness.',
    inStock: true
  },
  {
    id: 'item-5',
    name: 'Nitro Cold Brew Reserve',
    category: 'Cold Coffee',
    price: 5.50,
    calories: 5,
    description: 'Slow-steeped for 20 hours and nitrogen-infused on tap for a cascading stout-like head.',
    inStock: true
  },
  {
    id: 'item-6',
    name: 'Iced Spanish Brown Sugar Latte',
    category: 'Cold Coffee',
    price: 6.25,
    calories: 260,
    description: 'Shaken espresso with condensed milk, spiced cinnamon, brown sugar, and oat milk over crystal ice.',
    inStock: true
  },
  {
    id: 'item-7',
    name: 'Ceremonial Matcha Cloud',
    category: 'Teas & Lattes',
    price: 6.50,
    calories: 180,
    description: 'First-harvest Uji ceremonial matcha whisked fresh with oat milk and cold foam top.',
    inStock: true
  },
  {
    id: 'item-8',
    name: 'Cardamom Chai Tea Latte',
    category: 'Teas & Lattes',
    price: 5.50,
    calories: 210,
    description: 'Black tea slow-simmered with crushed green cardamom, fresh ginger, cinnamon, and steamed milk.',
    inStock: true
  },
  {
    id: 'item-9',
    name: 'Flaky French Butter Croissant',
    category: 'Pastries',
    price: 4.25,
    calories: 290,
    description: 'Traditional 72-layer laminated pastry made with cultured French Normandy butter.',
    inStock: true
  },
  {
    id: 'item-10',
    name: 'Almond Frangipane Danish',
    category: 'Pastries',
    price: 4.85,
    calories: 360,
    description: 'Crisp pastry filled with sweet almond cream, topped with toasted sliced almonds and powdered sugar.',
    inStock: false
  },
  {
    id: 'item-11',
    name: 'Chocolate Latte',
    category: 'Hot Coffee',
    image: 'hot-drinks/chocolate-latte.png',
    price: 6.00,
    calories: 280,
    description: 'A creamy latte blended with rich chocolate, served without whipped cream.',
    inStock: true
  },
  {
    id: 'item-12',
    name: 'Mocha Latte',
    category: 'Hot Coffee',
    image: 'hot-drinks/mocha-latte.png',
    price: 6.25,
    calories: 300,
    description: 'Espresso and steamed milk with a smooth chocolate mocha flavor, without whipped cream.',
    inStock: true
  },
  {
    id: 'item-13',
    name: 'Flying Saucer',
    category: 'Burgers',
    image: 'burgers/flying-saucer.png',
    price: 229.00,
    calories: 520,
    description: 'A hearty flying saucer burger, toasted and filled with savory goodness.',
    inStock: true
  },
  {
    id: 'item-14',
    name: 'Classic Burger',
    category: 'Burgers',
    image: 'burgers/classic-burger.png',
    price: 159.00,
    calories: 390,
    description: 'A classic burger with a juicy patty and fresh toppings.',
    inStock: true
  },
  {
    id: 'item-15',
    name: 'Egg Burger',
    category: 'Burgers',
    image: 'burgers/egg-burger.png',
    price: 179.00,
    calories: 440,
    description: 'A savory burger topped with a cooked egg.',
    inStock: true
  },
  {
    id: 'item-16',
    name: 'Cheeseburger',
    category: 'Burgers',
    image: 'burgers/cheeseburger.png',
    price: 179.00,
    calories: 420,
    description: 'A classic burger with melted cheese and fresh toppings.',
    inStock: true
  },
  {
    id: 'item-17',
    name: 'Cheesy Egg Burger',
    category: 'Burgers',
    image: 'burgers/cheesy-egg-burger.png',
    price: 199.00,
    calories: 470,
    description: 'A burger layered with melted cheese and a cooked egg.',
    inStock: true
  },
  {
    id: 'item-18',
    name: 'Ham & Cheese Burger',
    category: 'Burgers',
    image: 'burgers/ham-cheese-burger.png',
    price: 189.00,
    calories: 460,
    description: 'A burger with savory ham and melted cheese.',
    inStock: true
  },
  {
    id: 'item-19',
    name: 'Ham & Egg Burger',
    category: 'Burgers',
    image: 'burgers/ham-egg-burger.png',
    price: 199.00,
    calories: 480,
    description: 'A burger topped with savory ham and a cooked egg.',
    inStock: true
  },
  {
    id: 'item-20',
    name: 'Hotdog Sandwich',
    category: 'Burgers',
    image: 'burgers/hotdog-sandwich.png',
    price: 149.00,
    calories: 380,
    description: 'A classic hotdog sandwich served in a soft bun.',
    inStock: true
  },
  {
    id: 'item-21',
    name: 'Choco Fudge',
    category: 'Frappe',
    image: 'frappe/choco-fudge.png',
    price: 169.00,
    calories: 350,
    description: 'A creamy chocolate frappe blended with rich chocolate fudge.',
    inStock: true
  },
  {
    id: 'item-22',
    name: 'Choco Kisses',
    category: 'Frappe',
    image: 'frappe/choco-kisses.png',
    price: 179.00,
    calories: 360,
    description: 'A chocolate frappe with a sweet chocolate-kissed flavor.',
    inStock: true
  },
  {
    id: 'item-23',
    name: 'Caramel Fudge',
    category: 'Frappe',
    image: 'frappe/caramel-fudge.png',
    price: 179.00,
    calories: 370,
    description: 'A smooth frappe blended with caramel and fudge flavors.',
    inStock: true
  },
  {
    id: 'item-24',
    name: 'Cookies & Cream',
    category: 'Frappe',
    image: 'frappe/cookies-and-cream.png',
    price: 189.00,
    calories: 390,
    description: 'A creamy frappe blended with cookies and cream.',
    inStock: true
  },
  {
    id: 'item-25',
    name: 'Strawberry Frappe',
    category: 'Frappe',
    image: 'frappe/strawberry.png',
    price: 179.00,
    calories: 350,
    description: 'A refreshing strawberry frappe with a sweet, creamy finish.',
    inStock: true
  },
  {
    id: 'item-26',
    name: 'Strawberry Fruit Soda',
    category: 'Fruit Soda',
    image: 'fruit-soda/strawberry-fruit-soda.jpg',
    price: 99.00,
    calories: 160,
    description: 'A sparkling fruit soda with a sweet strawberry flavor.',
    inStock: true
  },
  {
    id: 'item-27',
    name: 'Blueberry Fruit Soda',
    category: 'Fruit Soda',
    image: 'fruit-soda/blueberry-fruit-soda.jpg',
    price: 109.00,
    calories: 165,
    description: 'A refreshing soda with a sweet blueberry flavor.',
    inStock: true
  },
  {
    id: 'item-28',
    name: 'Mango Fruit Soda',
    category: 'Fruit Soda',
    image: 'fruit-soda/mango-fruit-soda.jpg',
    price: 109.00,
    calories: 170,
    description: 'A bubbly fruit soda with tropical mango flavor.',
    inStock: true
  },
  {
    id: 'item-29',
    name: 'Lychee Fruit Soda',
    category: 'Fruit Soda',
    image: 'fruit-soda/lychee-fruit-soda.jpg',
    price: 109.00,
    calories: 155,
    description: 'A light and refreshing soda with fragrant lychee flavor.',
    inStock: true
  },
  {
    id: 'item-30',
    name: 'Green Apple Fruit Soda',
    category: 'Fruit Soda',
    image: 'fruit-soda/green-apple-fruit-soda.jpg',
    price: 109.00,
    calories: 160,
    description: 'A crisp, sparkling soda with green apple flavor.',
    inStock: true
  },
  {
    id: 'item-31',
    name: 'Four Seasons Soda',
    category: 'Fruit Soda',
    image: 'fruit-soda/four-seasons-soda.jpg',
    price: 119.00,
    calories: 175,
    description: 'A refreshing mixed-fruit soda inspired by four-season fruit flavors.',
    inStock: true
  },
  {
    id: 'item-32',
    name: 'Blue Lemonade',
    category: 'Fruit Soda',
    image: 'fruit-soda/blue-lemonade.jpg',
    price: 119.00,
    calories: 165,
    description: 'A bright, citrusy lemonade with a refreshing blue finish.',
    inStock: true
  },
  {
    id: 'item-33',
    name: 'Spanish Latte',
    category: 'Iced Drinks',
    image: 'iced-drinks/spanish-latte.png',
    price: 149.00,
    calories: 260,
    description: 'Iced espresso with milk and a sweet, creamy Spanish-style finish.',
    inStock: true
  },
  {
    id: 'item-34',
    name: 'Caramel Macchiato',
    category: 'Iced Drinks',
    image: 'iced-drinks/caramel-macchiato.png',
    price: 159.00,
    calories: 280,
    description: 'Iced espresso layered with milk and caramel sweetness.',
    inStock: true
  },
  {
    id: 'item-35',
    name: 'Matcha Latte',
    category: 'Iced Drinks',
    image: 'iced-drinks/matcha-latte.png',
    price: 159.00,
    calories: 250,
    description: 'A refreshing iced matcha latte with smooth milk.',
    inStock: true
  },
  {
    id: 'item-36',
    name: 'Dirty Matcha',
    category: 'Iced Drinks',
    image: 'iced-drinks/dirty-matcha.png',
    price: 169.00,
    calories: 270,
    description: 'Matcha latte combined with a shot of espresso.',
    inStock: true
  },
  {
    id: 'item-37',
    name: 'Choco Latte',
    category: 'Iced Drinks',
    image: 'iced-drinks/choco-latte.png',
    price: 149.00,
    calories: 290,
    description: 'A chilled latte with rich chocolate flavor.',
    inStock: true
  },
  {
    id: 'item-38',
    name: 'Mocha Latte',
    category: 'Iced Drinks',
    image: 'iced-drinks/mocha-latte.png',
    price: 159.00,
    calories: 300,
    description: 'Iced espresso blended with chocolate and milk.',
    inStock: true
  },,
  {
    id: 'item-39',
    name: 'Cheeseburger & Fries',
    category: 'Snack Combos',
    image: 'snack-combos/04_cheeseburger_and_fries.png',
    price: 229.00,
    calories: 540,
    description: 'A cheeseburger served with a side of crispy fries.',
    inStock: true
  },
  {
    id: 'item-40',
    name: 'Cheesy Egg Burger & Fries',
    category: 'Snack Combos',
    image: 'snack-combos/05_cheesy_egg_burger_and_fries.png',
    price: 249.00,
    calories: 590,
    description: 'A cheesy egg burger served with a side of crispy fries.',
    inStock: true
  },
  {
    id: 'item-41',
    name: 'Classic Burger & Fries',
    category: 'Snack Combos',
    image: 'snack-combos/02_classic_burger_and_fries.png',
    price: 209.00,
    calories: 510,
    description: 'A classic burger served with a side of crispy fries.',
    inStock: true
  },
  {
    id: 'item-42',
    name: 'Egg Burger & Fries',
    category: 'Snack Combos',
    image: 'snack-combos/03_egg_burger_and_fries.png',
    price: 229.00,
    calories: 560,
    description: 'An egg burger served with a side of crispy fries.',
    inStock: true
  },
  {
    id: 'item-43',
    name: 'Flying Saucer & Fries',
    category: 'Snack Combos',
    image: 'snack-combos/01_flying_saucer_and_fries.png',
    price: 279.00,
    calories: 650,
    description: 'A toasted flying saucer burger served with a side of crispy fries.',
    inStock: true
  },
  {
    id: 'item-44',
    name: 'Ham & Cheese Burger & Fries',
    category: 'Snack Combos',
    image: 'snack-combos/06_ham_and_cheese_burger_and_fries.png',
    price: 249.00,
    calories: 580,
    description: 'A ham and cheese burger served with a side of crispy fries.',
    inStock: true
  },
  {
    id: 'item-45',
    name: 'Ham & Egg Burger & Fries',
    category: 'Snack Combos',
    image: 'snack-combos/07_ham_and_egg_burger_and_fries.png',
    price: 249.00,
    calories: 600,
    description: 'A ham and egg burger served with a side of crispy fries.',
    inStock: true
  },
  {
    id: 'item-46',
    name: 'Hotdog & Fries',
    category: 'Snack Combos',
    image: 'snack-combos/file_00000000adac82078068498a47217331.png',
    price: 169.00,
    calories: 480,
    description: 'A hotdog sandwich served with a side of crispy fries.',
    inStock: true
  }
];

const DEFAULT_ORDERS = [
  {
    id: 'LAB-1001',
    customerName: 'Marcus Vance',
    customerRole: 'Cashier Registered',
    orderType: 'Takeout',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    status: 'Completed',
    paymentMethod: 'Cash',
    items: [
      { name: 'Brewed Coffee', size: 'Medium', price: 5.25, qty: 1 },
      { name: 'Flaky French Butter Croissant', size: 'Standard', price: 4.25, qty: 1, mods: 'Warmed' }
    ],
    subtotal: 9.50,
    tax: 0.79,
    total: 10.29
  },
  {
    id: 'LAB-1002',
    customerName: 'Chloe Bennett',
    customerRole: 'Guest Digital Order',
    orderType: 'Dine-in',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    status: 'Ready',
    paymentMethod: 'GCash QR',
    items: [
      { name: 'Nitro Cold Brew Reserve', size: 'Large', price: 5.50, qty: 1, notes: 'Vanilla Sweet Cream' }
    ],
    subtotal: 5.50,
    tax: 0.46,
    total: 5.96
  },
  {
    id: 'LAB-1003',
    customerName: 'David Lee',
    customerRole: 'Guest Digital Order',
    orderType: 'Takeout',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    status: 'Preparing',
    paymentMethod: 'Maya QR',
    items: [
      { name: 'Ceremonial Matcha Cloud', size: 'Medium', price: 6.50, qty: 1, notes: '50% Sweetness' },
      { name: 'Caramel Latte', size: 'Medium', price: 6.00, qty: 1 }
    ],
    subtotal: 12.50,
    tax: 1.04,
    total: 13.54
  }
];

const DEFAULT_RESERVATIONS = [
  {
    id: 'RES-7291',
    name: 'Sophia Patel',
    email: 'sophia.p@example.com',
    phone: '(206) 555-4819',
    date: new Date().toISOString().split('T')[0],
    time: '11:00 AM',
    guests: '2',
    notes: 'Coffee tasting flight for anniversary',
    status: 'Confirmed'
  },
  {
    id: 'RES-8412',
    name: 'Ethan Crawford',
    email: 'ethan.c@example.com',
    phone: '(206) 555-8932',
    date: new Date().toISOString().split('T')[0],
    time: '01:30 PM',
    guests: '4',
    notes: 'Team casual meeting with pastries',
    status: 'Confirmed'
  }
];

// LocalStorage Helpers
function getStoredAccounts() {
  const data = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
  let accounts;
  if (!data) {
    accounts = [...DEFAULT_ACCOUNTS];
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
    return accounts;
  }
  try {
    accounts = JSON.parse(data);
  } catch (e) {
    accounts = [...DEFAULT_ACCOUNTS];
  }

  // Ensure default sample customer Jordan exists
  if (!accounts.some(a => a.username === 'jordan')) {
    const jordanAcc = DEFAULT_ACCOUNTS.find(a => a.username === 'jordan');
    if (jordanAcc) {
      accounts.push(jordanAcc);
    }
  }

  // Ensure member accounts have role 'member' (distinct from temporary guest logins)
  accounts.forEach(a => {
    if (a.username !== 'admin' && a.username !== 'cashier') {
      a.role = 'member';
    }
  });
  localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  return accounts;
}

function saveStoredAccounts(accounts) {
  localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
}

function getStoredMenu() {
  const data = localStorage.getItem(STORAGE_KEYS.MENU);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(DEFAULT_MENU_ITEMS));
    return [...DEFAULT_MENU_ITEMS];
  }

  let stored;
  try {
    stored = JSON.parse(data);
    if (!Array.isArray(stored)) stored = [];
  } catch (error) {
    // Recover corrupted/old browser menu data instead of rendering a blank menu.
    stored = [];
  }

  // Recover an empty saved catalog so the cashier POS menu never renders blank.
  if (stored.length === 0) {
    stored = DEFAULT_MENU_ITEMS.map(item => ({ ...item }));
  }

  // Reconcile every default menu product into localStorage. This repairs older
  // saved catalogs that predate the latest categories/images while preserving
  // user-edited prices, stock status, and other fields.
  DEFAULT_MENU_ITEMS.forEach(defaultItem => {
    const existing = stored.find(item => item && item.id === defaultItem.id);
    if (!existing) {
      stored.push({ ...defaultItem });
      return;
    }
    existing.name = defaultItem.name;
    existing.category = defaultItem.category;
    existing.image = defaultItem.image;
    existing.description = defaultItem.description;
    if (typeof existing.price !== 'number') existing.price = defaultItem.price;
    if (typeof existing.inStock !== 'boolean') existing.inStock = defaultItem.inStock;
  });

  localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(stored));
  return stored;
}

function saveStoredMenu(items) {
  localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(items));
}

function getStoredOrders() {
  const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(DEFAULT_ORDERS));
    return [...DEFAULT_ORDERS];
  }
  const orders = JSON.parse(data);
  // Keep the built-in demo receipts aligned with the payment methods accepted
  // by the shop, including when an older demo dataset is already saved locally.
  const demoPaymentMethods = {
    'LAB-1001': 'Cash',
    'LAB-1002': 'GCash QR',
    'LAB-1003': 'Maya QR'
  };
  let updated = false;
  const demoOrderItems = {
    'LAB-1001': {
      items: [
        { name: 'Brewed Coffee', size: 'Medium', price: 5.25, qty: 1 },
        { name: 'Flaky French Butter Croissant', size: 'Standard', price: 4.25, qty: 1, mods: 'Warmed' }
      ], subtotal: 9.50, tax: 0.79, total: 10.29
    },
    'LAB-1002': {
      items: [{ name: 'Nitro Cold Brew Reserve', size: 'Large', price: 5.50, qty: 1, notes: 'Vanilla Sweet Cream' }],
      subtotal: 5.50, tax: 0.46, total: 5.96
    },
    'LAB-1003': {
      items: [
        { name: 'Ceremonial Matcha Cloud', size: 'Medium', price: 6.50, qty: 1, notes: '50% Sweetness' },
        { name: 'Caramel Latte', size: 'Medium', price: 6.00, qty: 1 }
      ], subtotal: 12.50, tax: 1.04, total: 13.54
    }
  };
  orders.forEach(order => {
    if (!order) return;
    if (demoPaymentMethods[order.id] && order.paymentMethod !== demoPaymentMethods[order.id]) {
      order.paymentMethod = demoPaymentMethods[order.id];
      updated = true;
    }
    const sample = demoOrderItems[order.id];
    if (sample) {
      order.items = sample.items.map(item => ({ ...item }));
      order.subtotal = sample.subtotal;
      order.tax = sample.tax;
      order.total = sample.total;
      updated = true;
    }
  });
  if (updated) localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  return orders;
}

function saveStoredOrders(orders) {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

function getStoredReservations() {
  const data = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(DEFAULT_RESERVATIONS));
    return [...DEFAULT_RESERVATIONS];
  }
  return JSON.parse(data);
}

function saveStoredReservations(res) {
  localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(res));
}

function resetToSampleData() {
  if (confirm('Reset Coffee Lab demo menu, orders, and reservations back to default values?')) {
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(DEFAULT_MENU_ITEMS));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(DEFAULT_ORDERS));
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(DEFAULT_RESERVATIONS));
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(DEFAULT_ACCOUNTS));
    showToast('Demo data successfully reset.', 'success');
    refreshAllViews();
  }
}

// ============================================================================
// 2. STATE MANAGEMENT & NAVIGATION
// ============================================================================

const state = {
  currentView: 'homeAboutView',
  guestSubView: 'menu',
  currentUser: null,
  guestCart: [],
  posTicket: [],
  posDiscount: null,
  activeModalItem: null,
  customizerConfig: {
    size: 'Medium',
    sizeExtra: 0.50,
    milk: 'Whole Milk',
    milkExtra: 0,
    sweetness: '100%',
    addons: []
  }
};

let reservationNavActive = false;

function navigateTo(viewId) {
  // Staff accounts stay inside their operational workspace; the public Home/About
  // page is only available to guests and customers.
  if (viewId === 'homeAboutView' && state.currentUser) {
    if (state.currentUser.role === 'admin') viewId = 'adminView';
    else if (state.currentUser.role === 'cashier') viewId = 'cashierView';
  }

  state.currentView = viewId;
  reservationNavActive = false;
  document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
  
  const target = document.getElementById(viewId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateRoleNav();

  if (viewId === 'homeAboutView') {
    // reservations section removed from home; nothing extra to render
  } else if (viewId === 'guestView') {
    renderGuestMenu();
    updateGuestCartUI();
    renderGuestOrders();
  } else if (viewId === 'cashierView') {
    renderPosCatalog();
    renderKitchenQueue();
    renderCashierReservations();
    renderCashierHistory();
  } else if (viewId === 'adminView') {
    renderAdminStats();
    renderAdminMenuTable();
    renderAdminReservationsTable();
    renderAdminOrdersTable();
  } else if (viewId === 'customerProfileView') {
    renderCustomerProfile();
    renderMyReservations();
  }
}

function scrollToReservation() {
  navigateTo('homeAboutView');
  reservationNavActive = true;
  updateRoleNav();
  setTimeout(() => {
    const el = document.getElementById('reservationSection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function scrollToAbout() {
  navigateTo('aboutView');
}

// ============================================================================
// 3. AUTHENTICATION (CUSTOMER PORTAL & ROLE SWITCHER)
// ============================================================================

function initAuth() {
  const resDateInput = document.getElementById('resDate');
  if (resDateInput) {
    resDateInput.value = new Date().toISOString().split('T')[0];
    resDateInput.min = new Date().toISOString().split('T')[0];
  }

  const savedUser = sessionStorage.getItem(STORAGE_KEYS.USER);
  if (savedUser) {
    try {
      state.currentUser = JSON.parse(savedUser);
    } catch (e) {
      state.currentUser = null;
    }
  }

  if (state.currentUser && state.currentUser.role === 'cashier') {
    navigateTo('cashierView');
  } else if (state.currentUser && state.currentUser.role === 'admin') {
    navigateTo('adminView');
  } else {
    navigateTo('homeAboutView');
  }

  updateAuthPill();
}

function switchAuthTab(tabName) {
  document.getElementById('tabBtnLogin').classList.toggle('active', tabName === 'login');
  document.getElementById('tabBtnSignup').classList.toggle('active', tabName === 'signup');
  document.getElementById('authLoginTab').classList.toggle('active', tabName === 'login');
  document.getElementById('authSignupTab').classList.toggle('active', tabName === 'signup');
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  const accounts = getStoredAccounts();
  const account = accounts.find(a =>
    (a.username.toLowerCase() === username.toLowerCase() || (a.email && a.email.toLowerCase() === username.toLowerCase())) &&
    a.password === password
  );

  if (account) {
    setCurrentUser(account);
    showToast('Welcome back, ' + account.name + '!', 'success');
  } else {
    if ((username === 'admin' && password === 'admin123') || (username === 'cashier' && password === 'cashier123')) {
      quickLogin(username);
      return;
    }
    showToast('Invalid member credentials. You can also click "Continue as Guest" or register.', 'error');
  }
}

function handleSignupSubmit(e) {
  e.preventDefault();
  const fullName = document.getElementById('signupFullName').value.trim();
  const username = document.getElementById('signupUsername').value.trim().toLowerCase();
  const email = document.getElementById('signupEmail').value.trim();
  const contact = document.getElementById('signupContact') ? document.getElementById('signupContact').value.trim() : '';
  const deliveryAddress = document.getElementById('signupDeliveryAddress') ? document.getElementById('signupDeliveryAddress').value.trim() : '';
  const password = document.getElementById('signupPassword').value.trim();

  if (password.length < 4) {
    showToast('Password should be at least 4 characters long.', 'error');
    return;
  }

  const accounts = getStoredAccounts();
  if (accounts.some(a => a.username.toLowerCase() === username)) {
    showToast('Username already taken. Please choose another.', 'error');
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  const newAccount = {
    username,
    password,
    name: fullName,
    role: 'member',
    email,
    contact: contact || '+63 917 555 0192',
    deliveryAddress: deliveryAddress || '972 LNC Bldg., Maharlika Highway, Banga 1st, Plaridel, Bulacan 3004',
    loyalty: {
      points: 100,
      tier: 'Bronze',
      lifetimePoints: 100,
      history: [
        { date: today, desc: 'Welcome Member Sign-Up Bonus', points: 100, type: 'earn' }
      ],
      vouchers: []
    }
  };

  accounts.push(newAccount);
  saveStoredAccounts(accounts);

  showToast('Welcome to The Coffee Lab, ' + fullName + '! 100 Welcome Points added to your profile.', 'success');

  setCurrentUser(newAccount);
}

function quickLogin(role) {
  const accounts = getStoredAccounts();
  if (role === 'guest') {
    loginAsGuest();
  } else if (role === 'member') {
    const memberAcc = accounts.find(a => a.username === 'jordan') || DEFAULT_ACCOUNTS[2];
    memberAcc.role = 'member';
    setCurrentUser(memberAcc);
    showToast('Signed in as Member: Jordan Hayes (340 Loyalty Points)', 'success');
    navigateTo('customerProfileView');
  } else if (role === 'cashier') {
    const cashierAcc = accounts.find(a => a.role === 'cashier') || DEFAULT_ACCOUNTS[1];
    setCurrentUser(cashierAcc);
    showToast('Signed in as Cashier (POS Station)', 'info');
  } else if (role === 'admin') {
    const adminAcc = accounts.find(a => a.role === 'admin') || DEFAULT_ACCOUNTS[0];
    setCurrentUser(adminAcc);
    showToast('Signed in as Administrator (Management Portal)', 'info');
  }
}

function loginAsGuest(guestName) {
  const guestId = 'Guest-' + Math.floor(1000 + Math.random() * 9000);
  const guestAcc = {
    role: 'guest',
    name: guestName || 'Guest User',
    username: guestId.toLowerCase(),
    id: guestId,
    email: '',
    contact: '',
    deliveryAddress: ''
    // Loyalty reward system is removed on guest login
  };
  setCurrentUser(guestAcc);
  showToast('Signed in as Guest. Browse drinks and order without an account.', 'info');
}

function setCurrentUser(user) {
  state.currentUser = user;
  sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  updateAuthPill();

  if (user.role === 'cashier') {
    navigateTo('cashierView');
  } else if (user.role === 'admin') {
    navigateTo('adminView');
  } else {
    if (state.currentView === 'authView') {
      navigateTo('guestView');
    }
  }
}

function toggleAccountDropdown(event) {
  if (event) event.stopPropagation();
  const dropdown = document.getElementById('customerAccountDropdown');
  const trigger = document.querySelector('.customer-account-header');
  if (!dropdown || !trigger) return;
  const isOpen = !dropdown.hidden;
  dropdown.hidden = isOpen;
  trigger.setAttribute('aria-expanded', String(!isOpen));
}

function closeAccountDropdown() {
  const dropdown = document.getElementById('customerAccountDropdown');
  const trigger = document.querySelector('.customer-account-header');
  if (dropdown) dropdown.hidden = true;
  if (trigger) trigger.setAttribute('aria-expanded', 'false');
}

function logout() {
  state.currentUser = null;
  sessionStorage.removeItem(STORAGE_KEYS.USER);
  updateAuthPill();
  navigateTo('homeAboutView');
  showToast('You have been logged out.', 'info');
}

function updateAuthPill() {
  const authPill = document.getElementById('authPillContainer');
  if (!authPill) return;

  if (!state.currentUser) {
    authPill.innerHTML = `
      <button class="btn btn-primary btn-sm" onclick="navigateTo('authView')">
        Sign In / Join &rarr;
      </button>
    `;
  } else if (state.currentUser.role === 'guest') {
    authPill.innerHTML = `
      <span class="auth-badge badge-guest">
        <span>Guest User</span>
      </span>
      <button class="btn-switch-role" onclick="logout()">Exit</button>
      <button class="btn btn-primary btn-sm" onclick="navigateTo('authView')">
        Sign In / Join &rarr;
      </button>
    `;
  } else if (state.currentUser.role === 'member') {
    const points = (state.currentUser.loyalty && state.currentUser.loyalty.points) || 0;
    const cartCount = state.guestCart ? state.guestCart.reduce((sum, i) => sum + i.qty, 0) : 0;
    const cartLabel = cartCount === 0 ? 'Open cart — empty' : `Open cart — ${cartCount} item${cartCount === 1 ? '' : 's'}`;
    authPill.innerHTML = `
      <div class="customer-account-menu-wrap">
      <button class="customer-account-header" onclick="toggleAccountDropdown(event)" aria-haspopup="true" aria-expanded="false" title="Account options">
        <svg class="customer-account-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7.5" r="4"></circle><path d="M4.5 21v-2a7.5 7.5 0 0 1 15 0v2"></path></svg>
        <span>Hi, ${state.currentUser.name.split(' ')[0]}</span><svg class="account-chevron" viewBox="0 0 12 12" aria-hidden="true"><path d="m2 4 4 4 4-4"></path></svg>
      </button>
      <div class="customer-account-dropdown" id="customerAccountDropdown" hidden>
        <button type="button" onclick="navigateTo('customerProfileView'); closeAccountDropdown();">My Profile</button>
        <button type="button" onclick="navigateTo('guestView'); switchGuestSubView('orders'); closeAccountDropdown();">My Orders &amp; Receipts</button>
        <button type="button" class="account-signout-option" onclick="logout()">Sign Out</button>
      </div>
      </div>
      <button class="nav-link cart-icon-button ${((state.currentView === 'guestView' && state.guestSubView === 'cart') ? 'active' : '')}" onclick="navigateTo('guestView'); switchGuestSubView('cart');" aria-label="${cartLabel}" title="${cartLabel}">
        <svg class="cart-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2.5 3h2.2l2.1 12.1a2 2 0 0 0 2 1.7h9.1a2 2 0 0 0 1.9-1.4L22 8H6"></path><circle cx="9.5" cy="20" r="1.2"></circle><circle cx="18" cy="20" r="1.2"></circle></svg>
        <span class="cart-icon-badge ${cartCount === 0 ? 'is-empty' : ''}">${cartCount === 0 ? '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1v10M1 6h10"></path></svg>' : cartCount}</span>
      </button>
      <button class="btn-switch-role customer-header-logout" onclick="logout()">Log Out</button>
    `;
  } else {
    let roleBadgeClass = 'badge-guest';
    if (state.currentUser.role === 'cashier') {
      roleBadgeClass = 'badge-cashier';
    } else if (state.currentUser.role === 'admin') {
      roleBadgeClass = 'badge-admin';
    }

    authPill.innerHTML = `
      <span class="auth-badge ${roleBadgeClass}">
        <span>${state.currentUser.name}</span>
      </span>
      <button class="btn-switch-role" onclick="logout()">Log Out / Switch</button>
    `;
  }

  updateRoleNav();
}

function updateRoleNav() {
  const roleNav = document.getElementById('roleNav');
  roleNav.classList.remove('admin-only-nav');
  if (!roleNav) return;

  const cartCount = state.guestCart ? state.guestCart.reduce((sum, i) => sum + i.qty, 0) : 0;
  const cartLabel = cartCount === 0 ? 'Open cart — empty' : `Open cart — ${cartCount} item${cartCount === 1 ? '' : 's'}`;

  // Keep the customer header cart badge synchronized after every cart change.
  // The cart button lives in the account/header area, not inside roleNav.
  const headerCartButton = document.querySelector('.cart-icon-button');
  const headerCartBadge = headerCartButton && headerCartButton.querySelector('.cart-icon-badge');
  if (headerCartButton && headerCartBadge) {
    headerCartButton.setAttribute('aria-label', cartLabel);
    headerCartButton.setAttribute('title', cartLabel);
    headerCartBadge.classList.toggle('is-empty', cartCount === 0);
    headerCartBadge.innerHTML = cartCount === 0
      ? '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1v10M1 6h10"/></svg>'
      : String(cartCount);
  }
  const cartButton = `
      <button class="nav-link cart-icon-button ${(state.currentView === 'guestView' && state.guestSubView === 'cart') ? 'active' : ''}" onclick="navigateTo('guestView'); switchGuestSubView('cart');" aria-label="${cartLabel}" title="${cartLabel}">
        <svg class="cart-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2.5 3h2.2l2.1 12.1a2 2 0 0 0 2 1.7h9.1a2 2 0 0 0 1.9-1.4L22 8H6"/><circle cx="9.5" cy="20" r="1.2"/><circle cx="18" cy="20" r="1.2"/></svg>
        <span class="cart-icon-badge ${cartCount === 0 ? 'is-empty' : ''}">${cartCount === 0 ? '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1v10M1 6h10"/></svg>' : cartCount}</span>
      </button>`;
  const guestSubNav = document.getElementById('guestSubNav');
  const resLoginHint = document.getElementById('resLoginHint');

  // Helper: show hint when user is NOT a member
  const isMember = state.currentUser && state.currentUser.role === 'member';
  if (resLoginHint) resLoginHint.style.display = isMember ? 'none' : 'block';

  if (!state.currentUser) {
    // PUBLIC / NOT LOGGED IN:
    // Show Home, About, Reservations, and Menu & Order
    // Cart tab and My Orders tab are hidden until a guest or member logs in
    roleNav.innerHTML = `
      <button class="nav-link ${state.currentView === 'homeAboutView' ? 'active' : ''}" onclick="navigateTo('homeAboutView')">Home</button>
      <button class="nav-link ${state.currentView === 'aboutView' ? 'active' : ''}" onclick="navigateTo('aboutView')">About</button>
      <button class="nav-link ${reservationNavActive ? 'active' : ''}" onclick="scrollToReservation()">Reservations</button>
      <button class="nav-link ${state.currentView === 'guestView' ? 'active' : ''}" onclick="navigateTo('guestView'); switchGuestSubView('menu');">Menu</button>
      <label class="header-menu-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg><input type="search" placeholder="Search drinks, pastries..." oninput="handleMenuSearch(this.value)" onclick="openMenuSearch()" aria-label="Search drinks and pastries"></label>
    `;
    if (guestSubNav) guestSubNav.style.display = 'none';
  } else if (state.currentUser.role === 'guest') {
    // GUEST LOGGED IN:
    // Cart tab and My Orders tab are displayed
    roleNav.innerHTML = `
      <button class="nav-link ${state.currentView === 'homeAboutView' ? 'active' : ''}" onclick="navigateTo('homeAboutView')">Home</button>
      <button class="nav-link ${state.currentView === 'aboutView' ? 'active' : ''}" onclick="navigateTo('aboutView')">About</button>
      <button class="nav-link ${reservationNavActive ? 'active' : ''}" onclick="scrollToReservation()">Reservations</button>
      <button class="nav-link ${(state.currentView === 'guestView' && state.guestSubView === 'menu') ? 'active' : ''}" onclick="navigateTo('guestView'); switchGuestSubView('menu');">Menu</button>
      <label class="header-menu-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg><input type="search" placeholder="Search drinks, pastries..." oninput="handleMenuSearch(this.value)" onclick="openMenuSearch()" aria-label="Search drinks and pastries"></label>
      <button class="nav-link ${(state.currentView === 'guestView' && state.guestSubView === 'orders') ? 'active' : ''}" onclick="navigateTo('guestView'); switchGuestSubView('orders');">My Orders</button>
    `;
    if (guestSubNav) guestSubNav.style.display = 'flex';
  } else if (state.currentUser.role === 'member') {
    // REGISTERED CUSTOMER (MEMBER) LOGGED IN:
    // Cart button is displayed; My Orders is available in the account dropdown
    roleNav.innerHTML = `
      <button class="nav-link ${state.currentView === 'homeAboutView' ? 'active' : ''}" onclick="navigateTo('homeAboutView')">Home</button>
      <button class="nav-link ${state.currentView === 'aboutView' ? 'active' : ''}" onclick="navigateTo('aboutView')">About</button>
      <button class="nav-link ${reservationNavActive ? 'active' : ''}" onclick="scrollToReservation()">Reservations</button>
      <button class="nav-link ${(state.currentView === 'guestView' && state.guestSubView === 'menu') ? 'active' : ''}" onclick="navigateTo('guestView'); switchGuestSubView('menu');">Menu</button>
      <label class="header-menu-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg><input type="search" placeholder="Search drinks, pastries..." oninput="handleMenuSearch(this.value)" onclick="openMenuSearch()" aria-label="Search drinks and pastries"></label>
    `;
    if (guestSubNav) guestSubNav.style.display = 'flex';
  } else if (state.currentUser.role === 'cashier') {
    roleNav.innerHTML = `
      <button class="nav-link ${state.currentView === 'cashierView' ? 'active' : ''}" onclick="navigateTo('cashierView'); switchCashierSubTab('register');">Dashboard / POS Register</button>
    `;
    if (guestSubNav) guestSubNav.style.display = 'none';
  } else if (state.currentUser.role === 'admin') {
    roleNav.classList.add('admin-only-nav');
    roleNav.innerHTML = `
      <button class="nav-link ${state.currentView === 'adminView' ? 'active' : ''}" onclick="navigateTo('adminView'); switchAdminTab('menu');">Dashboard</button>
    `;
    if (guestSubNav) guestSubNav.style.display = 'none';
  }
}

function refreshAllViews() {
  renderMyReservations();
  renderGuestMenu();
  renderGuestOrders();
  renderPosCatalog();
  renderKitchenQueue();
  renderCashierReservations();
  renderCashierHistory();
  renderAdminStats();
  renderAdminMenuTable();
  renderAdminReservationsTable();
  renderAdminOrdersTable();
}

// ============================================================================
// 4. SEPARATE STAFF (ADMIN & CASHIER) AUTHENTICATION (BOTTOM-RIGHT CORNER)
// ============================================================================

function openStaffLoginModal(initialRole = 'cashier') {
  setStaffModalRole(initialRole);
  document.getElementById('staffLoginModal').style.display = 'flex';
}

function closeStaffLoginModal() {
  document.getElementById('staffLoginModal').style.display = 'none';
}

function setStaffModalRole(role) {
  const roleInput = document.getElementById('staffRoleInput');
  const cashierTab = document.getElementById('tabStaffCashier');
  const adminTab = document.getElementById('tabStaffAdmin');
  const hintText = document.getElementById('staffHintText');
  const submitBtn = document.getElementById('btnStaffSubmit');
  const userInput = document.getElementById('staffUsername');
  const passInput = document.getElementById('staffPassword');

  roleInput.value = role;

  if (role === 'admin') {
    adminTab.classList.add('active');
    cashierTab.classList.remove('active');
    hintText.innerHTML = 'Demo Account: <strong>admin</strong> / <code>admin123</code>';
    submitBtn.textContent = 'Sign In to Administrator Portal \u2192';
    userInput.placeholder = 'e.g. admin';
  } else {
    cashierTab.classList.add('active');
    adminTab.classList.remove('active');
    hintText.innerHTML = 'Demo Account: <strong>cashier</strong> / <code>cashier123</code>';
    submitBtn.textContent = 'Sign In to Cashier Register \u2192';
    userInput.placeholder = 'e.g. cashier';
  }

  userInput.value = role;
  passInput.value = role === 'admin' ? 'admin123' : 'cashier123';
}

function autoFillStaffDemo() {
  const role = document.getElementById('staffRoleInput').value;
  document.getElementById('staffUsername').value = role;
  document.getElementById('staffPassword').value = role === 'admin' ? 'admin123' : 'cashier123';
  showToast('Auto-filled ' + role.toUpperCase() + ' demo credentials.', 'info');
}

function handleStaffLoginSubmit(e) {
  e.preventDefault();
  const username = document.getElementById('staffUsername').value.trim();
  const password = document.getElementById('staffPassword').value.trim();
  const targetRole = document.getElementById('staffRoleInput').value;

  const accounts = getStoredAccounts();
  const account = accounts.find(a =>
    a.username.toLowerCase() === username.toLowerCase() &&
    a.password === password &&
    a.role === targetRole
  );

  if (account) {
    closeStaffLoginModal();
    setCurrentUser({
      role: account.role,
      name: account.name,
      id: account.username,
      email: account.email
    });
    showToast('Staff access verified for ' + targetRole.toUpperCase() + '.', 'success');
  } else {
    showToast('Invalid credentials for ' + targetRole.toUpperCase() + '. Click "Auto-Fill Demo" to test.', 'error');
  }
}

// ============================================================================
// 5. RESERVATIONS SYSTEM (Inside Home/About)
// ============================================================================

function handleReservationSubmit(e) {
  e.preventDefault();

  // Only registered members may confirm and book a table reservation
  if (!state.currentUser || state.currentUser.role !== 'member') {
    showToast('Please sign in as a registered member to confirm a table reservation.', 'info');
    navigateTo('authView');
    return;
  }

  const date = document.getElementById('resDate').value;
  const time = document.getElementById('resTime').value;
  const guests = document.getElementById('resGuests').value;
  const name = document.getElementById('resName').value.trim();
  const email = document.getElementById('resEmail').value.trim();
  const phone = document.getElementById('resPhone').value.trim();
  const notes = document.getElementById('resSpecialNotes').value.trim();

  const newRes = {
    id: 'RES-' + Math.floor(1000 + Math.random() * 9000),
    name,
    email,
    phone,
    date,
    time,
    guests,
    notes: notes || 'Standard booking',
    status: 'Confirmed'
  };

  const reservations = getStoredReservations();
  reservations.unshift(newRes);
  saveStoredReservations(reservations);

  showToast('Table confirmed: Reservation #' + newRes.id + ' for ' + name, 'success');

  document.getElementById('resSpecialNotes').value = '';
  renderMyReservations();
  renderCashierReservations();
  renderAdminReservationsTable();
  renderAdminStats();
}

function renderMyReservations() {
  const container = document.getElementById('myReservationsList');
  const countBadge = document.getElementById('myReservationsCount');
  if (!container) return;

  const reservations = getStoredReservations();
  const activeRes = reservations.filter(r => r.status !== 'Cancelled');
  if (countBadge) countBadge.textContent = `${activeRes.length} Active`;

  if (activeRes.length === 0) {
    container.innerHTML = `
      <div class="empty-res-state">
        <p>No active reservations.</p>
        <small>Fill out the booking form to reserve your table or tasting seat.</small>
      </div>
    `;
    return;
  }

  container.innerHTML = activeRes.slice(0, 5).map(r => `
    <div class="res-ticket-item">
      <div class="res-ticket-top">
        <span class="res-code">#${r.id}</span>
        <span class="order-status-badge status-confirmed">${r.status}</span>
      </div>
      <div class="res-ticket-details">
        <strong>${r.date} &bull; ${r.time}</strong> (${r.guests} Guests)<br>
        Name: ${r.name} &bull; <small>${r.phone}</small>
        ${r.notes ? `<div style="color:#b86d29; font-size:0.75rem;">Note: ${r.notes}</div>` : ''}
      </div>
      <div class="res-ticket-actions">
        <button class="btn btn-outline btn-sm" onclick="cancelReservation('${r.id}')">Cancel Booking</button>
      </div>
    </div>
  `).join('');
}

function cancelReservation(resId) {
  if (confirm(`Are you sure you want to cancel reservation #${resId}?`)) {
    const reservations = getStoredReservations();
    const target = reservations.find(r => r.id === resId);
    if (target) {
      target.status = 'Cancelled';
      saveStoredReservations(reservations);
      showToast('Reservation #' + resId + ' has been cancelled.', 'info');
      renderMyReservations();
      renderCashierReservations();
      renderAdminReservationsTable();
      renderAdminStats();
    }
  }
}

function markReservationSeated(resId) {
  const reservations = getStoredReservations();
  const target = reservations.find(r => r.id === resId);
  if (target) {
    target.status = 'Seated';
    saveStoredReservations(reservations);
    showToast('Party for #' + resId + ' (' + target.name + ') marked as Seated.', 'success');
    renderCashierReservations();
    renderAdminReservationsTable();
  }
}

function renderCashierReservations() {
  const tbody = document.getElementById('cashierReservationsTableBody');
  if (!tbody) return;

  const reservations = getStoredReservations();
  if (reservations.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#9c8879;">No reservations on file.</td></tr>';
    return;
  }

  tbody.innerHTML = reservations.map(r => `
    <tr>
      <td><strong>#${r.id}</strong></td>
      <td>${r.date} @ ${r.time}</td>
      <td><strong>${r.name}</strong><br><small>${r.phone}</small></td>
      <td>${r.guests} guests</td>
      <td><small style="color:#786554;">${r.notes || '-'}</small></td>
      <td><span class="order-status-badge status-${r.status.toLowerCase()}">${r.status}</span></td>
      <td>
        ${r.status === 'Confirmed' ? `
          <button class="btn btn-primary btn-sm" onclick="markReservationSeated('${r.id}')">Seat Party</button>
        ` : `
          <small class="text-muted">${r.status}</small>
        `}
      </td>
    </tr>
  `).join('');
}

function renderAdminReservationsTable() {
  const tbody = document.getElementById('adminReservationsTableBody');
  if (!tbody) return;

  const reservations = getStoredReservations();
  if (reservations.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; color:#9c8879;">No reservations booked yet.</td></tr>';
    return;
  }

  tbody.innerHTML = reservations.map(r => `
    <tr>
      <td><strong>#${r.id}</strong></td>
      <td>${r.date} &bull; ${r.time}</td>
      <td><strong>${r.name}</strong></td>
      <td>${r.email}<br><small>${r.phone}</small></td>
      <td>${r.guests} Guests</td>
      <td><span class="order-status-badge status-${r.status.toLowerCase()}">${r.status}</span></td>
      <td>
        <div style="display: flex; gap: 0.35rem;">
          ${r.status === 'Confirmed' ? `
            <button class="btn btn-secondary btn-sm" onclick="markReservationSeated('${r.id}')">Seat</button>
            <button class="btn btn-outline btn-sm" style="color:var(--danger); border-color:var(--danger);" onclick="cancelReservation('${r.id}')">Cancel</button>
          ` : `
            <small class="text-muted">${r.status}</small>
          `}
        </div>
      </td>
    </tr>
  `).join('');
}

// ============================================================================
// 6. GUEST EXPERIENCE FUNCTIONS
// ============================================================================

let guestFilterCategory = 'all';
let guestSearchQuery = '';

function switchGuestSubView(viewName, btnEl) {
  // Guard: Cart and Orders are only accessible when a user is logged in (guest or member)
  if ((viewName === 'cart' || viewName === 'orders') && !state.currentUser) {
    showToast('Please sign in or continue as a guest to access this feature.', 'info');
    navigateTo('authView');
    return;
  }

  state.guestSubView = viewName;

  const menuView = document.getElementById('guestMenuView');
  const cartView = document.getElementById('guestCartView');
  const ordersView = document.getElementById('guestOrdersView');

  if (menuView) menuView.classList.toggle('active', viewName === 'menu');
  if (cartView) cartView.classList.toggle('active', viewName === 'cart');
  if (ordersView) ordersView.classList.toggle('active', viewName === 'orders');

  const btnMenu = document.getElementById('subTabMenu');
  const btnCart = document.getElementById('subTabCart');
  const btnOrders = document.getElementById('subTabOrders');

  // The Drink & Pastry Menu sub-navigation button should only be visible
  // while the customer is viewing the menu, not their cart or order history.
  if (btnMenu) btnMenu.style.display = viewName === 'menu' ? '' : 'none';

  if (btnMenu) btnMenu.classList.toggle('active', viewName === 'menu');
  if (btnCart) btnCart.classList.toggle('active', viewName === 'cart');
  if (btnOrders) btnOrders.classList.toggle('active', viewName === 'orders');

  if (viewName === 'cart') {
    renderDedicatedCart();
  } else if (viewName === 'orders') {
    renderGuestOrders();
  } else if (viewName === 'menu') {
    renderGuestMenu();
    updateGuestCartUI();
  }

  updateRoleNav();
}

function filterMenuCategory(cat, btnEl) {
  guestFilterCategory = cat;
  document.querySelectorAll('#categoryFilterBar .tab-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');
  renderGuestMenu();
}

function openMenuSearch() {
  navigateTo('guestView');
  switchGuestSubView('menu');
  const searchInput = document.getElementById('guestSearchInput');
  if (searchInput) {
    searchInput.focus();
    searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function handleMenuSearch(val) {
  guestSearchQuery = val.toLowerCase();
  renderGuestMenu();
}

function renderGuestMenu() {
  const container = document.getElementById('guestMenuGrid');
  if (!container) return;

  const menu = getStoredMenu();
  // Only display guest-facing menu cards that have a product picture.
  const filtered = menu.filter(item => {
    if (!item || !item.image || !item.name) return false;
    const matchesCategory = (guestFilterCategory === 'all') || (item.category === guestFilterCategory);
    const searchableName = String(item.name || '').toLowerCase();
    const searchableDescription = String(item.description || '').toLowerCase();
    const matchesSearch = searchableName.includes(guestSearchQuery) ||
                          searchableDescription.includes(guestSearchQuery);
    return matchesCategory && matchesSearch;
  });

  filtered.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #8c7a6b;">
        <h3>No coffee or pastries match your search</h3>
        <p>Try clearing filters or search terms.</p>
      </div>
    `;
    return;
  }

  const categoryHeading = guestFilterCategory !== 'all'
    ? `<div class="menu-category-group-heading" style="grid-column: 1 / -1; margin: 0 0 4px;">
         <h3 style="margin: 0; color: #49372C; font-family: var(--font-serif); font-size: 1.5rem;">${guestFilterCategory}</h3>
         <p style="margin: 6px 0 0; color: #8C5A3C;">${filtered.length} item${filtered.length === 1 ? '' : 's'} in this category</p>
       </div>`
    : '';

  container.innerHTML = categoryHeading + filtered.map(item => `
    <div class="menu-card ${item.inStock ? '' : 'out-of-stock'}">
      ${!item.inStock ? '<span class="out-of-stock-pill">Sold Out</span>' : ''}
      ${item.image ? `<div class="menu-card-image-wrap"><img class="menu-card-image" src="./${item.image}" alt="${item.name}" loading="lazy" onerror="this.onerror=null;this.src='./coffee-lab-logo.jpg';this.classList.add('image-fallback');" ></div>` : ''}
      <div class="menu-card-top">
        <div class="item-meta">
          <span class="item-category-tag">${item.category}</span>
          <h4>${item.name}</h4>
        </div>
      </div>
      <p class="item-desc">${item.description}</p>
      <div class="menu-card-bottom">
        <div>
          <span class="item-price">₱${item.price.toFixed(2)}</span>
          ${item.calories ? `<span class="item-cal"> &bull; ${item.calories} kcal</span>` : ''}
        </div>
        <button class="btn btn-primary btn-sm"
          onclick="openCustomizerModal('${item.id}', 'guest')"
          ${!item.inStock ? 'disabled' : ''}>
          ${item.category === 'Pastries' ? 'Add Item' : 'Customize'}
        </button>
      </div>
    </div>
  `).join('');
}

// Guest Cart Logic
function addGuestCartItem(cartItem) {
  state.guestCart.push(cartItem);
  updateGuestCartUI();
  showToast('Added ' + cartItem.name + ' to cart tray.', 'success');
}

function updateGuestCartUI() {
  const list = document.getElementById('cartItemsList');
  const countBadge = document.getElementById('cartCountBadge');
  const subTabBadge = document.getElementById('subTabCartBadge');
  const subtotalEl = document.getElementById('cartSubtotal');
  const taxEl = document.getElementById('cartTax');
  const totalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  const totalCount = state.guestCart.reduce((sum, i) => sum + i.qty, 0);
  if (countBadge) countBadge.textContent = `${totalCount} item${totalCount === 1 ? '' : 's'}`;
  if (subTabBadge) subTabBadge.textContent = totalCount;

  // Also update dedicated cart page if present
  renderDedicatedCart();
  updateRoleNav();

  if (!list) return;

  if (state.guestCart.length === 0) {
    list.innerHTML = `
      <div class="empty-cart-state">
        <p>Your tray is empty.</p>
        <small>Select any drink or pastry to begin customizing.</small>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '₱0.00';
    if (taxEl) taxEl.textContent = '₱0.00';
    if (totalEl) totalEl.textContent = '₱0.00';
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  let subtotal = 0;
  list.innerHTML = state.guestCart.map((item, idx) => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    return `
      <div class="cart-item-row">
        <div class="cart-item-info">
          <h5>${item.name}</h5>
          <div class="cart-item-mods">
            ${item.size ? `Size: ${item.size}<br>` : ''}
            ${item.mods ? `${item.mods}` : ''}
          </div>
        </div>
        <div class="cart-item-actions">
          <span class="cart-item-price">₱${itemTotal.toFixed(2)}</span>
          <div class="qty-control">
            <button class="qty-btn" onclick="changeGuestCartQty(${idx}, -1)">&minus;</button>
            <span class="qty-number">${item.qty}</span>
            <button class="qty-btn" onclick="changeGuestCartQty(${idx}, 1)">&plus;</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const tax = subtotal * 0.12;
  const grandTotal = subtotal + tax;

  if (subtotalEl) subtotalEl.textContent = `₱${subtotal.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `₱${tax.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `₱${grandTotal.toFixed(2)}`;
  if (checkoutBtn) checkoutBtn.disabled = false;
}

function changeGuestCartQty(idx, change) {
  if (!state.guestCart[idx]) return;
  state.guestCart[idx].qty += change;
  if (state.guestCart[idx].qty <= 0) {
    state.guestCart.splice(idx, 1);
  }
  updateGuestCartUI();
}

function renderDedicatedCart() {
  const list = document.getElementById('dedicatedCartList');
  const countSpan = document.getElementById('dedicatedCartCount');
  const subtotalEl = document.getElementById('dedSubtotal');
  const taxEl = document.getElementById('dedTax');
  const totalEl = document.getElementById('dedTotal');
  const checkoutBtn = document.getElementById('dedCheckoutBtn');
  const clearBtn = document.getElementById('clearCartBtn');
  const loyaltyCallout = document.getElementById('cartLoyaltyCallout');

  if (!list) return;

  const totalCount = state.guestCart.reduce((sum, i) => sum + i.qty, 0);
  if (countSpan) countSpan.textContent = totalCount;

  if (state.guestCart.length === 0) {
    list.innerHTML = `
      <div class="empty-cart-view" style="text-align: center; padding: 4rem 1.5rem; background: var(--bg-main); border: 1px dashed var(--espresso-border); border-radius: var(--radius-md);">
        <h4 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--espresso-dark); margin-bottom: 0.5rem;">Your Cart is Empty</h4>
        <p style="color: var(--text-secondary); font-size: 0.9rem; max-width: 440px; margin: 0 auto 1.5rem;">
          Explore our pour-over brew bar, artisan espresso drinks, and fresh bakery pastries to add items to your cart.
        </p>
        <button class="btn btn-primary" onclick="switchGuestSubView('menu')">
          Browse Coffee Menu &rarr;
        </button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '₱0.00';
    if (taxEl) taxEl.textContent = '₱0.00';
    if (totalEl) totalEl.textContent = '₱0.00';
    if (checkoutBtn) checkoutBtn.disabled = true;
    if (clearBtn) clearBtn.style.display = 'none';

    if (loyaltyCallout) {
      if (state.currentUser && state.currentUser.role === 'member') {
        loyaltyCallout.innerHTML = `<strong>Connoisseur Member:</strong> Add drinks to earn points toward your next tier and rewards!`;
      } else {
        loyaltyCallout.innerHTML = `<strong>Guest Ordering:</strong> Sign in or create an account to earn points and apply reward vouchers.`;
      }
    }
    return;
  }

  if (clearBtn) clearBtn.style.display = 'inline-block';
  if (checkoutBtn) checkoutBtn.disabled = false;

  let subtotal = 0;
  list.innerHTML = state.guestCart.map((item, idx) => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    return `
      <div class="dedicated-cart-item-card">
        <div class="cart-item-left">
          <span class="cart-item-cat">${item.category || 'Specialty Coffee'}</span>
          <h4 class="cart-item-title">${item.name}</h4>
          <div class="cart-item-details-text">
            ${item.size ? `<span>Size: <strong>${item.size}</strong></span>` : ''}
            ${item.mods ? `<span>${item.mods}</span>` : ''}
          </div>
          <button class="cart-item-remove-btn" onclick="removeDedicatedCartItem(${idx})">Remove</button>
        </div>
        <div class="cart-item-right">
          <div class="cart-item-price-col">
            <span class="cart-price-unit">₱${item.price.toFixed(2)} each</span>
            <strong class="cart-price-total">₱${itemTotal.toFixed(2)}</strong>
          </div>
          <div class="qty-control">
            <button class="qty-btn" onclick="changeGuestCartQty(${idx}, -1)">&minus;</button>
            <span class="qty-number">${item.qty}</span>
            <button class="qty-btn" onclick="changeGuestCartQty(${idx}, 1)">&plus;</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const tax = subtotal * 0.12;
  const grandTotal = subtotal + tax;

  if (subtotalEl) subtotalEl.textContent = `₱${subtotal.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `₱${tax.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `₱${grandTotal.toFixed(2)}`;

  if (loyaltyCallout) {
    if (state.currentUser && state.currentUser.role === 'member') {
      let multiplier = 10;
      const tier = (state.currentUser.loyalty && state.currentUser.loyalty.tier) || 'Bronze';
      if (tier === 'Platinum') multiplier = 20;
      else if (tier === 'Gold') multiplier = 15;
      else if (tier === 'Silver') multiplier = 12;
      const estPoints = Math.max(5, Math.round(grandTotal * multiplier));
      loyaltyCallout.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span><strong>Member Loyalty Perks:</strong> (${tier} Tier)</span>
          <strong style="color: var(--coffee-accent); font-size: 0.9rem;">+${estPoints} pts upon checkout</strong>
        </div>
      `;
    } else {
      loyaltyCallout.innerHTML = `
        <div>
          <span><strong>Guest Ordering:</strong></span>
          <a href="javascript:void(0)" onclick="navigateTo('authView')" style="color: var(--coffee-accent); text-decoration: underline; font-weight: 700; margin-left: 0.25rem;">Sign In or Register</a> to earn reward points on this purchase.
        </div>
      `;
    }
  }
}

function removeDedicatedCartItem(idx) {
  if (state.guestCart[idx]) {
    const name = state.guestCart[idx].name;
    state.guestCart.splice(idx, 1);
    updateGuestCartUI();
    renderDedicatedCart();
    updateRoleNav();
    showToast(`Removed ${name} from cart.`, 'info');
  }
}

function clearCart() {
  if (confirm('Are you sure you want to remove all items from your cart?')) {
    state.guestCart = [];
    updateGuestCartUI();
    renderDedicatedCart();
    updateRoleNav();
    showToast('Shopping cart cleared.', 'info');
  }
}

function handleOrderTypeChange() {
  const typeSelect = document.getElementById('guestOrderType');
  const addrGroup = document.getElementById('guestDeliveryAddressGroup');
  const addrInput = document.getElementById('guestOrderAddress');
  if (!typeSelect || !addrGroup) return;

  if (typeSelect.value === 'Delivery') {
    addrGroup.style.display = 'block';
    if (addrInput && state.currentUser && state.currentUser.deliveryAddress && !addrInput.value) {
      addrInput.value = state.currentUser.deliveryAddress;
    }
  } else {
    addrGroup.style.display = 'none';
  }
}

function handleVoucherSelectChange() {
  const select = document.getElementById('guestLoyaltyVoucherSelect');
  const discountRow = document.getElementById('guestModalDiscountRow');
  const discountEl = document.getElementById('guestModalDiscount');
  const totalDisplay = document.getElementById('guestModalTotal');
  const subtotalDisplay = document.getElementById('guestModalSubtotal');
  const pointsEarnedEl = document.getElementById('guestModalPointsEarned');

  const subtotal = state.guestCart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  let discount = 0;

  if (select && select.value !== 'none' && state.currentUser && state.currentUser.loyalty && state.currentUser.loyalty.vouchers) {
    const voucher = state.currentUser.loyalty.vouchers.find(v => v.code === select.value && !v.used);
    if (voucher) {
      discount = Math.min(subtotal, voucher.discount);
    }
  }

  const taxableSubtotal = Math.max(0, subtotal - discount);
  const tax = taxableSubtotal * 0.12;
  const finalTotal = taxableSubtotal + tax;

  if (subtotalDisplay) subtotalDisplay.textContent = `₱${subtotal.toFixed(2)}`;
  if (discountRow) {
    discountRow.style.display = discount > 0 ? 'flex' : 'none';
    if (discountEl) discountEl.textContent = `-₱${discount.toFixed(2)}`;
  }
  if (totalDisplay) totalDisplay.textContent = `₱${finalTotal.toFixed(2)}`;

  // Calculate points earned preview based on member tier
  const isMember = state.currentUser && state.currentUser.role === 'member';
  if (isMember) {
    let multiplier = 10;
    if (state.currentUser && state.currentUser.loyalty) {
      const tier = state.currentUser.loyalty.tier || 'Bronze';
      if (tier === 'Platinum') multiplier = 20;
      else if (tier === 'Gold') multiplier = 15;
      else if (tier === 'Silver') multiplier = 12;
    }
    const estPoints = Math.max(5, Math.round(finalTotal * multiplier));
    if (pointsEarnedEl) {
      pointsEarnedEl.textContent = `+${estPoints} Points Earned`;
      pointsEarnedEl.style.color = 'var(--coffee-accent)';
    }
  } else {
    if (pointsEarnedEl) {
      pointsEarnedEl.textContent = 'Guest (No Points)';
      pointsEarnedEl.style.color = 'var(--text-muted)';
    }
  }
}

function openGuestCheckoutModal() {
  if (state.guestCart.length === 0) return;
  const modal = document.getElementById('guestCheckoutModal');
  const nameInput = document.getElementById('guestOrderName');
  const phoneInput = document.getElementById('guestOrderPhone');
  const addrInput = document.getElementById('guestOrderAddress');
  const voucherGroup = document.getElementById('guestLoyaltyVoucherGroup');
  const guestLoyaltyNotice = document.getElementById('guestLoyaltyNotice');
  const voucherSelect = document.getElementById('guestLoyaltyVoucherSelect');

  const isMember = state.currentUser && state.currentUser.role === 'member';

  if (nameInput) nameInput.value = isMember ? state.currentUser.name : 'Guest Customer';
  if (phoneInput) phoneInput.value = (isMember && state.currentUser.contact) ? state.currentUser.contact : '';
  if (addrInput) addrInput.value = (isMember && state.currentUser.deliveryAddress) ? state.currentUser.deliveryAddress : '';

  // Show voucher selection ONLY for members; guests see guest notice
  if (voucherGroup && guestLoyaltyNotice) {
    if (isMember) {
      voucherGroup.style.display = 'block';
      guestLoyaltyNotice.style.display = 'none';
      if (voucherSelect) {
        voucherSelect.innerHTML = '<option value="none">No voucher applied</option>';
        if (state.currentUser.loyalty && state.currentUser.loyalty.vouchers) {
          const activeVouchers = state.currentUser.loyalty.vouchers.filter(v => !v.used);
          activeVouchers.forEach(v => {
            const opt = document.createElement('option');
            opt.value = v.code;
            opt.textContent = `${v.title} (-₱${v.discount.toFixed(2)}) [${v.code}]`;
            if (state.selectedVoucherCode === v.code) {
              opt.selected = true;
            }
            voucherSelect.appendChild(opt);
          });
        }
      }
    } else {
      voucherGroup.style.display = 'none';
      guestLoyaltyNotice.style.display = 'block';
    }
  }

  handleOrderTypeChange();
  handleVoucherSelectChange();
  modal.style.display = 'flex';
}

function closeGuestCheckoutModal() {
  document.getElementById('guestCheckoutModal').style.display = 'none';
}

function submitGuestOrder() {
  const custName = document.getElementById('guestOrderName').value.trim() || 'Guest';
  const custPhone = document.getElementById('guestOrderPhone') ? document.getElementById('guestOrderPhone').value.trim() : '';
  const orderType = document.getElementById('guestOrderType').value;
  const payType = document.getElementById('guestPaymentType').value;
  const deliveryAddr = document.getElementById('guestOrderAddress') ? document.getElementById('guestOrderAddress').value.trim() : '';
  const voucherSelect = document.getElementById('guestLoyaltyVoucherSelect');

  if (orderType === 'Delivery' && !deliveryAddr) {
    showToast('Please provide a delivery address for direct delivery.', 'warning');
    return;
  }

  const subtotal = state.guestCart.reduce((sum, i) => sum + (i.price * i.qty), 0);
  let discount = 0;
  let appliedVoucherCode = null;

  const isMember = state.currentUser && state.currentUser.role === 'member';

  if (isMember && voucherSelect && voucherSelect.value !== 'none' && state.currentUser.loyalty && state.currentUser.loyalty.vouchers) {
    const voucher = state.currentUser.loyalty.vouchers.find(v => v.code === voucherSelect.value && !v.used);
    if (voucher) {
      discount = Math.min(subtotal, voucher.discount);
      voucher.used = true;
      appliedVoucherCode = voucher.code;
    }
  }

  const taxableSubtotal = Math.max(0, subtotal - discount);
  const tax = taxableSubtotal * 0.12;
  const total = taxableSubtotal + tax;

  const orderId = 'LAB-' + Math.floor(1000 + Math.random() * 9000);
  const newOrder = {
    id: orderId,
    customerName: custName,
    customerPhone: custPhone,
    customerRole: isMember ? 'Member Digital Order' : 'Guest Digital Order',
    orderType: orderType,
    deliveryAddress: orderType === 'Delivery' ? deliveryAddr : null,
    timestamp: new Date().toISOString(),
    status: 'Pending',
    paymentMethod: payType,
    items: JSON.parse(JSON.stringify(state.guestCart)),
    subtotal: subtotal,
    discount: discount,
    voucherCode: appliedVoucherCode,
    tax: tax,
    total: total
  };

  const orders = getStoredOrders();
  orders.unshift(newOrder);
  saveStoredOrders(orders);

  // Award loyalty points ONLY if logged in as Member (NOT for guests)
  let earnedPoints = 0;
  if (isMember) {
    if (!state.currentUser.loyalty) {
      state.currentUser.loyalty = {
        points: 0,
        tier: 'Bronze',
        lifetimePoints: 0,
        history: [],
        vouchers: []
      };
    }

    let multiplier = 10;
    const tier = state.currentUser.loyalty.tier || 'Bronze';
    if (tier === 'Platinum') multiplier = 20;
    else if (tier === 'Gold') multiplier = 15;
    else if (tier === 'Silver') multiplier = 12;

    earnedPoints = Math.max(5, Math.round(total * multiplier));
    state.currentUser.loyalty.points += earnedPoints;
    state.currentUser.loyalty.lifetimePoints = (state.currentUser.loyalty.lifetimePoints || 0) + earnedPoints;

    state.currentUser.loyalty.history.unshift({
      date: new Date().toISOString().split('T')[0],
      desc: `Order #${newOrder.id} (${newOrder.items.length} items)`,
      points: earnedPoints,
      type: 'earn'
    });

    saveCurrentUserProfile();
    updateAuthPill();
  }

  state.guestCart = [];
  state.selectedVoucherCode = null;
  updateGuestCartUI();
  closeGuestCheckoutModal();

  if (isMember) {
    showToast(`Order #${newOrder.id} placed! You earned +${earnedPoints} Loyalty Points.`, 'success');
  } else {
    showToast(`Order #${newOrder.id} confirmed! Thank you for ordering with The Coffee Lab.`, 'success');
  }
  switchGuestSubView('orders');
}

// ============================================================================
// CUSTOMER PROFILE & LOYALTY REWARDS FUNCTIONS
// ============================================================================

function renderCustomerProfile() {
  const memberContent = document.getElementById('memberProfileContent');
  const guestRestricted = document.getElementById('guestProfileRestricted');

  // Check if current user is an authenticated MEMBER (NOT guest)
  const isMember = state.currentUser && state.currentUser.role === 'member';

  if (!isMember) {
    if (memberContent) memberContent.style.display = 'none';
    if (guestRestricted) guestRestricted.style.display = 'block';
    return;
  }

  if (memberContent) memberContent.style.display = 'block';
  if (guestRestricted) guestRestricted.style.display = 'none';

  const u = state.currentUser;
  if (!u.loyalty) {
    u.loyalty = {
      points: 100,
      tier: 'Bronze',
      lifetimePoints: 100,
      history: [{ date: new Date().toISOString().split('T')[0], desc: 'Welcome Member Sign-Up Bonus', points: 100, type: 'earn' }],
      vouchers: []
    };
  }

  // Pre-fill profile form fields
  const nameInput = document.getElementById('profileName');
  const userInput = document.getElementById('profileUsername');
  const emailInput = document.getElementById('profileEmail');
  const contactInput = document.getElementById('profileContact');
  const addrInput = document.getElementById('profileDeliveryAddress');
  const headingName = document.getElementById('profileHeadingName');
  const typeBadge = document.getElementById('profileAccountTypeBadge');

  if (nameInput) nameInput.value = u.name || '';
  if (userInput) userInput.value = u.username || u.id || '';
  if (emailInput) emailInput.value = u.email || '';
  if (contactInput) contactInput.value = u.contact || '';
  if (addrInput) addrInput.value = u.deliveryAddress || '';
  if (headingName) headingName.textContent = u.name ? `${u.name}'s Profile & Rewards` : 'Customer Profile & Loyalty Rewards';
  if (typeBadge) typeBadge.textContent = (u.id && u.id.startsWith('Guest-')) ? 'Guest Pass' : 'Connoisseur Member';

  // Compute tier based on lifetime points
  const lifetime = u.loyalty.lifetimePoints || u.loyalty.points || 0;
  const currentPoints = u.loyalty.points || 0;
  let tierName = 'Bronze Member';
  let tierBadgeText = 'Bronze';
  let nextTierGoal = '';
  let progressPercent = 0;
  let perkHint = 'Base tier: 10 pts per ₱1 spent + complimentary birthday brew.';

  if (lifetime >= 1000) {
    tierName = 'Platinum Connoisseur';
    tierBadgeText = 'Platinum';
    nextTierGoal = 'Max Tier Achieved!';
    progressPercent = 100;
    perkHint = 'Top Tier: 20 pts per ₱1 spent + free drink size upgrades & VIP cupping invitations.';
  } else if (lifetime >= 500) {
    tierName = 'Gold Reserve Tier';
    tierBadgeText = 'Gold';
    const remaining = 1000 - lifetime;
    nextTierGoal = `${remaining} pts to Platinum`;
    progressPercent = Math.min(100, Math.round(((lifetime - 500) / 500) * 100));
    perkHint = 'Gold Tier: 15 pts per ₱1 spent + free monthly French pastry & priority cupping bar.';
  } else if (lifetime >= 200) {
    tierName = 'Silver Bean Tier';
    tierBadgeText = 'Silver';
    const remaining = 500 - lifetime;
    nextTierGoal = `${remaining} pts to Gold`;
    progressPercent = Math.min(100, Math.round(((lifetime - 200) / 300) * 100));
    perkHint = 'Silver Tier: 12 pts per ₱1 spent + free organic oat/almond milk substitutions.';
  } else {
    tierName = 'Bronze Member';
    tierBadgeText = 'Bronze';
    const remaining = 200 - lifetime;
    nextTierGoal = `${remaining} pts to Silver`;
    progressPercent = Math.min(100, Math.round((lifetime / 200) * 100));
    perkHint = 'Bronze Tier: 10 pts per ₱1 spent + welcome drink perks.';
  }

  u.loyalty.tier = tierBadgeText;

  // Header quick stats
  const statTier = document.getElementById('profileStatTier');
  const statPoints = document.getElementById('profileStatPoints');
  if (statTier) statTier.textContent = tierName;
  if (statPoints) statPoints.textContent = `${currentPoints} pts`;

  // Loyalty Digital Card
  const cardPoints = document.getElementById('cardPointsDisplay');
  const cardName = document.getElementById('cardMemberName');
  const cardId = document.getElementById('cardMemberId');
  const cardTier = document.getElementById('cardTierBadge');
  if (cardPoints) cardPoints.textContent = currentPoints;
  if (cardName) cardName.textContent = u.name || 'Valued Member';
  if (cardId) cardId.textContent = (u.username || u.id || 'CL-8829').toUpperCase();
  if (cardTier) cardTier.textContent = tierName;

  // Progress Bar
  const curNameEl = document.getElementById('tierCurrentName');
  const nextGoalEl = document.getElementById('tierNextGoal');
  const fillEl = document.getElementById('tierProgressFill');
  const hintEl = document.getElementById('tierPerkHint');
  if (curNameEl) curNameEl.textContent = `${tierName} (${lifetime} lifetime pts)`;
  if (nextGoalEl) nextGoalEl.textContent = nextTierGoal;
  if (fillEl) fillEl.style.width = `${progressPercent}%`;
  if (hintEl) hintEl.textContent = perkHint;

  // Rewards Catalog
  renderRewardsCatalog(currentPoints);

  // Active Vouchers
  renderActiveVouchers(u.loyalty.vouchers || []);

  // Points Activity History
  renderPointsHistory(u.loyalty.history || []);
}

function renderRewardsCatalog(currentPoints) {
  const grid = document.getElementById('rewardsCatalogGrid');
  if (!grid) return;

  grid.innerHTML = LOYALTY_REWARDS_CATALOG.map(r => {
    const canAfford = currentPoints >= r.cost;
    return `
      <div class="reward-catalog-card ${canAfford ? 'affordable' : 'locked'}">
        <div class="reward-card-top">
          <span class="reward-cost-tag">${r.cost} Points</span>
          <span class="reward-value-tag">₱${r.discount.toFixed(2)} Value</span>
        </div>
        <h4 class="reward-card-title">${r.title}</h4>
        <p class="reward-card-desc">${r.desc}</p>
        <button class="btn btn-sm ${canAfford ? 'btn-primary' : 'btn-outline'}" 
                onclick="redeemLoyaltyReward('${r.id}')" 
                ${canAfford ? '' : 'disabled'}>
          ${canAfford ? 'Redeem Voucher' : `Need ${r.cost - currentPoints} more pts`}
        </button>
      </div>
    `;
  }).join('');
}

function redeemLoyaltyReward(rewardId) {
  if (!state.currentUser) return;
  const reward = LOYALTY_REWARDS_CATALOG.find(r => r.id === rewardId);
  if (!reward) return;

  const u = state.currentUser;
  if (!u.loyalty || u.loyalty.points < reward.cost) {
    showToast('Not enough points to redeem this reward yet. Place an order to earn more points!', 'warning');
    return;
  }

  u.loyalty.points -= reward.cost;
  const voucherCode = 'CL-' + reward.id.replace('REW-', '') + '-' + Math.floor(1000 + Math.random() * 9000);
  const voucher = {
    id: 'VOUCHER-' + Date.now(),
    rewardId: reward.id,
    title: reward.title,
    code: voucherCode,
    discount: reward.discount,
    date: new Date().toISOString().split('T')[0],
    used: false
  };

  if (!u.loyalty.vouchers) u.loyalty.vouchers = [];
  u.loyalty.vouchers.unshift(voucher);

  if (!u.loyalty.history) u.loyalty.history = [];
  u.loyalty.history.unshift({
    date: new Date().toISOString().split('T')[0],
    desc: `Redeemed: ${reward.title} (Code: ${voucherCode})`,
    points: -reward.cost,
    type: 'redeem'
  });

  saveCurrentUserProfile();
  renderCustomerProfile();
  updateAuthPill();
  showToast(`Voucher redeemed! Code: ${voucherCode} (₱${reward.discount.toFixed(2)} off)`, 'success');
}

function renderActiveVouchers(vouchers) {
  const list = document.getElementById('activeVouchersList');
  const countEl = document.getElementById('activeVouchersCount');
  if (!list) return;

  const active = (vouchers || []).filter(v => !v.used);
  if (countEl) countEl.textContent = `${active.length} Available`;

  if (active.length === 0) {
    list.innerHTML = `
      <div class="empty-voucher-box">
        <p>No active vouchers.</p>
        <small>Redeem points above or earn rewards through your daily coffee orders.</small>
      </div>
    `;
    return;
  }

  list.innerHTML = active.map(v => `
    <div class="voucher-ticket">
      <div class="voucher-ticket-left">
        <div class="voucher-ticket-val">-₱${v.discount.toFixed(2)}</div>
        <div class="voucher-ticket-details">
          <strong>${v.title}</strong>
          <code>Code: ${v.code}</code>
        </div>
      </div>
      <div class="voucher-ticket-right">
        <button class="btn btn-sm btn-outline" onclick="copyVoucherCode('${v.code}')">Copy Code</button>
        <button class="btn btn-sm btn-primary" onclick="applyVoucherAndOrder('${v.code}')">Use on Order</button>
      </div>
    </div>
  `).join('');
}

function copyVoucherCode(code) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(() => {
      showToast('Voucher code ' + code + ' copied to clipboard!', 'info');
    }).catch(() => {
      showToast('Voucher code: ' + code, 'info');
    });
  } else {
    showToast('Voucher code: ' + code, 'info');
  }
}

function applyVoucherAndOrder(code) {
  state.selectedVoucherCode = code;
  navigateTo('guestView');
  showToast(`Voucher ${code} applied! Add items to cart and proceed to checkout.`, 'success');
}

function renderPointsHistory(history) {
  const container = document.getElementById('pointsHistoryList');
  if (!container) return;

  if (!history || history.length === 0) {
    container.innerHTML = `<div class="empty-voucher-box"><p>No points activity recorded yet.</p></div>`;
    return;
  }

  container.innerHTML = history.slice(0, 8).map(h => {
    const isEarn = h.points > 0;
    return `
      <div class="points-history-item">
        <div class="history-left">
          <span class="history-pill ${isEarn ? 'history-earn' : 'history-redeem'}">
            ${isEarn ? `+${h.points} pts` : `${h.points} pts`}
          </span>
          <span class="history-desc">${h.desc}</span>
        </div>
        <small class="history-date">${h.date}</small>
      </div>
    `;
  }).join('');
}

function handleProfileUpdate(e) {
  e.preventDefault();
  if (!state.currentUser) return;

  const name = document.getElementById('profileName').value.trim();
  const email = document.getElementById('profileEmail').value.trim();
  const contact = document.getElementById('profileContact').value.trim();
  const deliveryAddress = document.getElementById('profileDeliveryAddress').value.trim();

  state.currentUser.name = name;
  state.currentUser.email = email;
  state.currentUser.contact = contact;
  state.currentUser.deliveryAddress = deliveryAddress;

  saveCurrentUserProfile();
  updateAuthPill();
  renderCustomerProfile();
  showToast('Customer profile & delivery address saved successfully!', 'success');
}

function saveCurrentUserProfile() {
  if (!state.currentUser) return;
  sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(state.currentUser));

  // If this user has an account in localStorage ACCOUNTS, update it
  const accounts = getStoredAccounts();
  const idx = accounts.findIndex(a => 
    (a.username && state.currentUser.username && a.username.toLowerCase() === state.currentUser.username.toLowerCase()) ||
    (a.username && state.currentUser.id && a.username.toLowerCase() === state.currentUser.id.toLowerCase())
  );

  if (idx !== -1) {
    accounts[idx] = { ...accounts[idx], ...state.currentUser };
    saveStoredAccounts(accounts);
  }
}

function quickFillReservationFromProfile() {
  if (!state.currentUser) return;
  const resName = document.getElementById('resName');
  const resEmail = document.getElementById('resEmail');
  const resPhone = document.getElementById('resPhone');

  if (resName) resName.value = state.currentUser.name || '';
  if (resEmail) resEmail.value = state.currentUser.email || '';
  if (resPhone) resPhone.value = state.currentUser.contact || '';

  scrollToReservation();
  showToast('Table reservation pre-filled with your profile info!', 'info');
}

function renderGuestOrders() {
  const container = document.getElementById('guestOrdersContainer');
  if (!container) return;

  const orders = getStoredOrders();
  if (orders.length === 0) {
    container.innerHTML = `
      <div style="background: white; padding: 2rem; border-radius: 8px; text-align: center; border: 1px solid var(--card-border);">
        <p>No active coffee orders yet. Order a beverage to track it here!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(order => {
    let statusClass = 'status-pending';
    let statusLabel = 'Received & Queued';
    if (order.status === 'Preparing') {
      statusClass = 'status-preparing';
      statusLabel = 'Brewing / Steaming';
    } else if (order.status === 'Ready') {
      statusClass = 'status-ready';
      statusLabel = 'Ready at Pickup Counter';
    } else if (order.status === 'Completed') {
      statusClass = 'status-completed';
      statusLabel = 'Completed & Picked Up';
    }

    return `
      <div class="guest-order-card">
        <div class="order-card-header">
          <div>
            <strong>Order #${order.id}</strong> &bull; <small>${new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
            <div><small class="text-muted">Type: ${order.orderType} | Payment: ${order.paymentMethod}</small></div>
          </div>
          <span class="order-status-badge ${statusClass}">${statusLabel}</span>
        </div>
        <div class="order-card-items">
          ${order.items.map(it => `
            <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 0.35rem;">
              <span><strong>${it.qty}x</strong> ${it.name} ${it.size ? `(${it.size})` : ''} <small style="color:#786554;">${it.mods || ''}</small></span>
              <span>₱${(it.price * it.qty).toFixed(2)}</span>
            </div>
          `).join('')}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--espresso-border); padding-top: 0.75rem; margin-top: 0.75rem;">
          <button class="btn btn-outline btn-sm" onclick="viewReceipt('${order.id}')">View Digital Receipt</button>
          <div><strong>Total: ₱${order.total.toFixed(2)}</strong></div>
        </div>
      </div>
    `;
  }).join('');
}

// ============================================================================
// 7. CASHIER EXPERIENCE (POS & KITCHEN QUEUE)
// ============================================================================

let posFilterCategory = 'all';
let posSearchQuery = '';

function switchCashierSubTab(tabName) {
  document.querySelectorAll('.pos-mode-switcher .btn-sub-nav').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.cashier-tab-content').forEach(c => c.classList.remove('active'));

  if (tabName === 'register') {
    document.getElementById('btnPosRegister').classList.add('active');
    document.getElementById('cashierRegisterTab').classList.add('active');
    renderPosCatalog();
  } else if (tabName === 'queue') {
    document.getElementById('btnPosQueue').classList.add('active');
    document.getElementById('cashierQueueTab').classList.add('active');
    renderKitchenQueue();
  } else if (tabName === 'reservations') {
    document.getElementById('btnPosReservations').classList.add('active');
    document.getElementById('cashierReservationsTab').classList.add('active');
    renderCashierReservations();
  } else if (tabName === 'history') {
    document.getElementById('btnPosHistory').classList.add('active');
    document.getElementById('cashierHistoryTab').classList.add('active');
    renderCashierHistory();
  }
}

function filterPosCatalog(cat, btnEl) {
  posFilterCategory = cat;
  document.querySelectorAll('#posCategoryTabs .pos-cat-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');
  renderPosCatalog();
}

function filterPosSearch(val) {
  posSearchQuery = val.toLowerCase();
  renderPosCatalog();
}

function renderPosCategoryTabs(menu) {
  const tabs = document.getElementById('posCategoryTabs');
  const guestTabs = [...document.querySelectorAll('#categoryFilterBar .tab-btn')];
  if (!tabs) return;

  // Keep POS categories aligned with the customer menu, but do not make the
  // catalog depend on image metadata or exact casing in older saved records.
  const guestCategories = guestTabs.map(btn => {
    const match = (btn.getAttribute('onclick') || '').match(/filterMenuCategory\('([^']+)'/);
    return match ? { value: match[1], label: btn.textContent.trim() } : null;
  }).filter(Boolean).filter(item => item.value === 'all' || menu.some(m =>
    m && String(m.category || '').trim().toLowerCase() === item.value.trim().toLowerCase()
  ));

  tabs.innerHTML = guestCategories.map(item =>
    `<button class="pos-cat-btn ${posFilterCategory.toLowerCase() === item.value.toLowerCase() ? 'active' : ''}" onclick="filterPosCatalog('${item.value}', this)">${item.label}</button>`
  ).join('');

  if (!guestCategories.some(item => item.value.toLowerCase() === String(posFilterCategory).toLowerCase())) {
    posFilterCategory = 'all';
    const allButton = tabs.querySelector('.pos-cat-btn');
    if (allButton) allButton.classList.add('active');
  }
}

function renderPosCatalog() {
  const grid = document.getElementById('posItemsGrid');
  if (!grid) return;

  const menu = getStoredMenu();
  renderPosCategoryTabs(menu);
  const guestCategoryValues = [...document.querySelectorAll('#categoryFilterBar .tab-btn')].map(btn => {
    const match = (btn.getAttribute('onclick') || '').match(/filterMenuCategory\('([^']+)'/);
    return match ? match[1].trim().toLowerCase() : null;
  }).filter(Boolean);

  const visibleMenu = menu.filter(item => item && item.name &&
    guestCategoryValues.includes(String(item.category || '').trim().toLowerCase())
  );
  const categoryKey = String(posFilterCategory || 'all').trim().toLowerCase();
  let filtered = visibleMenu.filter(item => {
    const matchesCategory = categoryKey === 'all' || String(item.category || '').trim().toLowerCase() === categoryKey;
    const matchesSearch = String(item.name || '').toLowerCase().includes(posSearchQuery);
    return matchesCategory && matchesSearch;
  });

  // Older saved browser catalogs may contain category labels that differ from
  // the current guest tabs. Avoid an empty POS screen: show the available menu
  // rather than hiding every product.
  if (!filtered.length && !posSearchQuery) {
    filtered = visibleMenu;
    if (!filtered.length) filtered = menu.filter(item => item && item.name);
    posFilterCategory = 'all';
    document.querySelectorAll('#posCategoryTabs .pos-cat-btn').forEach((button, index) => {
      button.classList.toggle('active', index === 0);
    });
  }

  filtered.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

  grid.innerHTML = filtered.map(item => `
    <button class="pos-item-btn ${!item.inStock ? 'disabled' : ''}"
      onclick="handlePosItemClick('${item.id}')"
      ${!item.inStock ? 'disabled' : ''}>
      <div class="pos-item-top">
        <span class="item-category-tag">${item.category || ''}</span>
        <span class="pos-item-price">₱${Number(item.price || 0).toFixed(2)}</span>
      </div>
      <div>
        <div class="pos-item-name">${item.name}</div>
        <small style="color: ${item.inStock ? '#786554' : '#ef4444'}; font-size: 0.7rem;">
          ${item.inStock ? 'Available' : 'Out of Stock'}
        </small>
      </div>
    </button>
  `).join('');
}

function handlePosItemClick(itemId) {
  const menu = getStoredMenu();
  const item = menu.find(i => i.id === itemId);
  if (!item || !item.inStock) return;

  if (item.category === 'Pastries') {
    addPosTicketItem({
      id: item.id,
      name: item.name,
      size: 'Standard',
      price: item.price,
      qty: 1,
      mods: ''
    });
  } else {
    openCustomizerModal(itemId, 'cashier');
  }
}

function addPosTicketItem(item) {
  const existing = state.posTicket.find(i => i.id === item.id && i.size === item.size && i.mods === item.mods);
  if (existing) {
    existing.qty += 1;
  } else {
    state.posTicket.push(item);
  }
  updatePosTicketUI();
}

function updatePosTicketUI() {
  const container = document.getElementById('posTicketItems');
  const subtotalEl = document.getElementById('posSubtotal');
  const taxEl = document.getElementById('posTax');
  const totalEl = document.getElementById('posTotal');
  const payBtn = document.getElementById('btnProcessPayment');

  if (!container) return;

  if (state.posTicket.length === 0) {
    container.innerHTML = `
      <div class="pos-empty-ticket">
        <p>No items added to current ticket.</p>
        <small>Tap on any menu item on the left to add.</small>
      </div>
    `;
    subtotalEl.textContent = '₱0.00';
    taxEl.textContent = '₱0.00';
    totalEl.textContent = '₱0.00';
    const discountEl = document.getElementById('posDiscountAmount');
    if (discountEl) discountEl.textContent = '-₱0.00';
    state.posDiscount = null;
    const discountInput = document.getElementById('posDiscountCode');
    if (discountInput) discountInput.value = '';
    const clearDiscount = document.getElementById('clearPosDiscount');
    if (clearDiscount) clearDiscount.style.display = 'none';
    payBtn.disabled = true;
    return;
  }

  let subtotal = 0;
  container.innerHTML = state.posTicket.map((item, idx) => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    return `
      <div class="cart-item-row">
        <div class="cart-item-info">
          <h5>${item.name}</h5>
          <div class="cart-item-mods">
            ${item.size ? `Size: ${item.size}` : ''}
            ${item.mods ? ` &bull; ${item.mods}` : ''}
          </div>
        </div>
        <div class="cart-item-actions">
          <span class="cart-item-price">₱${itemTotal.toFixed(2)}</span>
          <div class="qty-control">
            <button class="qty-btn" onclick="changePosQty(${idx}, -1)">&minus;</button>
            <span class="qty-number">${item.qty}</span>
            <button class="qty-btn" onclick="changePosQty(${idx}, 1)">&plus;</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const discount = Math.min(subtotal, state.posDiscount ? state.posDiscount.amount : 0);
  const taxableSubtotal = Math.max(0, subtotal - discount);
  const tax = taxableSubtotal * 0.12;
  const total = taxableSubtotal + tax;

  subtotalEl.textContent = `₱${subtotal.toFixed(2)}`;
  taxEl.textContent = `₱${tax.toFixed(2)}`;
  totalEl.textContent = `₱${total.toFixed(2)}`;
  const discountEl = document.getElementById('posDiscountAmount');
  if (discountEl) discountEl.textContent = `-₱${discount.toFixed(2)}`;
  const clearDiscount = document.getElementById('clearPosDiscount');
  if (clearDiscount) clearDiscount.style.display = state.posDiscount ? 'inline-block' : 'none';
  payBtn.disabled = false;
}

function applyPosDiscountCode() {
  const input = document.getElementById('posDiscountCode');
  const code = (input ? input.value : '').trim().toUpperCase();
  if (!code) { showToast('Enter a discount code first.', 'warning'); return; }
  const accounts = getStoredAccounts();
  let match = null;
  accounts.forEach(account => {
    const vouchers = account.loyalty && Array.isArray(account.loyalty.vouchers) ? account.loyalty.vouchers : [];
    const voucher = vouchers.find(v => String(v.code || '').toUpperCase() === code && !v.used);
    if (voucher) match = voucher;
  });
  if (!match) { showToast('That discount code is invalid or has already been used.', 'error'); return; }
  state.posDiscount = { code, amount: Number(match.discount) || 0 };
  updatePosTicketUI();
  showToast(`Discount applied: ₱${state.posDiscount.amount.toFixed(2)} off.`, 'success');
}

function clearPosDiscountCode() {
  state.posDiscount = null;
  const input = document.getElementById('posDiscountCode');
  if (input) input.value = '';
  updatePosTicketUI();
}

function changePosQty(idx, change) {
  if (!state.posTicket[idx]) return;
  state.posTicket[idx].qty += change;
  if (state.posTicket[idx].qty <= 0) {
    state.posTicket.splice(idx, 1);
  }
  updatePosTicketUI();
}

function clearPosTicket() {
  if (state.posTicket.length > 0 && confirm('Clear active POS order ticket?')) {
    state.posTicket = [];
    updatePosTicketUI();
  }
}

function openPosModifierModal() {
  const note = prompt('Add custom order kitchen note (e.g. Extra hot, double cup, separate bag):');
  if (note && note.trim()) {
    state.posTicket.push({
      id: 'custom-note-' + Date.now(),
      name: 'Special Instruction',
      size: '',
      price: 0,
      qty: 1,
      mods: note.trim()
    });
    updatePosTicketUI();
  }
}

// POS Payment Processing
function openPaymentModal() {
  if (state.posTicket.length === 0) return;
  const modal = document.getElementById('paymentModal');
  const subtotal = state.posTicket.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const discount = Math.min(subtotal, state.posDiscount ? state.posDiscount.amount : 0);
  const total = (subtotal - discount) * 1.12;

  document.getElementById('paymentDueDisplay').textContent = `₱${total.toFixed(2)}`;
  document.getElementById('cashTendered').value = total.toFixed(2);
  calculateChange();
  modal.style.display = 'flex';
  togglePayInputs(document.querySelector('input[name="payMethod"]:checked').value);
}

function closePaymentModal() {
  document.getElementById('paymentModal').style.display = 'none';
}

function togglePayInputs(method) {
  const cashFields = document.getElementById('cashFields');
  const qrFields = document.getElementById('qrPaymentFields');
  cashFields.style.display = (method === 'cash') ? 'block' : 'none';
  qrFields.style.display = (method === 'gcash' || method === 'maya') ? 'block' : 'none';

  if (method === 'gcash' || method === 'maya') {
    const image = document.getElementById('posPaymentQrImage');
    const instruction = document.getElementById('posQrPaymentInstruction');
    image.src = method === 'gcash' ? 'gcash-qr.png' : 'maya-qr.png';
    image.alt = method === 'gcash' ? 'GCash payment QR' : 'Maya payment QR';
    instruction.textContent = method === 'gcash'
      ? 'Scan this GCash QR using the GCash app.'
      : 'Scan this Maya QR using the Maya app.';
  }
}

function updateGuestQrPaymentPreview() {
  const method = document.getElementById('guestPaymentType').value;
  const preview = document.getElementById('guestQrPaymentPreview');
  const image = document.getElementById('guestPaymentQrImage');
  const instruction = document.getElementById('guestQrPaymentInstruction');
  const isQr = method === 'GCash QR' || method === 'Maya QR';
  preview.style.display = isQr ? 'block' : 'none';

  if (isQr) {
    image.src = method === 'GCash QR' ? 'gcash-qr.png' : 'maya-qr.png';
    image.alt = method === 'GCash QR' ? 'GCash payment QR' : 'Maya payment QR';
    instruction.textContent = method === 'GCash QR'
      ? 'Scan this GCash QR using the GCash app.'
      : 'Scan this Maya QR using the Maya app.';
  }
}

function calculateChange() {
  const subtotal = state.posTicket.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const discount = Math.min(subtotal, state.posDiscount ? state.posDiscount.amount : 0);
  const total = (subtotal - discount) * 1.12;
  const tendered = parseFloat(document.getElementById('cashTendered').value) || 0;
  const change = Math.max(0, tendered - total);
  document.getElementById('changeDueDisplay').textContent = `₱${change.toFixed(2)}`;
}

function setQuickCash(amount) {
  document.getElementById('cashTendered').value = amount.toFixed(2);
  calculateChange();
}

function setExactCash() {
  const subtotal = state.posTicket.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const discount = Math.min(subtotal, state.posDiscount ? state.posDiscount.amount : 0);
  const total = (subtotal - discount) * 1.12;
  document.getElementById('cashTendered').value = total.toFixed(2);
  calculateChange();
}

function finalizePayment() {
  const payMethodInput = document.querySelector('input[name="payMethod"]:checked').value;
  let payMethodText = 'Cash';
  if (payMethodInput === 'gcash') payMethodText = 'GCash QR';
  if (payMethodInput === 'maya') payMethodText = 'Maya QR';

  const custName = document.getElementById('posCustomerName').value.trim() || 'Counter Customer';
  const orderType = document.getElementById('posOrderType').value;

  const subtotal = state.posTicket.reduce((sum, i) => sum + (i.price * i.qty), 0);
  const discount = Math.min(subtotal, state.posDiscount ? state.posDiscount.amount : 0);
  const tax = (subtotal - discount) * 0.12;
  const total = subtotal - discount + tax;

  const newOrder = {
    id: 'LAB-' + Math.floor(1000 + Math.random() * 9000),
    customerName: custName,
    customerRole: 'Cashier Register #01',
    orderType: orderType,
    timestamp: new Date().toISOString(),
    status: 'Pending',
    paymentMethod: payMethodText,
    items: JSON.parse(JSON.stringify(state.posTicket)),
    subtotal: subtotal,
    discount: discount,
    discountCode: state.posDiscount ? state.posDiscount.code : '',
    tax: tax,
    total: total
  };

  const orders = getStoredOrders();
  orders.unshift(newOrder);
  saveStoredOrders(orders);
  if (state.posDiscount && state.posDiscount.code) {
    const accounts = getStoredAccounts();
    accounts.forEach(account => {
      const vouchers = account.loyalty && Array.isArray(account.loyalty.vouchers) ? account.loyalty.vouchers : [];
      const voucher = vouchers.find(v => String(v.code || '').toUpperCase() === state.posDiscount.code);
      if (voucher) voucher.used = true;
    });
    saveStoredAccounts(accounts);
  }

  state.posTicket = [];
  state.posDiscount = null;
  document.getElementById('posCustomerName').value = '';
  updatePosTicketUI();
  closePaymentModal();

  showToast('Transaction approved. Receipt #' + newOrder.id + ' generated.', 'success');

  viewReceipt(newOrder.id);
  renderKitchenQueue();
}

// Kitchen Kanban Queue Management
let cashierQueueTypeFilter = 'all';
let adminOrderTypeFilter = 'all';

function normalizedOrderType(order) {
  const type = String(order.orderType || '').toLowerCase();
  const origin = String(order.customerRole || '').toLowerCase();
  if (type.includes('dine')) return 'dine-in';
  if (type.includes('deliver') || type.includes('online')) return 'online';
  // Customer/member orders are placed online even when the selected fulfillment is take-out.
  if (origin && !origin.includes('cashier register')) return 'online';
  return 'takeout';
}

function setCashierQueueTypeFilter(value) {
  cashierQueueTypeFilter = value;
  renderKitchenQueue();
}

function formatWaitingTime(timestamp) {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000));
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${String(secs).padStart(2, '0')}s`;
}

function renderKitchenQueue() {
  const allOrders = getStoredOrders();
  const orders = allOrders.filter(o => cashierQueueTypeFilter === 'all' || normalizedOrderType(o) === cashierQueueTypeFilter);
  const queueBadge = document.getElementById('queueBadge');

  const pending = orders.filter(o => o.status === 'Pending');
  const preparing = orders.filter(o => o.status === 'Preparing');
  const ready = orders.filter(o => o.status === 'Ready');
  const completed = orders.filter(o => o.status === 'Completed').slice(0, 8);

  const activeCount = pending.length + preparing.length + ready.length;
  if (queueBadge) queueBadge.textContent = activeCount;

  document.getElementById('countPending').textContent = pending.length;
  document.getElementById('countPreparing').textContent = preparing.length;
  document.getElementById('countReady').textContent = ready.length;
  document.getElementById('countCompleted').textContent = completed.length;

  renderQueueCol('listPending', pending, 'Start Prep', 'Preparing');
  renderQueueCol('listPreparing', preparing, 'Mark Ready', 'Ready');
  renderQueueCol('listReady', ready, 'Hand Out', 'Completed');
  renderQueueCol('listCompleted', completed, null, null);
}

function renderQueueCol(colId, list, nextLabel, nextStatus) {
  const col = document.getElementById(colId);
  if (!col) return;

  if (list.length === 0) {
    col.innerHTML = '<div style="text-align:center; color:#9c8879; padding: 1.5rem 0.5rem; font-size:0.8rem;">No orders</div>';
    return;
  }

  col.innerHTML = list.map(o => `
    <div class="kitchen-card">
      <div class="kitchen-card-header">
        <span>#${o.id} - ${o.customerName}</span>
        <span style="color:#786554;">${o.orderType}</span>
      </div>
      ${o.status === 'Pending' ? `<div class="order-wait-timer" data-wait-start="${new Date(o.timestamp).getTime()}">Waiting to prep: ${formatWaitingTime(o.timestamp)}</div>` : ''}
      <div class="kitchen-card-items">
        ${o.items.map(it => `
          <div class="kitchen-item-row">
            <strong>${it.qty}x</strong> ${it.name} ${it.size ? `(${it.size})` : ''}
            ${it.mods ? `<div style="color:#b86d29; font-size:0.75rem;">${it.mods}</div>` : ''}
          </div>
        `).join('')}
      </div>
      <div class="kitchen-card-actions">
        ${nextStatus ? `
          <button class="btn btn-primary btn-sm" onclick="advanceOrderStatus('${o.id}', '${nextStatus}')">
            ${nextLabel}
          </button>
        ` : `
          <small class="text-muted">Delivered</small>
        `}
      </div>
    </div>
  `).join('');
}

function advanceOrderStatus(orderId, newStatus) {
  const orders = getStoredOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    if (newStatus === 'Preparing') order.prepStartedAt = new Date().toISOString();
    saveStoredOrders(orders);
    showToast('Order #' + orderId + ' moved to ' + newStatus + '.', 'info');
    renderKitchenQueue();
  }
}

function renderCashierHistory() {
  const tbody = document.getElementById('cashierHistoryTableBody');
  if (!tbody) return;

  const orders = getStoredOrders();
  tbody.innerHTML = orders.map(o => `
    <tr>
      <td><strong>#${o.id}</strong></td>
      <td>${new Date(o.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
      <td>${o.customerName}</td>
      <td>${o.items.reduce((s, i) => s + i.qty, 0)} items</td>
      <td><strong>₱${o.total.toFixed(2)}</strong></td>
      <td>${o.paymentMethod}</td>
      <td><span class="order-status-badge status-${o.status.toLowerCase()}">${o.status}</span></td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="viewReceipt('${o.id}')">Receipt</button>
      </td>
    </tr>
  `).join('');
}

// ============================================================================
// 8. ADMIN EXPERIENCE (MENU CRUD, INVENTORY & ANALYTICS)
// ============================================================================

let adminFilterQuery = '';
let adminFilterCategory = 'all';

function switchAdminTab(tabName) {
  document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));

  if (tabName === 'menu') {
    document.getElementById('btnAdminMenu').classList.add('active');
    document.getElementById('adminMenuTab').classList.add('active');
    renderAdminMenuTable();
  } else if (tabName === 'reservations') {
    document.getElementById('btnAdminReservations').classList.add('active');
    document.getElementById('adminReservationsTab').classList.add('active');
    renderAdminReservationsTable();
  } else if (tabName === 'orders') {
    document.getElementById('btnAdminOrders').classList.add('active');
    document.getElementById('adminOrdersTab').classList.add('active');
    renderAdminOrdersTable();
  } else if (tabName === 'staff') {
    document.getElementById('btnAdminStaff').classList.add('active');
    document.getElementById('adminStaffTab').classList.add('active');
  }
}

function renderAdminStats() {
  const orders = getStoredOrders();
  const menu = getStoredMenu();
  const reservations = getStoredReservations();

  const totalRev = orders.reduce((sum, o) => sum + o.total, 0);
  const totalCount = orders.length;
  const outOfStockCount = menu.filter(m => !m.inStock).length;
  const activeResCount = reservations.filter(r => r.status !== 'Cancelled').length;

  document.getElementById('adminTotalRevenue').textContent = `₱${totalRev.toFixed(2)}`;
  document.getElementById('adminTotalOrders').textContent = totalCount;
  document.getElementById('adminTotalReservations').textContent = activeResCount;
  document.getElementById('adminActiveItemsCount').textContent = menu.length;
  document.getElementById('adminOutOfStockCount').textContent = `${outOfStockCount} Out of Stock`;
}

function filterAdminItems(val) {
  adminFilterQuery = val.toLowerCase();
  renderAdminMenuTable();
}

function filterAdminCategory(val) {
  adminFilterCategory = val;
  renderAdminMenuTable();
}

function renderAdminMenuTable() {
  const tbody = document.getElementById('adminMenuTableBody');
  if (!tbody) return;

  const menu = getStoredMenu();
  // Keep the admin catalog in sync with the customer-facing menu: every item
  // with a product image is eligible to appear in the guest menu. Do not depend
  // on reading the guest category buttons from the DOM, since that can return
  // an empty list while the admin tab is being initialized.
  const customerMenuItems = menu.filter(item => item && item.name && item.image);
  const guestCategories = [...new Set(customerMenuItems
    .map(item => String(item.category || '').trim())
    .filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  const adminCatSelect = document.getElementById('adminCategorySelectFilter');
  if (adminCatSelect) {
    if (adminFilterCategory !== 'all' && !guestCategories.includes(adminFilterCategory)) {
      adminFilterCategory = 'all';
    }
    adminCatSelect.innerHTML = '<option value="all">All Categories</option>' +
      guestCategories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    adminCatSelect.value = adminFilterCategory;
  }

  const filtered = customerMenuItems.filter(item => {
    const matchesCategory = adminFilterCategory === 'all' || item.category === adminFilterCategory;
    const matchesSearch = String(item.name || '').toLowerCase().includes(adminFilterQuery) ||
                          String(item.category || '').toLowerCase().includes(adminFilterQuery);
    return matchesCategory && matchesSearch;
  });

  filtered.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

  tbody.innerHTML = filtered.map(item => `
    <tr>
      <td>
        <div>
          <strong>${item.name}</strong>
          <div style="font-size: 0.75rem; color: #786554; max-width: 320px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
            ${item.description || ''}
          </div>
        </div>
      </td>
      <td><span class="item-category-tag">${item.category || '-'}</span></td>
      <td><strong>₱${Number(item.price || 0).toFixed(2)}</strong></td>
      <td>${item.calories || '-'}</td>
      <td>
        <button class="stock-toggle-btn ${item.inStock ? 'stock-in' : 'stock-out'}"
          onclick="toggleItemStock('${item.id}')"
          title="Click to toggle availability">
          ${item.inStock ? 'In Stock' : 'Out of Stock'}
        </button>
      </td>
      <td>
        <div style="display: flex; gap: 0.4rem;">
          <button class="btn btn-secondary btn-sm" onclick="openEditMenuItemModal('${item.id}')">Edit</button>
          <button class="btn btn-outline btn-sm" style="color: var(--danger); border-color: var(--danger);" onclick="deleteMenuItem('${item.id}')">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');

  if (!filtered.length) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:2rem; color:#786554;">No customer-menu items match this filter.</td></tr>';
  }
}

function toggleItemStock(itemId) {
  const menu = getStoredMenu();
  const item = menu.find(i => i.id === itemId);
  if (item) {
    item.inStock = !item.inStock;
    saveStoredMenu(menu);
    renderAdminMenuTable();
    renderAdminStats();
    showToast('Updated stock: "' + item.name + '" is now ' + (item.inStock ? 'In Stock' : 'Out of Stock') + '.', 'info');
  }
}

function openAddMenuItemModal() {
  document.getElementById('menuModalTitle').textContent = 'Add New Coffee / Food Item';
  document.getElementById('editItemId').value = '';
  document.getElementById('itemFormName').value = '';
  document.getElementById('itemFormCategory').value = 'Hot Coffee';
  document.getElementById('itemFormPrice').value = '5.00';
  document.getElementById('itemFormCalories').value = '150';
  document.getElementById('itemFormStock').value = 'true';
  document.getElementById('itemFormDesc').value = '';

  document.getElementById('menuItemModal').style.display = 'flex';
}

function openEditMenuItemModal(itemId) {
  const menu = getStoredMenu();
  const item = menu.find(i => i.id === itemId);
  if (!item) return;

  document.getElementById('menuModalTitle').textContent = 'Edit Menu Item';
  document.getElementById('editItemId').value = item.id;
  document.getElementById('itemFormName').value = item.name;
  document.getElementById('itemFormCategory').value = item.category;
  document.getElementById('itemFormPrice').value = item.price.toFixed(2);
  document.getElementById('itemFormCalories').value = item.calories || '';
  document.getElementById('itemFormStock').value = item.inStock ? 'true' : 'false';
  document.getElementById('itemFormDesc').value = item.description || '';

  document.getElementById('menuItemModal').style.display = 'flex';
}

function closeMenuItemModal() {
  document.getElementById('menuItemModal').style.display = 'none';
}

function handleSaveMenuItem(e) {
  e.preventDefault();
  const editId = document.getElementById('editItemId').value;
  const name = document.getElementById('itemFormName').value.trim();
  const category = document.getElementById('itemFormCategory').value;
  const price = parseFloat(document.getElementById('itemFormPrice').value) || 4.50;
  const calories = parseInt(document.getElementById('itemFormCalories').value, 10) || null;
  const inStock = document.getElementById('itemFormStock').value === 'true';
  const description = document.getElementById('itemFormDesc').value.trim();

  const menu = getStoredMenu();

  if (editId) {
    const existingIndex = menu.findIndex(i => i.id === editId);
    if (existingIndex > -1) {
      menu[existingIndex] = {
        ...menu[existingIndex],
        name, category, price, calories, inStock, description
      };
      showToast('Updated "' + name + '" in catalog.', 'success');
    }
  } else {
    const newItem = {
      id: 'item-' + Date.now(),
      name, category, price, calories, inStock, description
    };
    menu.push(newItem);
    showToast('Added new item "' + name + '" to catalog.', 'success');
  }

  saveStoredMenu(menu);
  closeMenuItemModal();
  renderAdminMenuTable();
  renderAdminStats();
}

function deleteMenuItem(itemId) {
  const menu = getStoredMenu();
  const item = menu.find(i => i.id === itemId);
  if (!item) return;

  if (confirm('Are you sure you want to delete "' + item.name + '" from the menu?')) {
    const updated = menu.filter(i => i.id !== itemId);
    saveStoredMenu(updated);
    renderAdminMenuTable();
    renderAdminStats();
    showToast('Deleted "' + item.name + '".', 'info');
  }
}

function setAdminOrderTypeFilter(value) {
  adminOrderTypeFilter = value;
  renderAdminOrdersTable();
}

function renderAdminOrdersTable() {
  const tbody = document.getElementById('adminOrdersTableBody');
  if (!tbody) return;

  const orders = getStoredOrders().filter(o => adminOrderTypeFilter === 'all' || normalizedOrderType(o) === adminOrderTypeFilter);
  tbody.innerHTML = orders.map(o => `
    <tr>
      <td><strong>#${o.id}</strong></td>
      <td>${new Date(o.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</td>
      <td>${o.customerName}</td>
      <td><span class="item-category-tag">${o.customerRole}</span></td>
      <td>${o.items.map(i => `${i.qty}x ${i.name}`).join(', ')}</td>
      <td>₱${o.subtotal.toFixed(2)}</td>
      <td>₱${o.tax.toFixed(2)}</td>
      <td><strong>₱${o.total.toFixed(2)}</strong></td>
      <td><span class="order-status-badge status-${o.status.toLowerCase()}">${o.status}</span></td>
      <td>${o.status === 'Pending' ? `<span class="order-wait-timer" data-wait-start="${new Date(o.timestamp).getTime()}">${formatWaitingTime(o.timestamp)}</span>` : '—'}</td>
    </tr>
  `).join('');
}

// ============================================================================
// 9. DRINK CUSTOMIZATION & RECEIPT MODALS
// ============================================================================

let activeCallerRole = 'guest';

function openCustomizerModal(itemId, callerRole) {
  activeCallerRole = callerRole;
  const menu = getStoredMenu();
  const item = menu.find(i => i.id === itemId);
  if (!item) return;

  state.activeModalItem = item;
  state.customizerConfig = {
    size: 'Medium',
    sizeExtra: 0.50,
    milk: 'Whole Milk',
    milkExtra: 0,
    sweetness: '100%',
    addons: []
  };

  document.getElementById('customizerItemName').textContent = `Customize: ${item.name}`;

  const body = document.getElementById('customizerBody');
  body.innerHTML = `
    <!-- Size Selector -->
    <div class="customizer-section">
      <h5>Select Cup Size</h5>
      <div class="pill-selector">
        <button type="button" class="pill-option" onclick="selectCustomizerSize('Small', 0, this)">Small (8oz)</button>
        <button type="button" class="pill-option active" onclick="selectCustomizerSize('Medium', 0.50, this)">Medium (12oz) +₱0.50</button>
        <button type="button" class="pill-option" onclick="selectCustomizerSize('Large', 1.00, this)">Large (16oz) +₱1.00</button>
      </div>
    </div>

    <!-- Milk Options -->
    <div class="customizer-section">
      <h5>Milk & Dairy Alternatives</h5>
      <div class="pill-selector">
        <button type="button" class="pill-option active" onclick="selectCustomizerMilk('Whole Milk', 0, this)">Whole Milk</button>
        <button type="button" class="pill-option" onclick="selectCustomizerMilk('Oat Milk', 0.65, this)">Oat Milk (+₱0.65)</button>
        <button type="button" class="pill-option" onclick="selectCustomizerMilk('Almond Milk', 0.65, this)">Almond Milk (+₱0.65)</button>
        <button type="button" class="pill-option" onclick="selectCustomizerMilk('Skim Milk', 0, this)">Skim Milk</button>
      </div>
    </div>

    <!-- Sweetness Level -->
    <div class="customizer-section">
      <h5>Sweetness Level</h5>
      <div class="pill-selector">
        <button type="button" class="pill-option" onclick="selectCustomizerSweetness('Unsweetened (0%)', this)">0%</button>
        <button type="button" class="pill-option" onclick="selectCustomizerSweetness('Light (50%)', this)">50%</button>
        <button type="button" class="pill-option active" onclick="selectCustomizerSweetness('Regular (100%)', this)">100%</button>
        <button type="button" class="pill-option" onclick="selectCustomizerSweetness('Extra Sweet (150%)', this)">150%</button>
      </div>
    </div>

    <!-- Addons -->
    <div class="customizer-section">
      <h5>Flavor & Espresso Enhancements</h5>
      <div class="addons-list">
        <label class="addon-checkbox-label">
          <span><input type="checkbox" onchange="toggleCustomizerAddon('Extra Espresso Shot', 0.95, this.checked)"> Extra Espresso Shot</span>
          <strong>+₱0.95</strong>
        </label>
        <label class="addon-checkbox-label">
          <span><input type="checkbox" onchange="toggleCustomizerAddon('Vanilla Bean Drizzle', 0.50, this.checked)"> Vanilla Bean Drizzle</span>
          <strong>+₱0.50</strong>
        </label>
        <label class="addon-checkbox-label">
          <span><input type="checkbox" onchange="toggleCustomizerAddon('Salted Caramel Cold Foam', 1.00, this.checked)"> Salted Caramel Cold Foam</span>
          <strong>+₱1.00</strong>
        </label>
      </div>
    </div>
  `;

  updateCustomizerTotal();
  document.getElementById('customizerModal').style.display = 'flex';
}

function selectCustomizerSize(size, extra, el) {
  state.customizerConfig.size = size;
  state.customizerConfig.sizeExtra = extra;
  el.parentElement.querySelectorAll('.pill-option').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  updateCustomizerTotal();
}

function selectCustomizerMilk(milk, extra, el) {
  state.customizerConfig.milk = milk;
  state.customizerConfig.milkExtra = extra;
  el.parentElement.querySelectorAll('.pill-option').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  updateCustomizerTotal();
}

function selectCustomizerSweetness(sweet, el) {
  state.customizerConfig.sweetness = sweet;
  el.parentElement.querySelectorAll('.pill-option').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
}

function toggleCustomizerAddon(name, price, isChecked) {
  if (isChecked) {
    state.customizerConfig.addons.push({ name, price });
  } else {
    state.customizerConfig.addons = state.customizerConfig.addons.filter(a => a.name !== name);
  }
  updateCustomizerTotal();
}

function updateCustomizerTotal() {
  if (!state.activeModalItem) return;
  const base = state.activeModalItem.price;
  const addonsTotal = state.customizerConfig.addons.reduce((s, a) => s + a.price, 0);
  const total = base + state.customizerConfig.sizeExtra + state.customizerConfig.milkExtra + addonsTotal;
  document.getElementById('customizerTotalDisplay').textContent = `₱${total.toFixed(2)}`;
}

function closeCustomizerModal() {
  document.getElementById('customizerModal').style.display = 'none';
  state.activeModalItem = null;
}

function confirmCustomizerItem() {
  if (!state.activeModalItem) return;

  const base = state.activeModalItem.price;
  const addonsTotal = state.customizerConfig.addons.reduce((s, a) => s + a.price, 0);
  const itemUnitPrice = base + state.customizerConfig.sizeExtra + state.customizerConfig.milkExtra + addonsTotal;

  const modsList = [
    state.customizerConfig.milk,
    state.customizerConfig.sweetness,
    ...state.customizerConfig.addons.map(a => a.name)
  ].filter(Boolean).join(', ');

  const customizedCartItem = {
    id: state.activeModalItem.id,
    name: state.activeModalItem.name,
    size: state.customizerConfig.size,
    price: itemUnitPrice,
    qty: 1,
    mods: modsList
  };

  if (activeCallerRole === 'guest') {
    addGuestCartItem(customizedCartItem);
  } else {
    addPosTicketItem(customizedCartItem);
    showToast('Added ' + state.activeModalItem.name + ' to ticket.', 'success');
  }

  closeCustomizerModal();
}

// Thermal Receipt Viewer
function viewReceipt(orderId) {
  const orders = getStoredOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const content = document.getElementById('thermalReceiptContent');
  content.innerHTML = `
    <div class="receipt-center">
      <div style="font-size: 1.25rem; font-weight: bold;">THE COFFEE LAB</div>
      <div>Brewing Connections</div>
      <div>972 LNC Bldg., Maharlika Highway</div>
      <div>Banga 1st, Plaridel, Bulacan 3004</div>
    </div>
    <div class="receipt-divider"></div>
    <div>Order: #${order.id}</div>
    <div>Date: ${new Date(order.timestamp).toLocaleString()}</div>
    <div>Customer: ${order.customerName}</div>
    <div>Channel: ${order.orderType} (${order.customerRole})</div>
    <div class="receipt-divider"></div>
    ${order.items.map(it => `
      <div style="display: flex; justify-content: space-between;">
        <span>${it.qty}x ${it.name} ${it.size ? `(${it.size})` : ''}</span>
        <span>₱${(it.price * it.qty).toFixed(2)}</span>
      </div>
      ${it.mods ? `<div style="font-size: 0.75rem; color: #555; padding-left: 0.5rem;">- ${it.mods}</div>` : ''}
    `).join('')}
    <div class="receipt-divider"></div>
    <div style="display: flex; justify-content: space-between;">
      <span>Subtotal:</span>
      <span>₱${order.subtotal.toFixed(2)}</span>
    </div>
    <div style="display: flex; justify-content: space-between;">
      <span>VAT (12%):</span>
      <span>₱${order.tax.toFixed(2)}</span>
    </div>
    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1rem; margin-top: 0.35rem;">
      <span>TOTAL DUE:</span>
      <span>₱${order.total.toFixed(2)}</span>
    </div>
    <div class="receipt-divider"></div>
    <div class="receipt-center">
      <div>Payment: ${order.paymentMethod}</div>
      <div style="margin-top: 0.5rem;">STATUS: <strong>${order.status.toUpperCase()}</strong></div>
      <div style="margin-top: 0.75rem; font-size: 0.75rem;">*** THANK YOU FOR VISITING ***</div>
    </div>
  `;

  document.getElementById('receiptModal').style.display = 'flex';
}

function closeReceiptModal() {
  document.getElementById('receiptModal').style.display = 'none';
}

// Notification Toasts
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-indicator"></span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ============================================================================
// 10. INITIALIZATION
// ============================================================================

window.addEventListener('DOMContentLoaded', () => {
  initAuth();
});


// ============================================================================
// ADMIN CSV REPORT EXPORTS
// Exports the current localStorage data as downloadable CSV files.
// ============================================================================
function csvEscape(value) {
  const normalized = value === null || value === undefined ? '' : String(value);
  return '"' + normalized.replace(/"/g, '""') + '"';
}

function downloadCSVReport(filename, headers, rows) {
  const csv = [headers, ...rows]
    .map(row => row.map(csvEscape).join(','))
    .join('\r\n');
  // UTF-8 BOM helps spreadsheet apps (including Excel) display peso signs correctly.
  const blob = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function reportDateStamp() {
  return new Date().toISOString().slice(0, 10);
}

function exportSalesReportCSV() {
  const orders = getStoredOrders();
  const headers = [
    'Order ID', 'Date & Time', 'Customer', 'Customer Role', 'Order Type',
    'Items', 'Subtotal (PHP)', 'Tax (PHP)', 'Total (PHP)', 'Payment Method', 'Status'
  ];
  const rows = orders.map(order => [
    order.id,
    order.timestamp ? new Date(order.timestamp).toLocaleString() : '',
    order.customerName,
    order.customerRole,
    order.orderType,
    (order.items || []).map(item =>
      `${item.name || 'Item'}${item.size ? ` (${item.size})` : ''} x${item.qty || 1}`
    ).join('; '),
    Number(order.subtotal || 0).toFixed(2),
    Number(order.tax || 0).toFixed(2),
    Number(order.total || 0).toFixed(2),
    order.paymentMethod,
    order.status
  ]);
  downloadCSVReport(`coffee-lab-sales-${reportDateStamp()}.csv`, headers, rows);
  showToast('Sales report exported as CSV.');
}

function exportInventoryReportCSV() {
  const items = getStoredMenu();
  const headers = [
    'Item ID', 'Item Name', 'Category', 'Price (PHP)', 'Calories', 'In Stock', 'Description'
  ];
  const rows = items.map(item => [
    item.id,
    item.name,
    item.category,
    Number(item.price || 0).toFixed(2),
    item.calories,
    item.inStock ? 'Yes' : 'No',
    item.description
  ]);
  downloadCSVReport(`coffee-lab-inventory-${reportDateStamp()}.csv`, headers, rows);
  showToast('Inventory report exported as CSV.');
}

function exportReservationsReportCSV() {
  const reservations = getStoredReservations();
  const headers = [
    'Reservation ID', 'Customer Name', 'Email', 'Phone', 'Date', 'Time',
    'Guests', 'Seating Area', 'Notes', 'Status'
  ];
  const rows = reservations.map(reservation => [
    reservation.id,
    reservation.name,
    reservation.email,
    reservation.phone,
    reservation.date,
    reservation.time,
    reservation.guests,
    reservation.seatingArea || reservation.seating || '',
    reservation.notes,
    reservation.status
  ]);
  downloadCSVReport(`coffee-lab-reservations-${reportDateStamp()}.csv`, headers, rows);
  showToast('Reservations report exported as CSV.');
}


function updateOrderWaitTimers() {
  document.querySelectorAll('.order-wait-timer[data-wait-start]').forEach(el => {
    const started = Number(el.getAttribute('data-wait-start'));
    const elapsedMs = Math.max(0, Date.now() - started);
    const mins = Math.floor(elapsedMs / 60000);
    const secs = Math.floor((elapsedMs % 60000) / 1000);
    const isQueueCard = el.closest('.kitchen-card');
    el.textContent = `${isQueueCard ? 'Waiting to prep: ' : ''}${mins}m ${String(secs).padStart(2, '0')}s`;
    el.classList.toggle('overdue', mins >= 10);
  });
}

setInterval(updateOrderWaitTimers, 1000);
