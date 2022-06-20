import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import config from './config.js';

export const SEO = ({ title, heroImage, description }) => {
  const location = useLocation();
  const domain = config.seo.domain;
  const titleToShow = title ? title : config.seo.defaultTitle;
  const descriptionToShow = description ? description : config.seo.defaultDescription;
  const previewImageToShow = heroImage ? heroImage : config.seo.defaultImage;
  const canonicalUrl = location ? `${domain}${location?.pathname}` : domain; // In case some runtime error with location

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{titleToShow}</title>
      <meta name="description" content={`${descriptionToShow}`} />
      <meta
        name="keywords"
        content="työnhaun, avoimet työpaikat, rekrytoinnin, työnhakija, työnantaja, vacancies in Finland, Finland careers, Finland jobs, Avoimet työpaikat Suomi"
      />
      <meta property="og:site_name" content={`${config.seo.siteName}`} />

      {/* Opengraph meta tags for Facebook & LinkedIn */}
      <meta property="og:title" content={titleToShow} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${canonicalUrl}`} />
      <meta property="og:image" content={previewImageToShow} />
      <meta property="og:description" content={`${descriptionToShow}`} />
    </Helmet>
  );
};
