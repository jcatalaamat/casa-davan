import { groq } from 'next-sanity'

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    name,
    tagline,
    email,
    phone,
    whatsapp,
    instagram,
    currency,
    announcementBar
  }
`

// Locations
export const locationsQuery = groq`
  *[_type == "location"] | order(name.en asc) {
    _id,
    name,
    slug,
    type,
    address,
    geopoint,
    phone,
    whatsapp,
    email,
    hours,
    images,
    features
  }
`

// Menu Categories
export const menuCategoriesQuery = groq`
  *[_type == "menuCategory"] | order(order asc) {
    _id,
    name,
    slug,
    icon,
    image,
    order
  }
`

// Menu Items (with category expansion, ordered by category order then name)
export const menuItemsQuery = groq`
  *[_type == "menuItem"] | order(category->order asc, name.en asc) {
    _id,
    name,
    description,
    price,
    image,
    category->{
      _id,
      name,
      slug,
      icon,
      order
    },
    dietaryTags,
    available
  }
`

// Menu Items by Category
export const menuItemsByCategoryQuery = groq`
  *[_type == "menuItem" && category->slug.current == $categorySlug] | order(name.en asc) {
    _id,
    name,
    description,
    price,
    image,
    category->{
      _id,
      name,
      slug,
      icon,
      order
    },
    dietaryTags,
    available
  }
`

// Gallery Images
export const galleryImagesQuery = groq`
  *[_type == "bistroGallery"] | order(order asc) {
    _id,
    image,
    caption,
    category,
    order
  }
`

// Reviews
export const reviewsQuery = groq`
  *[_type == "review"] | order(featured desc, date desc) {
    _id,
    name,
    quote,
    rating,
    source,
    date,
    featured
  }
`

// Product Categories
export const productCategoriesQuery = groq`
  *[_type == "productCategory"] {
    _id,
    name,
    slug,
    description,
    image
  }
`

// Collections (active only)
export const collectionsQuery = groq`
  *[_type == "collection" && active == true] {
    _id,
    name,
    slug,
    description,
    featuredImage,
    season,
    active
  }
`

// Collection by Slug (with products)
export const collectionBySlugQuery = groq`
  *[_type == "collection" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    featuredImage,
    season,
    active,
    "products": *[_type == "product" && references(^._id)] {
      _id,
      name,
      slug,
      description,
      price,
      compareAtPrice,
      images,
      category->{
        _id,
        name,
        slug
      },
      sizes,
      tags
    }
  }
`

// Products (with category and collection expansion)
export const productsQuery = groq`
  *[_type == "product"] | order(name.en asc) {
    _id,
    name,
    slug,
    description,
    price,
    compareAtPrice,
    stripePriceId,
    images,
    category->{
      _id,
      name,
      slug
    },
    collection->{
      _id,
      name,
      slug
    },
    sizes,
    materials,
    careInstructions,
    tags
  }
`

// Product by Slug
export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    price,
    compareAtPrice,
    stripePriceId,
    images,
    category->{
      _id,
      name,
      slug
    },
    collection->{
      _id,
      name,
      slug
    },
    sizes,
    materials,
    careInstructions,
    tags
  }
`

// Size Chart
export const sizeChartQuery = groq`
  *[_type == "sizeChart"][0] {
    _id,
    name,
    measurements,
    notes
  }
`

// Team Members
export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    photo,
    bio,
    order
  }
`
