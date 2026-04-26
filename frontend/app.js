const sellForm = document.getElementById('sellForm');
const submitBtn = document.getElementById('submitBtn');
const listingTableBody = document.getElementById('listingTableBody');
const priceCards = document.getElementById('priceCards');
const notification = document.getElementById('notification');
const refreshPricesBtn = document.getElementById('refreshPricesBtn');
const refreshListingsBtn = document.getElementById('refreshListingsBtn');

const api = {
  products: '/api/products',
  prices: '/api/prices',
};

const showNotification = (message, type = 'success') => {
  notification.textContent = message;
  notification.className = `notification ${type}`;

  setTimeout(() => {
    notification.className = 'notification hidden';
  }, 3000);
};

const formatTime = () =>
  new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

const setLoading = (button, isLoading, text = 'Loading...') => {
  if (!button) return;

  button.disabled = isLoading;

  if (isLoading) {
    button.dataset.originalText = button.textContent;
    button.textContent = text;
  } else if (button.dataset.originalText) {
    button.textContent = button.dataset.originalText;
  }
};

const renderListings = (products) => {
  if (!products.length) {
    listingTableBody.innerHTML =
      `<tr><td colspan="6">No listings yet. Submit a product to get started.</td></tr>`;
    return;
  }

  listingTableBody.innerHTML = products
    .map(
      (item) => `
      <tr>
        <td>${item.farmerName}</td>
        <td>${item.product}</td>
        <td>${item.quantity} qt</td>
        <td>₹${item.expectedPrice}</td>
        <td><span class="status pending">${item.status || 'Pending'}</span></td>
        <td>${new Date(item.createdAt).toLocaleString()}</td>
      </tr>
    `
    )
    .join('');
};

const fetchListings = async () => {
  try {
    setLoading(refreshListingsBtn, true);

    const response = await fetch(api.products);
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to fetch listings.');
    }

    renderListings(result.data || []);
  } catch (error) {
    showNotification(error.message, 'error');
  } finally {
    setLoading(refreshListingsBtn, false);
  }
};

const renderPrices = ({ prices }) => {
  if (!Array.isArray(prices) || !prices.length) {
    priceCards.innerHTML = '<p>Market prices unavailable. Please check backend.</p>';
    return;
  }

  const updatedAt = formatTime();

  priceCards.innerHTML = prices
    .map(
      (entry) => `
      <article class="price-card">
        <strong>${entry.seed}</strong>
        <p class="price">₹${entry.price}</p>
        <p>₹/quintal</p>
        <p class="updated-at">Updated: ${updatedAt}</p>
      </article>
    `
    )
    .join('');
};

const fetchPrices = async () => {
  try {
    setLoading(refreshPricesBtn, true);

    const response = await fetch(api.prices);
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Market prices unavailable.');
    }

    renderPrices(result);
  } catch (error) {
    priceCards.innerHTML = '<p>Market prices unavailable. Please check backend.</p>';
    showNotification(error.message, 'error');
  } finally {
    setLoading(refreshPricesBtn, false);
  }
};

sellForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    setLoading(submitBtn, true, 'Submitting...');

    const formData = new FormData(sellForm);

    const payload = {
      farmerName: formData.get('farmerName'),
      product: formData.get('product') || formData.get('seedType'),
      quantity: formData.get('quantity'),
      expectedPrice: formData.get('expectedPrice'),
    };

    const response = await fetch(api.products, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Submission failed.');
    }

    showNotification('Product submitted successfully!');
    sellForm.reset();
    await fetchListings();
  } catch (error) {
    showNotification(error.message, 'error');
  } finally {
    setLoading(submitBtn, false);
  }
});

refreshPricesBtn.addEventListener('click', fetchPrices);
refreshListingsBtn.addEventListener('click', fetchListings);

fetchListings();
fetchPrices();
setInterval(fetchPrices, 5000);