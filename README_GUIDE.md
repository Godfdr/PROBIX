# 🚀 Probix2: Official User Guide

Welcome to the **Probix2** Prediction Market frontend. This guide will help you run, view, and manage the application on your local machine.

---

## 🛠 1. How to Run the App

Follow these steps to launch the Pro-Max dashboard:

1.  **Open your Terminal**: Open Command Prompt (cmd), PowerShell, or your IDE's built-in terminal.
2.  **Navigate to the Folder**:
    ```bash
    cd C:\Users\PC\Desktop\probix2
    ```
3.  **Start the Server**:
    ```bash
    npm run dev
    ```
4.  **View the App**: Once the terminal says "Ready", open your browser and go to:
    **[http://localhost:3000](http://localhost:3000)**

---

## ✨ 2. Key Features to Explore

*   **Live Price Simulation**: Watch the "Yes/No" prices on the market cards. They fluctuate every 5 seconds to mimic a real trading environment.
*   **Connect Wallet**: Click the button in the top right to simulate a wallet connection and see your Naira (₦) balance.
*   **Trading Drawer**: Click on any market card to open the "Elite" trading panel. 
    *   Try typing an amount to see the **Auto-ROI Calculator** in action.
*   **Category Filtering**: Use the sidebar to filter markets (Politics, Sports, Economy, etc.).

---

## 📂 3. Project Structure (For Developers)

I have organized the code into a professional modular structure:
*   `src/app/`: The main pages and global styles.
*   `src/components/layout/`: Navbar and Sidebar components.
*   `src/components/market/`: Everything related to market cards and the trading drawer.
*   `src/components/ui/`: Reusable buttons and "Pro-Max" UI elements.
*   `src/types/`: TypeScript definitions for data safety.

---

## 🛑 4. Stopping the App

To stop the server, go back to your terminal and press:
**`Ctrl + C`** (and then `Y` if prompted).

---

## 💡 Troubleshooting

*   **Port 3000 busy?**: If another app is using port 3000, Next.js will automatically try 3001. Just check the terminal output for the correct URL.
*   **Styles not appearing?**: Ensure you are using a modern browser like Chrome or Edge.

---
**Built with Precision for the African Market.**
