export const cityLinkConfig: ICityLinkConfig = {
  baseUrl: 'https://www.citilink.ru',
  categories: [
    // 'videokarty',
    // 'processory',
    // 'materinskie-platy',
    // 'bloki-pitaniya',
    // 'sistemy-ohlazhdeniya-processora',
    // 'sistemy-ohlazhdeniya-korpusa',
    // 'korpusa',
    // 'zhestkie-diski',
    // 'ssd-nakopiteli',
    // 'moduli-pamyati',
  ],
  selectors: {
    child: '.app-catalog-1bogmvw',
    childTitle: '.app-catalog-9gnskf',
    childPrice: '.app-catalog-j8h82j',
    childImgArray: '.app-catalog-1ljntpj',
    childImg: '.app-catalog-15kpwh2',
    childCharacteristicsArray: '.app-catalog-17ju59h',
    pagination: '.app-catalog-peotpw',
  },
}

export interface ICityLinkConfig {
  baseUrl: string
  categories: string[]
  selectors: {
    child: string
    childTitle: string
    childPrice: string
    childImgArray: string
    childImg: string
    childCharacteristicsArray: string
    pagination: string
  }
}

export interface ICityLinkPageData {
  type: string
  marketplace: string
  name: string
  price: number
  href: string
  characteristics: string[]
  img: string
}
