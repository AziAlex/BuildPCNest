import { cityLinkConfig, ICityLinkConfig, ICityLinkPageData } from './config'
import puppeteer, { Browser, Page } from 'puppeteer'
import { ProductDocument } from '../../products/models/product.model'
import { Model } from 'mongoose'

const getProductPages = async (page: Page) => {
  const elements = await page.$$(cityLinkConfig.selectors.pagination)
  return elements[elements.length - 3].evaluate((el) => el.textContent)
}

const parsePage = async (page: Page, category: string): Promise<ICityLinkPageData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  await page.waitForSelector(cityLinkConfig.selectors.childTitle)
  await page.waitForSelector(cityLinkConfig.selectors.childPrice)

  return await page.evaluate(
    (config: ICityLinkConfig, category: string) => {
      const childrenArray = Array.from(document.querySelectorAll(config.selectors.child))

      const pageData: ICityLinkPageData[] = []

      for (let i = 0; i < childrenArray.length; i++) {
        try {
          const child = childrenArray[i] as HTMLElement
          const dataImg =
            (child.querySelector(config.selectors.childImgArray) as HTMLElement) ??
            (child.querySelector(config.selectors.childImg) as HTMLElement)
          const characteristicsArray = Array.from(
            child.querySelectorAll(config.selectors.childCharacteristicsArray),
          ) as HTMLElement[]
          const elementTitle =
            (child.querySelector(config.selectors.childTitle) as HTMLElement) ??
            (child.querySelector(config.selectors.childTitle) as HTMLElement)
          const price =
            (child.querySelector(config.selectors.childPrice) as HTMLElement) ??
            (child.querySelector(config.selectors.childPrice) as HTMLElement)

          const data: ICityLinkPageData = {
            type: category,
            marketplace: 'cityLink',
            name: elementTitle?.getAttribute('title'),
            price: parseInt(price?.innerText?.replace(' ', '')),
            href: config.baseUrl + elementTitle?.getAttribute('href'),
            characteristics: [],
            img: dataImg.getAttribute('src'),
          }

          characteristicsArray.forEach((item) => {
            data.characteristics.push(item.innerText)
          })

          pageData.push(data)
        } catch (e) {}
      }

      return pageData
    },
    cityLinkConfig,
    category,
  )
}

const openPage = async (page: Page, category: string, pageId: number = 1): Promise<void> => {
  await page.goto(
    `${cityLinkConfig.baseUrl}/catalog/${category}/?p=${pageId}&pf=discount.any%2Crating.any&f=discount.any%2Crating.any%2Cavailable.all&view_type=list`,
  )
  await page.waitForSelector(cityLinkConfig.selectors.childTitle)
  await page.waitForSelector(cityLinkConfig.selectors.childPrice)
}

const parseCategory = async (
  browser: Browser,
  category: string,
  productModel: Model<ProductDocument>,
): Promise<void> => {
  const page = await browser.newPage()
  await openPage(page, category)
  const productPages = await getProductPages(page)

  console.log('\x1b[36m%s\x1b[0m', `Category: ${category}, страниц: ${productPages}`)

  for (let pageId = 1; pageId <= +productPages; pageId++) {
    await openPage(page, category, pageId)
    const data = await parsePage(page, category)

    if (data) {
      console.log(`Category: ${category}, страница №${pageId} успешно скачана`)
      console.log(data.length)
      for (let i = 0; i < data.length; i++) {
        const newData = await productModel.findOne({ href: data[i].href })

        if (!newData) {
          new productModel(data[i]).save().catch((err) => console.log(err))
        }
      }
    } else {
      console.log(`Category: ${category}, страница №${pageId} не скачана`)
    }
  }
}

export const cityLinkParser = async (productModel: Model<ProductDocument>): Promise<void> => {
  const browser = await puppeteer.launch()

  for (let i = 0; i < cityLinkConfig.categories.length; i++) {
    await parseCategory(browser, cityLinkConfig.categories[i], productModel)
  }

  await browser.close()
}
