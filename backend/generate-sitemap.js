const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

const sitemap = new SitemapStream({ hostname: 'https://casebridge-app.vercel.app' });

// List all your pages here
const pages = ['/', '/about', '/profile','/datasets','/chat','/signup',];

(async () => {
  for (const page of pages) {
    sitemap.write({ url: page, changefreq: 'weekly', priority: 0.8 });
  }
  sitemap.end();

  const sitemapPath = path.resolve(__dirname, '../app/public', 'sitemap.xml');
  const writeStream = createWriteStream(sitemapPath);

  streamToPromise(sitemap).then(sm => writeStream.write(sm));
})();
