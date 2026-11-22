(() => {
  const config = window.PEI_SITE_CONFIG || {};
  const address = typeof config.contractAddress === 'string' && /^0x[0-9a-fA-F]{40}$/.test(config.contractAddress.trim()) ? config.contractAddress.trim() : '';
  const validSocial = (value, hosts) => {
    if (typeof value !== 'string') return null;
    try { const url = new URL(value); return url.protocol === 'https:' && hosts.includes(url.hostname.toLowerCase()) ? url.href : null; } catch { return null; }
  };
  for (const [selector, url] of [['.social-x', validSocial(config.xUrl, ['x.com','www.x.com','twitter.com','www.twitter.com'])], ['.social-telegram', validSocial(config.telegramUrl, ['t.me','www.t.me','telegram.me','www.telegram.me'])]]) {
    document.querySelectorAll(selector).forEach(link => {
      if (url) { link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; }
      else { link.removeAttribute('href'); link.setAttribute('aria-disabled', 'true'); link.classList.add('unavailable'); link.title = 'Link coming soon'; }
    });
  }
  document.querySelectorAll('.address-text').forEach(el => {
    if (address) { el.textContent = address; el.title = address; el.closest('.address-live')?.classList.add('configured'); }
  });
  let timeout;
  const notify = text => { const el = document.querySelector('#notice'); el.textContent = text; el.classList.add('show'); clearTimeout(timeout); timeout = setTimeout(() => el.classList.remove('show'), 2400); };
  document.querySelectorAll('.copy-address').forEach(button => {
    button.disabled = !address;
    button.title = address ? 'Copy contract address' : 'Contract address coming soon';
    button.addEventListener('click', async () => {
      if (!address) return;
      try {
        if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(address);
        else { const temp=document.createElement('textarea'); temp.value=address; temp.style.position='fixed'; temp.style.left='-9999px'; document.body.append(temp); temp.select(); const ok=document.execCommand('copy'); temp.remove(); if(!ok) throw new Error('Copy rejected'); }
        notify('Contract address copied');
      } catch { notify('Copy unavailable. Please select the address manually.'); }
    });
  });
})();
