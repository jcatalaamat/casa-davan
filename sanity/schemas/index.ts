import blockContent from './blockContent'
import localeString from './localeString'
import localeText from './localeText'
import localeBlockContent from './localeBlockContent'
import siteSettings from './siteSettings'
import location from './location'
import menuCategory from './menuCategory'
import menuItem from './menuItem'
import bistroGallery from './bistroGallery'
import review from './review'
import productCategory from './productCategory'
import collection from './collection'
import product from './product'
import sizeChart from './sizeChart'
import teamMember from './teamMember'

export const schemaTypes = [
  // Locale types
  blockContent,
  localeString,
  localeText,
  localeBlockContent,

  // Singletons
  siteSettings,

  // Bistro
  menuCategory,
  menuItem,
  bistroGallery,
  review,

  // Boutique
  productCategory,
  collection,
  product,
  sizeChart,

  // General
  location,
  teamMember,
]
