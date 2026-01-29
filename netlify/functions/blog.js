const API_VERSION = process.env.SANITY_API_VERSION;

exports.handler = async function handler() {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  const token = process.env.SANITY_TOKEN;

  if (!projectId || !token || !dataset || !API_VERSION) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing Sanity env vars.' })
    };
  }

  const query = encodeURIComponent(`*[_type == "post"]|order(publishedAt desc){
    _id,
    title,
    summary,
    "image": mainImage.asset->url,
    publishedAt,
    slug
  }`);

  const url = `https://${projectId}.api.sanity.io/v${API_VERSION}/data/query/${dataset}?query=${query}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      const text = await res.text();
      return {
        statusCode: res.status,
        body: text
      };
    }

    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data.result || [])
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err && err.message ? err.message : 'Unknown error' })
    };
  }
};
