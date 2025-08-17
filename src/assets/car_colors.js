import { Colors } from "../styles/GlobalStyle";

const colorMap = {
  // Basic Colors
  "Unknown": "#808080",
  "Black": "#000000",
  "White": "#FFFFFF",
  "Gray": "#808080",
  "Grey": "#808080",
  "Silver": "#C0C0C0",
  "Red": "#FF0000",
  "Blue": "#0000FF",
  "Green": "#008000",
  "Yellow": "#FFFF00",
  "Orange": "#FFA500",
  "Purple": "#800080",
  "Pink": "#FFC0CB",
  "Brown": "#A52A2A",
  "Gold": "#FFD700",
  "Beige": "#F5F5DC",
  "Cream": "#FFFDD0",
  "Ivory": "#FFFFF0",
  "Bronze": "#CD7F32",
  "Copper": "#B87333",
  "Turquoise": "#40E0D0",
  "Aqua": "#00FFFF",
  "Indigo": "#4B0082",
  
  // Metallic Colors
  "Metallic Black": "#1A1A1A",
  "Metallic Silver": "#B8B8B8",
  "Metallic Gray": "#8A8A8A",
  "Metallic Blue": "#2E4A6B",
  "Metallic Green": "#2E4A2E",
  "Metallic Red": "#8B0000",
  "Metallic Yellow": "#B8860B",
  "Metallic Gold": "#DAA520",
  "Metallic Copper": "#B87333",
  "Metallic Bronze": "#CD7F32",
  "Metallic Olive": "#6B8E23",
  "Metallic Bordeaux": "#800020",
  "Metallic Turquoise": "#40E0D0",
  "Metallic Coffee": "#6F4E37",
  
  // Pearl Colors
  "Pearl Black": "#1A1A1A",
  "Pearl Green": "#90EE90",
  "Pearl Blue": "#87CEEB",
  
  // Special Colors
  "Black Eggplant": "#2D1B2D",
  "Eggplant": "#614051",
  "Wine": "#722F37",
  "Bordeaux": "#800020",
  "Sahara": "#D2B48C",
  "Mustard": "#FFDB58",
  "Lemon Yellow": "#FFFACD",
  "Strong Yellow": "#FFD700",
  "Glowing Red": "#FF1744",
  "Classic Red": "#DC143C",
  "Dark Red": "#8B0000",
  "Dark Blue": "#00008B",
  "Light Blue": "#ADD8E6",
  "Azure": "#007FFF",
  "Dark Turquoise": "#00CED1",
  "Dark Green": "#006400",
  "Light Green": "#90EE90",
  "Olive Green": "#6B8E23",
  "Sea Green": "#2E8B57",
  "Dark Purple": "#483D8B",
  "Light Purple": "#E6E6FA",
  "Rose Metallic": "#FFB6C1",
  "Sea Money": "#2E8B57",
  "White Ivory": "#FFFFF0",
  "Multi-colored": "#FFD700",
  "Other": "#808080",
  
  // Gray Variations
  "Steel Gray": "#708090",
  "Dark Gray": "#404040",
  "Light Gray": "#D3D3D3",
  "Bronze Gray": "#8B7355",
  "Gray Melange": "#808080",
  "Metallic Dark Gray": "#404040",
  "Metallic Light Gray": "#D3D3D3",
  "Dark Silver": "#708090",
  "Light Silver": "#E6E6FA",
  
  // Blue Variations
  "Metallic Blue Gray": "#708090",
  "Metallic Charcoal Blue": "#36454F",
  "Metallic Light Blue": "#87CEEB",
  "Blue Crystal": "#87CEEB",
  "Metallic Bluish Silver": "#B8C6D9",
  
  // Green Variations
  "Bright Green": "#00FF00",
  "Dark Green": "#006400",
  "Greenish": "#90EE90",
  "Light Green": "#90EE90",
  "Metallic Greenish": "#90EE90",
  "Silver Green": "#90EE90",
  "Metallic Gold Green": "#90EE90",
  "Aqua Green": "#7FFFD4",
  "Greenish Silver": "#90EE90",
  "Turquoise Green": "#40E0D0",
  "Metallic Light Turquoise": "#40E0D0",
  
  // Red Variations
  "Metallic Reddish": "#8B0000",
  "Red Black": "#2D1B2D",
  "Red Black": "#2D1B2D",
  
  // Yellow Variations
  "Metallic Yellow": "#B8860B",
  "Strong Yellow": "#FFD700",
  
  // Gold Variations
  "Metallic Gold": "#DAA520",
  "Golden": "#FFD700",
  "Dark Beige": "#D2B48C",
  "Beige Metallic": "#D2B48C",
  
  // Brown Variations
  "Light Brown": "#CD853F",
  "Dark Brown": "#654321",
  
  // Special Metallic
  "From Lang Metallic": "#C0C0C0",
  "Metallic Olive Green": "#6B8E23",
  "Matte Mandarin": "#FF8C00",
  "Millennium Silver": "#C0C0C0",
  "Indigo Matte": "#4B0082",
  "Tonic": "#FFD700",
  "Dark Silver Metallic": "#708090",
  
  // Additional Colors
  "Platinum": "#E5E4E2",
  "Azure Silver Metallic": "#87CEEB",
  "Metallic Light Turquoise": "#40E0D0",
  "Sea Money": "#2E8B57"
};

const getCarColorHex = (colorName) => {
  if (!colorName) return Colors.mainOrange;
  
  // Clean the color name and try to find a match
  const cleanColorName = colorName.trim();
  const exactMatch = colorMap[cleanColorName];
  
  if (exactMatch) {
    return exactMatch;
  }
  
  // Try to find partial matches for similar colors
  const partialMatch = Object.keys(colorMap).find(key => 
    key.toLowerCase().includes(cleanColorName.toLowerCase()) ||
    cleanColorName.toLowerCase().includes(key.toLowerCase())
  );
  
  if (partialMatch) {
    return colorMap[partialMatch];
  }
  
  // Default fallback
  return Colors.mainOrange;
};

export { getCarColorHex, colorMap };