import { expect, test } from '@playwright/test';

const INSTAGRAM_URL = 'https://www.instagram.com/zeinmotionuae/';
const FACEBOOK_URL = 'https://web.facebook.com/ZeinMotion/';

// Never let a test write a real testimonial to the database.
test.beforeEach(async ({ page }) => {
  await page.route('**/*', (route) => {
    const request = route.request();
    if (request.method() === 'POST' && request.headers()['next-action']) {
      return route.abort();
    }
    return route.continue();
  });
});

test.describe('home page', () => {
  test('hero shows the headline and a WhatsApp booking link', async ({
    page,
  }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Therapeutic Home Massage in Abu Dhabi'
    );
    const book = page.getByRole('link', { name: /Book a home visit/ });
    await expect(book).toHaveAttribute('href', /^https:\/\/wa\.me\/\d{8,15}\?text=/);
    await expect(book).toHaveAttribute('target', '_blank');
  });

  test('every WhatsApp link has a number and a message', async ({ page }) => {
    await page.goto('/');

    const hrefs = await page
      .locator('a[href*="wa.me"]')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href') ?? ''));
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href).toMatch(/^https:\/\/wa\.me\/\d{8,15}\?text=.+/);
    }
  });

  test('navigation lands each section below the sticky header', async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, 'Desktop navigation only');
    await page.goto('/');

    const header = page.locator('body > header');
    const nav = page.getByRole('navigation', { name: 'Main' });

    for (const [label, id] of [
      ['Services', 'services'],
      ['About', 'about'],
      ['FAQ', 'faq'],
    ]) {
      const link = nav.getByRole('link', { name: label, exact: true });
      await link.click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect
        .poll(async () => {
          const headerBox = await header.boundingBox();
          const sectionBox = await page.locator(`#${id}`).boundingBox();
          return (sectionBox?.y ?? 0) >= (headerBox?.height ?? 0) - 1;
        })
        .toBe(true);
      await expect(link).toHaveAttribute('aria-current', 'true');
    }
  });

  test('mobile menu opens, links to social profiles and closes on navigation', async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, 'Mobile only');
    await page.goto('/');

    await page.getByRole('button', { name: 'Open menu' }).click();
    const menu = page.getByRole('navigation', { name: 'Mobile' });
    await expect(menu).toBeVisible();
    await expect(menu.locator(`a[href="${INSTAGRAM_URL}"]`)).toBeVisible();
    await expect(menu.locator(`a[href="${FACEBOOK_URL}"]`)).toBeVisible();

    await menu.getByRole('link', { name: 'Services' }).click();
    await expect(menu).toBeHidden();
    await expect(
      page.getByRole('heading', { name: 'Our Services', level: 2 })
    ).toBeInViewport();
    await expect(page).toHaveURL(/#services$/);
  });

  test('sticky WhatsApp button appears after the hero on mobile', async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, 'Mobile only');
    await page.goto('/');

    const wrapper = page
      .getByRole('link', { name: /Book via WhatsApp/, includeHidden: true })
      .locator('xpath=..');
    await expect(wrapper).toHaveAttribute('inert', '');

    await page.locator('#services').scrollIntoViewIfNeeded();
    await expect(wrapper).not.toHaveAttribute('inert');
  });

  test('service details dialog is accessible', async ({ page }) => {
    await page.goto('/');

    const trigger = page.getByRole('button', {
      name: /View details about ZeinMotion/,
    });
    await trigger.click();

    const dialog = page.getByRole('dialog', { name: /ZeinMotion™ Therapy/ });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { level: 2 })).toBeInViewport();

    const benefit = dialog.getByRole('button', { name: 'Mobility & Performance' });
    await benefit.click();
    await expect(benefit).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('about tabs support keyboard navigation', async ({ page }) => {
    await page.goto('/');

    const tabs = page.locator('#about').getByRole('tab');
    await expect(tabs).toHaveCount(3);

    await tabs.first().click();
    await page.keyboard.press('ArrowRight');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(tabs.nth(1)).toBeFocused();
    await expect(page.locator('#about').getByRole('tabpanel')).toContainText(
      'Techniques Integrated'
    );
  });

  test('footer links to Instagram and Facebook', async ({ page }) => {
    await page.goto('/');

    const footer = page.locator('footer');
    await expect(footer.locator(`a[href="${INSTAGRAM_URL}"]`)).toBeVisible();
    await expect(footer.locator(`a[href="${FACEBOOK_URL}"]`)).toBeVisible();
  });

  test('shares the ZeinMotion Open Graph image', async ({ page, request }) => {
    await page.goto('/');

    const ogImage = await page
      .locator('meta[property="og:image"]')
      .getAttribute('content');
    expect(ogImage).toContain('/og-zeinmotion.jpg');

    const response = await request.get(new URL(ogImage!).pathname);
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain('image/jpeg');
  });
});

