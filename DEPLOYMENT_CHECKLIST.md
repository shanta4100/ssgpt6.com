# Deployment Checklist - ssgpt6.com

## Pre-Deployment (Local)

### Code Verification
- [ ] All files committed to GitHub
- [ ] No sensitive data in environment files
- [ ] Dependencies installed: `npm install`
- [ ] Build successful: `npm run build`
- [ ] No console errors

### Configuration Files
- [ ] `vercel.json` configured correctly
- [ ] `ops/mesh/mesh-config.json` updated
- [ ] Environment variables set (if needed)
- [ ] Health endpoint available at `/health`

### Testing
```bash
# Test health endpoint locally
curl http://localhost:3000/health

# Should return:
{
  "status": "UP",
  "service": "ssgpt6.com",
  "timestamp": "2026-08-31T...",
  "uptime": 120.5,
  ...
}
```

## DNS Configuration

### Before Deployment
1. **Login to Domain Registrar**
   - Provider: [Your registrar - GoDaddy/Namecheap/etc]
   - Domain: ssgpt6.com
   
2. **Update DNS Records**
   ```
   ✓ A Record (@):     76.76.19.89
   ✓ CNAME (www):      cname.vercel-dns.com
   ✓ TXT (_gnaia-verify): shanta-id-1.0
   ```

3. **Verify DNS Propagation** (takes 15-30 min)
   ```bash
   # Check A record
   nslookup ssgpt6.com
   
   # Check CNAME
   nslookup www.ssgpt6.com
   ```

## Vercel Deployment

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Authenticate
```bash
vercel login
# Follow browser prompt
```

### Step 3: Deploy
```bash
# Option A: Deploy to staging
vercel deploy

# Option B: Deploy to production (recommended after testing)
vercel deploy --prod
```

### Step 4: Verify Deployment
- Check Vercel dashboard: https://vercel.com/dashboard
- See deployment logs
- Confirm production domain: ssgpt6.com

## Post-Deployment Verification

### Immediate Checks (1-5 minutes)
```bash
# Test main domain
curl -I https://ssgpt6.com

# Should return: HTTP/2 200 (not 404)
```

- [ ] `https://ssgpt6.com` loads
- [ ] `https://www.ssgpt6.com` redirects to ssgpt6.com
- [ ] HTTPS is active (🔒 in browser)
- [ ] No 404 errors

### Health Checks (5-15 minutes)
```bash
# Test health endpoint
curl https://ssgpt6.com/health

# Should return 200 with status: UP
```

- [ ] Health endpoint responds: `/health`
- [ ] Returns JSON with `status: "UP"`
- [ ] Latency visible in response
- [ ] No CORS errors

### Browser Tests
- [ ] Clear cache: Ctrl+Shift+Delete
- [ ] Incognito/Private mode
- [ ] Different browsers (Chrome, Firefox, Safari)
- [ ] Mobile browser (iOS Safari, Chrome Mobile)
- [ ] Page loads completely (no partial content)

### DNS Verification
```bash
# Full DNS check
nslookup -type=A ssgpt6.com
nslookup -type=CNAME www.ssgpt6.com

# Should show correct values
```

- [ ] A record pointing to Vercel IP
- [ ] CNAME record pointing to cname.vercel-dns.com
- [ ] Both resolve correctly

### SSL/TLS Certificate
```bash
# Check certificate
openssl s_client -connect ssgpt6.com:443

# Should show valid certificate issued by Let's Encrypt
```

- [ ] SSL certificate is valid
- [ ] Certificate issued by: Let's Encrypt (Vercel)
- [ ] No certificate warnings
- [ ] Expires in 90 days

## Mesh Agent Status

### Start Mesh Services
```bash
# Terminal 1: Start mesh agent
node ops/mesh/mesh-agent.js

# Terminal 2: Start router
node ops/mesh/router.js

# Terminal 3: Start healer webhook
node ops/mesh/healer-webhook.js
```

### Monitor Mesh Status
- [ ] `mesh-agent.js` running without errors
- [ ] `router.js` accepting connections
- [ ] `healer-webhook.js` listening on `/heal`
- [ ] `health-state.json` updating regularly
- [ ] `routing-state.json` shows active routes
- [ ] No DOWN rivers detected

## Fallback / Rollback Plan

### If 404 Still Shows
1. Check Vercel deployment status
2. Verify DNS propagation (wait 24-48 hours if needed)
3. Clear Vercel cache: `vercel env pull`
4. Redeploy: `vercel deploy --prod`
5. Check logs: `vercel logs ssgpt6.com`

### If Health Endpoint Fails
1. Ensure `api/health.js` exists
2. Check Node.js version compatibility
3. Verify vercel.json routes are correct
4. Restart mesh services

### Rollback to Previous Version
```bash
# View deployment history
vercel list

# Promote previous successful deployment
vercel promote <deployment-id>
```

## Final Sign-Off

- [ ] All checks passed
- [ ] Website is live at https://ssgpt6.com
- [ ] Health endpoint functional
- [ ] Mesh agents operational
- [ ] DNS properly configured
- [ ] SSL certificate valid
- [ ] Team notified of go-live

**Deployment Date:** August 31, 2026
**Deployed By:** shanta4100
**Status:** ✅ READY FOR PRODUCTION
