type TManifest = {
  background_color: string;
  display: string;
  icons: unknown[],
  lang: string;
  name: string;
  short_name: string;
  start_url: string;
  theme_color: string;
};

type TGenerateManifest = Omit<TManifest, 'icons'>;


/**
 * Creates manifest
 */
export const generateManifest = (props: TGenerateManifest): TManifest => ({
  ...props,
  icons: [],
});
