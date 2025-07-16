import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const MetaTag = ({
  title = "Restaurant App",
  description = "Restaurant App Default Description",
  image = "https://placehold.co/300x300",
}) => {
  const APP_NAME =
    import.meta.env.VITE_APP_NAME || "Restaurant Management System";
  const fullTitle = `${title} | ${APP_NAME}`;

  useEffect(() => {
    // Force update document title
    document.title = fullTitle;
  }, [fullTitle]);

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default MetaTag;
