import test, { APIRequestContext, Page } from '@playwright/test';
import { parse as parseQueryString } from 'querystring';


   export async function getWpNonce(page: Page): Promise<string> {
    const [request] = await Promise.all([
        page.waitForRequest(req => req.url().includes('/wp-json/') && !!req.headers()['x-wp-nonce']),
        page.waitForResponse(resp => resp.url().includes('/wp-json/'))
    ]);
    const nonce = request.headers()['x-wp-nonce'];
    if (!nonce) throw new Error('⚠️ X-WP-Nonce not found in request headers');
    console.log('✅ X-WP-Nonce:', nonce);
    return nonce;
}


export async function getSessionKey(request: APIRequestContext, nonce: string): Promise<string> {
  const response = await request.post('https://dev.hmns.org/wp-json/hmns-api/v1/router', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-WP-Nonce': nonce,
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': '*/*',
      'Origin': 'https://dev.hmns.org',
      'Referer': 'https://dev.hmns.org/memberships/family/',
      'User-Agent': 'PlaywrightTest'
    },
    form: {
      action: 'tessitura_api_interactions',
      query: '["/api/Web/Session"]'
    }
  });

  if (!response.ok()) {
    throw new Error(`Failed to fetch sessionKey: ${response.status()} ${response.statusText()}`);
  }

  const body = await response.json();
  if (!body.sessionKey) {
    throw new Error(`sessionKey not found. Response: ${JSON.stringify(body)}`);
  }


  await test.step('Log sessionKey', async () => {
    console.log('✅ SessionKey:', body.sessionKey);
  });

  return body.sessionKey;
}

interface SessionResponse {
  MembershipId?: number;
  [key: string]: any;
}

export async function getMembershipId(request: APIRequestContext, nonce: string): Promise<number | null> {
  try {
    const response = await request.post('https://dev.hmns.org/wp-json/hmns-api/v1/router', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-WP-Nonce': nonce,
        'X-Requested-With': 'XMLHttpRequest',
      },
      form: {
        action: 'tessitura_api_interactions',
        query: JSON.stringify(['/api/Web/Session']),
      },
    });

    if (!response.ok()) {
      console.error(`HTTP error: ${response.status()}`);
      return null;
    }

    const data: SessionResponse = await response.json();
    if (data.MembershipId) {
      return data.MembershipId;
    }

    console.warn('MembershipId doesn`t find');
    return null;
  } catch (err: any) {
    console.error('Error:', err.message);
    return null;
  }
}

export async function getFreshchatToken(page: Page): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const timeout = setTimeout(() => reject('Token not found in time'), 5000);

    page.on('request', (request) => {
      const url = request.url();
      if (url.includes('/webchat/') && url.includes('/user')) {
        const token = url.split('/webchat/')[1].split('/user')[0];
        clearTimeout(timeout);
        resolve(token);
      }
    });
  });
}

export async function getSessionKeyFirst(page: Page, targetUrl: string): Promise<string | null> {
  return new Promise(async (resolve, reject) => {
    const timeout = setTimeout(() => resolve(null), 5000);

    page.on('request', (req) => {
      if (req.url().includes(targetUrl) && req.method() === 'POST') {
        const postData = req.postData();
        if (postData) {
          try {
            const parsed = parseQueryString(postData);
            if (parsed.query) {
              const decoded = decodeURIComponent(parsed.query as string);
              const queryArray = JSON.parse(decoded);
              if (Array.isArray(queryArray) && queryArray.length > 1) {
                clearTimeout(timeout);
                resolve(queryArray[1]);
              }
            }
          } catch (e) {
            console.error('Cannot parse request payload:', e);
          }
        }
      }
    })
  });
}

