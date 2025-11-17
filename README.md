# Flash Counting Fun 🎉

A colorful, interactive web-based portal designed to help 6-year-old children enhance their flash counting skills through fun and engaging exercises.

## Features

- 🎨 **Colorful & Engaging Interface** - Bright colors, fun animations, and child-friendly design
- 🎯 **Progressive Difficulty** - 4 levels that gradually increase challenge
- ⭐ **Fun Themes** - Count animals, fruits, vehicles, stars, and more!
- 🏆 **Rewards System** - Earn stars for correct answers
- ⏱️ **Timed Challenges** - Visual timer to encourage quick thinking
- 📱 **Responsive Design** - Works on tablets, phones, and computers
- 🚫 **No Login Required** - Start playing immediately
- 💾 **No Data Storage** - Privacy-friendly, no personal data collected

## How to Play

1. Click "Start Adventure!" to begin
2. Count the items displayed on screen
3. Click the correct number before time runs out
4. Progress through 4 exciting levels
5. Collect stars and celebrate your success!

## Educational Benefits

Based on the "Blitzrechen" (Flash Counting) methodology, this portal helps children:
- Develop rapid number recognition
- Improve mental math skills
- Build concentration and focus
- Gain confidence in counting
- Have fun while learning!

## Tech Stack

- HTML5
- CSS3 with animations
- Vanilla JavaScript
- Node.js + Express (for hosting)

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser and navigate to:
```
http://localhost:8080
```

## Azure Web App Deployment

This application is ready for deployment to Azure Web App:

1. **Using Azure Portal:**
   - Create a new Web App in Azure Portal
   - Set runtime stack to Node.js (18 LTS or higher)
   - Deploy using Git, GitHub Actions, or Azure DevOps
   - The app will automatically use the PORT environment variable

2. **Using Azure CLI:**
```bash
# Login to Azure
az login

# Create resource group
az group create --name FlashCountingRG --location eastus

# Create App Service plan
az appservice plan create --name FlashCountingPlan --resource-group FlashCountingRG --sku F1 --is-linux

# Create Web App
az webapp create --resource-group FlashCountingRG --plan FlashCountingPlan --name flash-counting-fun --runtime "NODE|18-lts"

# Deploy code
az webapp up --name flash-counting-fun --resource-group FlashCountingRG
```

3. **Configuration:**
   - No environment variables required
   - No authentication needed
   - No database connections
   - Ready to use immediately after deployment

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - Feel free to use and modify for educational purposes!

## Credits

Inspired by the Blitzrechen (Flash Counting) methodology for early mathematics education.

---

Made with ❤️ for children learning to count!
