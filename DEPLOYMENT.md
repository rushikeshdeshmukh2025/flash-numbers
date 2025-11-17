# Flash Counting Fun - Deployment Guide for Azure Web App

## Prerequisites
- Azure subscription
- Azure CLI installed (optional, but recommended)
- Git installed

## Deployment Methods

### Method 1: Azure Portal (Easiest)

1. **Prepare your code:**
   - Ensure all files are committed to a Git repository (GitHub, Azure DevOps, etc.)

2. **Create Azure Web App:**
   - Go to [Azure Portal](https://portal.azure.com)
   - Click "Create a resource" → "Web App"
   - Fill in details:
     - **Resource Group:** Create new or use existing
     - **Name:** flash-counting-fun (or your choice, must be unique)
     - **Publish:** Code
     - **Runtime stack:** Node 24 LTS (or Node 18 LTS)
     - **Operating System:** Linux
     - **Region:** Choose closest to your users
     - **Pricing plan:** F1 (Free) for testing, or higher for production
   - Click "Review + Create" → "Create"

3. **Deploy your code:**
   - Go to your Web App resource
   - Navigate to "Deployment Center" in the left menu
   - Choose your deployment source (GitHub, Local Git, etc.)
   - Follow the prompts to connect and deploy
   - Your app will be available at: `https://flash-counting-fun.azurewebsites.net`

### Method 2: Azure CLI (Recommended for Automation)

```bash
# Login to Azure
az login

# Create resource group
az group create --name FlashCountingRG --location eastus

# Create App Service plan (Free tier)
az appservice plan create \
  --name FlashCountingPlan \
  --resource-group FlashCountingRG \
  --sku F1 \
  --is-linux

# Create Web App
az webapp create \
  --resource-group FlashCountingRG \
  --plan FlashCountingPlan \
  --name flash-counting-fun \
  --runtime "NODE|24-lts"

# Configure deployment from local Git
az webapp deployment source config-local-git \
  --name flash-counting-fun \
  --resource-group FlashCountingRG

# Get the Git URL (you'll need this)
az webapp deployment list-publishing-credentials \
  --name flash-counting-fun \
  --resource-group FlashCountingRG \
  --query scmUri \
  --output tsv

# Add Azure as a remote and push
git remote add azure <GIT_URL_FROM_ABOVE>
git push azure main:master
```

### Method 3: GitHub Actions (CI/CD Pipeline)

1. **Create `.github/workflows/azure-deploy.yml`:**

```yaml
name: Deploy to Azure Web App

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '24'
    
    - name: Install dependencies
      run: npm install
    
    - name: Deploy to Azure Web App
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'flash-counting-fun'
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: .
```

2. **Configure GitHub Secrets:**
   - In Azure Portal, go to your Web App → "Deployment Center"
   - Download publish profile
   - In GitHub: Settings → Secrets → New repository secret
   - Name: `AZURE_WEBAPP_PUBLISH_PROFILE`
   - Paste the publish profile content

### Method 4: VS Code Extension (Developer-Friendly)

1. Install "Azure App Service" extension in VS Code
2. Sign in to Azure
3. Right-click on your folder → "Deploy to Web App"
4. Follow the prompts

## Post-Deployment Configuration

### 1. Enable HTTPS (Recommended)
```bash
az webapp update \
  --name flash-counting-fun \
  --resource-group FlashCountingRG \
  --https-only true
```

### 2. Add Custom Domain (Optional)
```bash
# Add custom domain
az webapp config hostname add \
  --webapp-name flash-counting-fun \
  --resource-group FlashCountingRG \
  --hostname www.yourchildrenportal.com

# Bind SSL certificate
az webapp config ssl upload \
  --name flash-counting-fun \
  --resource-group FlashCountingRG \
  --certificate-file path/to/certificate.pfx \
  --certificate-password your-password
```

### 3. Configure Application Insights (Monitoring)
```bash
az monitor app-insights component create \
  --app flash-counting-fun-insights \
  --location eastus \
  --resource-group FlashCountingRG \
  --application-type web

# Link to Web App
az webapp config appsettings set \
  --name flash-counting-fun \
  --resource-group FlashCountingRG \
  --settings APPINSIGHTS_INSTRUMENTATIONKEY="your-key"
```

## Verify Deployment

1. **Check Web App URL:**
   ```
   https://flash-counting-fun.azurewebsites.net
   ```

2. **Test Health Endpoint:**
   ```
   https://flash-counting-fun.azurewebsites.net/health
   ```

3. **View Logs:**
   ```bash
   az webapp log tail \
     --name flash-counting-fun \
     --resource-group FlashCountingRG
   ```

## Troubleshooting

### App not starting?
1. Check logs in Azure Portal → Log Stream
2. Verify Node.js version in package.json
3. Ensure server.js uses process.env.PORT

### Performance issues?
1. Upgrade from Free (F1) to Basic (B1) or higher
2. Enable Application Insights for monitoring
3. Consider Azure CDN for static assets

### Need to update?
```bash
# Quick deployment update
git push azure main:master

# Or redeploy using CLI
az webapp up \
  --name flash-counting-fun \
  --resource-group FlashCountingRG
```

## Cost Optimization

- **Free Tier (F1):** Good for testing, limited resources
- **Basic Tier (B1):** Recommended for production, ~$13/month
- **Standard Tier (S1):** Better performance, auto-scaling, ~$70/month

## Security Best Practices

1. ✅ Enable HTTPS only
2. ✅ No authentication required (as per requirements)
3. ✅ No data storage (privacy-friendly)
4. ✅ Keep dependencies updated
5. ✅ Monitor with Application Insights

## Support

For Azure-specific issues, visit [Azure Documentation](https://docs.microsoft.com/azure/app-service/).

---

🎉 Your Flash Counting Fun portal is ready for children worldwide!
