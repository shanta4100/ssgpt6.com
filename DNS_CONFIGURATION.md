# DNS Configuration Fix for ssgpt6.com

## Issue
Website returns 404 error - DNS or deployment misconfiguration

## Required DNS Records

### 1. Root Domain (@)
```
Type: A
Name: @ (root/apex)
Value: 76.76.19.89
TTL: 300
```

### 2. WWW Subdomain
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 3. Verification Records
```
Type: TXT
Name: _gnaia-verify
Value: shanta-id-1.0
TTL: 3600
```

## Steps to Fix

### Step 1: Update Registrar DNS (GoDaddy/Namecheap/etc)
1. Log in to your domain registrar
2. Navigate to DNS Management
3. Delete old/incorrect DNS records
4. Add the above A and CNAME records exactly as shown
5. Wait 15-30 minutes for propagation

### Step 2: Verify DNS Propagation
```bash
# Check A record
nslookup ssgpt6.com
# Should return: 76.76.19.89

# Check CNAME record  
nslookup www.ssgpt6.com
# Should return: cname.vercel-dns.com
```

### Step 3: Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel deploy --prod

# Link domain
vercel env pull
```

### Step 4: Enable SSL Certificate
- Vercel automatically provisions SSL via Let's Encrypt
- Wait 24-48 hours for full SSL deployment
- Check: https://ssgpt6.com (should show 🔒 in browser)

## Mesh Agent Configuration

Update `ops/mesh/mesh-config.json` to match active endpoint:

```json
{
  "routing": {
    "latencyThresholdMs": 2000,
    "errorRateThreshold": 0.3
  },
  "oceans": {
    "primary": {
      "region": "US-EAST",
      "rivers": {
        "app": {
          "active": "https://ssgpt6.com",
          "health": "https://ssgpt6.com/health",
          "backup": ["https://ssgpt6.online", "https://www.ssgpt6.com"],
          "core": true
        }
      }
    }
  }
}
```

## Health Check Endpoint

The health endpoint is now available at `api/health.js`:

```bash
curl https://ssgpt6.com/health
```

Returns:
```json
{
  "status": "UP",
  "service": "ssgpt6.com",
  "timestamp": "2026-08-31T14:25:00Z",
  "uptime": 3600,
  "environment": "production",
  "version": "1.0.0",
  "regions": ["us-east", "us-west", "asia-pacific"],
  "latencyMs": 145
}
```

## Troubleshooting

### Still showing 404?
1. Clear browser cache: `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
2. Try incognito/private mode
3. Wait 24-48 hours for DNS propagation
4. Check Vercel deployment status: https://vercel.com/dashboard

### SSL Certificate Error?
1. Ensure DNS records are correctly set
2. Force HTTPS redirect in `vercel.json`
3. Wait 48 hours for certificate issuance

### 502 Bad Gateway?
1. Check if mesh agent is running
2. Verify backup endpoints are accessible
3. Check healer-webhook.js logs

## Verification Checklist
- [ ] DNS A record updated
- [ ] DNS CNAME record for www updated
- [ ] DNS propagation verified (nslookup)
- [ ] Vercel deployment active
- [ ] SSL certificate issued
- [ ] Health endpoint responding
- [ ] Mesh agent configured
- [ ] Website accessible at https://ssgpt6.com
