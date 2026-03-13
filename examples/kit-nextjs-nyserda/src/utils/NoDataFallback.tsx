import type { JSX } from 'react';

interface NoDataFallbackProps {
  componentName: string;
}

const NoDataFallback = (props: NoDataFallbackProps): JSX.Element => {
  const { componentName } = props;

  return (
    <div className="component content-not-configured">
      <div className="component-content">
        <span className="is-empty-hint">
          {componentName} requires a datasource item assigned. Please assign a datasource item to
          edit the content.
        </span>
      </div>
    </div>
  );
};

export { NoDataFallback };