test.describe('testimonials page', () => {
  test('validates required fields without submitting', async ({ page }) => {
    await page.goto('/testimonials');

    await page.getByRole('button', { name: 'Submit testimonial' }).click();
    await expect(
      page.getByText('Name must be at least 2 characters long')
    ).toBeVisible();
    await expect(
      page.getByText('Testimonial must be at least 10 characters long')
    ).toBeVisible();
  });

  test('star rating can be changed', async ({ page }) => {
    await page.goto('/testimonials');

    await expect(page.getByRole('radio', { name: '5 stars - Excellent' })).toBeChecked();
    await page.locator('label', { hasText: '3 stars - Good' }).click();
    await expect(page.getByRole('radio', { name: '3 stars - Good' })).toBeChecked();
  });
});

test.describe('search and AI discoverability', () => {
  const graphTypes = async (page: import('@playwright/test').Page) => {
    const blocks = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const nodes = blocks.flatMap((text) => JSON.parse(text)['@graph'] ?? []);
    return { nodes, types: nodes.map((node) => node['@type']) };
  };

  test('home structured data is a linked graph with FAQ markup', async ({
    page,
  }) => {
    await page.goto('/');
    const { nodes, types } = await graphTypes(page);

    for (const type of [
      'HealthAndBeautyBusiness',
      'Person',
      'WebSite',
      'WebPage',
      'Service',
      'FAQPage',
    ]) {
      expect(types).toContain(type);
    }

    // Every {"@id": ...} reference must point to a node on the page.
    const ids = new Set(nodes.map((node) => node['@id']));
    const refs = JSON.stringify(nodes).match(/\{"@id":"[^"]+"\}/g) ?? [];
    for (const ref of refs) {
      expect(ids).toContain(JSON.parse(ref)['@id']);
    }

    const faq = nodes.find((node) => node['@type'] === 'FAQPage');
    await expect(page.locator('#faq details')).toHaveCount(
      faq.mainEntity.length
    );
  });

  test('FAQ markup is not repeated on pages without the FAQ', async ({
    page,
  }) => {
    await page.goto('/testimonials');
    const { types } = await graphTypes(page);

    expect(types).toContain('HealthAndBeautyBusiness');
    expect(types).not.toContain('FAQPage');
  });

  test('robots.txt lets AI search crawlers in and lists the sitemap', async ({
    request,
  }) => {
    const robots = await (await request.get('/robots.txt')).text();

    for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) {
      expect(robots).toContain(`User-Agent: ${bot}`);
    }
    expect(robots).not.toMatch(/Disallow: \/\s*$/m);
    expect(robots).toMatch(/Sitemap: .+\/sitemap\.xml/);

    const llms = await request.get('/llms.txt');
    expect(llms.ok()).toBe(true);
  });
});

test('unknown routes show the branded 404 page', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist');

  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'This page took a different path'
  );
  await expect(page.getByRole('link', { name: 'Back to home' })).toBeVisible();
});
