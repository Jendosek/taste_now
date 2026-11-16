const SITE_NAME = 'TasteNow';

// Sets the browser tab title; React 19 hoists <title>/<meta> into <head>.
// `noIndex` asks search engines not to index the page (e.g. 404).
const PageTitle = ({ title, noIndex = false }) => (
    <>
        <title>{title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Food Delivery`}</title>
        {noIndex && <meta name="robots" content="noindex" />}
    </>
);

export default PageTitle;
