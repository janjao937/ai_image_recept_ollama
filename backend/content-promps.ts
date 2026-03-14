export const SimplePromp: string = 'Scan receipt. Return ONLY JSON: {"store":"","items":[{"name":"","price":0}],"total":0}. Support Thai.';
export const SimplePromp2: string = `Analyze this receipt carefully:
    1. Look for the STORE NAME at the very top or in the logo.
    2. List all ITEMS with their prices.
    3. Find the TOTAL amount.
    Return ONLY JSON: {"store": "name or 'Unknown'", "items": [{"name": "", "price": 0}], "total": 0}.
    IMPORTANT: Support Thai language for store name and items.`
export const TeenoiPromp: string = `You are an expert receipt scanner. Look at this image and:
    1. **Store Name**: Find the brand name (usually at the very top or above the branch name). For this receipt, it should be "ร้านอาหารสุกี้ตี๋น้อย".
    2. **Branch**: Note the branch if available (e.g., "JC MALL นวมินทร์").
    3. **Items**: List all items, quantities, and their prices.
    4. **Total**: Find the "ยอดสุทธิ" or final total amount.
    
    Return ONLY JSON: 
    {
      "store": "Store Name",
      "branch": "Branch Name",
      "items": [{"name": "Item Name", "qty": 0, "price": 0.0}],
      "total": 0.0
    }
    Support Thai language perfectly.`;

export const AllShopPromp: string = `Extract data from this receipt image with high precision.
    1. **store**: Look for the most prominent brand name or shop name (usually at the top). Avoid using long legal company names like "บริษัท...จำกัด" unless it's the only name available.
    2. **items**: List all products or services found. 
       - name: Use the exact name shown in the receipt (Thai or English).
       - price: The final price for that line item.
    3. **total**: The absolute final amount to be paid (Net Total/Grand Total). Ignore "Cash" or "Change" amounts.

    Return ONLY a valid JSON object:
    {
      "store": "Shop Name",
      "items": [{"name": "Item Name", "price": 0.0}],
      "total": 0.0
    }
    Language Support: Thai and English.`;