async function hasHref($html, searchedUrl) {
  return $html.find(`a[href="${searchedUrl}"]`).length > 0;
}

module.exports = hasHref;
