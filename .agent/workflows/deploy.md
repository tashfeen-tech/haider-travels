---
description: Deploy Bukhari Rent A Car to Vercel production
---

# Deploy to Vercel Production

// turbo-all

1. Build the project to verify no errors:
```bash
npm run build
```

2. Commit all changes to git:
```bash
git add -A && git commit -m "update: latest changes"
```

3. Push to GitHub:
```bash
git push origin main
```

4. Deploy to Vercel production:
```bash
npx -y vercel --prod --yes
```

5. Verify the deployment is live by checking the output URL. The main URL is:
   **https://bukhari-rent-a-car.vercel.app**
