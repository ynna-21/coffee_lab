# The Coffee Lab

An artisanal coffee shop web platform and point-of-sale system featuring a public **Home/About Page**, integrated **Table & Tasting Reservations**, a dedicated **Customer Sign In & Sign Up Portal**, and separate staff interfaces for **Cashier** and **Admin**.

---

## Key Features

### 1. Home & About Page
- **Hero & Roastery Showcase**: Brand philosophy (*The Science & Soul of Exceptional Coffee*), quick highlights (Single Origin micro-lots, daily in-house roasting, mineral water extraction, fresh French bakery).
- **Interactive Feature Strip**: Pour-over brew bar, nitrogen cold tap, sensory tasting flights, and coworking study space.
- **Our Story & Pillars**: The biochemical background of our extraction kinetics, direct farm sourcing, roasting profiles, and café hours/location.
- **Location & Google Maps Embed**:
  - Address: `972 LNC Bldg., Maharlika Highway, Banga 1st, Plaridel, Bulacan 3004`
  - Hours: Monday - Saturday: 7:00 AM - 8:00 PM | Sunday: Closed
  - Facebook: [facebook.com/PhCoffeeLab](https://www.facebook.com/PhCoffeeLab)
  - Interactive Google Maps embed with a direct "Open in Google Maps" link.
  - Amenities: "Pet-friendly" & "Free-WiFi" badges.
- **Table & Tasting Reservations (Integrated)**:
  - Interactive booking form with date, time slots, and party size (1 to 8 guests).
  - Choice of experience zone:
    - Barista Pour-Over Counter
    - Roastery Leather Lounge
    - Quiet Study Pod (Outlets + WiFi)
    - Guided Tasting & Sensory Flight
    - Sunny Garden Patio
  - **Live Confirmation Ticket**: Instant booking code (`#RES-XXXX`) and "My Bookings & Tickets" tracker with one-click cancellation.

### 2. Dedicated Customer Sign In & Sign Up
- **Separated Customer View**: Clean member portal accessible via the top-right **"Sign In / Join"** button.
- **Customer Sign In Tab**: Email or username with password login, plus 1-click Demo Member Auto-Fill (`jordan` / `password123`).
- **Create Account (Sign Up) Tab**: Allows new customers to register with full name, username, email address, contact number, delivery address, and password.
- **Welcome Bonus**: New customer registrations automatically receive **100 free Loyalty Points**.
- **Guest Express Access**: One-click passwordless guest entry. Loyalty rewards (points, tier progression, vouchers, and rewards shop) are excluded from guest mode and reserved exclusively for registered members.

### 3. Customer Profile & Loyalty Rewards System ("Connoisseur Club" - Members Only)
- **Customer Profile View**: Accessible via the navigation bar (`Profile & Rewards`) or by clicking the user header pill (`[ Jordan Hayes • 340 pts ]`).
- **Full Personal & Delivery Details**:
  - Customer Full Name
  - Username (read-only member identifier)
  - Email Address
  - Contact Number
  - Default Delivery Address (auto-populates mobile delivery orders & table bookings)
  - Editable form with instant local persistence and live profile updating.
- **Connoisseur Club Digital Membership Card**:
  - Espresso gradient finish with gold typography and member credentials.
  - Live Points Counter and Member Cardholder ID.
- **Tier Progression Engine**:
  - **Bronze Member** (0 - 199 pts): 10 pts per $1 spent, birthday brew.
  - **Silver Bean Tier** (200 - 499 pts): 12 pts per $1 spent, free organic milk substitutions.
  - **Gold Reserve Tier** (500 - 999 pts): 15 pts per $1 spent, free monthly pastry, priority cupping bar.
  - **Platinum Connoisseur** (1000+ pts): 20 pts per $1 spent, free drink upgrades, exclusive Q-Grader tasting invites.
  - Real-time progress bar tracking exact points needed to reach the next tier.
- **Loyalty Rewards Shop (Redeem Points for Vouchers)**:
  - `$2.00 Off Any Brew` (100 pts)
  - `Free French Butter Pastry` (180 pts)
  - `Free Artisanal Pour-Over` (300 pts)
  - `$10.00 Off Entire Order` (500 pts)
  - 1-click redemption with automatic point deduction, unique code generation, and wallet storage.
- **Active Vouchers Wallet**:
  - Stores all unredeemed reward tickets with 1-click "Copy Code" and "Use on Order" buttons.
- **Points Activity Log**:
  - Running history of points earned from orders or spent on rewards.
- **Seamless Checkout Integration**:
  - Checkout modal automatically pre-fills contact number and delivery address from profile.
  - Supports Dine-in, Takeout, and Direct Delivery (to address).
  - Apply active loyalty vouchers directly in checkout for instant discounts.
  - Auto-earns points on order completion based on tier multiplier.

### 3. Discreet Staff Log In (Bottom-Right Corner)
- Separate dedicated buttons for **Cashier** and **Admin** placed at the **bottom-right corner of the page**.
- Designed with compact, unobtrusive 11px typography that is easily clickable.
- Clicking either button launches the focused **Staff Authentication Modal**, pre-configured for the selected role with one-click demo credentials (`cashier` / `cashier123` and `admin` / `admin123`).

### 4. Customer Ordering, Customizer & Dedicated Cart Tab
- **In-Page Sub-Navigation**: Quick tab switcher for **Drink & Pastry Menu**, **My Cart (with live item count badge)**, and **My Orders & Receipts**.
- **Top Header Cart Navigation Tab**: The global navigation displays `Cart (X)` with real-time item count badge for immediate 1-click access across all views.
- **Dedicated Full-Page Cart Tab (`My Shopping Cart`)**:
  - Full itemized list of customized drinks and pastries.
  - Customization summary: Cup size, milk type, sweetness percentage, and add-ons.
  - Quantity controls (`-` / `+`) and 1-click item removal.
  - "Clear Cart" button to empty the order tray.
  - Sticky Order Summary panel: Subtotal, Tax (8.25%), Voucher discounts, and Estimated Total.
  - Live Member Loyalty preview: Shows estimated points that will be earned upon checkout.
  - One-click **"Proceed to Checkout"** button and **"Add More Drinks"** shortcut.
- **Drink Customizer**: Choose cup size, plant-based or dairy milks, sweetness levels (0% to 150%), and add-ons (extra espresso shot, salted caramel cold foam, vanilla drizzle).
- **Order Tracker & Thermal Receipt**: Live status updates (*Received* -> *Brewing* -> *Ready for Pickup* -> *Completed*).

### 5. Cashier POS Terminal & Kitchen Board
- **Quick-Tap Register**: Rapid ticket ringing, custom kitchen notes, and customer info.
- **Payment Processing Simulator**: Cash calculator (auto-calculates change with $10, $20, $50 buttons), Credit/Debit EMV reader, and Apple/Google Pay.
- **Kitchen Kanban Display**: 4-stage order queue with one-click status transitions.
- **Reservations Book**: View today's table bookings, party sizes, and check in / seat arriving parties.
- **Shift Receipts Table**: History of all transactions processed at the register.

### 6. Administrator Portal
- **Key Metrics (KPIs)**: Total Revenue ($), Orders Processed, Active Table Reservations, and Menu Items In Stock.
- **Live Menu Catalog (CRUD)**: Add new beverages/pastries, edit prices and descriptions, toggle stock availability, or delete items.
- **Reservations Management**: Full reservations database with ability to seat or cancel bookings.
- **Sales Audit**: Complete transaction log with breakdowns and payment channels.
- **Staff Accounts Directory**: Permissions guide for all roles.

---

## Demo Credentials

| Role | Username | Password | Access Location |
|---|---|---|---|
| **Guest** | *(None needed)* | *(None needed)* | Public browsing, table reservations, online ordering |
| **Cashier** | `cashier` | `cashier123` | Bottom-right corner "Cashier" button |
| **Admin** | `admin` | `admin123` | Bottom-right corner "Admin" button |

---

## How to Open

Copy and paste this URL into **Chrome, Safari, or Brave**:

```text
file:///Users/shainacarillo/.gemini/antigravity/scratch/coffee-lab/index.html
```

Or run in macOS Terminal:

```bash
open "/Users/shainacarillo/.gemini/antigravity/scratch/coffee-lab/index.html"
```
