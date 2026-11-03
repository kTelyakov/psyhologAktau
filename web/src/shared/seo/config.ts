export const SITE_URL = 'https://psyholog-aktau.kz'

export const ORG_ID = `${SITE_URL}/#organization`
export const PERSON_ID = `${SITE_URL}/#psychologist`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const abs = (path: string) => new URL(path, SITE_URL).toString()
