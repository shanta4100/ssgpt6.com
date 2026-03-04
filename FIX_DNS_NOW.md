

# How to Fix "Website can't be reached" for www.s

This error indicates that your domain's DNS recor

## Step 1: Correct the DNS Record at Your Registr

You must log in to where you manage your DNS (e.g

1. **Find the 'www` record: ** Look for a `CNAME`

2. **Delete any existing `A or `AAAA records f

3. **Create the correct CNAME record: **

* **Type:** `CNAME`

* **Name/Host:** `www`

*

**Target/Value:** `ghs.googlehosted.com`

**Critical:** Do NOT point the CNAME to `ssgpt6-1-

## Step 2: Verify the Domain in Firebase Hosting

After setting the correct DNS record, you must co

1. **Go to the Firebase Console:** [https://cons

2. Select your project (`ssgpt6-1f691`).

3. In the left menu, go to **Build Hosting**.

4. If www.ssgpt6.com is already listed, wait f

5. Enter www.ssgpt6.com and follow the on-scre

6. Once the process is complete, the status will

<>

Preview

Chat

M+ FIX_DNS_NOW.md X