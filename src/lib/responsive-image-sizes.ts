// Tailwind container, px-4 / md:px-6, lg:grid-cols-2 and gap-20.
export const TWO_COLUMN_IMAGE_SIZES = '(min-width: 1536px) 704px, (min-width: 1280px) 576px, (min-width: 1024px) 448px, (min-width: 768px) 720px, (min-width: 640px) 608px, calc(100vw - 32px)';

// Same container and columns with gap-16 on the storage page.
export const STORAGE_IMAGE_SIZES = '(min-width: 1536px) 712px, (min-width: 1280px) 584px, (min-width: 1024px) 456px, (min-width: 768px) 720px, (min-width: 640px) 608px, calc(100vw - 32px)';

// max-w-4xl within the container, with a 1px border on either side.
export const LIFT_IMAGE_SIZES = '(min-width: 1024px) 894px, (min-width: 768px) 718px, (min-width: 640px) 606px, calc(100vw - 34px)';

// Blog article max-w-4xl; its body occupies 11 of 12 columns with gap-16 on lg.
export const ARTICLE_HERO_IMAGE_SIZES = '(min-width: 1024px) 896px, (min-width: 768px) 720px, (min-width: 640px) 608px, calc(100vw - 32px)';
export const ARTICLE_BODY_IMAGE_SIZES = '(min-width: 1024px) 816px, (min-width: 768px) 720px, (min-width: 640px) 608px, calc(100vw - 32px)';
// Featured card has a 1px border and two equal columns on lg, without a gap.
export const BLOG_FEATURE_IMAGE_SIZES = '(min-width: 1536px) 743px, (min-width: 1280px) 615px, (min-width: 1024px) 487px, (min-width: 768px) 718px, (min-width: 640px) 606px, calc(100vw - 34px)';
// Article cards: gap-12, two columns on md and three on lg.
export const BLOG_CARD_IMAGE_SIZES = '(min-width: 1536px) 464px, (min-width: 1280px) 379px, (min-width: 1024px) 294px, (min-width: 768px) 336px, (min-width: 640px) 608px, calc(100vw - 32px)';

// Home overrides .container to max-width 1248px at every breakpoint.
// Advice: gap 56px on lg; container padding 24px / 16px / 20px per side.
export const HOME_ADVICE_IMAGE_SIZES = '(min-width: 1248px) 572px, (min-width: 1024px) calc(50vw - 52px), (min-width: 768px) calc(100vw - 48px), (min-width: 640px) calc(100vw - 32px), calc(100vw - 40px)';
