import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
export const SEO = ({ title, image, description }) => {
  const siteURL = window.location.origin;
  const location = useLocation();

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="og:title" content={title} />
      {description && <meta name="description" content={description} />}
      {description && <meta name="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      <meta
        name="og:url"
        content={`${siteURL}${location.pathname === "/" ? "" : location.pathname}`}
      />
    </Helmet>
  );
};
