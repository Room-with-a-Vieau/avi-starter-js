import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  RichText as ContentSdkRichText,
  ImageField,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import StructuredData from 'components/structured-data/StructuredData';
import { buildProductJsonLd } from 'src/lib/structured-data/schema';

interface Fields {
  PromoIcon: ImageField;
  PromoText: Field<string>;
  PromoLink: LinkField;
  PromoText2: Field<string>;
}

type PromoProps = ComponentProps & {
  fields: Fields;
};

interface PromoContentProps extends PromoProps {
  renderText: (fields: Fields) => JSX.Element;
}

const PromoContent = (props: PromoContentProps): JSX.Element => {
  const { fields, params, renderText } = props;
  const { styles, RenderingIdentifier: id } = params;

  const Wrapper = ({ children }: { children: JSX.Element }): JSX.Element => (
    <article
      className={`component promo ${styles}`}
      id={id}
      itemScope
      itemType="https://schema.org/Product"
    >
      <div className="component-content">{children}</div>
    </article>
  );

  if (!fields) {
    return (
      <Wrapper>
        <span className="is-empty-hint">Promo</span>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <>
        <figure className="field-promoicon" itemProp="image">
          <ContentSdkImage field={fields.PromoIcon} />
        </figure>
        <div className="promo-text" itemProp="description">
          {renderText(fields)}
        </div>
        <StructuredData
          id={`jsonld-product-${id ?? 'promo'}`}
          data={buildProductJsonLd({
            name:
              fields.PromoLink?.value?.title ||
              (fields.PromoText?.value ? String(fields.PromoText.value) : undefined),
            descriptionHtml: fields.PromoText?.value ? String(fields.PromoText.value) : undefined,
            url: fields.PromoLink?.value?.href,
            image: (fields.PromoIcon as unknown as { value?: { src?: string } })?.value?.src,
          })}
        />
      </>
    </Wrapper>
  );
};

export const Default = (props: PromoProps): JSX.Element => {
  const renderText = (fields: Fields) => (
    <>
      <div className="field-promotext">
        <ContentSdkRichText field={fields.PromoText} />
      </div>
      <div className="field-promolink">
        <ContentSdkLink field={fields.PromoLink} />
      </div>
    </>
  );

  return <PromoContent {...props} renderText={renderText} />;
};

export const WithText = (props: PromoProps): JSX.Element => {
  const renderText = (fields: Fields) => (
    <>
      <div className="field-promotext">
        <ContentSdkRichText className="promo-text" field={fields.PromoText} />
      </div>
      <div className="field-promotext">
        <ContentSdkRichText className="promo-text" field={fields.PromoText2} />
      </div>
    </>
  );

  return <PromoContent {...props} renderText={renderText} />;
};

/**
 * NYSERDA CTA variant: full-card link with image and overlay title (impact style).
 * Matches www.nyserda.ny.gov CTA pattern: link wrapping impact-text (h4) + image.
 */
export const NyserdaCta = (props: PromoProps): JSX.Element => {
  const { fields, params } = props;
  const { styles, RenderingIdentifier: id } = params;

  if (!fields) {
    return (
      <article className={`component promo nyserda-cta ${styles}`} id={id}>
        <div className="component-content">
          <span className="is-empty-hint">Promo</span>
        </div>
      </article>
    );
  }

  const { PromoLink, PromoText, PromoIcon } = fields;

  return (
    <article
      className={`component promo nyserda-cta ${styles}`}
      id={id}
      itemScope
      itemType="https://schema.org/Product"
    >
      <div className="component-content nyserda-cta__inner">
        <ContentSdkLink field={PromoLink} className="nyserda-cta__link">
          <div className="impact-text" role="heading" aria-level={4}>
            <ContentSdkRichText field={PromoText} />
          </div>
          <figure className="field-promoicon nyserda-cta__image" itemProp="image">
            <ContentSdkImage field={PromoIcon} />
          </figure>
        </ContentSdkLink>
      </div>
    </article>
  );
};